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

Please note that by default, `@svgr/rollup` will try to export the React Component via default export if there is no other plugin handling svg files with default export. When there is already any other plugin using default export for svg files, `@svgr/rollup` will always export the React component via named export.

If you prefer named export in any case, you may set the `exportType` option to `named`.

### Use your own Babel configuration

By default, `@svgr/rollup` applies a babel transformation with [optimized configuration](https://github.com/gregberge/svgr/blob/main/packages/rollup/src/index.ts). In some case you may want to apply a custom one (if you are using Preact for an example). You can turn off Babel transformation by specifying `babel: false` in options.

```js
{
  plugins: [svgr({ babel: false })]
}
```

## License

MIT
