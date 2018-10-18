const DEFAULT_PLUGINS = ['@svgr/plugin-jsx']

export function resolvePlugins(config, state) {
  if (config.plugins) {
    return config.plugins
  }
  if (state.caller && state.caller.defaultPlugins) {
    return state.caller.defaultPlugins
  }

  return DEFAULT_PLUGINS
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
    pluginCache[moduleName].async = plugin.async
    return pluginCache[moduleName]
  } catch (error) {
    throw new Error(
      `Module "${moduleName}" missing. Maybe \`npm install ${moduleName}\` could help!`,
    )
  }
}
