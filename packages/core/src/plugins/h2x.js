import { transform } from 'h2x-core'
import jsx from 'h2x-plugin-jsx'
import {
  emSize,
  expandProps,
  removeComments,
  removeDimensions,
  replaceAttrValues,
  stripAttribute,
  svgProps,
  svgRef,
  titleProp,
  toReactNative,
} from '..'

function configToPlugins(config) {
  const plugins = [jsx, stripAttribute('xmlns'), removeComments()]
  if (config.replaceAttrValues)
    plugins.push(replaceAttrValues(config.replaceAttrValues))
  if (!config.dimensions) plugins.push(removeDimensions())
  if (config.icon) plugins.push(emSize())
  if (config.ref) plugins.push(svgRef())
  if (config.svgProps) plugins.push(svgProps(config.svgProps))
  // TODO remove boolean value in the next major release
  if (config.expandProps)
    plugins.push(
      expandProps(config.expandProps === true ? 'end' : config.expandProps),
    )
  if (config.native) plugins.push(toReactNative())
  if (config.titleProp) plugins.push(titleProp())
  return plugins
}

export default (code, config = {}, state = {}) => {
  const plugins = configToPlugins(config)
  return transform(code, {
    plugins,
    state,
    ...config.h2xConfig,
  })
}
