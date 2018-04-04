<h1 align="center">
  <img src="https://raw.githubusercontent.com/smooth-code/svgr/master/resources/svgr-logo.png" alt="svgr" title="svgr" width="300">
</h1>
<p align="center" style="font-size: 1.2rem;">Tranform SVG into React components 🦁</p>

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![MIT License][license-badge]][license]

[![PRs Welcome][prs-badge]][prs] [![Chat][chat-badge]][chat]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

[**Try it out online!**](https://svgr.now.sh)

```sh
npm install svgr
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
svgr --no-semi --icon --replace-attr-value "#063855=currentColor" icon.svg
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

  -V, --version                    output the version number
  --ext <ext>                      specify a custom file extension (default: "js")
  --icon                           use "1em" as width and height
  --ids                            keep ids within the svg (svgo)
  --jsx-bracket-same-line          put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (prettier)
  --keep-useless-defs              keep elements of <defs> without id (svgo)
  --native                         add react-native support with react-native-svg
  --no-bracket-spacing             print spaces between brackets in object literals (prettier)
  --no-dimensions                  remove width and height from root SVG tag
  --no-expand-props                disable props expanding
  --no-prettier                    disable Prettier
  --no-semi                        remove semi-colons (prettier)
  --no-svgo                        disable SVGO
  --no-title                       remove title tag (svgo)
  --no-view-box                    remove viewBox
  -d, --out-dir <dirname>          output files into a directory
  -p, --precision <value>          set the number of digits in the fractional part (svgo)
  --ref                            add svgRef prop to svg
  --replace-attr-value [old=new]   replace an attribute value
  --single-quote                   use single-quotes instead of double-quotes (prettier)
  --tab-width <value>              specify the number of spaces by indentation-level (prettier)
  --template <file>                specify a custom template to use
  --trailing-comma <none|es5|all>  print trailing commas wherever possible when multi-line (prettier)
  --use-tabs                       indent lines with tabs instead of spaces (prettier)
  -h, --help                       output usage information

Examples:
  svgr --replace-attr-value "#fff=currentColor" icon.svg
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

* `--icon`: title is removed, viewBox is preserved and SVG inherits text size
* `--replace-attr-value "#000000=currentColor"`: "#000000" is replaced by
  "currentColor" and SVG inherits text color

```
$ svgr --icon --replace-attr-value "#000000=currentColor" my-icon.svg
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

**Example of template:**

```js
module.exports = (opts = {}) => {
  let props = ''

  if (opts.expandProps && opts.ref) {
    props = '{svgRef, ...props}'
  } else if (opts.expandProps) {
    props = 'props'
  } else if (opts.ref) {
    props = '{svgRef}'
  }

  return (code, state) => `import React from 'react'

const ${state.componentName} = (${props}) => ${code}

export default ${state.componentName}`
}
```

## Node API usage

SVGR can also be used programmatically:

```js
import svgr from 'svgr'

const svgCode = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="88px" height="88px" viewBox="0 0 88 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
    <title>Dismiss</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Blocks" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
        <g id="Dismiss" stroke="#063855" stroke-width="2">
            <path d="M51,37 L37,51" id="Shape"></path>
            <path d="M51,51 L37,37" id="Shape"></path>
        </g>
    </g>
</svg>
`

svgr(svgCode, { prettier: false, componentName: 'MyComponent' }).then(
  jsCode => {
    console.log(jsCode)
  },
)
```

## Webpack usage

SVGR has a Webpack loader, you can use it using following `webpack.config.js`:

In your `webpack.config.js`:

```js
{
  test: /\.svg$/,
  use: ['svgr/webpack'],
}
```

In your code:

```js
import Star from './star.svg'

const App = () => (
  <div>
    <Star />
  </div>
)
```

### Passing options

```js
{
  test: /\.svg$/,
  use: [
    {
      loader: 'svgr/webpack',
      options: {
        native: true,
      },
    },
  ],
}
```

### Using with `url-loader` or `file-loader`

It is possible to use it with [`url-loader`](https://github.com/webpack-contrib/url-loader) or [`file-loader`](https://github.com/webpack-contrib/file-loader).

In your `webpack.config.js`:

```js
{
  test: /\.svg$/,
  use: ['svgr/webpack', 'url-loader'],
}
```

In your code:

```js
import starUrl, { ReactComponent as Star } from './star.svg'

const App = () => (
  <div>
    <img src={starUrl} alt="star" />
    <Star />
  </div>
)
```

### Use your own Babel configuration

By default, `svgr/webpack` includes a `babel-loader` with [optimized configuration](https://github.com/smooth-code/svgr/blob/master/src/webpack.js). In some case you may want to apply a custom one (if you are using Preact for an example). You can turn off Babel transformation by specifying `babel: false` in options.

```js
// Example using preact
{
  test: /\.svg$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['preact', 'env'],
      },
    },
    {
      loader: 'svgr/webpack',
      options: { babel: false },
    }
  ],
}
```

### Handle SVG in CSS, Sass or Less

It is possible to detect the module that requires your SVG using [`Rule.issuer`](https://webpack.js.org/configuration/module/#rule-issuer) in Webpack. Using it you can specify two different configurations for JavaScript and the rest of your files.

```js
{
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: {
      test: /\.jsx?$/
    },
    use: ['babel-loader', 'svgr/webpack', 'url-loader']
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader'
  },
}
```

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
inherits from text size. Also remove title.

| Default | CLI Override | API Override   |
| ------- | ------------ | -------------- |
| `false` | `--icon`     | `icon: <bool>` |

### Ids

Setting this to `true` will keep ids. It can be useful to target specific ids
using CSS or third party library (eg:
[react-mutate-icon](https://github.com/lifeiscontent/react-mutate-icon)).

| Default | CLI Override | API Override  |
| ------- | ------------ | ------------- |
| `false` | `--ids`      | `ids: <bool>` |

### JSX Brackets

Put the `>` of a multi-line JSX element at the end of the last line instead of
being alone on the next line (does not apply to self closing elements). See
[Prettier](https://github.com/prettier/prettier/blob/master/README.md#jsx-brackets).

| Default | CLI Override              | API Override                 |
| ------- | ------------------------- | ---------------------------- |
| `false` | `--jsx-bracket-same-line` | `jsxBracketSameLine: <bool>` |

### Useless Defs

Keep elements of `<defs>` without `id`. It also keep unused symbols. See
[SVGO `removeUselessDefs` plugin](https://github.com/svg/svgo).

| Default | CLI Override          | API Override              |
| ------- | --------------------- | ------------------------- |
| `false` | `--keep-useless-defs` | `keepUselessDefs: <bool>` |

### Native

Modify all SVG nodes with uppercase and use a specific template with
react-native-svg imports. **All unsupported nodes will be removed.**

| Default | CLI Override | API Override     |
| ------- | ------------ | ---------------- |
| `false` | `--native`   | `native: <bool>` |

### Bracket Spacing

Print spaces between brackets in object literals. See
[Prettier](https://github.com/prettier/prettier/blob/master/README.md#bracket-spacing).

| Default | CLI Override           | API Override             |
| ------- | ---------------------- | ------------------------ |
| `true`  | `--no-bracket-spacing` | `bracketSpacing: <bool>` |

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

### Semicolons

Print semicolons at the ends of statements. See
[Prettier](https://github.com/prettier/prettier/blob/master/README.md#semicolons).

| Default | CLI Override | API Override   |
| ------- | ------------ | -------------- |
| `true`  | `--no-semi`  | `semi: <bool>` |

### SVGO

Use [SVGO](https://github.com/svg/svgo/) to optimize SVG code before
transforming it into a component.

| Default | CLI Override | API Override   |
| ------- | ------------ | -------------- |
| `true`  | `--no-svgo`  | `svgo: <bool>` |

### Title

Setting this to `false` will remove the title from SVG. See
[SVGO `removeTitle` plugin](https://github.com/svg/svgo).

| Default | CLI Override | API Override    |
| ------- | ------------ | --------------- |
| `true`  | `--no-title` | `title: <bool>` |

### ViewBox

Setting this to `false` will remove the viewBox property.

| Default | CLI Override    | API Override      |
| ------- | --------------- | ----------------- |
| `true`  | `--no-view-box` | `viewBox: <bool>` |

### Ref

Setting this to `true` will allow you to hook into the ref of the svg components that are created by exposing a `svgRef` prop

| Default | CLI Override | API Override  |
| ------- | ------------ | ------------- |
| `false` | `--ref`      | `ref: <bool>` |

### Replace attribute value

Replace an attribute value by an other. The main usage of this option is to
change an icon color to "currentColor" in order to inherit from text color.

| Default | CLI Override                     | API Override                              |
| ------- | -------------------------------- | ----------------------------------------- |
| `[]`    | `--replace-attr-value <old=new>` | `replaceAttrValues: <string[[old, new]]>` |

### Quotes

Use single quotes instead of double quotes. See
[Prettier](https://github.com/prettier/prettier/blob/master/README.md#quotes).

| Default | CLI Override     | API Override          |
| ------- | ---------------- | --------------------- |
| `false` | `--single-quote` | `singleQuote: <bool>` |

### Tab Width

Specify the number of spaces per indentation-level. See
[Prettier](https://github.com/prettier/prettier/blob/master/README.md#tab-width).

| Default | CLI Override        | API Override      |
| ------- | ------------------- | ----------------- |
| `2`     | `--tab-width <int>` | `tabWidth: <int>` |

### Template

Specify a template file (CLI) or a template function (API) to use. For an
example of template, see [the default one](src/transforms/wrapIntoComponent.js).

| Default                                                    | CLI Override | API Override       |
| ---------------------------------------------------------- | ------------ | ------------------ |
| [`wrapIntoComponent`](src/transforms/wrapIntoComponent.js) | `--template` | `template: <func>` |

### Trailing Commas

Print trailing commas wherever possible when multi-line. See
[Prettier](https://github.com/prettier/prettier/blob/master/README.md#trailing-commas).

| Default  | CLI Override                                           | API Override                                           |
| -------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `"none"` | <code>--trailing-comma <none&#124;es5&#124;all></code> | <code>trailingComma: "<none&#124;es5&#124;all>"</code> |

### Tabs

Indent lines with tabs instead of spaces. See
[Prettier](https://github.com/prettier/prettier/blob/master/README.md#tabs).

| Default | CLI Override | API Override      |
| ------- | ------------ | ----------------- |
| `false` | `--use-tabs` | `useTabs: <bool>` |

### Output Directory

Output files into a directory.

| Default     | CLI Override          | API Override        |
| ----------- | --------------------- | ------------------- |
| `undefined` | `--out-dir <dirname>` | `outDir: <dirname>` |

### Precision

Set number of digits in the fractional part. See
[SVGO](https://github.com/svg/svgo).

| Default | CLI Override        | API Override       |
| ------- | ------------------- | ------------------ |
| `3`     | `--precision <int>` | `precision: <int>` |

## Other projects

A lot of projects tried to solve this problem, unfortunately, none of them
fulfills my use cases.

Using raw node:

* [svg-to-react](https://github.com/publitas/svg-to-react)
* [svg-2-react-isvg](https://github.com/quirinpa/svg-2-react-isvg)
* [svg-to-component](https://github.com/egoist/svg-to-component)
* [svg-react-transformer](https://github.com/mapbox/svg-react-transformer)
* [svg-to-react-k](https://github.com/andgandolfi/svg-to-react-k)

Using command line:

* [svg-to-react-cli](https://github.com/goopscoop/svg-to-react-cli)
* [svg2react](https://github.com/meriadec/svg2react)
* [svg-react-transformer-writer](https://github.com/mapbox/svg-react-transformer-writer)
* [react-svg-converter](https://github.com/joshblack/react-svg-converter)

Or using a Webpack loader:

* [svg-react-loader](https://github.com/jhamlet/svg-react-loader)
* [svg-react-transformer-loader](https://github.com/mapbox/svg-react-transformer-loader)

Or using a browserify loader:

* [svg-reactify](https://github.com/coma/svg-reactify)

Or using gulp / grunt plugin:

* [gulp-svg-to-react](https://github.com/marvin1023/gulp-svg-to-react)

Or at runtime:

* [svg-react](https://github.com/tonis2/svg-react)
* [react-isvg-loader](https://github.com/quirinpa/react-isvg-loader/)
* [react-svg-inline](https://github.com/MoOx/react-svg-inline)

Or using grunt:

* [grunt-svg-react-component](https://github.com/okcoker/grunt-svg-react-component)
* [svg-inline-react](https://github.com/sairion/svg-inline-react)

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
[chat]: https://gitter.im/smooth-code/svgr
[chat-badge]: https://img.shields.io/gitter/room/smooth-code/svgr.svg?style=flat-square
[github-watch-badge]: https://img.shields.io/github/watchers/smooth-code/svgr.svg?style=social
[github-watch]: https://github.com/smooth-code/svgr/watchers
[github-star-badge]: https://img.shields.io/github/stars/smooth-code/svgr.svg?style=social
[github-star]: https://github.com/smooth-code/svgr/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20svgr!%20https://github.com/smooth-code/svgr%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/smooth-code/svgr.svg?style=social
