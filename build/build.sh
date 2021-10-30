#!/bin/bash
set -e

npm run build --workspace @svgr/babel-plugin-add-jsx-attribute
npm run build --workspace @svgr/babel-plugin-remove-jsx-attribute
npm run build --workspace @svgr/babel-plugin-remove-jsx-empty-expression
npm run build --workspace @svgr/babel-plugin-replace-jsx-attribute-value
npm run build --workspace @svgr/babel-plugin-svg-dynamic-title
npm run build --workspace @svgr/babel-plugin-svg-em-dimensions
npm run build --workspace @svgr/babel-plugin-transform-react-native-svg
npm run build --workspace @svgr/babel-plugin-transform-svg-component
npm run build --workspace @svgr/babel-preset
npm run build --workspace @svgr/core
npm run build --workspace @svgr/hast-util-to-babel-ast
npm run build --workspace @svgr/plugin-jsx
npm run build --workspace @svgr/plugin-prettier
npm run build --workspace @svgr/plugin-svgo
npm run build --workspace @svgr/cli
npm run build --workspace @svgr/rollup
npm run build --workspace @svgr/webpack