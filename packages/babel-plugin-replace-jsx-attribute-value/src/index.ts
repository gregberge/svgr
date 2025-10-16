/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ConfigAPI, types as t, NodePath, template } from '@babel/core'

export interface Value {
  value: string
  newValue: string | boolean | number
  literal?: boolean
}

export interface Options {
  values: Value[]
}

const addJSXAttribute = (api: ConfigAPI, opts: Options) => {
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

        opts.values.forEach(({ value, newValue, literal }) => {
          if (!valuePath.isStringLiteral({ value })) return

          // Handle cases where newValue is a dynamic expression (e.g., props.someValue)
          if (typeof newValue === 'string' && newValue.includes('props.')) {
            const expression = (template.ast(newValue) as t.ExpressionStatement)
              .expression

            // Ensure attribute is only replaced if the new value is defined
            const conditionalExpression = t.conditionalExpression(
              t.logicalExpression(
                '&&',
                t.identifier('props'),
                t.memberExpression(
                  t.identifier('props'),
                  t.identifier(newValue.split('.')[1]), // Extracts the attribute name
                ),
              ),
              expression, // Use the dynamic value if defined
              t.stringLiteral(value), // Retain original attribute value if undefined
            )

            valuePath.replaceWith(
              t.jsxExpressionContainer(conditionalExpression),
            )
          } else {
            const attributeValue = getAttributeValue(newValue, literal)
            if (attributeValue) {
              valuePath.replaceWith(attributeValue)
            }
          }
        })
      },
    },
  }
}

export default addJSXAttribute
