const removeJSXEmptyExpression = () => ({
  visitor: {
    JSXExpressionContainer: {
      enter(path) {
        if (path.node.expression.type === 'JSXEmptyExpression') {
          path.remove()
        }
      },
    },
  },
})

export default removeJSXEmptyExpression
