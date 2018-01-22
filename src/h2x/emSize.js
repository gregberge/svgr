import { JSXAttribute } from 'h2x-plugin-jsx'

const makeSizeAttr = name => {
  const attr = new JSXAttribute()
  attr.name = name
  attr.value = '1em'
  attr.litteral = false
  return attr
}

const emSize = () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (path.node.name === 'svg' && !path.node.attributes.some(attr => attr && attr.name === 'width' && attr.value === '1em') && !path.node.attributes.some(attr => attr && attr.name === 'height' && attr.value === '1em')) {
          const nextAttrs = path.node.attributes.filter(attr => attr.name !== 'width' && attr.name !== 'height');
          nextAttrs.push(makeSizeAttr('width'));
          nextAttrs.push(makeSizeAttr('height'));
          path.node.attributes = nextAttrs;
          path.replace(path.node);
        }
      },
    },
  },
})

export default emSize
