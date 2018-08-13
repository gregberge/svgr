import svgo from './plugins/svgo'
import h2x from './plugins/h2x'
import prettier from './plugins/prettier'
import transform from './plugins/transform'
import { expandState } from './util'
import { DEFAULT_CONFIG } from './config'

async function convert(code, config = {}, state = {}) {
  config = { ...DEFAULT_CONFIG, ...config }
  state = expandState(state)
  let result = code
  if (typeof result === 'string') {
    // Remove null-byte character (copy/paste from Illustrator)
    result = result.split('\0').join('')
  }
  result = await svgo(result, config, state)
  result = await h2x(result, config, state)
  result = await transform(result, config, state)
  result = await prettier(result, config, state)
  return result
}

export default convert
