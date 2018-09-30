import svgo from './plugins/svgo'
import h2x from './plugins/h2x'
import prettier from './plugins/prettier'
import transform from './plugins/transform'
import { expandState } from './util'
import { loadConfig } from './config'

async function convert(code, baseConfig = {}, baseState = {}) {
  const state = expandState(baseState)
  const config = await loadConfig(baseConfig, baseState)
  let result = code
  // Remove null-byte character (copy/paste from Illustrator)
  result = String(result).replace('\0', '')
  result = await svgo(result, config, state)
  result = await h2x(result, config, state)
  result = await transform(result, config, state)
  result = await prettier(result, config, state)
  return result
}

export default convert
