import { JSXElement, JSXText } from 'h2x-plugin-jsx'

/**
 * Check if a classical title exist
 * @param {*} node - NodeElement
 * @returns {boolean}
 */
const hasTitle = node =>
  node.children.reduce((accumulation, value) => {
    if (value.name !== 'title') return accumulation
    if (value.children.some(e => e.text === '{title}')) return accumulation
    return true
  }, false)

const titleProp = () => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (path.node.name === 'svg') {
          if (hasTitle(path.node)) {
            path.node.children = path.node.children.filter(element => {
              if (element.name !== 'title') return true
              if (element.children.some(e => e.text === '{title}')) return true
              return false
            })
          }

          if (!path.node.children.some(children => children.name === 'title')) {
            const element = new JSXElement()
            const text = new JSXText()

            text.text = '{title}'

            element.name = 'title'
            element.children.push(text)

            path.node.children.unshift(element)
          }
        }
      },
    },
  },
})

export default titleProp
