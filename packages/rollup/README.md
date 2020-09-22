# @svgr/rollup

[![Build Status](https://img.shields.io/travis/smooth-code/svgr.svg)](https://travis-ci.org/smooth-code/svgr)
[![Version](https://img.shields.io/npm/v/@svgr/rollup.svg)](https://www.npmjs.com/package/@svgr/rollup)
[![MIT License](https://img.shields.io/npm/l/@svgr/rollup.svg)](https://github.com/smooth-code/svgr/blob/master/LICENSE)

Rollup plugin for SVGR.

```
npm install @svgr/rollup --save-dev
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

The named export defaults to `ReactComponent`, but can be customized with the `namedExport` option.

### Use your own Babel configuration

By default, `@svgr/rollup` applies a babel transformation with [optimized configuration](https://github.com/smooth-code/svgr/blob/master/packages/rollup/src/index.js). In some case you may want to apply a custom one (if you are using Preact for an example). You can turn off Babel transformation by specifying `babel: false` in options.

```js
{
  plugins: [svgr({ babel: false })]
}
```

## License

MIT
