import { expandState } from './state'
import { loadConfig } from './config'
import { resolvePlugin, getPlugins } from './plugins'
import type { Config } from './config'
import type { State } from './state'

const run = (code: string, config: Config, state: Partial<State>): string => {
  const expandedState = expandState(state)
  const plugins = getPlugins(config, state).map(resolvePlugin)
  let nextCode = String(code).replace('\0', '')
  // eslint-disable-next-line no-restricted-syntax
  for (const plugin of plugins) {
    nextCode = plugin(nextCode, config, expandedState)
  }
  return nextCode
}

export const transform = async (
  code: string,
  config: Config = {},
  state: Partial<State> = {},
): Promise<string> => {
  config = await loadConfig(config, state)
  return run(code, config, state)
}

transform.sync = (
  code: string,
  config: Config = {},
  state: Partial<State> = {},
): string => {
  config = loadConfig.sync(config, state)
  return run(code, config, state)
}
