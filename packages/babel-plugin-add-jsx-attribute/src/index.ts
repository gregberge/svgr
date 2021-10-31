/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ConfigAPI, types as t, NodePath, template } from '@babel/core'

export interface Attribute {
  name: string
  value?: boolean | number | string | null
  spread?: boolean
  literal?: boolean
  position?: 'start' | 'end'
}

export interface Options {
  elements: string[]
  attributes: Attribute[]
}

const positionMethod = {
  start: 'unshiftContainer',
  end: 'pushContainer',
} as const

const addJSXAttribute = (_: ConfigAPI, opts: Options) => {
  function getAttributeValue({
    literal,
    value,
  }: {
    literal?: Attribute['literal']
    value: Attribute['value']
  }) {
    if (typeof value === 'boolean') {
      return t.jsxExpressionContainer(t.booleanLiteral(value))
    }

    if (typeof value === 'number') {
      return t.jsxExpressionContainer(t.numericLiteral(value))
    }

    if (typeof value === 'string' && literal) {
      return t.jsxExpressionContainer(
        (template.ast(value) as t.ExpressionStatement).expression,
      )
    }

    if (typeof value === 'string') {
      return t.stringLiteral(value)
    }

    return null
  }

  function getAttribute({ spread, name, value, literal }: Attribute) {
    if (spread) {
      return t.jsxSpreadAttribute(t.identifier(name))
    }

    return t.jsxAttribute(
      t.jsxIdentifier(name),
      getAttributeValue({ value, literal }),
    )
  }

  return {
    visitor: {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        if (!t.isJSXIdentifier(path.node.name)) return
        if (!opts.elements.includes(path.node.name.name)) return

        opts.attributes.forEach(
          ({
            name,
            value = null,
            spread = false,
            literal = false,
            position = 'end',
          }) => {
            const method = positionMethod[position]
            const newAttribute = getAttribute({ spread, name, value, literal })
            const attributes = path.get('attributes')

            const isEqualAttribute = (
              attribute: NodePath<t.JSXSpreadAttribute | t.JSXAttribute>,
            ) => {
              if (spread)
                return (
                  attribute.isJSXSpreadAttribute() &&
                  attribute.get('argument').isIdentifier({ name })
                )
              return (
                attribute.isJSXAttribute() &&
                attribute.get('name').isJSXIdentifier({ name })
              )
            }

            const replaced = attributes.some((attribute) => {
              if (!isEqualAttribute(attribute)) return false
              attribute.replaceWith(newAttribute)
              return true
            })

            if (!replaced) {
              path[method]('attributes', newAttribute)
            }
          },
        )
      },
    },
  }
}

export default addJSXAttribute
