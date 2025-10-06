import type { RootNode } from 'svg-parser'
import type * as t from '@babel/types'
import { root } from './handlers'
import { helpers } from './helpers'
import type { Configuration } from './configuration'

const toBabelAST = (
  tree: RootNode,
  config: Partial<Configuration> = {},
): t.Program => root({ ...helpers, config }, tree)

export default toBabelAST
