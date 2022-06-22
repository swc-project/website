# @swc/cli

## Usage

Run the following to download pre-built binaries:

```plaintext
npm i -D @swc/cli @swc/core
```

Then, you can transpile your files:

```sh
# Transpile one file and emit to stdout
npx swc ./file.js

# Transpile one file and emit to `output.js`
npx swc ./file.js -o output.js

# Transpile and write to /output dir
npx swc ./my-dir -d output
```

## Options

### --filename (-f)

Filename to use when reading from stdin. This will be used in source maps and errors.

```sh
npx swc -f input.js
```

### --config-file

Path to a `.swcrc` file to use.

```sh
npx swc input.js --config-file .swcrc
```

### --env-name

The name of the 'env' to use when loading configs and plugins. Defaults to the value of `SWC_ENV`, or else `NODE_ENV`, or else `development`.

```sh
npx swc input.js --env-name='test'
```

### --no-swcrc

Whether or not to look up `.swcrc` files.

```sh
npx swc input.js --no-swcrc
```

### --ignore

List of glob paths to **not** compile.

```sh
npx swc src --ignore **/*.test.js
```

### `--only`

List of glob paths to **only** compile

Example:

```sh
npx swc src --only **/*.js
```

### --watch (-w)

To automatically recompile files on changes, install `chokidar`:

```sh
npm i -D chokidar
```

Then, add the `-w` flag:

```sh
npx swc input.js -w
```

### --quiet (-q)

Suppress compilation output.

```sh
npx swc input.js -q
```

### --source-maps (-s)

Values: `true|false|inline|both`

```sh
npx swc input.js -s
```

### --source-map-target

Define the `file` for the source map.

```sh
npx swc input.js -s --source-map-target input.map.js
```

### --source-file-name

Set `sources[0]` on returned source map

### --source-root

The root from which all sources are relative.

### --out-file (-o)

Compile all input files into a single file.

```sh
npx swc input.js -o output.js
```

### --out-dir (-d)

Compile an input directory of modules into an output directory.

```sh
npx swc src -d dist
```

### --copy-files (-D)

When compiling a directory, copy over non-compilable files.

```sh
npx swc src --copy-files
```

### --include-dotfiles

Include dotfiles when compiling and copying non-compilable files.

```sh
npx swc src --include-dotfiles
```

### --config (-C)

Override a config from `.swcrc` file.

```sh
npx swc src -C module.type=amd -C module.moduleId=hello
```

### --sync

Invoke swc synchronously. Useful for debugging.

```sh
npx swc src --sync
```

### --log-watch-compilation

Log a message when a watched file is successfully compiled.

```sh
npx swc input.js --log-watch-compilation
```

### --extensions

Use specific extensions.
