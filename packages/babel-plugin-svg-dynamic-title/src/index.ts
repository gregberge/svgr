/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NodePath, types as t } from '@babel/core'

const elements = ['svg', 'Svg']

export interface Options {
  tag: 'title' | 'desc'
}

interface State {
  opts: Options
}

const createTagElement = (
  tag: Options['tag'],
  children: t.JSXExpressionContainer[] = [],
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[] = [],
) => {
  const eleName = t.jsxIdentifier(tag)
  return t.jsxElement(
    t.jsxOpeningElement(eleName, attributes),
    t.jsxClosingElement(eleName),
    children,
  )
}

const createTagIdAttribute = (tag: Options['tag']) =>
  t.jsxAttribute(
    t.jsxIdentifier('id'),
    t.jsxExpressionContainer(t.identifier(`${tag}Id`)),
  )

const addTagIdAttribute = (
  tag: Options['tag'],
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[],
) => {
  const existingId = attributes.find(
    (attribute) => t.isJSXAttribute(attribute) && attribute.name.name === 'id',
  ) as t.JSXAttribute | undefined

  if (!existingId) {
    return [...attributes, createTagIdAttribute(tag)]
  }
  existingId.value = t.jsxExpressionContainer(
    t.isStringLiteral(existingId.value)
      ? t.logicalExpression('||', t.identifier(`${tag}Id`), existingId.value)
      : t.identifier(`${tag}Id`),
  )
  return attributes
}

const plugin = () => ({
  visitor: {
    JSXElement(path: NodePath<t.JSXElement>, state: State) {
      const tag = state.opts.tag
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

      const getTagElement = (
        existingTitle?: t.JSXElement,
      ): t.JSXExpressionContainer => {
        const tagExpression = t.identifier(tag)
        if (existingTitle) {
          existingTitle.openingElement.attributes = addTagIdAttribute(
            tag,
            existingTitle.openingElement.attributes,
          )
        }
        const conditionalTitle = t.conditionalExpression(
          tagExpression,
          createTagElement(
            tag,
            [t.jsxExpressionContainer(tagExpression)],
            existingTitle
              ? existingTitle.openingElement.attributes
              : [createTagIdAttribute(tag)],
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
                tagExpression,
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
      let tagElement: t.JSXExpressionContainer | null = null

      const hasTitle = path.get('children').some((childPath) => {
        if (childPath.node === tagElement) return false
        if (!childPath.isJSXElement()) return false
        const name = childPath.get('openingElement').get('name')
        if (!name.isJSXIdentifier()) return false
        if (name.node.name !== tag) return false
        tagElement = getTagElement(childPath.node)
        childPath.replaceWith(tagElement)
        return true
      })

      // create a title element if not already create
      tagElement = tagElement || getTagElement()
      if (!hasTitle) {
        // path.unshiftContainer is not working well :(
        // path.unshiftContainer('children', titleElement)
        path.node.children.unshift(tagElement)
        path.replaceWith(path.node)
      }
    },
  },
})

export default plugin
