# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.1.0](https://github.com/smooth-code/svgr/compare/v4.0.4...v4.1.0) (2018-11-24)

**Note:** Version bump only for package @svgr/cli





## [4.0.3](https://github.com/smooth-code/svgr/compare/v4.0.2...v4.0.3) (2018-11-13)

**Note:** Version bump only for package @svgr/cli





## [4.0.2](https://github.com/smooth-code/svgr/compare/v4.0.1...v4.0.2) (2018-11-08)

**Note:** Version bump only for package @svgr/cli





## [4.0.1](https://github.com/smooth-code/svgr/compare/v4.0.0...v4.0.1) (2018-11-08)

**Note:** Version bump only for package @svgr/cli





# [4.0.0](https://github.com/smooth-code/svgr/compare/v3.1.0...v4.0.0) (2018-11-04)


### Bug Fixes

* **cli:** fix --out-dir usage with absolute path ([#208](https://github.com/smooth-code/svgr/issues/208)) ([c922e2e](https://github.com/smooth-code/svgr/commit/c922e2e))


### Features

* **v4:** new architecture ([ac8b8ca](https://github.com/smooth-code/svgr/commit/ac8b8ca))


### BREAKING CHANGES

* **v4:** - `template` option must now returns a Babel AST
- `@svgr/core` does not include svgo & prettier by default





# [3.1.0](https://github.com/smooth-code/svgr/compare/v3.0.0...v3.1.0) (2018-10-05)


### Bug Fixes

* style & custom SVG properties ([#203](https://github.com/smooth-code/svgr/issues/203)) ([f8b2212](https://github.com/smooth-code/svgr/commit/f8b2212)), closes [#199](https://github.com/smooth-code/svgr/issues/199) [#201](https://github.com/smooth-code/svgr/issues/201)





<a name="3.0.0"></a>
# [3.0.0](https://github.com/smooth-code/svgr/compare/v2.4.1...v3.0.0) (2018-10-01)


### Features

* **config:** improve runtime config ([e52cdce](https://github.com/smooth-code/svgr/commit/e52cdce)), closes [#192](https://github.com/smooth-code/svgr/issues/192)
* always prefix component name with "Svg" ([f71aa7a](https://github.com/smooth-code/svgr/commit/f71aa7a)), closes [#190](https://github.com/smooth-code/svgr/issues/190)
* new "expandProps" option ([bb95828](https://github.com/smooth-code/svgr/commit/bb95828)), closes [#170](https://github.com/smooth-code/svgr/issues/170)
* remove "svgAttributes" option ([4e46a5d](https://github.com/smooth-code/svgr/commit/4e46a5d)), closes [#173](https://github.com/smooth-code/svgr/issues/173)
* use forwardRef on React Native ([4bdd989](https://github.com/smooth-code/svgr/commit/4bdd989)), closes [#184](https://github.com/smooth-code/svgr/issues/184)
* use React.forwardRef ([cbee51c](https://github.com/smooth-code/svgr/commit/cbee51c)), closes [#184](https://github.com/smooth-code/svgr/issues/184)


### BREAKING CHANGES

* "--no-expand-props" is now replaced by "--expand-props none". You can now specify a position "start" or "end" for "expandProps"
property.
* `svgAttributes` has been removed, please use `svgProps` instead.
* "ref" option now uses `React.forwardRef`. You don't have to use "svgRef"
prop, just use "ref" and it will work. `React.forwardRef` requires React
> 16.3.
* **config:** - Runtime configuration is always loaded (even with Node API `convert`)
- In CLI, "--config" is now "--config-file"; this new option can be used
everywhere





<a name="2.4.1"></a>
## [2.4.1](https://github.com/smooth-code/svgr/compare/v2.4.0...v2.4.1) (2018-09-16)


### Bug Fixes

* **config:** fix custom config & default options ([#176](https://github.com/smooth-code/svgr/issues/176)) ([9a6c40b](https://github.com/smooth-code/svgr/commit/9a6c40b))





<a name="2.4.0"></a>
# [2.4.0](https://github.com/smooth-code/svgr/compare/v2.3.0...v2.4.0) (2018-09-16)


### Features

* **upgrade:** h2x@1.1.0 (jsdom@12.0.0) & others ([2d9b7bd](https://github.com/smooth-code/svgr/commit/2d9b7bd))
* new option "svgProps" ([#172](https://github.com/smooth-code/svgr/issues/172)) ([9657110](https://github.com/smooth-code/svgr/commit/9657110))





<a name="2.3.0"></a>
# [2.3.0](https://github.com/smooth-code/svgr/compare/v2.2.1...v2.3.0) (2018-09-03)


### Features

* upgrade to Babel v7 ([7bc908d](https://github.com/smooth-code/svgr/commit/7bc908d))





<a name="2.2.0"></a>
# [2.2.0](https://github.com/smooth-code/svgr/compare/v2.1.1...v2.2.0) (2018-08-13)

**Note:** Version bump only for package @svgr/cli





<a name="2.1.1"></a>
## [2.1.1](https://github.com/smooth-code/svgr/compare/v2.1.0...v2.1.1) (2018-07-11)




**Note:** Version bump only for package @svgr/cli

<a name="2.1.0"></a>
# [2.1.0](https://github.com/smooth-code/svgr/compare/v2.0.0...v2.1.0) (2018-07-08)


### Features

* **cli:** support custom filename cases ([#136](https://github.com/smooth-code/svgr/issues/136)) ([4922f7a](https://github.com/smooth-code/svgr/commit/4922f7a)), closes [#118](https://github.com/smooth-code/svgr/issues/118)
