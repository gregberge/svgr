/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NodePath, types as t } from '@babel/core'

const elements = ['svg', 'Svg']

const createTitleElement = (
  children: t.JSXExpressionContainer[] = [],
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[] = [],
) => {
  const title = t.jsxIdentifier('title')
  return t.jsxElement(
    t.jsxOpeningElement(title, attributes),
    t.jsxClosingElement(title),
    children,
  )
}

const createTitleIdAttribute = () =>
  t.jsxAttribute(
    t.jsxIdentifier('id'),
    t.jsxExpressionContainer(t.identifier('titleId')),
  )

const addTitleIdAttribute = (
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[],
) => {
  const existingId = attributes.find(
    (attribute) => t.isJSXAttribute(attribute) && attribute.name.name === 'id',
  ) as t.JSXAttribute | undefined

  if (!existingId) {
    return [...attributes, createTitleIdAttribute()]
  }
  existingId.value = t.jsxExpressionContainer(
    t.isStringLiteral(existingId.value)
      ? t.logicalExpression('||', t.identifier('titleId'), existingId.value)
      : t.identifier('titleId'),
  )
  return attributes
}

const plugin = () => ({
  visitor: {
    JSXElement(path: NodePath<t.JSXElement>) {
      if (!elements.length) return

      const openingElement = path.get('openingElement')
      const openingElementName = openingElement.get('name')
      if (
        !elements.some((element) =>
          openingElementName.isJSXIdentifier({ name: element }),
        )
      ) {
        return
      }

      const getTitleElement = (
        existingTitle?: t.JSXElement,
      ): t.JSXExpressionContainer => {
        const titleExpression = t.identifier('title')
        if (existingTitle) {
          existingTitle.openingElement.attributes = addTitleIdAttribute(
            existingTitle.openingElement.attributes,
          )
        }
        const conditionalTitle = t.conditionalExpression(
          titleExpression,
          createTitleElement(
            [t.jsxExpressionContainer(titleExpression)],
            existingTitle
              ? existingTitle.openingElement.attributes
              : [createTitleIdAttribute()],
          ),
          t.nullLiteral(),
        )
        if (existingTitle?.children?.length) {
          // If title already exists render as follows
          // `{title === undefined ? fallbackTitleElement : titleElement}`
          return t.jsxExpressionContainer(
            t.conditionalExpression(
              t.binaryExpression(
                '===',
                titleExpression,
                t.identifier('undefined'),
              ),
              existingTitle,
              conditionalTitle,
            ),
          )
        }
        return t.jsxExpressionContainer(conditionalTitle)
      }

      // store the title element
      let titleElement: t.JSXExpressionContainer | null = null

      const hasTitle = path.get('children').some((childPath) => {
        if (childPath.node === titleElement) return false
        if (!childPath.isJSXElement()) return false
        const name = childPath.get('openingElement').get('name')
        if (!name.isJSXIdentifier()) return false
        if (name.node.name !== 'title') return false
        titleElement = getTitleElement(childPath.node)
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
