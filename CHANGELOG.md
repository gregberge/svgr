# Change Log

**WARNING**: this file is an incomplete list of versions, and not all breaking changes are documented here (eg. 6.0.0). For a full list of releases and release notes, go to the [project's releases page](https://github.com/gregberge/svgr/releases) on Github.

See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.2.1](https://github.com/gregberge/svgr/compare/v6.2.0...v6.2.1) (2022-01-30)


### Bug Fixes

* do not transform mask-type ([#673](https://github.com/gregberge/svgr/issues/673)) ([6e58f2c](https://github.com/gregberge/svgr/commit/6e58f2cb456bf5fbfa011ab8f8154333c0724e34)), closes [#643](https://github.com/gregberge/svgr/issues/643)
* use .ts extension for generated index ([#670](https://github.com/gregberge/svgr/issues/670)) ([d19abe2](https://github.com/gregberge/svgr/commit/d19abe207013f4e880a78f236e9f75b0151258da)), closes [#462](https://github.com/gregberge/svgr/issues/462)





# [6.2.0](https://github.com/gregberge/svgr/compare/v6.1.2...v6.2.0) (2022-01-10)


### Bug Fixes

* **cli:** pass in parser to prettier format to avoid deprecation warning ([#662](https://github.com/gregberge/svgr/issues/662)) ([74fa3ae](https://github.com/gregberge/svgr/commit/74fa3aed2944b63797a6e0e786acd1b51f86550a))
* **plugin-svgo:** handle potential errors from optimize ([#663](https://github.com/gregberge/svgr/issues/663)) ([7582d31](https://github.com/gregberge/svgr/commit/7582d3130e5b6eb0f962e283f956a84552f839a6))


### Features

* support comments in templates ([#661](https://github.com/gregberge/svgr/issues/661)) ([9afb590](https://github.com/gregberge/svgr/commit/9afb590d1094793fca797449fb7017da9fa06b4e))





## [6.1.2](https://github.com/gregberge/svgr/compare/v6.1.1...v6.1.2) (2021-12-12)


### Bug Fixes

* **rollup:** missing dep & missing map return ([#652](https://github.com/gregberge/svgr/issues/652)) ([12627fc](https://github.com/gregberge/svgr/commit/12627fcd91a425361e1fbe825a6668ce9a8b4f3b))
* specify valid peer deps ([45a76ed](https://github.com/gregberge/svgr/commit/45a76ed5f7d433e549c8513c0fdab08eb6c7bc2c))





## [6.1.1](https://github.com/gregberge/svgr/compare/v6.1.0...v6.1.1) (2021-12-04)


### Bug Fixes

* **webpack:** fix double export ([#648](https://github.com/gregberge/svgr/issues/648)) ([7595d37](https://github.com/gregberge/svgr/commit/7595d378b73d4826a4cead165b3f32386b07315b)), closes [#645](https://github.com/gregberge/svgr/issues/645)





# [6.1.0](https://github.com/gregberge/svgr/compare/v6.0.0...v6.1.0) (2021-12-01)


### Bug Fixes

* fix previous export system ([1872829](https://github.com/gregberge/svgr/commit/187282977af841cd5a2243a23abba72b20eec2fa)), closes [#635](https://github.com/gregberge/svgr/issues/635)


### Features

* **native:** automatically convert inline style in native ([138c493](https://github.com/gregberge/svgr/commit/138c493b2ae0c5c1cef488cf9ff7f94827dc2aa5)), closes [#588](https://github.com/gregberge/svgr/issues/588)


### Performance Improvements

* remove useless loader-utils package ([387bc72](https://github.com/gregberge/svgr/commit/387bc727a4e07c2668544e3f5afbefe29a3de909)), closes [#631](https://github.com/gregberge/svgr/issues/631)





# [5.5.0](https://github.com/gregberge/svgr/compare/v5.4.0...v5.5.0) (2020-11-15)


### Bug Fixes

* **typescript:** fix react-native support [#465](https://github.com/gregberge/svgr/issues/465) ([#488](https://github.com/gregberge/svgr/issues/488)) ([d61e0cf](https://github.com/gregberge/svgr/commit/d61e0cface065afc1478fdb44d87ca8177041eab))
* ensure a valid name for exports ([#489](https://github.com/gregberge/svgr/issues/489)) ([0eb8085](https://github.com/gregberge/svgr/commit/0eb80853e53a55226881f6ae3b50c1afe89f1cfc))
* fix playground ([c7ad69f](https://github.com/gregberge/svgr/commit/c7ad69fff347afdca3410e4fb1da235be01b1ac8))
* prevent removing the namespace by svgr ([[#475](https://github.com/gregberge/svgr/issues/475)](https://github.com/gregberge/svgr/issues/475) ([#498](https://github.com/gregberge/svgr/issues/498)) ([00e84ea](https://github.com/gregberge/svgr/commit/00e84ead96d89bcbd072b9585b4db1365e392d33))


### Features

* allow custom name for named export ([#493](https://github.com/gregberge/svgr/issues/493)) ([16a58d6](https://github.com/gregberge/svgr/commit/16a58d6e817c065f72a68be91600a1a360205f44))
* **svgo:** add .svgorc.js config file support ([#451](https://github.com/gregberge/svgr/issues/451)) ([8049b1a](https://github.com/gregberge/svgr/commit/8049b1a63603672096892b6ab3d303580c2f303f)), closes [#412](https://github.com/gregberge/svgr/issues/412)


### Performance Improvements

* **cli:** use fs.promises ([#459](https://github.com/gregberge/svgr/issues/459)) ([af294ac](https://github.com/gregberge/svgr/commit/af294ac3b86e7c39e78fc8b348110baf8c690949))
* replace merge-deep with smaller deepmerge ([#463](https://github.com/gregberge/svgr/issues/463)) ([1f015eb](https://github.com/gregberge/svgr/commit/1f015eb16fca093a08b012236dc83623f7bcce55))





# [5.4.0](https://github.com/gregberge/svgr/compare/v5.3.1...v5.4.0) (2020-04-27)


### Bug Fixes

* wrap svg component directly with memo/forwardRef ([#440](https://github.com/gregberge/svgr/issues/440)) ([#441](https://github.com/gregberge/svgr/issues/441)) ([a6de2da](https://github.com/gregberge/svgr/commit/a6de2dacb63e36572a2167b928418bdc39f3a9c2))
* **cli:** fix index generation ([#443](https://github.com/gregberge/svgr/issues/443)) ([7c46ad7](https://github.com/gregberge/svgr/commit/7c46ad73695c42e6153761c931377d65b71835ea)), closes [#433](https://github.com/gregberge/svgr/issues/433)


### Features

* add `ForeignObject` support for react native ([#430](https://github.com/gregberge/svgr/issues/430)) ([1b56b85](https://github.com/gregberge/svgr/commit/1b56b851478803d40105ce63c70e457bd3183da6))
* **cli:** make all CLI options available in config ([a23a186](https://github.com/gregberge/svgr/commit/a23a18675c0dd4a461d2fcbdc72a305cabd32a13)), closes [#431](https://github.com/gregberge/svgr/issues/431) [#437](https://github.com/gregberge/svgr/issues/437)





## [5.3.1](https://github.com/gregberge/svgr/compare/v5.3.0...v5.3.1) (2020-04-05)


### Bug Fixes

* fix typescript types (ref, title) ([#419](https://github.com/gregberge/svgr/issues/419)) ([6e7e6b2](https://github.com/gregberge/svgr/commit/6e7e6b2e73d26d30f64604e0fc627f9ff94079c2))





# [5.3.0](https://github.com/gregberge/svgr/compare/v5.2.0...v5.3.0) (2020-03-22)


### Bug Fixes

* **cli:** remove confusion between {keep,ignore}-existing ([#413](https://github.com/gregberge/svgr/issues/413)) ([c5430f9](https://github.com/gregberge/svgr/commit/c5430f97b053a7d2d85c85c56b87dfc8c9c1f09a)), closes [#390](https://github.com/gregberge/svgr/issues/390)
* **parcel-plugin:** support "parcel" and "parcel-bundler" ([853db4e](https://github.com/gregberge/svgr/commit/853db4ef0e9da4952e8189e3f86fb62e6c506693)), closes [#410](https://github.com/gregberge/svgr/issues/410)
* **svgo:** support any SVGO config format ([#412](https://github.com/gregberge/svgr/issues/412)) ([f2b2367](https://github.com/gregberge/svgr/commit/f2b2367389fda20baba6e0a5e884e7f7fe29a3ed)), closes [#400](https://github.com/gregberge/svgr/issues/400)


### Features

* add typescript option ([4596d7b](https://github.com/gregberge/svgr/commit/4596d7bb470babb5ec4b87f5281174fb182bd9c7)), closes [#373](https://github.com/gregberge/svgr/issues/373)





# [5.2.0](https://github.com/smooth-code/svgr/compare/v5.1.0...v5.2.0) (2020-02-23)


### Bug Fixes

* verify that `svgoConfig.plugins` is an array ([#397](https://github.com/smooth-code/svgr/issues/397)) ([88110b6](https://github.com/smooth-code/svgr/commit/88110b6eb4d93ded68ca2de05cc82654dfac977d))


### Features

* **parcel-plugin:** replace `parcel-bundler` with `parcel` ([#387](https://github.com/smooth-code/svgr/issues/387)) ([d09bcd5](https://github.com/smooth-code/svgr/commit/d09bcd5d7ba21c8845c6042928bbdf14165e787b))





# [5.1.0](https://github.com/smooth-code/svgr/compare/v5.0.1...v5.1.0) (2020-01-20)


### Bug Fixes

* fix merging svgo plugins in config ([#384](https://github.com/smooth-code/svgr/issues/384)) ([c9d2dfc](https://github.com/smooth-code/svgr/commit/c9d2dfcb8d4da55eb21a13507c87d9e549a86e7e))


### Features

* add Svg prefix to exports that starts with a number ([#383](https://github.com/smooth-code/svgr/issues/383)) ([fd120d1](https://github.com/smooth-code/svgr/commit/fd120d11c81395353f300da487295b769f6b9501)), closes [#379](https://github.com/smooth-code/svgr/issues/379)
* allow to provide custom index.js template ([#378](https://github.com/smooth-code/svgr/issues/378)) ([f734dda](https://github.com/smooth-code/svgr/commit/f734ddac8e639ad213a3ce09689e46226fd5c1e0))





## [5.0.1](https://github.com/smooth-code/svgr/compare/v5.0.0...v5.0.1) (2019-12-29)


### Bug Fixes

* fix engines in package.json ([a45d6fc](https://github.com/smooth-code/svgr/commit/a45d6fc8b43402bec60ed4e9273f90fdc65a23a7))





## [4.3.3](https://github.com/gregberge/svgr/compare/v4.3.2...v4.3.3) (2019-09-24)


### Bug Fixes

* **babel-plugin-svg-dynamic-title:** dont render empty title ([#341](https://github.com/gregberge/svgr/issues/341)) ([88b24c5](https://github.com/gregberge/svgr/commit/88b24c5)), closes [#333](https://github.com/gregberge/svgr/issues/333)
* invalid characters in component name ([#332](https://github.com/gregberge/svgr/issues/332)) ([4b4bd2c](https://github.com/gregberge/svgr/commit/4b4bd2c)), closes [#331](https://github.com/gregberge/svgr/issues/331)





## [4.3.2](https://github.com/gregberge/svgr/compare/v4.3.1...v4.3.2) (2019-07-15)


### Performance Improvements

* replace rehype with svg-parser ([#321](https://github.com/gregberge/svgr/issues/321)) ([7eb5ef6](https://github.com/gregberge/svgr/commit/7eb5ef6))





## [4.3.1](https://github.com/gregberge/svgr/compare/v4.3.0...v4.3.1) (2019-07-01)


### Bug Fixes

* **titleProp:** handle the existing title case by using element instead of value (children) ([#315](https://github.com/gregberge/svgr/issues/315)) ([065e7a9](https://github.com/gregberge/svgr/commit/065e7a9))





# [4.3.0](https://github.com/gregberge/svgr/compare/v4.2.0...v4.3.0) (2019-05-28)


### Features

* **cli:** output relative destination paths ([#312](https://github.com/gregberge/svgr/issues/312)) ([b78e471](https://github.com/gregberge/svgr/commit/b78e471))
* titleProps fallbacks to svg's title ([#311](https://github.com/gregberge/svgr/issues/311)) ([8f92366](https://github.com/gregberge/svgr/commit/8f92366))





# [4.2.0](https://github.com/gregberge/svgr/compare/v4.1.0...v4.2.0) (2019-04-11)


### Bug Fixes

* keep viewBox when dimensions are removed ([#281](https://github.com/gregberge/svgr/issues/281)) ([f476c8e](https://github.com/gregberge/svgr/commit/f476c8e))
* **babel-preset:** expandProps + icon option ([ddfae22](https://github.com/gregberge/svgr/commit/ddfae22)), closes [#277](https://github.com/gregberge/svgr/issues/277)
* **cli:** fix kebab case transformation with "_" ([39c24c5](https://github.com/gregberge/svgr/commit/39c24c5)), closes [#280](https://github.com/gregberge/svgr/issues/280)
* **hast-util-to-babel-ast:** correctly handle aria attributes ([23d12aa](https://github.com/gregberge/svgr/commit/23d12aa)), closes [#279](https://github.com/gregberge/svgr/issues/279)
* **plugin-prettier:** fix prettier warning ([d01d33f](https://github.com/gregberge/svgr/commit/d01d33f))


### Features

* add expo option ([#289](https://github.com/gregberge/svgr/issues/289)) ([978db3e](https://github.com/gregberge/svgr/commit/978db3e))





# [4.1.0](https://github.com/gregberge/svgr/compare/v4.0.4...v4.1.0) (2018-11-24)


### Features

* add parcel plugin ([#235](https://github.com/gregberge/svgr/issues/235)) ([144dbe3](https://github.com/gregberge/svgr/commit/144dbe3)), closes [#215](https://github.com/gregberge/svgr/issues/215)





## [4.0.4](https://github.com/gregberge/svgr/compare/v4.0.3...v4.0.4) (2018-11-24)


### Bug Fixes

* **webpack:** use static babel config ([#240](https://github.com/gregberge/svgr/issues/240)) ([d67af31](https://github.com/gregberge/svgr/commit/d67af31)), closes [#232](https://github.com/gregberge/svgr/issues/232)





## [4.0.3](https://github.com/gregberge/svgr/compare/v4.0.2...v4.0.3) (2018-11-13)


### Bug Fixes

* **babel-plugin:** fix usage of spread attribute([#231](https://github.com/gregberge/svgr/issues/231)) ([4186953](https://github.com/gregberge/svgr/commit/4186953))
* upgrade dependencies ([7e2195f](https://github.com/gregberge/svgr/commit/7e2195f))





## [4.0.2](https://github.com/gregberge/svgr/compare/v4.0.1...v4.0.2) (2018-11-08)


### Bug Fixes

* **hast-util-to-babel-ast:** replace tabs by spaces in attributes ([b0f3d19](https://github.com/gregberge/svgr/commit/b0f3d19)), closes [#219](https://github.com/gregberge/svgr/issues/219)





## [4.0.1](https://github.com/gregberge/svgr/compare/v4.0.0...v4.0.1) (2018-11-08)


### Bug Fixes

* **babel-plugin-transform-svg:** support template that only return a single node ([80ac40f](https://github.com/gregberge/svgr/commit/80ac40f)), closes [#223](https://github.com/gregberge/svgr/issues/223)
* **babel-plugin-transform-svg-component:** parsing error of JSX template exports defs ([#225](https://github.com/gregberge/svgr/issues/225)) ([1e56309](https://github.com/gregberge/svgr/commit/1e56309)), closes [/github.com/gregberge/svgr/blob/master/packages/babel-plugin-transform-svg-component/src/util.js#L61](https://github.com//github.com/gregberge/svgr/blob/master/packages/babel-plugin-transform-svg-component/src/util.js/issues/L61)
* **hast-util-to-babel-ast:** correctly transforms data & aria attributes ([99711c4](https://github.com/gregberge/svgr/commit/99711c4)), closes [#221](https://github.com/gregberge/svgr/issues/221)
* **hast-util-to-babel-ast:** replace line-breaks in attributes ([00a2625](https://github.com/gregberge/svgr/commit/00a2625)), closes [#219](https://github.com/gregberge/svgr/issues/219)





# [4.0.0](https://github.com/gregberge/svgr/compare/v3.1.0...v4.0.0) (2018-11-04)


### Bug Fixes

* prevent babel read babel.config.js ([#206](https://github.com/gregberge/svgr/issues/206)) ([514d43d](https://github.com/gregberge/svgr/commit/514d43d))
* **cli:** fix --out-dir usage with absolute path ([#208](https://github.com/gregberge/svgr/issues/208)) ([c922e2e](https://github.com/gregberge/svgr/commit/c922e2e))


### Features

* **svgo:** prefix ids by default ([06c338d](https://github.com/gregberge/svgr/commit/06c338d)), closes [#210](https://github.com/gregberge/svgr/issues/210)
* **v4:** new architecture ([ac8b8ca](https://github.com/gregberge/svgr/commit/ac8b8ca))
* allow dynamic properties in replaceAttrValues option ([15f55fe](https://github.com/gregberge/svgr/commit/15f55fe)), closes [#205](https://github.com/gregberge/svgr/issues/205)


### BREAKING CHANGES

* **v4:** - `template` option must now returns a Babel AST
- `@svgr/core` does not include svgo & prettier by default





# [3.1.0](https://github.com/gregberge/svgr/compare/v3.0.0...v3.1.0) (2018-10-05)


### Bug Fixes

* style & custom SVG properties ([#203](https://github.com/gregberge/svgr/issues/203)) ([f8b2212](https://github.com/gregberge/svgr/commit/f8b2212)), closes [#199](https://github.com/gregberge/svgr/issues/199) [#201](https://github.com/gregberge/svgr/issues/201)


### Features

* allow Mask & Image on React Native ([#202](https://github.com/gregberge/svgr/issues/202)) ([0256bc0](https://github.com/gregberge/svgr/commit/0256bc0))





<a name="3.0.0"></a>
# [3.0.0](https://github.com/gregberge/svgr/compare/v2.4.1...v3.0.0) (2018-10-01)


### Bug Fixes

* **rollup:** forward filePath in rollup plugin ([461492b](https://github.com/gregberge/svgr/commit/461492b)), closes [#177](https://github.com/gregberge/svgr/issues/177) [#188](https://github.com/gregberge/svgr/issues/188)
* **webpack:** forward filePath in webpack loader ([b7a108e](https://github.com/gregberge/svgr/commit/b7a108e)), closes [#177](https://github.com/gregberge/svgr/issues/177) [#188](https://github.com/gregberge/svgr/issues/188)
* fix --icon + --no-dimensions ([7535693](https://github.com/gregberge/svgr/commit/7535693)), closes [#141](https://github.com/gregberge/svgr/issues/141)
* fix expandProps when position is not allowed ([45522fc](https://github.com/gregberge/svgr/commit/45522fc))


### Features

* **config:** improve runtime config ([e52cdce](https://github.com/gregberge/svgr/commit/e52cdce)), closes [#192](https://github.com/gregberge/svgr/issues/192)
* **template:** expose `getProps` util for template ([5cb238e](https://github.com/gregberge/svgr/commit/5cb238e)), closes [#187](https://github.com/gregberge/svgr/issues/187)
* add synchronous API ([169eb2f](https://github.com/gregberge/svgr/commit/169eb2f)), closes [#185](https://github.com/gregberge/svgr/issues/185)
* always prefix component name with "Svg" ([f71aa7a](https://github.com/gregberge/svgr/commit/f71aa7a)), closes [#190](https://github.com/gregberge/svgr/issues/190)
* do not remove style tag ([a4ce09a](https://github.com/gregberge/svgr/commit/a4ce09a)), closes [#191](https://github.com/gregberge/svgr/issues/191)
* new "expandProps" option ([bb95828](https://github.com/gregberge/svgr/commit/bb95828)), closes [#170](https://github.com/gregberge/svgr/issues/170)
* remove "svgAttributes" option ([4e46a5d](https://github.com/gregberge/svgr/commit/4e46a5d)), closes [#173](https://github.com/gregberge/svgr/issues/173)
* use forwardRef on React Native ([4bdd989](https://github.com/gregberge/svgr/commit/4bdd989)), closes [#184](https://github.com/gregberge/svgr/issues/184)
* use React.forwardRef ([cbee51c](https://github.com/gregberge/svgr/commit/cbee51c)), closes [#184](https://github.com/gregberge/svgr/issues/184)


### BREAKING CHANGES

* "--no-expand-props" is now replaced by "--expand-props none". You can now specify a position "start" or "end" for "expandProps"
property.
* `svgAttributes` has been removed, please use `svgProps` instead.
* "ref" option now uses `React.forwardRef`. You don't have to use "svgRef"
prop, just use "ref" and it will work. `React.forwardRef` requires React
> 16.3.
* Style tag will no longer be automatically removed. SVGO should handle it
correctly using "inlineStyles" plugin. If you want to remove them,
enable "removeStyleElement" plugin in your SVGO config.
* **rollup:** runtime configuration is now loaded using rollup plugin.
* **webpack:** runtime configuration is now loaded using webpack
loader.
* **config:** - Runtime configuration is always loaded (even with Node API `convert`)
- In CLI, "--config" is now "--config-file"; this new option can be used
everywhere





<a name="2.4.1"></a>
## [2.4.1](https://github.com/gregberge/svgr/compare/v2.4.0...v2.4.1) (2018-09-16)


### Bug Fixes

* **config:** fix custom config & default options ([#176](https://github.com/gregberge/svgr/issues/176)) ([9a6c40b](https://github.com/gregberge/svgr/commit/9a6c40b))





<a name="2.4.0"></a>
# [2.4.0](https://github.com/gregberge/svgr/compare/v2.3.0...v2.4.0) (2018-09-16)


### Bug Fixes

* use literal instead of litteral ([7849fd4](https://github.com/gregberge/svgr/commit/7849fd4))


### Features

* allow to spread props at the start ([#166](https://github.com/gregberge/svgr/issues/166)) ([cd659dc](https://github.com/gregberge/svgr/commit/cd659dc))
* **upgrade:** h2x@1.1.0 (jsdom@12.0.0) & others ([2d9b7bd](https://github.com/gregberge/svgr/commit/2d9b7bd))
* new option "svgProps" ([#172](https://github.com/gregberge/svgr/issues/172)) ([9657110](https://github.com/gregberge/svgr/commit/9657110))





<a name="2.3.0"></a>
# [2.3.0](https://github.com/gregberge/svgr/compare/v2.2.1...v2.3.0) (2018-09-03)


### Features

* upgrade to Babel v7 ([7bc908d](https://github.com/gregberge/svgr/commit/7bc908d))





<a name="2.2.1"></a>
## [2.2.1](https://github.com/gregberge/svgr/compare/v2.2.0...v2.2.1) (2018-08-16)


### Bug Fixes

* **rollup:** fix to work with rollup-plugin-typescript2 ([#147](https://github.com/gregberge/svgr/issues/147)) ([4b3737e](https://github.com/gregberge/svgr/commit/4b3737e))





<a name="2.2.0"></a>
# [2.2.0](https://github.com/gregberge/svgr/compare/v2.1.1...v2.2.0) (2018-08-13)


### Bug Fixes

* remove null-byte characters ([#154](https://github.com/gregberge/svgr/issues/154)) ([de7f8a7](https://github.com/gregberge/svgr/commit/de7f8a7)), closes [#153](https://github.com/gregberge/svgr/issues/153)
* **webpack:** use source when possible ([#139](https://github.com/gregberge/svgr/issues/139)) ([ae9965d](https://github.com/gregberge/svgr/commit/ae9965d))


### Features

* **core:** pass info to SVGO ([2b2353b](https://github.com/gregberge/svgr/commit/2b2353b)), closes [#152](https://github.com/gregberge/svgr/issues/152)





<a name="2.1.1"></a>
## [2.1.1](https://github.com/gregberge/svgr/compare/v2.1.0...v2.1.1) (2018-07-11)


### Bug Fixes

* **core:** config conflict with icon option ([#137](https://github.com/gregberge/svgr/issues/137)) ([e13a99a](https://github.com/gregberge/svgr/commit/e13a99a))




<a name="2.1.0"></a>
# [2.1.0](https://github.com/gregberge/svgr/compare/v2.0.0...v2.1.0) (2018-07-08)


### Features

* add .editorconfig support ([#129](https://github.com/gregberge/svgr/issues/129)) ([968fd82](https://github.com/gregberge/svgr/commit/968fd82))
* **cli:** support custom filename cases ([#136](https://github.com/gregberge/svgr/issues/136)) ([4922f7a](https://github.com/gregberge/svgr/commit/4922f7a)), closes [#118](https://github.com/gregberge/svgr/issues/118)




<a name="2.0.0"></a>
# [2.0.0](https://github.com/gregberge/svgr/compare/v1.10.0...v2.0.0) (2018-06-12)

### Features

#### Project configurations

SVGR now supports Prettier (`.prettierc`) and SVGO (`.svgo.yml`) configurations. It also supports a new `.svgrrc` configuration. See the readme for more detail.

#### Rollup plugin

Rollup has now an official SVGR plugin available under `@svgr/rollup`.

#### Split into several modules

SVGR is now an ecosystem of four modules:

- `@svgr/core`: Core of SVGR, it exposes the Node API
- `@svgr/cli`: Command Line Interface
- `@svgr/webpack`: webpack loader
- `@svgr/rollup`: a fresh new Rollup plugin

#### `svgAttributes` and `titleProp` options

Two new options appears, the first one `svgAttributes` gives you the opportunity to add attribute on the root `svg` tag without creating a custom template:

Command:

```
svgr --svg-attributes focusable=true foo.svg
```

Output:

```js
props => <svg focusable="false" />
```

The second one, `titleProp`, adds a custom property `title` to specify the title of the SVG.

Command:

```
svgr --title-prop foo.svg
```

Output:

```js
({ title }) => <svg><title>{title}</title></svg>
```

### Breaking changes

#### Node version

Node v6 support has been dropped, you need Node >= 8 to run SVGR.

#### Prettier options

All Prettier options have been removed:

- `jsx-bracket-same-line`
- `no-bracket-spacing`
- `no-semi`
- `single-quote`
- `tab-width`
- `trailing-comma`
- `use-tabs`

If you used it, use a `.prettierrc` instead of use the new option `--prettier-config`:

v1.x:

```
svgr --no-semi file.svg
```

v2.x:

```
svgr --prettier-config '{"semi": true}' file.svg
```

#### SVGO options

All SVGO options have been removed:

- `ids`
- `keep-useless-defs`
- `no-title`
- `no-view-box`
- `precision`

If you used it, use a `.svgo.yml` instead of use the new option `--svgo-config`:

v1.x:

```
svgr --ids file.svg
```

v2.x:

```
svgr --svgo-config '{"plugins": [{"cleanupIDs": {"remove": false, "minify": false}}]}' file.svg
```

#### Other options

- `replace-attr-value` has been renamed into `replace-attr-values`

In API, `replaceAttrValues` is now an object instead of an array.

#### Node API changes

- `rawConvert` method has been dropped
- Templates now receive three arguments: `code`, `config` and `state`
- `componentName` must now be passed in state

### Thanks

Thanks to [@MarquesDev](https://github.com/MarquesDev) and [@lifeiscontent](https://github.com/lifeiscontent).

<a name="1.10.0"></a>
# [1.10.0](https://github.com/gregberge/svgr/compare/v1.9.2...v1.10.0) (2018-05-28)


### Features

* upgrade Prettier (v1.13) ([2f50403](https://github.com/gregberge/svgr/commit/2f50403)), closes [#108](https://github.com/gregberge/svgr/issues/108)



<a name="1.9.2"></a>
## [1.9.2](https://github.com/gregberge/svgr/compare/v1.9.1...v1.9.2) (2018-05-14)


### Bug Fixes

* **ids:** do not minify them ([538b73f](https://github.com/gregberge/svgr/commit/538b73f))



<a name="1.9.1"></a>
## [1.9.1](https://github.com/gregberge/svgr/compare/v1.9.0...v1.9.1) (2018-03-25)


### Bug Fixes

* fix width / height override ([1f91705](https://github.com/gregberge/svgr/commit/1f91705)), closes [#issuecomment-375467614](https://github.com/gregberge/svgr/issues/issuecomment-375467614)
* handle filename with numbers ([a2387ea](https://github.com/gregberge/svgr/commit/a2387ea)), closes [#62](https://github.com/gregberge/svgr/issues/62) [#64](https://github.com/gregberge/svgr/issues/64)



<a name="1.9.0"></a>
# [1.9.0](https://github.com/gregberge/svgr/compare/v1.8.1...v1.9.0) (2018-03-08)


### Features

* add option to removeDimensions ([#58](https://github.com/gregberge/svgr/issues/58)) ([7357e7c](https://github.com/gregberge/svgr/commit/7357e7c))



<a name="1.8.1"></a>
## [1.8.1](https://github.com/gregberge/svgr/compare/v1.8.0...v1.8.1) (2018-01-31)


### Bug Fixes

* **loader:** add missing babel-plugin ([#50](https://github.com/gregberge/svgr/issues/50)) ([c49b627](https://github.com/gregberge/svgr/commit/c49b627))



<a name="1.8.0"></a>
# [1.8.0](https://github.com/gregberge/svgr/compare/v1.7.0...v1.8.0) (2018-01-31)


### Bug Fixes

* fix tabWidth option ([#49](https://github.com/gregberge/svgr/issues/49)) ([a863280](https://github.com/gregberge/svgr/commit/a863280)), closes [#33](https://github.com/gregberge/svgr/issues/33)


### Features

* support custom file extension ([#47](https://github.com/gregberge/svgr/issues/47)) ([56a111f](https://github.com/gregberge/svgr/commit/56a111f)), closes [#31](https://github.com/gregberge/svgr/issues/31)
* **webpack:** include Babel transformation ([#48](https://github.com/gregberge/svgr/issues/48)) ([dfecd39](https://github.com/gregberge/svgr/commit/dfecd39)), closes [#45](https://github.com/gregberge/svgr/issues/45)



<a name="1.7.0"></a>
# [1.7.0](https://github.com/gregberge/svgr/compare/v1.6.0...v1.7.0) (2018-01-23)


### Features

* **emSize:** add support for missing width/height ([2eacfd8](https://github.com/gregberge/svgr/commit/2eacfd8))
* add option keepUselessDefs ([3d03510](https://github.com/gregberge/svgr/commit/3d03510)), closes [#36](https://github.com/gregberge/svgr/issues/36)


### Performance Improvements

* refactor emSize to reduce iterations ([3c9d8b4](https://github.com/gregberge/svgr/commit/3c9d8b4))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/gregberge/svgr/compare/v1.5.0...v1.6.0) (2018-01-08)


### Features

* support url-loader & file-loader ([b95ed07](https://github.com/gregberge/svgr/commit/b95ed07))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/gregberge/svgr/compare/v1.4.0...v1.5.0) (2017-12-12)


### Features

* add ref option ([#29](https://github.com/gregberge/svgr/issues/29)) ([86e0bda](https://github.com/gregberge/svgr/commit/86e0bda))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/gregberge/svgr/compare/v1.3.0...v1.4.0) (2017-12-07)


### Features

* add "-native" option to target React Native ([76fd6f5](https://github.com/gregberge/svgr/commit/76fd6f5))
* **native:** import only relevant components ([fcd4229](https://github.com/gregberge/svgr/commit/fcd4229))
* **native:** log unsupported components ([888d968](https://github.com/gregberge/svgr/commit/888d968))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/gregberge/svgr/compare/v1.1.0...v1.3.0) (2017-12-05)


### Features

* add option to keeps IDs from SVG ([bfd4066](https://github.com/gregberge/svgr/commit/bfd4066))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/gregberge/svgr/compare/v1.1.0...v1.2.0) (2017-12-04)


### Features

* simplify webpack usage ([7ac643e](https://github.com/gregberge/svgr/commit/7ac643e))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/gregberge/svgr/compare/v1.0.0...v1.1.0) (2017-11-24)


### Features

* add viewBox option that default to true ([ba2be3a](https://github.com/gregberge/svgr/commit/ba2be3a))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/gregberge/svgr/compare/v0.5.0...v1.0.0) (2017-11-07)


### Features

* upgrade svgo & prettier ([fd66885](https://github.com/gregberge/svgr/commit/fd66885))


### BREAKING CHANGES

* SVGO now removes viewBox automatically.
