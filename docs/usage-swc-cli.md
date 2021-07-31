---
id: usage-swc-cli
title: Using cli (swc)
sidebar_label: cli (swc)
---

## Installation

```sh
npm i --save-dev @swc/cli @swc/core
```

## Usage

```sh
# Transpile one file and emit to stdout.
npx swc FILE

# Transpile one file and emit to `output.js`.
npx swc FILE -o output.js

# Transpile and write output to dir
npx swc DIR -d dir
```

## Watching

To rebuild automatically on file change, you need to install `chokidar` like

```sh
npm i -D chokidar

```

## Available Options

### `--filename`

Filename to use when reading from stdin - this will be used in source-maps, errors etc.

Alias: `-f`

Example:

```sh
npx swc -f input.js
```

### `--config-file`

Path to a .swcrc file to use.

Example:

```sh
npx swc input.js --config-file .swcrc
```

### `--env-name`

The name of the 'env' to use when loading configs and plugins.
Defaults to the value of `SWC_ENV`, or else `NODE_ENV`, or else 'development'.

Example:

```sh
npx swc input.js --env-name='test'
```

### `--no-swcrc`

Whether or not to look up .swcrc files

Example:

```sh
npx swc input.js --no-swcrc
```

### `--ignore`

List of glob paths to **not** compile

Example:

```sh
npx swc src --ignore **/*.test.js
```

### `--only`

List of glob paths to **only** compile

Example:

```sh
npx swc src --only **/*.js
```

### `--watch`

Recompile files on changes

Alias: `-w`

Example:

```sh
npx swc input.js -w
```

### `--quiet`

Suppress compilation output

Alias: `-q`

Example:

```sh
npx swc input.js -q
```

### `--source-maps`

Source maps

Alias: `-s`

Values: true|false|inline|both

Example:

```sh
npx swc input.js -s
```

### `--source-map-target`

Set `file` on returned source map

Example:

```sh
npx swc input.js -s --source-map-target input.map.js
```

### `--source-file-name`

Set `sources[0]` on returned source map

Example:

// TODO

### `--source-root`

The root from which all sources are relative

Example:

// TODO

### `--out-file`

Compile all input files into a single file

Alias: `-o`

Example:

```sh
npx swc input.js -o output.js
```

### `--out-dir`

Compile an input directory of modules into an output directory

Alias: `-d`

Example:

```sh
npx swc src -d dist
```

### `--copy-files`

When compiling a directory copy over non-compilable files

Alias: `-D`

Example:

```sh
npx swc src --copy-files
```

### `--include-dotfiles`

Include dotfiles when compiling and copying non-compilable files

Example:

```sh
npx swc src --include-dotfiles
```

### `--config`

Override a config from .swcrc file. e.g. -C module.type=amd -C module.moduleId=hello

Alias: `-C`

Example:

```sh
npx swc src -C module.type=amd
```

### `--sync`

Invoke swc synchronously. Useful for debugging.

Example:

```sh
npx swc src --sync
```

### `--log-watch-compilation`

Log a message when a watched file is successfully compiled.

Example:

```sh
npx swc input.js --log-watch-compilation
```

### `--extensions`

Use specific extensions

Example:

// TODO
