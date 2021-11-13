/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { types as t, NodePath, ConfigAPI } from '@babel/core'

const elements = ['svg', 'Svg']

export interface Options {
  width: number | string
  height: number | string
}

const getValue = (raw: undefined | number | string) => {
  if (raw === undefined) return t.stringLiteral('1em')
  switch (typeof raw) {
    case 'number':
      return t.jsxExpressionContainer(t.numericLiteral(raw))
    case 'string':
      return t.stringLiteral(raw)
    default:
      return t.stringLiteral('1em')
  }
}

const plugin = (_: ConfigAPI, opts: Options) => ({
  visitor: {
    JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
      if (
        !elements.some((element) =>
          path.get('name').isJSXIdentifier({ name: element }),
        )
      )
        return

      const values = {
        width: getValue(opts.width),
        height: getValue(opts.height),
      }
      const requiredAttributes = Object.keys(values)

      path.get('attributes').forEach((attributePath) => {
        if (!attributePath.isJSXAttribute()) return
        const namePath = attributePath.get('name')
        if (!namePath.isJSXIdentifier()) return
        const index = requiredAttributes.indexOf(namePath.node.name)

        if (index === -1) return

        const valuePath = attributePath.get('value')
        valuePath.replaceWith(values[namePath.node.name as 'width' | 'height'])
        requiredAttributes.splice(index, 1)
      })

      path.pushContainer(
        'attributes',
        requiredAttributes.map((attr) =>
          t.jsxAttribute(
            t.jsxIdentifier(attr),
            values[attr as 'width' | 'height'],
          ),
        ),
      )
    },
  },
})

export default plugin
