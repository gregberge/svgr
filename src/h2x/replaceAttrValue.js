const replaceAttrValue = (color, newColor) => () => ({
  visitor: {
    JSXAttribute: {
      enter(path) {
        if (path.node.value === color) {
          path.node.value = newColor
        }
      },
    },
  },
})

export default replaceAttrValue
