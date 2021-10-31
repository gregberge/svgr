import { one } from './one'
import type * as t from '@babel/types'
import type { RootNode, ElementNode } from 'svg-parser'
import type { Helpers } from './helpers'

/* Transform the children of `parent`. */
export const all = (
  helpers: Helpers,
  parent: RootNode | ElementNode,
): (t.JSXElement | t.JSXExpressionContainer)[] => {
  const nodes = parent.children || []
  const { length } = nodes
  const values = []
  let index = -1

  while (++index < length) {
    const node = nodes[index]
    if (typeof node !== 'string') {
      const result = one(helpers, node, parent)
      values.push(result)
    }
  }

  return values.filter(Boolean) as (t.JSXElement | t.JSXExpressionContainer)[]
}
