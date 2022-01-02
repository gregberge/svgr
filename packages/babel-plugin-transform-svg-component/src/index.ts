/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ConfigAPI,
  NodePath,
  types as t,
  template as babelTemplate,
  ParserOptions,
} from '@babel/core'
import type { Options } from './types'
import { defaultTemplate } from './defaultTemplate'
import { getVariables } from './variables'

export type { Options, Template } from './types'

const plugin = (_: ConfigAPI, opts: Options) => {
  const template = opts.template || defaultTemplate
  const plugins: ParserOptions['plugins'] = opts.typescript
    ? ['jsx', 'typescript']
    : ['jsx']
  const tpl = babelTemplate.smart({ plugins, preserveComments: true }).ast
  return {
    visitor: {
      Program(path: NodePath<t.Program>) {
        const jsx = (path.node.body[0] as t.ExpressionStatement)
          .expression as t.JSXElement
        const variables = getVariables({
          opts,
          jsx,
        })
        const body = template(variables, { options: opts, tpl })
        path.node.body = Array.isArray(body) ? body : [body]
        path.replaceWith(path.node)
      },
    },
  }
}

export default plugin
