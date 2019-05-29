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

      function createTitle(children = []) {
        return t.jsxElement(
          t.jsxOpeningElement(t.jsxIdentifier('title'), []),
          t.jsxClosingElement(t.jsxIdentifier('title')),
          children,
        )
      }
      function getTitleElement(existingTitleChildren = []) {
        const titleExpression = t.identifier('title')
        let titleElement = createTitle([
          t.jsxExpressionContainer(titleExpression),
        ])
        if (existingTitleChildren && existingTitleChildren.length) {
          // if title already exists
          // render as follows
          const fallbackTitleElement = createTitle(existingTitleChildren)
          // {title === undefined ? fallbackTitleElement : titleElement}
          const conditionalExpressionForTitle = t.conditionalExpression(
            t.binaryExpression(
              '===',
              titleExpression,
              t.identifier('undefined'),
            ),
            fallbackTitleElement,
            titleElement,
          )
          titleElement = t.jsxExpressionContainer(conditionalExpressionForTitle)
        }
        return titleElement
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
