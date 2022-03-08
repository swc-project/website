# Plugins

You can create and use custom plugins with SWCs WebAssembly(WASM) based runtime.  
The WASM API is the successor of the legacy [JS API](/docs/usage/plugins-legacy).

> Warning: The WASM plugin API is still experimental

## Getting Started

We recommend to use Rust to write plugins as SWC is written in Rust and ships with [plugin types and macros](https://crates.io/crates/swc_plugin).
To setup Rust and the `cargo` cli please follow the [installation instructions](https://www.rust-lang.org/learn/get-started).

First, if you haven't installed the `swc_cli` package, install it via `cargo`:

```bash
cargo install swc_cli
```

Then you can scaffold a new plugin project with the `swc` command (not `swc_cli`).

You have to specify the compilation target type. You can choose from two options: 

    - `wasm32-wasi` supports system interfaces as well as macros like `println!()`
    - `wasm32-unknown-unknown` generates slighly smaller binaries

For your first plugin we recommend to use `wasm32-wasi`:

```bash
swc plugin new my-first-plugin --target-type=wasm32-wasi
```

Compile your plugin:

```bash
cargo build
```

Create a new [`.swcrc`](http://localhost:3000/docs/configuration/swcrc) configuration file and add the absolute path to your wasm file:

```json
{
    "jsc": {
        "experimental": {
            "plugins": [
                [
                    "/path/to/my-first-plugin/target/wasm32-wasi/debug/my_first_plugin.wasm",
                    {}
                ]
            ]
        }
    }
}
```

Execute `swc` to transform a `.js` file:

```bash
npx --package @swc/cli --package @swc/core -- swc example.js
```

## Visitors API

A full list of all available SWC visitors can be found [here](https://rustdoc.swc.rs/swc_ecma_visit/trait.VisitMut.html).

Visitors are a pattern used in AST traversal across languages. They are an object with methods defined for accepting particular node types in a tree. That's a bit abstract, so let's look at an example:

```rust
impl VisitMut for TransformVisitor {
    fn visit_mut_binding_ident(&mut self, binding_ident: &mut BindingIdent) {
        println!("called for: {:#?}", binding_ident.id.sym);
    }
}
```

This visitor will call the `visit_mut_binding_ident()` method for every Identifier in the tree when used during a traversal.

With the code below, the `visit_mut_binding_ident()` method will be called twice for both binding identifiers (the function arguments `a` and `b`):

```ts
function sum(a, b) {
  return a + b;
}
```

Result:

```js
called for: Atom('a' type=inline)
called for: Atom('b' type=inline)
```

## Full Example

This example, the [swc-plugin-console-prefix](https://github.com/williamtetlow/swc-plugin-console-prefix) plugin, adds an additional prefix parameter to all `console.log` statements.

## Feedback

If you experience any issues with the WASM API please let us know in [the github discussion](https://github.com/swc-project/swc/discussions/3540).