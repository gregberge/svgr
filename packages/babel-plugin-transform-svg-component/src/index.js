import { getProps, getImport, getExport } from './util'

function defaultTemplate(
  { template },
  opts,
  { imports, componentName, props, jsx, exports },
) {
  return template.ast`${imports}
const ${componentName} = (${props}) => ${jsx}
${exports}
`
}

const plugin = (api, opts) => ({
  visitor: {
    Program(path) {
      const { types: t } = api
      const template = opts.template || defaultTemplate
      path.node.body = template(api, opts, {
        componentName: t.identifier(opts.state.componentName),
        props: getProps(api, opts),
        imports: getImport(api, opts),
        exports: getExport(api, opts),
        jsx: path.node.body[0].expression,
      })
      path.replaceWith(path.node)
    },
  },
})

export default plugin
