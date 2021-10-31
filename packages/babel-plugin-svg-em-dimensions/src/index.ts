/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { types as t, NodePath } from '@babel/core'

const elements = ['svg', 'Svg']
const value = t.stringLiteral('1em')

const plugin = () => ({
  visitor: {
    JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
      if (
        !elements.some((element) =>
          path.get('name').isJSXIdentifier({ name: element }),
        )
      )
        return

      const requiredAttributes = ['width', 'height']

      path.get('attributes').forEach((attributePath) => {
        if (!attributePath.isJSXAttribute()) return
        const namePath = attributePath.get('name')
        if (!namePath.isJSXIdentifier()) return
        const index = requiredAttributes.indexOf(namePath.node.name)

        if (index === -1) return

        const valuePath = attributePath.get('value')
        valuePath.replaceWith(value)
        requiredAttributes.splice(index, 1)
      })

      path.pushContainer(
        'attributes',
        requiredAttributes.map((attr) =>
          t.jsxAttribute(t.jsxIdentifier(attr), value),
        ),
      )
    },
  },
})

export default plugin
