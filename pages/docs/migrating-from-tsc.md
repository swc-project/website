# Migrating from tsc

## isolatedModules: true

SWC works on file-by-file, so any operation requiring cross-file analysis will not work.
So you are recommended to use `isolatedModules: true`.
See [a comment on the realted issue](https://github.com/swc-project/swc/issues/7101#issuecomment-1480610668) for more details.
