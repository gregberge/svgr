/* eslint-disable no-underscore-dangle */
import { optimize } from 'svgo'
import { getSvgoConfig } from './config'

export default function svgoPlugin(code, config, state) {
  if (!config.svgo) return code
  const svgoConfig = getSvgoConfig(config, state)
  const { data } = optimize(code, { ...svgoConfig, path: state.filePath })
  return data
}
