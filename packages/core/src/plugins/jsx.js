import unified from 'unified'
import parse from 'rehype-parse'
import vfile from 'vfile'
import hastToBabelAst from 'hast-util-to-babel-ast'
import { transformFromAstSync, createConfigItem } from '@babel/core'
import removeJSXAttribute from '../babelPlugins/removeJSXAttribute'
import removeJSXEmptyExpression from '../babelPlugins/removeJSXEmptyExpression'

export default (code, config, state = {}) => {
  const filePath = state.filePath || 'unknown'
  const hastTree = unified()
    .use(parse, {
      fragment: true,
      space: 'svg',
      emitParseErrors: true,
      duplicateAttribute: false,
    })
    .parse(vfile({ path: filePath, contents: code }))

  const babelTree = hastToBabelAst(hastTree)

  const { code: transformedCode } = transformFromAstSync(babelTree, code, {
    plugins: [
      createConfigItem([
        removeJSXAttribute,
        { attribute: 'xmlns' },
        'removeXmlns',
      ]),
      createConfigItem(removeJSXEmptyExpression),
    ],
    filename: filePath,
    babelrc: false,
    configFile: false,
  })

  return transformedCode
}
