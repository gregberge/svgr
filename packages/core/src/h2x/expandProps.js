import { JSXAttribute } from 'h2x-plugin-jsx'

const expandProps = () => () => ({
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
          path.node.attributes.push(props)
          path.replace(path.node)
        }
      },
    },
  },
})

export default expandProps
