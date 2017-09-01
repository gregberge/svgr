const emSize = () => ({
  visitor: {
    JSXAttribute: {
      enter(path) {
        if (
          path.parent.name === 'svg' &&
          (path.node.name === 'width' || path.node.name === 'height')
        ) {
          path.node.value = '1em'
          path.node.litteral = false
        }
      },
    },
  },
})

export default emSize
