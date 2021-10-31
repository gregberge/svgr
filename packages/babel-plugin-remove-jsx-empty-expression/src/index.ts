/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { types as t, NodePath } from '@babel/core'

const removeJSXEmptyExpression = () => ({
  visitor: {
    JSXExpressionContainer(path: NodePath<t.JSXExpressionContainer>) {
      if (t.isJSXEmptyExpression(path.get('expression'))) {
        path.remove()
      }
    },
  },
})

export default removeJSXEmptyExpression
