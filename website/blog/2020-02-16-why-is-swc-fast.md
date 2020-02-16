---
title: "Why is swc fast?"
author: DongYoon Kang
authorURL: "http://github.com/kdy1"
authorFBID: 100024888122318
---

`swc` is fast. Very fast. It's 18x faster than babel on a single-core benchmark, and on a parallel benchmark, it's 68x faster than babel on a 4 core (8 HT) machine. Why? Just because it's written in rust? No. Its fundamental design differs from any other tool.

## The language

> Just rewriting something in another language does not make it faster.

This is _partially_ correct. Rewriting something in a language with an optimizing compiler can make difference.
Some compilers including rustc, which uses llvm as a backend, are good at optimizing codes.

---

Edit: makes -> can make, created an `optimization hints` section,

---

## Optimization hints

Sometimes, rustc cannot deduce that it's dead code even if it is dead. In swc, we give enough hint if it's the case.

For example, not all passes touch all of the ast. Many passes return the given ast node as-is. Especially, most passes have nothing to do with types. So those passes return the typings as-is.
So, it would be cool if those handlers are optimized out.
`rustc` failed to optimize it out by default because it changes semantic, but we can help it.

```rust
macro_rules! noop_fold_type {
    ($F:ty, $N:tt) => {
        impl Fold<swc_ecma_ast::$N> for $F {
            #[inline]
            fn fold(&mut self, node: swc_ecma_ast::$N) -> swc_ecma_ast::$N {
                node
            }
        }
    };
    ($F:ty) => {
        noop_fold_type!($F, Accessibility);
        // ...
        // Simillar code for each ast types
    };
}
```

See it on [github](https://github.com/swc-project/swc/blob/f17e49934c456022f5d6bfa23f7ad6af5ea2e338/ecmascript/transforms/src/macros.rs).

Now, it's optimized out. However, what matters is allocations. `Fold<Vec<T>>` is implemented as below.

```rust
impl<T, F> FoldWith<F> for Vec<T>
where
    F: Fold<T>,
{
    fn fold_children(self, f: &mut F) -> Self {
        self.move_map(|it| f.fold(it))
    }
}
```

`move_map()` is a hack to prevent reallocation.
When `Fold<T>` is an identity function, `Fold<Vec<T>>` is cleary no-op.
Let's see [the generated assembly for the code below](https://godbolt.org/z/kJE4Rq). The link contains the actual implementation of `move_map`.

```rust
pub fn ret(v: Vec<i32>) -> Vec<i32> {
    v
}

pub fn move_map(v:Vec<i32>) -> Vec<i32> {
    v.move_map(|v| v)
}
```

```asm
example::ret:
        mov     rax, rdi
        mov     rcx, qword ptr [rsi + 16]
        mov     qword ptr [rdi + 16], rcx
        movups  xmm0, xmmword ptr [rsi]
        movups  xmmword ptr [rdi], xmm0
        ret

example::move_map:
        sub     rsp, 24
        mov     rax, rdi
        movups  xmm0, xmmword ptr [rsi]
        movaps  xmmword ptr [rsp], xmm0
        mov     rcx, qword ptr [rsi + 16]
        movups  xmmword ptr [rdi], xmm0
        mov     qword ptr [rdi + 16], rcx
        add     rsp, 24
        ret
```

Great. Although it's a bit longer than no-op, no allocation occurs and thus it's fast enough.
The same goes for the `Box<T>`. See https://godbolt.org/z/5fDXQK if you want.

## Design

### String caching

Identifiers are inherently used multiple times. `swc` utilizes [string_cache](https://github.com/servo/string-cache) from the servo project to cache strings. Common identifiers like `Object` is stored as a constant.

### Less scope analysis

Scope analysis is done only 2 ~ 4 times per file. One at the start of processing, one at the end of processing, one to strip type-only imports (typescript only), and the last one to transcompile it into the other type of modules. (cjs, amd, umd)

I'll explain how it works, and why it's fast.
First, before applying any other transformations, `resolver` pass colors the identifiers.

Note that the symbol is not changed. `___` denotes the context number and it's not part of the symbol.

```js
const foo = 1;
use(foo);
{
  const foo = 2;
  use(foo);
}
```

becomes

```js
const foo___1 = 1;
use(foo___1);

{
  const foo___2 = 2;
  use(foo___2);
}
```

Then, other passes insert identifiers if required. There's a helper macro to create a **private** ident.
Let's suppose that a pass appended a private identifier named `foo` to the top level.

It's now

```js
const foo = 1;
use(foo);
{
  const foo = 2;
  use(foo);
}
const foo = 3;
```

and with expanded context number, it's

```js
const foo___1 = 1;
use(foo___1);
{
  const foo___2 = 2;
  use(foo__2);
}
const foo___3 = 3;
```

The last pass, named hygiene, removes context numbers and changes symbol to the appropriate one. It becomes

```js
const foo = 1;
use(foo);
{
  const foo1 = 2;
  use(foo1);
}
const foo2 = 3;
```

It means that passes between `resolver` and `hygiene` can inject identifiers as they want without any heavy operation.

For comparison, babel maintains the scope while transcompiling and [uses it](https://github.com/babel/babel/blob/31b05060409107caa5737f90bdf79fc3538c0a2d/packages/babel-plugin-transform-modules-commonjs/src/index.js#L148-L152) like `scope.rename('require')` to ensure that the name does not conflict.
However, given the fact that [babel does renaming directly instead of queueing](https://github.com/babel/babel/blob/31b05060409107caa5737f90bdf79fc3538c0a2d/packages/babel-traverse/src/scope/index.js#L370-L378), api like this means that all identifiers in the file are visited on each call. For common js module, babel does like

```js
path.scope.rename("exports");
path.scope.rename("module");
path.scope.rename("require");
path.scope.rename("__filename");
path.scope.rename("__dirname");
```

and it results in 5 scope analysis.

The basic idea of `hygiene` is taken from the macro system of rustc. Note that no compiler works in this way and I call this approach _identifier hygiene_. (Please correct me if I'm wrong.)

Note that this will also help writing a fast bundler.
While bundling modules, only a single invocation of the resolver pass is enough to distinguish identifiers from multiple modules.
Hygiene pass is invoked only once at the end.

---

Edit: Added how babel works

---

### No graph traversal

Graph traversal makes writing stuffs easy. However, it makes optimizing performance harder. So `swc` currently does not use graph traversal.
All passes which do scope analysis use vectors and hash maps, which is faster.
