const plugin = ({ types: t }, opts) => ({
  visitor: {
    JSXAttribute(path) {
      const value = path.get('value')
      if (!value.isStringLiteral()) return

      Object.keys(opts.values).forEach(key => {
        if (!value.isStringLiteral({ value: key })) return
        value.replaceWith(t.stringLiteral(opts.values[key]))
      })
    },
  },
})

export default plugin
