import { JSXAttribute } from 'h2x-plugin-jsx'

const makeSizeAttr = name => {
  const attr = new JSXAttribute()
  attr.name = name
  attr.value = '1em'
  attr.litteral = false
  return attr
}

const emSize = () => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        // Skip if not svg node
        if (path.node.name !== 'svg') return

        // Split attributes into two arrays
        const sizeAttributes = []
        const otherAttributes = []
        path.node.attributes.forEach(attr => {
          if (attr.name === 'width' || attr.name === 'height')
            sizeAttributes.push(attr)
          else otherAttributes.push(attr)
        })

        // Skip if size attributes are correctly set
        if (
          sizeAttributes.length === 2 &&
          sizeAttributes.every(attr => attr.value === '1em')
        )
          return

        path.node.attributes = [
          ...otherAttributes,
          makeSizeAttr('width'),
          makeSizeAttr('height'),
        ]
        path.replace(path.node)
      },
    },
  },
})

export default emSize
