const dimensionAttrs = ['width', 'height']

const filterDimensionAttrs = attr => !dimensionAttrs.includes(attr.name)

const removeDimensions = () => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        // Skip if not svg node
        if (path.node.name !== 'svg') return

        path.node.attributes = path.node.attributes.filter(filterDimensionAttrs)
      },
    },
  },
})

export default removeDimensions
