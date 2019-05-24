const elements = ['svg', 'Svg']

const plugin = ({ types: t }) => ({
  visitor: {
    JSXElement(path) {
      if (
        !elements.some(element =>
          path.get('openingElement.name').isJSXIdentifier({ name: element }),
        )
      ) {
        return
      }

      function getTitleElement(existingTitleChildren = []) {
        // create the expression for the title rendering
        let expression = t.identifier('title')
        // get the existing title string value
        const existingTitle = (existingTitleChildren || [])
          .map(c => c.value)
          .join()
        if (existingTitle) {
          // if title exists
          // render as follows
          // {typeof title === "undefined" ? existingTitle : title}
          expression = t.conditionalExpression(
            // title === null
            t.binaryExpression(
              '===',
              t.unaryExpression('typeof', expression),
              t.stringLiteral('undefined'),
            ),
            t.stringLiteral(existingTitle),
            expression,
          )
        }

        // create a title element with the given expression
        return t.jsxElement(
          t.jsxOpeningElement(t.jsxIdentifier('title'), []),
          t.jsxClosingElement(t.jsxIdentifier('title')),
          [t.jsxExpressionContainer(expression)],
        )
      }

      // store the title element
      let titleElement

      const hasTitle = path.get('children').some(childPath => {
        if (!childPath.isJSXElement()) return false
        if (childPath.node === titleElement) return false
        if (childPath.node.openingElement.name.name !== 'title') return false
        titleElement = getTitleElement(childPath.node.children)
        childPath.replaceWith(titleElement)
        return true
      })

      // create a title element if not already create
      titleElement = titleElement || getTitleElement()
      if (!hasTitle) {
        // path.unshiftContainer is not working well :(
        // path.unshiftContainer('children', titleElement)
        path.node.children.unshift(titleElement)
        path.replaceWith(path.node)
      }
    },
  },
})

export default plugin
