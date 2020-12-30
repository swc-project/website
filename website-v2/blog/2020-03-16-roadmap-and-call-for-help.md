---
title: Call for help and roadmap
author: DongYoon Kang
authorURL: "http://github.com/kdy1"
authorFBID: 100024888122318
---

## Call for help

I'm an undergraduate and while on a vacation, I could and did invest 12 ~ 14 hours to swc per day.
But vacation is over and I can't afford to spend so much time.
So I want some help from the community.

I welcome the contribution of any way, including developer time contribution or [financial contribution](https://opencollective.com/swc).

## Roadmap

I'll write in an order that I initially planned to work on.
Also, I'll mention progress of the work and the hard parts.

### .d.ts generator

I'm working on this at [kdy1/swc#dts](https://github.com/kdy1/swc/tree/dts).
Many tasks like return type inference and simple type narrowing are done and the remainging hard parts are

- argument type inference

It is very hard. In most case, making swc pass a single type inference test requires building it again and again with modified `dbg!`-s and it's really time-consuming. Sometimes, I failed to fix a single test for a whole day.

- handling of circular references

This includes clas members, type parameters and function declartions.

- handling this

### TypeScript type checker

I'm a full stack developer and I typically use react with typescript for web client and typescript for server.
If you have developed a web app with typescript, you will know how annoying slowness of `tsc` is. (Well, maybe it's just me being impatient)

If `swc` can check all type errors, developing with typescript would be significantly faster.

Note that adding an error checking logic is not very hard in many case.
Hard part is the fact that some of the tests coppied from the official typescript reposirory are very large and contain lots of error reportinh result in a single file. Due to the way test suite work, your console may contain 1k line, just because the official typescript test file contains lots of errors to match on.

### Bundler

I worked for a while on this at [kdy1/swc#spack](https://github.com/kdy1/swc/tree/spack).
Currently it can perform some dce (including tree-shaking) and can merge multiple modules into a module.

Hard parts are

- chunking bundles

- dynamic imports

This depends on chunking.

### parser error recovery

Purpose of the task is to completely replace `tsc` completely. When it's finished, it will be a real game-changer.
I postponed it because modifing parser is hard.
