import type { Node, RootNode, ElementNode } from 'svg-parser'
import type { Helpers } from './helpers'
import type * as t from '@babel/types'

export const one = (
  h: Helpers,
  node: Node,
  parent?: RootNode | ElementNode,
): t.JSXElement | t.ExpressionStatement | t.JSXExpressionContainer | null => {
  const type = node && node.type
  const fn = h.handlers[type]

  /* Fail on non-nodes. */
  if (!type) {
    throw new Error(`Expected node, got \`${node}\``)
  }

  if (!fn) {
    throw new Error(`Node of type ${type} is unknown`)
  }

  // @ts-ignore
  return fn(h, node, parent)
}
