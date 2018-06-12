const removeComments = () => () => ({
  visitor: {
    JSXComment: {
      enter(path) {
        path.remove()
      },
    },
  },
})

export default removeComments
