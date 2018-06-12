import { JSXAttribute } from 'h2x-plugin-jsx'

const svgRef = () => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (
          path.node.name === 'svg' &&
          !path.node.attributes.some(attr => attr && attr.name === 'ref')
        ) {
          const props = new JSXAttribute()
          props.name = 'ref'
          props.value = 'svgRef'
          props.litteral = true
          path.node.attributes.push(props)
          path.replace(path.node)
        }
      },
    },
  },
})

export default svgRef
