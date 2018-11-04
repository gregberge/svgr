import one from './one'

/* Transform the children of `parent`. */
function all(h, parent) {
  const nodes = parent.children || []
  const { length } = nodes
  const values = []
  let index = -1

  while (++index < length) {
    const result = one(h, nodes[index], parent)
    values.push(result)
  }

  return values.filter(node => node)
}

export default all
