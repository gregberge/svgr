import svgo from './plugins/svgo'
import jsx from './plugins/jsx'
import prettier from './plugins/prettier'
import transform from './plugins/transform'
import { expandState } from './util'
import { loadConfig } from './config'

function applyPlugins(code, config, state) {
  state = expandState(state)
  let result = code
  // Remove null-byte character (copy/paste from Illustrator)
  result = String(result).replace('\0', '')
  result = svgo(result, config, state)
  result = jsx(result, config, state)
  result = transform(result, config, state)
  result = prettier(result, config, state)
  return result
}

async function convert(code, config = {}, state = {}) {
  config = await loadConfig(config, state)
  return applyPlugins(code, config, state)
}

convert.sync = (code, config = {}, state = {}) => {
  config = loadConfig.sync(config, state)
  return applyPlugins(code, config, state)
}

export default convert
