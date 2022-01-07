import { optimize } from 'svgo'
import { getSvgoConfig } from './config'
import type { Plugin } from '@svgr/core'

const svgoPlugin: Plugin = (code, config, state) => {
  if (!config.svgo) return code
  const svgoConfig = getSvgoConfig(config, state)
  const result = optimize(code, { ...svgoConfig, path: state.filePath })

  if (result.modernError) {
    throw result.modernError
  }

  return result.data
}

export default svgoPlugin
