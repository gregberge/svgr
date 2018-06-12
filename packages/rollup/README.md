# @svgr/rollup

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]

Rollup plugin for SVGR.

```
npm install @svgr/rollup
```

In your `rollup.config.js`:

```js
{
  plugins: [svgr()]
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
  plugins: [svgr({ native: true })]
}
```

### Using with `url` plugin

It is possible to use it with [`url`](https://github.com/rollup/rollup-plugin-url).

In your `rollup.config.js`:

```js
{
  plugins: [url(), svgr()]
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

By default, `@svgr/rollup` includes a `babel-loader` with [optimized configuration](https://github.com/smooth-code/svgr/blob/master/packages/rollup/src/index.js). In some case you may want to apply a custom one (if you are using Preact for an example). You can turn off Babel transformation by specifying `babel: false` in options.

```js
{
  plugins: [svgr({ babel: false })]
}
```

## License

MIT

[build-badge]: https://img.shields.io/travis/smooth-code/svgr.svg?style=flat-square
[build]: https://travis-ci.org/smooth-code/svgr
[version-badge]: https://img.shields.io/npm/v/@svgr/rollup.svg?style=flat-square
[package]: https://www.npmjs.com/package/@svgr/rollup
[license-badge]: https://img.shields.io/npm/l/@svgr/rollup.svg?style=flat-square
[license]: https://github.com/smooth-code/svgr/blob/master/LICENSE
