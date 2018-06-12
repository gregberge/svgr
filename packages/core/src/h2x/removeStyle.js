const removeStyle = () => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (path.node.name === 'style') {
          path.remove()
        }
      },
    },
  },
})

export default removeStyle
