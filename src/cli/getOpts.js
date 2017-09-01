import jsx from 'h2x-plugin-jsx'
import {
  emSize,
  expandProps,
  replaceAttrValue,
  stripAttribute,
  wrapIntoComponent,
  removeComments,
} from '../'

function getOpts(program) {
  function getH2xPlugins() {
    const plugins = [jsx, stripAttribute('xmlns'), removeComments]
    if (program.icon) plugins.push(emSize)
    program.replaceAttrValues.forEach(([oldValue, newValue]) => {
      plugins.push(replaceAttrValue(oldValue, newValue))
    })
    if (program.expandProps) plugins.push(expandProps)

    return plugins
  }

  function getSvgoConfig() {
    const plugins = []
    if (!program.title) plugins.push({ removeTitle: {} })
    return { plugins }
  }

  function getPrettierConfig() {
    return {
      semi: program.semi,
      singleQuote: program.singleQuote,
      tabWidth: program.tabWidth,
      useTabs: program.useTabs,
      trailingComma: program.trailingComma,
      bracketSpacing: program.bracketSpacing,
      jsxBracketSameLine: program.jsxBracketSameLine,
    }
  }

  return {
    svgo: program.svgo ? getSvgoConfig() : null,
    h2x: {
      plugins: getH2xPlugins(),
    },
    prettier: program.prettier ? getPrettierConfig() : null,
    template: wrapIntoComponent({ expandProps: program.expandProps }),
  }
}

export default getOpts
