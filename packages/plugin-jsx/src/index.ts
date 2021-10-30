import { parse } from 'svg-parser'
import hastToBabelAst from '@svgr/hast-util-to-babel-ast'
import { transformFromAstSync, createConfigItem } from '@babel/core'
import svgrBabelPreset from '@svgr/babel-preset'
import type { Plugin } from '@svgr/core'

const jsxPlugin: Plugin = (code, config, state) => {
  const filePath = state.filePath || 'unknown'
  const hastTree = parse(code)

  const babelTree = hastToBabelAst(hastTree)

  const result = transformFromAstSync(babelTree, code, {
    caller: {
      name: 'svgr',
    },
    presets: [
      createConfigItem([svgrBabelPreset, { ...config, state }], {
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
