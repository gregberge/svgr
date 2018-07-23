/* eslint-disable-next-line import/no-cycle */
export { default } from './convert'
export * from './config'
export * from './util'

// H2X plugins
export { default as emSize } from './h2x/emSize'
export { default as expandProps } from './h2x/expandProps'
export { default as removeComments } from './h2x/removeComments'
export { default as removeDimensions } from './h2x/removeDimensions'
export { default as removeStyle } from './h2x/removeStyle'
export { default as replaceAttrValues } from './h2x/replaceAttrValues'
export { default as stripAttribute } from './h2x/stripAttribute'
export { default as svgAttributes } from './h2x/svgAttributes'
export { default as svgRef } from './h2x/svgRef'
export { default as titleProp } from './h2x/titleProp'
export { default as toReactNative } from './h2x/toReactNative'

// Templates
export { default as reactDomTemplate } from './templates/reactDomTemplate'
export { default as reactNativeTemplate } from './templates/reactNativeTemplate'
export { default as reactTypescriptTemplate } from './templates/reactTypescriptTemplate'
