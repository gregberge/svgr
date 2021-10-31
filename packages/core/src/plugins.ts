// @ts-ignore
import jsx from '@svgr/plugin-jsx'
import { Config } from './config'
import type { State } from './state'

export interface Plugin {
  (code: string, config: Config, state: State): string
}

export type ConfigPlugin = string | Plugin

const DEFAULT_PLUGINS: Plugin[] = [jsx as any]

export const getPlugins = (
  config: Config,
  state: Partial<State>,
): ConfigPlugin[] => {
  if (config.plugins) {
    return config.plugins
  }

  if (state.caller?.defaultPlugins) {
    return state.caller.defaultPlugins
  }

  return DEFAULT_PLUGINS
}

export const resolvePlugin = (plugin: ConfigPlugin): Plugin => {
  if (typeof plugin === 'function') {
    return plugin
  }

  if (typeof plugin === 'string') {
    return loadPlugin(plugin)
  }

  throw new Error(`Invalid plugin "${plugin}"`)
}

const pluginCache: Record<string, Plugin> = {}

const resolveModule = (m: any) => (m ? m.default || m : null)

export const loadPlugin = (moduleName: string): Plugin => {
  if (pluginCache[moduleName]) {
    return pluginCache[moduleName]
  }

  try {
    // eslint-disable-next-line
    const plugin = resolveModule(require(moduleName))
    if (!plugin) {
      throw new Error(`Invalid plugin "${moduleName}"`)
    }
    pluginCache[moduleName] = plugin
    return pluginCache[moduleName]
  } catch (error) {
    console.log(error)
    throw new Error(
      `Module "${moduleName}" missing. Maybe \`npm install ${moduleName}\` could help!`,
    )
  }
}
