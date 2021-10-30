/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ConfigAPI, types as t, NodePath } from '@babel/core'

export interface Options {
  elements: string[]
  attributes: string[]
}

const removeJSXAttribute = (_: ConfigAPI, opts: Options) => ({
  visitor: {
    JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
      if (!t.isJSXIdentifier(path.node.name)) return
      if (!opts.elements.includes(path.node.name.name)) return

      // @ts-ignore
      path.get('attributes').forEach((attribute) => {
        if (
          t.isJSXAttribute(attribute.node) &&
          t.isJSXIdentifier(attribute.node.name) &&
          opts.attributes.includes(attribute.node.name.name)
        ) {
          attribute.remove()
        }
      })
    },
  },
})

export default removeJSXAttribute
