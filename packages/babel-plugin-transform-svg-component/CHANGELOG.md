# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.1](https://github.com/gregberge/svgr/tree/master/packages/babel-plugin-transform-svg-component/compare/v5.0.0...v5.0.1) (2019-12-29)


### Bug Fixes

* fix engines in package.json ([a45d6fc](https://github.com/gregberge/svgr/tree/master/packages/babel-plugin-transform-svg-component/commit/a45d6fc8b43402bec60ed4e9273f90fdc65a23a7))





# [4.2.0](https://github.com/gregberge/svgr/tree/master/packages/babel-plugin-transform-svg-component/compare/v4.1.0...v4.2.0) (2019-04-11)


### Features

* add expo option ([#289](https://github.com/gregberge/svgr/tree/master/packages/babel-plugin-transform-svg-component/issues/289)) ([978db3e](https://github.com/gregberge/svgr/tree/master/packages/babel-plugin-transform-svg-component/commit/978db3e))





# [4.1.0](https://github.com/gregberge/svgr/compare/v4.0.4...v4.1.0) (2018-11-24)

**Note:** Version bump only for package @svgr/babel-plugin-transform-svg-component





## [4.0.1](https://github.com/gregberge/svgr/compare/v4.0.0...v4.0.1) (2018-11-08)


### Bug Fixes

* **babel-plugin-transform-svg:** support template that only return a single node ([80ac40f](https://github.com/gregberge/svgr/commit/80ac40f)), closes [#223](https://github.com/gregberge/svgr/issues/223)
* **babel-plugin-transform-svg-component:** parsing error of JSX template exports defs ([#225](https://github.com/gregberge/svgr/issues/225)) ([1e56309](https://github.com/gregberge/svgr/commit/1e56309)), closes [/github.com/gregberge/svgr/blob/master/packages/babel-plugin-transform-svg-component/src/util.js#L61](https://github.com//github.com/gregberge/svgr/blob/master/packages/babel-plugin-transform-svg-component/src/util.js/issues/L61)





# [4.0.0](https://github.com/gregberge/svgr/compare/v3.1.0...v4.0.0) (2018-11-04)


### Features

* **v4:** new architecture ([ac8b8ca](https://github.com/gregberge/svgr/commit/ac8b8ca))


### BREAKING CHANGES

* **v4:** - `template` option must now returns a Babel AST
- `@svgr/core` does not include svgo & prettier by default
