import * as t from '@babel/types'
import getProps from './getProps'
import { ELEMENT_TAG_NAME_MAPPING } from './mappings'

/* Transform the children of `parent`. */
function all(parent) {
  const nodes = parent.children || []
  const { length } = nodes
  const values = []
  let index = -1

  while (++index < length) {
    const result = one(nodes[index], parent)
    values.push(result)
  }

  return values.filter(node => node)
}

function one(node, parent) {
  if (typeof node === 'string') {
    return t.jsxExpressionContainer(t.stringLiteral(node))
  }

  const children = all(node)
  const selfClosing = children.length === 0

  const name = ELEMENT_TAG_NAME_MAPPING[node.name] || node.name

  const openingElement = t.jsxOpeningElement(
    t.jsxIdentifier(name),
    getProps(node.name, node.attributes),
    selfClosing,
  )

  const closingElement = !selfClosing
    ? t.jsxClosingElement(t.jsxIdentifier(name))
    : null

  const jsxElement = t.jsxElement(openingElement, closingElement, children)

  if (parent == null) {
    return t.expressionStatement(jsxElement)
  }

  return jsxElement
}

function toBabelAST(tree) {
  return t.program([one(tree)])
}

export default toBabelAST
