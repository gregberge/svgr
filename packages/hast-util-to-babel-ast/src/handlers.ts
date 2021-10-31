import * as t from '@babel/types'
import { decodeXML } from 'entities'
import { all } from './all'
import { getAttributes } from './getAttributes'
import { ELEMENT_TAG_NAME_MAPPING } from './mappings'
import type { RootNode, ElementNode, TextNode } from 'svg-parser'
import type { Helpers } from './helpers'

export const root = (h: Helpers, node: RootNode): t.Program =>
  // @ts-ignore
  t.program(all(h, node))

export const comment = (
  _: Helpers,
  node: ElementNode,
  parent: RootNode | ElementNode,
): t.JSXExpressionContainer | null => {
  if (parent.type === 'root' || !node.value) return null

  const expression = t.jsxEmptyExpression()
  t.addComment(expression, 'inner', node.value)
  return t.jsxExpressionContainer(expression)
}

const SPACE_REGEX = /^\s+$/

export const text = (
  h: Helpers,
  node: TextNode,
  parent: RootNode | ElementNode,
): t.JSXExpressionContainer | null => {
  if (parent.type === 'root') return null
  if (typeof node.value === 'string' && SPACE_REGEX.test(node.value))
    return null

  return t.jsxExpressionContainer(
    t.stringLiteral(decodeXML(String(node.value))),
  )
}

export const element = (
  h: Helpers,
  node: ElementNode,
  parent: RootNode | ElementNode,
): t.JSXElement | t.ExpressionStatement | null => {
  if (!node.tagName) return null

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
