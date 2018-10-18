import fs from 'fs'
import convert from '@svgr/core'
import { createFilter } from 'rollup-pluginutils'
import { transform as babelTransform } from '@babel/core'

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
          defaultPlugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        },
      })

      const pBabelTransform = async code =>
        new Promise((resolve, reject) => {
          babelTransform(
            code,
            {
              babelrc: false,
              presets: [
                '@babel/preset-react',
                ['@babel/preset-env', { modules: false }],
              ],
              plugins: ['@babel/plugin-transform-react-constant-elements'],
            },
            (err, result) => {
              if (err) reject(err)
              else resolve(result.code)
            },
          )
        })

      if (babel) {
        const code = await pBabelTransform(jsCode)

        return { code, map: { mappings: '' } }
      }

      return { ast, code: jsCode, map: { mappings: '' } }
    },
  }
}

export default svgrPlugin
