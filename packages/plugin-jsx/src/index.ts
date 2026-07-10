import { parse } from 'svg-parser'
import hastToBabelAst from '@svgr/hast-util-to-babel-ast'
import { transformFromAstSync, createConfigItem } from '@babel/core'
import svgrBabelPreset, {
  Options as SvgrPresetOptions,
} from '@svgr/babel-preset'
import type { Plugin, Config } from '@svgr/core'
import runtimeIdsPlugin from './runtimeIds'

const getJsxRuntimeOptions = (config: Config): Partial<SvgrPresetOptions> => {
  if (config.jsxRuntimeImport) {
    return {
      importSource: config.jsxRuntimeImport.source,
      jsxRuntimeImport: config.jsxRuntimeImport,
    }
  }
  switch (config.jsxRuntime) {
    case null:
    case undefined:
    case 'classic':
      return {
        jsxRuntime: 'classic',
        importSource: 'react',
        jsxRuntimeImport: { namespace: 'React', source: 'react' },
      }
    case 'classic-preact':
      return {
        jsxRuntime: 'classic',
        importSource: 'preact/compat',
        jsxRuntimeImport: { specifiers: ['h'], source: 'preact' },
      }
    case 'automatic':
      return { jsxRuntime: 'automatic' }
    default:
      throw new Error(`Unsupported "jsxRuntime" "${config.jsxRuntime}"`)
  }
}

const getRuntimeIdsOptions = (config: Config) => {
  if (!config.runtimeIds) return null

  const importSource =
    typeof config.runtimeIds === 'object'
      ? config.runtimeIds.importSource
      : undefined

  return {
    importSource:
      importSource ??
      (config.jsxRuntime === 'classic-preact' ? 'preact/hooks' : 'react'),
    typescript: config.typescript,
  }
}

const jsxPlugin: Plugin = (code, config, state) => {
  const filePath = state.filePath || 'unknown'
  const hastTree = parse(code)

  const babelTree = hastToBabelAst(hastTree)
  const babelConfig = config.jsx?.babelConfig ?? {}
  const runtimeIdsOptions = getRuntimeIdsOptions(config)
  const runtimeIdsPlugins = runtimeIdsOptions
    ? [
        [
          runtimeIdsPlugin,
          { ...runtimeIdsOptions, componentName: state.componentName },
        ],
      ]
    : []

  const svgPresetOptions: SvgrPresetOptions = {
    ref: config.ref,
    titleProp: config.titleProp,
    descProp: config.descProp,
    expandProps: config.expandProps,
    dimensions: config.dimensions,
    icon: config.icon,
    native: config.native,
    svgProps: config.svgProps,
    replaceAttrValues: config.replaceAttrValues,
    typescript: config.typescript,
    template: config.template,
    memo: config.memo,
    exportType: config.exportType,
    namedExport: config.namedExport,
    ...getJsxRuntimeOptions(config),
    state,
  }

  const result = transformFromAstSync(babelTree, code, {
    caller: {
      name: 'svgr',
    },
    presets: [
      createConfigItem([svgrBabelPreset, svgPresetOptions], {
        type: 'preset',
      }),
    ],
    filename: filePath,
    babelrc: false,
    configFile: false,
    code: true,
    ast: false,
    // @ts-ignore
    inputSourceMap: false,
    ...babelConfig,
    plugins: [...runtimeIdsPlugins, ...(babelConfig.plugins ?? [])],
  })

  if (!result?.code) {
    throw new Error(`Unable to generate SVG file`)
  }

  return result.code
}

export default jsxPlugin
