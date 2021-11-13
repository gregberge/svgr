import { cosmiconfig, cosmiconfigSync } from 'cosmiconfig'
import type { Options as PrettierOptions } from 'prettier'
import type { OptimizeOptions as SvgoOptions } from 'svgo'
import type { Options as TransformOptions } from '@svgr/babel-preset'
import type { TransformOptions as BabelTransformOptions } from '@babel/core'
import type { ConfigPlugin } from './plugins'
import type { State } from './state'

export interface Config {
  ref?: boolean
  titleProp?: boolean
  expandProps?: boolean | 'start' | 'end'
  dimensions?: boolean
  icon?: boolean | string | number
  native?: boolean
  svgProps?: {
    [key: string]: string
  }
  replaceAttrValues?: {
    [key: string]: string
  }
  runtimeConfig?: boolean
  typescript?: boolean
  prettier?: boolean
  prettierConfig?: PrettierOptions
  svgo?: boolean
  svgoConfig?: SvgoOptions
  configFile?: string
  template?: TransformOptions['template']
  memo?: boolean
  exportType?: 'named' | 'default'
  namedExport?: string
  jsxRuntime?: 'classic' | 'classic-preact' | 'automatic'

  // CLI only
  index?: boolean
  plugins?: ConfigPlugin[]

  // JSX
  jsx?: {
    babelConfig?: BabelTransformOptions
  }
}

export const DEFAULT_CONFIG: Config = {
  dimensions: true,
  expandProps: 'end',
  icon: false,
  native: false,
  typescript: false,
  prettier: true,
  prettierConfig: undefined,
  memo: false,
  ref: false,
  replaceAttrValues: undefined,
  svgProps: undefined,
  svgo: true,
  svgoConfig: undefined,
  template: undefined,
  index: false,
  titleProp: false,
  runtimeConfig: true,
  namedExport: 'ReactComponent',
  exportType: 'default',
}

const explorer = cosmiconfig('svgr')
const explorerSync = cosmiconfigSync('svgr')

export const resolveConfig = async (
  searchFrom?: string,
  configFile?: string,
): Promise<Config | null> => {
  if (configFile == null) {
    const result = await explorer.search(searchFrom)
    return result ? result.config : null
  }
  const result = await explorer.load(configFile)
  return result ? result.config : null
}

resolveConfig.sync = (
  searchFrom?: string,
  configFile?: string,
): Config | null => {
  if (configFile == null) {
    const result = explorerSync.search(searchFrom)
    return result ? result.config : null
  }
  const result = explorerSync.load(configFile)
  return result ? result.config : null
}

export const resolveConfigFile = async (
  filePath: string,
): Promise<string | null> => {
  const result = await explorer.search(filePath)
  return result ? result.filepath : null
}

resolveConfigFile.sync = (filePath: string): string | null => {
  const result = explorerSync.search(filePath)
  return result ? result.filepath : null
}

export const loadConfig = async (
  { configFile, ...baseConfig }: Config,
  state: Pick<State, 'filePath'> = {},
): Promise<Config> => {
  const rcConfig =
    state.filePath && baseConfig.runtimeConfig !== false
      ? await resolveConfig(state.filePath, configFile)
      : {}
  return { ...DEFAULT_CONFIG, ...rcConfig, ...baseConfig }
}

loadConfig.sync = (
  { configFile, ...baseConfig }: Config,
  state: Pick<State, 'filePath'> = {},
): Config => {
  const rcConfig =
    state.filePath && baseConfig.runtimeConfig !== false
      ? resolveConfig.sync(state.filePath, configFile)
      : {}
  return { ...DEFAULT_CONFIG, ...rcConfig, ...baseConfig }
}
