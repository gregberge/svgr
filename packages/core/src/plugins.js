import jsx from '@svgr/plugin-jsx'

const DEFAULT_PLUGINS = [jsx]

export function getPlugins(config, state) {
  if (config.plugins) {
    return config.plugins
  }

  if (state.caller && state.caller.defaultPlugins) {
    return state.caller.defaultPlugins
  }

  return DEFAULT_PLUGINS
}

export function resolvePlugin(plugin) {
  if (typeof plugin === 'function') {
    return plugin
  }

  if (typeof plugin === 'string') {
    return loadPlugin(plugin)
  }

  throw new Error(`Invalid plugin "${plugin}"`)
}

const pluginCache = {}

export function loadPlugin(moduleName) {
  if (pluginCache[moduleName]) {
    return pluginCache[moduleName]
  }

  try {
    // eslint-disable-next-line
    const plugin = require(moduleName)
    if (!plugin.default || !plugin) {
      throw new Error(`Invalid plugin "${moduleName}"`)
    }
    pluginCache[moduleName] = plugin.default || plugin
    return pluginCache[moduleName]
  } catch (error) {
    throw new Error(
      `Module "${moduleName}" missing. Maybe \`npm install ${moduleName}\` could help!`,
    )
  }
}
