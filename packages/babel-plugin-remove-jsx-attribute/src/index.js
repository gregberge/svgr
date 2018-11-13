const removeJSXAttribute = (api, opts) => ({
  visitor: {
    JSXOpeningElement(path) {
      if (!opts.elements.includes(path.node.name.name)) return

      path.get('attributes').forEach(attribute => {
        const nodeName = attribute.node.name;
        if (nodeName && opts.attributes.includes(nodeName.name)) {
          attribute.remove()
        }
      })
    },
  },
})

export default removeJSXAttribute
