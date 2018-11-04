const removeJSXAttribute = (api, opts) => ({
  visitor: {
    JSXOpeningElement(path) {
      if (!opts.elements.includes(path.node.name.name)) return

      path.get('attributes').forEach(attribute => {
        if (opts.attributes.includes(attribute.node.name.name)) {
          attribute.remove()
        }
      })
    },
  },
})

export default removeJSXAttribute
