import * as t from '@babel/types'
import all from './all'
import getAttributes from './getAttributes'
import { ELEMENT_TAG_NAME_MAPPING } from './mappings'

export const root = (h, node) => {
  return t.program(all(h, node))
}

export const comment = (h, node, parent) => {
  if (parent.type === 'root') {
    return null
  }

  const expression = t.jsxEmptyExpression()
  t.addComment(expression, 'inner', node.value)
  // Waiting for types to be fixed
  // t.jsxExpressionContainer(expression)
  return { type: 'JSXExpressionContainer', expression }
}

export const text = (h, node, parent) => {
  if (parent.type === 'root') {
    return null
  }

  return t.jsxText(node.value)
}

export const element = (h, node, parent) => {
  const children = all(h, node)
  const selfClosing = children.length === 0

  const name = ELEMENT_TAG_NAME_MAPPING[node.tagName] || node.tagName

  const openingElement = t.jsxOpeningElement(
    t.jsxIdentifier(name),
    getAttributes(node),
    selfClosing,
  )

  const closingElement = !selfClosing
    ? t.jsxClosingElement(t.jsxIdentifier(name))
    : null

  const jsxElement = t.jsxElement(openingElement, closingElement, children)

  if (parent.type === 'root') {
    return t.expressionStatement(jsxElement)
  }

  return jsxElement
}
