const stripAttribute = attribute => () => ({
  visitor: {
    JSXAttribute: {
      enter(path) {
        if (path.node.name === attribute) {
          path.remove()
        }
      },
    },
  },
})

export default stripAttribute
