import { optimize } from 'svgo'
import { getSvgoConfig } from './config'
import type { Plugin } from '@svgr/core'

const svgoPlugin: Plugin = (code, config, state) => {
  if (!config.svgo) return code
  const svgoConfig = getSvgoConfig(config, state)
  const { data } = optimize(code, { ...svgoConfig, path: state.filePath })
  return data
}

export default svgoPlugin
