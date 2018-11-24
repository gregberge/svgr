import fs from 'fs'
import convert from '@svgr/core'
import { createFilter } from 'rollup-pluginutils'
import { transformAsync, createConfigItem } from '@babel/core'
import svgo from '@svgr/plugin-svgo'
import jsx from '@svgr/plugin-jsx'
import presetReact from '@babel/preset-react'
import presetEnv from '@babel/preset-env'
import pluginTransformReactConstantElements from '@babel/plugin-transform-react-constant-elements'

const babelOptions = {
  babelrc: false,
  configFile: false,
  presets: [
    createConfigItem(presetReact, { type: 'preset' }),
    createConfigItem([presetEnv, { modules: false }], { type: 'preset' }),
  ],
  plugins: [createConfigItem(pluginTransformReactConstantElements)],
}

function svgrPlugin(options = {}) {
  const filter = createFilter(options.include || '**/*.svg', options.exclude)
  const { babel = true } = options

  return {
    name: 'svgr',
    async transform(data, id) {
      if (!filter(id)) return null
      if (id.slice(-4) !== '.svg') return null

      const load = fs.readFileSync(id, 'utf8')

      const exportMatches =
        data.match(/^module.exports\s*=\s*(.*)/) ||
        data.match(/export\sdefault\s(.*)/)

      const previousExport = exportMatches ? data : null

      const ast = {
        type: 'Program',
        sourceType: 'module',
        start: 0,
        end: null,
        body: [],
      }

      const jsCode = await convert(load, options, {
        filePath: id,
        caller: {
          name: '@svgr/rollup',
          previousExport,
          defaultPlugins: [svgo, jsx],
        },
      })

      if (babel) {
        const { code } = await transformAsync(jsCode, babelOptions)
        return { code, map: { mappings: '' } }
      }

      return { ast, code: jsCode, map: { mappings: '' } }
    },
  }
}

export default svgrPlugin
