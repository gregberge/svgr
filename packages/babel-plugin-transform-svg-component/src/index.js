import { getProps, getImport, getExport } from './util'

function defaultTemplate(
  { template },
  opts,
  { imports, componentName, props, jsx, exports },
) {
  return template.ast`${imports}
function ${componentName}(${props}) {
  return ${jsx};
}
${exports}
`
}

const plugin = (api, opts) => ({
  visitor: {
    Program(path) {
      const { types: t } = api
      const template = opts.template || defaultTemplate
      const body = template(api, opts, {
        componentName: t.identifier(opts.state.componentName),
        props: getProps(api, opts),
        imports: getImport(api, opts),
        exports: getExport(api, opts),
        jsx: path.node.body[0].expression,
      })
      if (Array.isArray(body)) {
        path.node.body = body
      } else {
        path.node.body = [body]
      }
      path.replaceWith(path.node)
    },
  },
})

export default plugin
