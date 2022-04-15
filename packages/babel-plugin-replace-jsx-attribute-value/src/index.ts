/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ConfigAPI, types as t, NodePath, template } from '@babel/core'

export interface Value {
  value: string
  newValue: string | boolean | number
  literal?: boolean
  regExp?: RegExp
}

export interface Options {
  values: Value[]
}

const replaceJSXAttribute = (api: ConfigAPI, opts: Options) => {
  const getAttributeValue = (
    value: string | boolean | number,
    literal?: boolean,
  ) => {
    if (typeof value === 'string' && literal) {
      return t.jsxExpressionContainer(
        (template.ast(value) as t.ExpressionStatement).expression,
      )
    }

    if (typeof value === 'string') {
      return t.stringLiteral(value)
    }

    if (typeof value === 'boolean') {
      return t.jsxExpressionContainer(t.booleanLiteral(value))
    }

    if (typeof value === 'number') {
      return t.jsxExpressionContainer(t.numericLiteral(value))
    }

    return null
  }

  return {
    visitor: {
      JSXAttribute(path: NodePath<t.JSXAttribute>) {
        const valuePath = path.get('value')
        if (!valuePath.isStringLiteral()) return

        opts.values.forEach(({ value, newValue, literal, regExp }) => {
          if (regExp) {
            if (!valuePath.node.value.match(regExp)) return
          } else {
            if (!valuePath.isStringLiteral({ value })) return
          }

          const attributeValue = getAttributeValue(newValue, literal)
          if (attributeValue) {
            valuePath.replaceWith(attributeValue)
          }
        })
      },
    },
  }
}

export default replaceJSXAttribute
