# @svgr/cli

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]

Command Line Interface for SVGR.

```
npm install @svgr/cli --save-dev
```

## Usage

```
Usage: svgr [options] <file|directory>

Options:
  -V, --version                    output the version number
  --config-file <file>             specify the path of the svgr config
  --no-runtime-config              disable runtime config (".svgrrc", ".svgo.yml", ".prettierrc")
  -d, --out-dir <dirname>          output files into a directory
  --ignore-existing                ignore existing files when used with --out-dir
  --ext <ext>                      specify a custom file extension (default: "js")
  --filename-case <case>           specify filename case ("pascal", "kebab", "camel") (default: "pascal")
  --icon                           use "1em" as width and height
  --native                         add react-native support with react-native-svg
  --memo                           add React.memo into the result component
  --ref                            forward ref to SVG root element
  --no-dimensions                  remove width and height from root SVG tag
  --expand-props [position]        disable props expanding ("start", "end", "none") (default: "end")
  --svg-props <property=value>     add props to the svg element
  --replace-attr-values <old=new>  replace an attribute value
  --template <file>                specify a custom template to use
  --index-template <file>          specify a custom index.js template to use
  --title-prop                     create a title element linked with props
  --prettier-config <fileOrJson>   Prettier config
  --no-prettier                    disable Prettier
  --svgo-config <fileOrJson>       SVGO config
  --no-svgo                        disable SVGO
  --silent                         suppress output
  --stdin                          force reading input from stdin
  --stdin-filepath                 path to the file to pretend that stdin comesfrom
  -h, --help                       output usage information

  Examples:
    svgr --replace-attr-values "#fff=currentColor" icon.svg
```

## License

MIT

[build-badge]: https://img.shields.io/travis/smooth-code/svgr.svg?style=flat-square
[build]: https://travis-ci.org/smooth-code/svgr
[version-badge]: https://img.shields.io/npm/v/@svgr/core.svg?style=flat-square
[package]: https://www.npmjs.com/package/@svgr/core
[license-badge]: https://img.shields.io/npm/l/@svgr/core.svg?style=flat-square
[license]: https://github.com/smooth-code/svgr/blob/master/LICENSE
