import * as handlers from './handlers'
import one from './one'

const h = { handlers }

function toBabelAST(tree) {
  return one(h, tree)
}

export default toBabelAST
