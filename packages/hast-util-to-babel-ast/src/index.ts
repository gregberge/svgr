import type { RootNode } from 'svg-parser'
import type * as t from '@babel/types'
import { root } from './handlers'
import { helpers } from './helpers'

const toBabelAST = (tree: RootNode): t.Program => root(helpers, tree)

export default toBabelAST
