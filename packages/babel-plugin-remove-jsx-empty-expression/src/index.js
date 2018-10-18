const removeJSXEmptyExpression = () => ({
  visitor: {
    JSXExpressionContainer(path) {
      if (!path.get('expression').isJSXEmptyExpression()) return
      path.remove()
    },
  },
})

export default removeJSXEmptyExpression
