import { NodePath, types as t, ConfigAPI, template } from '@babel/core'

export interface Options {
  prefix?: boolean
  suffix?: boolean
}

export const getValueWithProps = (value: string, { prefix, suffix }: Options) =>
  `${prefix ? '${props.prefix}' : ''}${value}${suffix ? '${props.suffix}' : ''}`

const getAttributeValue = (value: string, opts: Options) => {
  let id = ''
  let prefix = ''
  let suffix = ''
  if (value.charAt(0) === '#') {
    id = value.slice(1)
    prefix = '#'
  } else if (value.match(/^url\(#/)) {
    id = value.slice(5, -1)
    prefix = 'url(#'
    suffix = ')'
  }
  if (id) {
    return t.jsxExpressionContainer(
      (
        template.ast(
          `\`${prefix}${getValueWithProps(id, opts)}${suffix}\``,
        ) as t.ExpressionStatement
      ).expression,
    )
  }
}

const getIdValue = (value: string, opts: Options) =>
  t.jsxExpressionContainer(
    (
      template.ast(
        `\`${getValueWithProps(value, opts)}\``,
      ) as t.ExpressionStatement
    ).expression,
  )

const plugin = (api: ConfigAPI, opts: Options) => ({
  visitor: {
    JSXAttribute(path: NodePath<t.JSXAttribute>) {
      if (!opts.prefix && !opts.suffix) return

      const valuePath = path.get('value')
      const namePath = path.get('name')

      const value = valuePath?.container?.value?.value
      const name = namePath?.container?.name?.name

      if (name === 'id') {
        console.log('ITS AN ID')
        valuePath.replaceWith(getIdValue(value, opts))
      } else {
        const attr = getAttributeValue(value, opts)
        if (attr) {
          valuePath.replaceWith(attr)
        }
      }
    },
  },
})

export default plugin
