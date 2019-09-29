<h1 align="center">
  <img src="https://raw.githubusercontent.com/smooth-code/svgr/master/resources/svgr-logo.png" alt="svgr" title="svgr" width="300">
</h1>
<p align="center" style="font-size: 1.2rem;">Transform SVGs into React components 🦁</p>

[![License](https://img.shields.io/npm/l/@svgr/core.svg)](https://github.com/smooth-code/svgr/blob/master/LICENSE)
[![Donate](https://opencollective.com/svgr/backers/badge.svg)](https://opencollective.com/svgr/donate)
[![npm package](https://img.shields.io/npm/v/@svgr/core/latest.svg)](https://www.npmjs.com/package/@svgr/core)
[![npm downloads](https://img.shields.io/npm/dm/@svgr/core.svg)](https://www.npmjs.com/package/@svgr/core)
[![Build Status](https://img.shields.io/travis/smooth-code/svgr.svg)](https://travis-ci.org/smooth-code/svgr)
[![Code Coverage](https://img.shields.io/codecov/c/github/smooth-code/svgr.svg)](https://codecov.io/github/smooth-code/svgr)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Dependencies](https://img.shields.io/david/smooth-code/svgr.svg?path=packages%2Fcore)](https://david-dm.org/smooth-code/svgr?path=packages/core)
[![DevDependencies](https://img.shields.io/david/dev/smooth-code/svgr.svg)](https://david-dm.org/smooth-code/svgr?type=dev)

[**Try it out online!**](https://svgr.now.sh)

[**Watch the talk at React Europe**](https://www.youtube.com/watch?v=geKCzi7ZPkA)

SVGR transforms SVG into ready to use components. It is part of create-react-app and makes SVG integration into your React projects easy.

## [Docs](https://www.smooth-code.com/open-source/svgr)

**See the documentation at [smooth-code.com/open-source/svgr](https://www.smooth-code.com/open-source/svgr)** for more information about using `svgr`!

Quicklinks to some of the most-visited pages:

- [**Playground**](https://www.smooth-code.com/open-source/svgr/playground/)
- [**Getting started**](https://www.smooth-code.com/open-source/svgr/docs/getting-started/)
- [CLI usage](https://www.smooth-code.com/open-source/svgr/docs/cli/)
- [Webpack usage](https://www.smooth-code.com/open-source/svgr/docs/webpack/)
- [Node usage](https://www.smooth-code.com/open-source/svgr/docs/node-api/)

## Example

**Take an icon.svg**:

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg
  width="48px"
  height="1px"
  viewBox="0 0 48 1"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
  <title>Rectangle 5</title>
  <desc>Created with Sketch.</desc>
  <defs></defs>
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g
      id="19-Separator"
      transform="translate(-129.000000, -156.000000)"
      fill="#063855"
    >
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
npx @svgr/cli --icon --replace-attr-values "#063855=currentColor" icon.svg
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

## Testing with Jest

Create a simple mock for the svgr loader and map this in the jest config:

### Mock file -  `svgrMock.js`

```jsx
import React from 'react';

export default 'SvgrURL';
const SvgrMock = React.forwardRef((props, ref) => <span ref={ref} {...props} />);

export const ReactComponent = SvgrMock;
```

The above mock would supports the following import syntax and also works for styled-components
```js
import logoURL from '../assets/logo.svg'
// and
import { ReactComponent as Logo } from '../assets/logo.svg'
```

### Jest config setup

In your `package.json`

```json
"jest": {
  "moduleNameMapper": {
    "\\.svg": "<rootDir>/__mocks__/svgrMock.js"
  }
}
```

or in your `jest.config,js`

```js
module.exports = {
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
  },
};
```

Your snapshots will include all properties on the icon components, so they will be tested.

## Supporting SVGR

SVGR is a MIT-licensed open source project. It's an independent project with ongoing development made possible thanks to the support of these awesome [backers](/BACKERS.md). If you'd like to join them, please consider:

- [Become a backer or sponsor on OpenCollective](https://opencollective.com/svgr).

### Gold Sponsors

Gold Sponsors are those who have pledged \$100/month and more to SVGR.

[![gold-sponsors](https://opencollective.com/svgr/tiers/gold-sponsors.svg?avatarHeight=120&width=600)](https://opencollective.com/svgr/order/6010)

## Contributing

Check out the [contributing guidelines](CONTRIBUTING.md)

# License

Licensed under the MIT License, Copyright © 2017-present Smooth Code.

See [LICENSE](./LICENSE) for more information.

## Acknowledgements

This project has been popularized by [Christopher Chedeau](https://twitter.com/vjeux) and it has been included in [create-react-app] thanks to [Dan Abramov](https://twitter.com/dan_abramov). We would like to thanks [Sven Sauleau](https://twitter.com/svensauleau) for his help and its intuition.
