import { JSXAttribute } from 'h2x-plugin-jsx'

const expandProps = (position = 'end') => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (
          path.node.name === 'svg' &&
          !path.node.attributes.some(attr => attr && attr.name === 'props')
        ) {
          const props = new JSXAttribute()
          props.name = 'props'
          props.spread = true
          if (position === 'start') {
            path.node.attributes = [props, ...path.node.attributes]
            path.replace(path.node)
          }
          if (position === 'end') {
            path.node.attributes = [...path.node.attributes, props]
            path.replace(path.node)
          }
        }
      },
    },
  },
})

export default expandProps
