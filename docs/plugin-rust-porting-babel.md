---
id: plugin-rust-porting-babel
title: "CheetSheet: babel -> swc"
sidebar_label: CheetSheet
---

> This page is currently WIP.

## Ownership model (of rust)

> This section is not about `swc` itself. But this is described at here because it's the cause of almost all trickyness of APIs.

## Tricky operations

### Deleting node

### Referencing parent node from handler of child node

This includes usage of `paths` and `scope`.

### Caching some information about an AST node

## Alternatives for babel APIs

### `generateUidIdentifier`

This returns a unique identifier with a monotonically increasing integer suffix.
`swc` does not provide API to do this, because there's a very easy way to do this.
You can store an integer field in transformer type and use it while calling `quote_ident!` or `private_ident!`.

```rust

struct Example {
    // You don't need to share counter.
    cnt: usize
}

impl Example {
    /// For properties, it's okay to use `quote_ident`.
    pub fn next_property_id(&mut self) -> Ident {
        self.cnt += 1;
        quote_ident!(format!("$_css_{}", self.cnt))
    }

    /// If you want to create a safe variable, you should use `private_ident`
    pub fn next_variable_id(&mut self) -> Ident {
        self.cnt += 1;
        private_ident!(format!("$_css_{}", self.cnt))
    }
}


```

### `path.find`

Upward traversal is not supported by `swc`.
It's because upward traversal requires storing information about parent at children nodes, which requires using types like `Arc` or `Mutex` in rust.

### `state.file.get`/`state.file.set`

You can simply store the value in the transform struct as an instance of transform struct only process one file.
