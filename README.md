<h1 align="center">
  <img src="https://raw.githubusercontent.com/smooth-code/svgr/master/resources/svgr-logo.png" alt="svgr" title="svgr" width="300">
</h1>
<p align="center" style="font-size: 1.2rem;">Tranform SVG into React components 🦁</p>

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![MIT License][license-badge]][license]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

[**Try it out online!**](https://svgr.now.sh)

[**Watch the talk at React Europe**](https://www.youtube.com/watch?v=geKCzi7ZPkA)

```sh
npm install @svgr/cli
```

## Example

**Take an icon.svg**:

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg width="48px" height="1px" viewBox="0 0 48 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
    <title>Rectangle 5</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="19-Separator" transform="translate(-129.000000, -156.000000)" fill="#063855">
            <g id="Controls/Settings" transform="translate(80.000000, 0.000000)">
                <g id="Content" transform="translate(0.000000, 64.000000)">
                    <g id="Group" transform="translate(24.000000, 56.000000)">
                        <g id="Group-2">
                            <rect id="Rectangle-5" x="25" y="36" width="48" height="1"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
```

**Run SVGR**

```sh
svgr --icon --replace-attr-values "#063855=currentColor" icon.svg
```

**Output**

```js
import React from 'react'

const SvgComponent = props => (
  <svg width="1em" height="1em" viewBox="0 0 48 1" {...props}>
    <path d="M0 0h48v1H0z" fill="currentColor" fillRule="evenodd" />
  </svg>
)

export default SvgComponent
```

## Motivation

React supports SVG out of the box, it's simpler, easier and much more powerful
to have components instead of SVG files. Wrapped in a React component, your SVG
is inlined in the page and you can style it using CSS.

There are a lot of similar projects, but I wanted something more solid and
configurable. SVGR is based on [h2x](https://github.com/smooth-code/h2x), a
powerful and configurable HTML transpiler. It uses AST (like
[Babel](https://github.com/babel/babel/)) that gives a lot of power.

## Command line usage

```
Usage: svgr [options] <file>

Options:

  -V, --version                      output the version number
  --config <file>                    specify the path of the svgr config
  -d, --out-dir <dirname>            output files into a directory
  --ext <ext>                        specify a custom file extension (default: "js")
  --icon                             use "1em" as width and height
  --native                           add react-native support with react-native-svg
  --ref                              add svgRef prop to svg
  --no-dimensions                    remove width and height from root SVG tag
  --no-expand-props                  disable props expanding
  --svg-attributes <property=value>  add some attributes to the svg
  --replace-attr-values <old=new>    replace an attribute value
  --template <file>                  specify a custom template to use
  --title-prop                       create a title element linked with props
  --prettier-config <fileOrJson>     Prettier config
  --no-prettier                      disable Prettier
  --svgo-config <fileOrJson>         SVGO config
  --no-svgo                          disable SVGO
  -h, --help                         output usage information

Examples:
  svgr --replace-attr-values "#fff=currentColor" icon.svg
```

### Recipes

#### Transform a whole directory

A whole directory can be processed, all SVG files (matching `.svg` or `.SVG`)
are transformed into React components.

```sh
# Usage: svgr [-d out-dir] [src-dir]
$ svgr -d icons icons
icons/web/clock-icon.svg -> icons/web/ClockIcon.js
icons/web/wifi-icon.svg -> icons/web/WifiIcon.js
icons/spinner/cog-icon.svg -> icons/spinner/CogIcon.js
icons/spinner/spinner-icon.svg -> icons/spinner/SpinnerIcon.js
```

#### Use stdin

```
$ svgr < icons/web/wifi-icon.svg
```

#### Use stdin / stdout

```
$ svgr < icons/web/wifi-icon.svg > icons/web/WifiIcon.js
```

#### Transform icons

To create icons, two options are important:

- `--icon`: viewBox is preserved and SVG inherits text size
- `--replace-attr-values "#000000=currentColor"`: "#000000" is replaced by
  "currentColor" and SVG inherits text color

```
$ svgr --icon --replace-attr-values "#000000=currentColor" my-icon.svg
```

#### Target React Native

It is possible to target React Native using [react-native-svg](https://github.com/react-native-community/react-native-svg).

```
$ svgr --native my-icon.svg
```

#### Use a specific template

You can use a specific template.

```
$ svgr --template path/to/template.js my-icon.svg
```

You can find template examples in [templates folder](https://github.com/smooth-code/svgr/blob/master/packages/core/src/templates).

## Node API usage

SVGR can also be used programmatically:

```js
import svgr from '@svgr/core'

const svgCode = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect x="10" y="10" height="100" width="100"
    style="stroke:#ff0000; fill: #0000ff"/>
</svg>
`

svgr(svgCode, { icon: true }, { componentName: 'MyComponent' }).then(jsCode => {
  console.log(jsCode)
})
```

## [Webpack loader](https://github.com/smooth-code/svgr/blob/master/packages/webpack)

## [Rollup plugin](https://github.com/smooth-code/svgr/blob/master/packages/rollup)

## Configurations

### SVGR

SVGR uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for configuration file support. This means you can configure prettier via:

- A `.svgrrc` file, written in YAML or JSON, with optional extensions: .yaml/.yml/.json/.js.
- A `svgr.config.js` file that exports an object.
- A "svgr" key in your package.json file.

The configuration file will be resolved starting from the location of the file being formatted, and searching up the file tree until a config file is (or isn't) found.

The options to the configuration file are the same as the API options.

#### Example

JSON:

```json
{
  "icon": true,
  "expandProps": false
}
```

JS:

```js
// .svgrrc.js
module.exports = {
  icon: true,
  expandProps: false,
}
```

YAML:

```yml
# .svgrrc
icon: true
expandProps: false
```

### Prettier

The recommended way to configure Prettier for SVGR is to use [`.prettierrc`](https://prettier.io/docs/en/configuration.html). It is fully supported in [all formats available](https://prettier.io/docs/en/configuration.html) and it is relative to the transformed SVG file.

Even if it is not recommended, you can also use `prettierConfig` option to specify your Prettier configuration. `prettierConfig` has precedence on `.prettierrc`.

### SVGO

The recommended way to configure SVGO for SVGR is to use [`.svgo.yml`](https://github.com/svg/svgo/blob/master/.svgo.yml). [Several formats are suported](./packages/core/src/plugins/svgo.js) and it is relative to the transformed SVG file.

Even if it is not recommended, you can also use `svgoConfig` option to specify your SVGO configuration. `svgoConfig` has precedence on `.svgo.yml`.

## Options

SVGR ships with a handful of customizable options, usable in both the CLI and
API.

### File extension

Specify a custom extension for generated files.

| Default | CLI Override | API Override    |
| ------- | ------------ | --------------- |
| `"js"`  | `--ext`      | `ext: <string>` |

### Icon

Replace SVG "width" and "height" value by "1em" in order to make SVG size
inherits from text size.

| Default | CLI Override | API Override   |
| ------- | ------------ | -------------- |
| `false` | `--icon`     | `icon: <bool>` |

### Native

Modify all SVG nodes with uppercase and use a specific template with
[`react-native-svg`](https://github.com/react-native-community/react-native-svg) imports. **All unsupported nodes will be removed.**

| Default | CLI Override | API Override     |
| ------- | ------------ | ---------------- |
| `false` | `--native`   | `native: <bool>` |

### Dimensions

Remove width and height from root SVG tag.

| Default | CLI Override      | API Override         |
| ------- | ----------------- | -------------------- |
| `false` | `--no-dimensions` | `dimensions: <bool>` |

### Expand props

All properties given to component will be forwarded on SVG tag.

| Default | CLI Override        | API Override          |
| ------- | ------------------- | --------------------- |
| `true`  | `--no-expand-props` | `expandProps: <bool>` |

### Prettier

Use [Prettier](https://github.com/prettier/prettier) to format JavaScript code
output.

| Default | CLI Override    | API Override       |
| ------- | --------------- | ------------------ |
| `true`  | `--no-prettier` | `prettier: <bool>` |

### Prettier config

Specify Prettier config. [See Prettier options](https://prettier.io/docs/en/options.html).

| Default | CLI Override        | API Override               |
| ------- | ------------------- | -------------------------- |
| `null`  | `--prettier-config` | `prettierConfig: <object>` |

### SVGO

Use [SVGO](https://github.com/svg/svgo/) to optimize SVG code before
transforming it into a component.

| Default | CLI Override | API Override   |
| ------- | ------------ | -------------- |
| `true`  | `--no-svgo`  | `svgo: <bool>` |

### SVGO config

Specify SVGO config. [See SVGO options](https://gist.github.com/pladaria/69321af86ce165c2c1fc1c718b098dd0).

| Default | CLI Override    | API Override           |
| ------- | --------------- | ---------------------- |
| `null`  | `--svgo-config` | `svgoConfig: <object>` |

### Ref

Setting this to `true` will allow you to hook into the ref of the svg components that are created by exposing a `svgRef` prop

| Default | CLI Override | API Override  |
| ------- | ------------ | ------------- |
| `false` | `--ref`      | `ref: <bool>` |

### Replace attribute value

Replace an attribute value by an other. The main usage of this option is to
change an icon color to "currentColor" in order to inherit from text color.

| Default | CLI Override                      | API Override                         |
| ------- | --------------------------------- | ------------------------------------ |
| `[]`    | `--replace-attr-values <old=new>` | `replaceAttrValues: { old: 'new' }>` |

### SVG attributes

Add attributes to the root SVG tag.

| Default | CLI Override                    | API Override                        |
| ------- | ------------------------------- | ----------------------------------- |
| `[]`    | `--svg-attributes <name=value>` | `svgAttributes: { name: 'value' }>` |

### Template

Specify a template file (CLI) or a template function (API) to use. For an
example of template, see [the default one](packages/core/src/templates/reactDomTemplate.js).

| Default                                                               | CLI Override | API Override       |
| --------------------------------------------------------------------- | ------------ | ------------------ |
| [`reactDomTemplate`](packages/core/src/templates/reactDomTemplate.js) | `--template` | `template: <func>` |

### Output Directory

Output files into a directory.

| Default     | CLI Override          | API Override        |
| ----------- | --------------------- | ------------------- |
| `undefined` | `--out-dir <dirname>` | `outDir: <dirname>` |

# License

MIT

[build-badge]: https://img.shields.io/travis/smooth-code/svgr.svg?style=flat-square
[build]: https://travis-ci.org/smooth-code/svgr
[coverage-badge]: https://img.shields.io/codecov/c/github/smooth-code/svgr.svg?style=flat-square
[coverage]: https://codecov.io/github/smooth-code/svgr
[version-badge]: https://img.shields.io/npm/v/svgr.svg?style=flat-square
[package]: https://www.npmjs.com/package/svgr
[license-badge]: https://img.shields.io/npm/l/svgr.svg?style=flat-square
[license]: https://github.com/smooth-code/svgr/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/smooth-code/svgr.svg?style=social
[github-watch]: https://github.com/smooth-code/svgr/watchers
[github-star-badge]: https://img.shields.io/github/stars/smooth-code/svgr.svg?style=social
[github-star]: https://github.com/smooth-code/svgr/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20svgr!%20https://github.com/smooth-code/svgr%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/smooth-code/svgr.svg?style=social
