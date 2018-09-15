import { JSXAttribute } from 'h2x-plugin-jsx'

const expandProps = (place = 'end') => () => ({
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
          if (place === 'start') {
            path.node.attributes.unshift(props)
          }
          if (place === 'end') {
            path.node.attributes.push(props)
          }
          path.replace(path.node)
        }
      },
    },
  },
})

export default expandProps
