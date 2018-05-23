# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.9.2"></a>
## [1.9.2](https://github.com/smooth-code/svgr/compare/v1.9.1...v1.9.2) (2018-05-14)


### Bug Fixes

* **ids:** do not minify them ([538b73f](https://github.com/smooth-code/svgr/commit/538b73f))



<a name="1.9.1"></a>
## [1.9.1](https://github.com/smooth-code/svgr/compare/v1.9.0...v1.9.1) (2018-03-25)


### Bug Fixes

* fix width / height override ([1f91705](https://github.com/smooth-code/svgr/commit/1f91705)), closes [#issuecomment-375467614](https://github.com/smooth-code/svgr/issues/issuecomment-375467614)
* handle filename with numbers ([a2387ea](https://github.com/smooth-code/svgr/commit/a2387ea)), closes [#62](https://github.com/smooth-code/svgr/issues/62) [#64](https://github.com/smooth-code/svgr/issues/64)



<a name="1.9.0"></a>
# [1.9.0](https://github.com/smooth-code/svgr/compare/v1.8.1...v1.9.0) (2018-03-08)


### Features

* add option to removeDimensions ([#58](https://github.com/smooth-code/svgr/issues/58)) ([7357e7c](https://github.com/smooth-code/svgr/commit/7357e7c))



<a name="1.8.1"></a>
## [1.8.1](https://github.com/smooth-code/svgr/compare/v1.8.0...v1.8.1) (2018-01-31)


### Bug Fixes

* **loader:** add missing babel-plugin ([#50](https://github.com/smooth-code/svgr/issues/50)) ([c49b627](https://github.com/smooth-code/svgr/commit/c49b627))



<a name="1.8.0"></a>
# [1.8.0](https://github.com/smooth-code/svgr/compare/v1.7.0...v1.8.0) (2018-01-31)


### Bug Fixes

* fix tabWidth option ([#49](https://github.com/smooth-code/svgr/issues/49)) ([a863280](https://github.com/smooth-code/svgr/commit/a863280)), closes [#33](https://github.com/smooth-code/svgr/issues/33)


### Features

* support custom file extension ([#47](https://github.com/smooth-code/svgr/issues/47)) ([56a111f](https://github.com/smooth-code/svgr/commit/56a111f)), closes [#31](https://github.com/smooth-code/svgr/issues/31)
* **webpack:** include Babel transformation ([#48](https://github.com/smooth-code/svgr/issues/48)) ([dfecd39](https://github.com/smooth-code/svgr/commit/dfecd39)), closes [#45](https://github.com/smooth-code/svgr/issues/45)



<a name="1.7.0"></a>
# [1.7.0](https://github.com/smooth-code/svgr/compare/v1.6.0...v1.7.0) (2018-01-23)


### Features

* **emSize:** add support for missing width/height ([2eacfd8](https://github.com/smooth-code/svgr/commit/2eacfd8))
* add option keepUselessDefs ([3d03510](https://github.com/smooth-code/svgr/commit/3d03510)), closes [#36](https://github.com/smooth-code/svgr/issues/36)


### Performance Improvements

* refactor emSize to reduce iterations ([3c9d8b4](https://github.com/smooth-code/svgr/commit/3c9d8b4))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/smooth-code/svgr/compare/v1.5.0...v1.6.0) (2018-01-08)


### Features

* support url-loader & file-loader ([b95ed07](https://github.com/smooth-code/svgr/commit/b95ed07))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/smooth-code/svgr/compare/v1.4.0...v1.5.0) (2017-12-12)


### Features

* add ref option ([#29](https://github.com/smooth-code/svgr/issues/29)) ([86e0bda](https://github.com/smooth-code/svgr/commit/86e0bda))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/smooth-code/svgr/compare/v1.3.0...v1.4.0) (2017-12-07)


### Features

* add "-native" option to target React Native ([76fd6f5](https://github.com/smooth-code/svgr/commit/76fd6f5))
* **native:** import only relevant components ([fcd4229](https://github.com/smooth-code/svgr/commit/fcd4229))
* **native:** log unsupported components ([888d968](https://github.com/smooth-code/svgr/commit/888d968))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/smooth-code/svgr/compare/v1.1.0...v1.3.0) (2017-12-05)


### Features

* add option to keeps IDs from SVG ([bfd4066](https://github.com/smooth-code/svgr/commit/bfd4066))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/smooth-code/svgr/compare/v1.1.0...v1.2.0) (2017-12-04)


### Features

* simplify webpack usage ([7ac643e](https://github.com/smooth-code/svgr/commit/7ac643e))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/smooth-code/svgr/compare/v1.0.0...v1.1.0) (2017-11-24)


### Features

* add viewBox option that default to true ([ba2be3a](https://github.com/smooth-code/svgr/commit/ba2be3a))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/smooth-code/svgr/compare/v0.5.0...v1.0.0) (2017-11-07)


### Features

* upgrade svgo & prettier ([fd66885](https://github.com/smooth-code/svgr/commit/fd66885))


### BREAKING CHANGES

* SVGO now removes viewBox automatically.
