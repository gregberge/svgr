import { parse } from 'svg-parser'
import hastToBabelAst from '@svgr/hast-util-to-babel-ast'
import { transformFromAstSync, createConfigItem } from '@babel/core'
import svgrBabelPreset from '@svgr/babel-preset'

export default function jsxPlugin(code, config, state) {
  const filePath = state.filePath || 'unknown'
  const hastTree = parse(code)

  const babelTree = hastToBabelAst(hastTree)

  const { code: generatedCode } = transformFromAstSync(babelTree, code, {
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
    inputSourceMap: false,
    ...(config.jsx && config.jsx.babelConfig),
  })

  return generatedCode
}
