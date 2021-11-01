import { parse } from 'svg-parser'
import hastToBabelAst from '@svgr/hast-util-to-babel-ast'
import { transformFromAstSync, createConfigItem } from '@babel/core'
import svgrBabelPreset, {
  Options as SvgrPresetOptions,
} from '@svgr/babel-preset'
import type { Plugin, Config } from '@svgr/core'

const getJsxRuntimeOptions = (config: Config): Partial<SvgrPresetOptions> => {
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

const jsxPlugin: Plugin = (code, config, state) => {
  const filePath = state.filePath || 'unknown'
  const hastTree = parse(code)

  const babelTree = hastToBabelAst(hastTree)

  const svgPresetOptions: SvgrPresetOptions = {
    ref: config.ref,
    titleProp: config.titleProp,
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
    ...(config.jsx && config.jsx.babelConfig),
  })

  if (!result?.code) {
    throw new Error(`Unable to generate SVG file`)
  }

  return result.code
}

export default jsxPlugin
