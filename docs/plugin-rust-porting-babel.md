---
id: plugin-rust-porting-babel
title: Porting babel operations to swc plugin operations
sidebar_label: Cheetsheet
---

> This page is currently WIP.

## Tricky operations

### Deleting ndoe

## Cheatsheet

### `generateUidIdentifier`

This can be done by storing an integer field in transformer type and using it while calling `quote_ident!` or `private_ident!`.
