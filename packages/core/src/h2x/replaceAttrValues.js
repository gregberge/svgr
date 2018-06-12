const replaceAttrValues = (attributes = {}) => () => ({
  visitor: {
    JSXAttribute: {
      enter(path) {
        Object.keys(attributes).forEach(key => {
          if (path.node.value === key) {
            path.node.value = attributes[key]
          }
        })
      },
    },
  },
})

export default replaceAttrValues
