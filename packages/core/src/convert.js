import { expandState } from './state'
import { loadConfig } from './config'
import { loadPlugin, resolvePlugins } from './plugins'

function run(code, config, state) {
  const expandedState = expandState(state)
  const plugins = resolvePlugins(config, state).map(loadPlugin)
  let nextCode = String(code).replace('\0', '')
  // eslint-disable-next-line no-restricted-syntax
  for (const plugin of plugins) {
    nextCode = plugin(nextCode, config, expandedState)
  }
  return nextCode
}

async function convert(code, config = {}, state = {}) {
  config = await loadConfig(config, state)
  return run(code, config, state)
}

convert.sync = (code, config = {}, state = {}) => {
  config = loadConfig.sync(config, state)
  return run(code, config, state)
}

export default convert
