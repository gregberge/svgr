import fs from 'fs'
import { createFilter } from 'rollup-pluginutils'
import { transform as babelTransform } from '@babel/core'
import svgr from './index'

export default function svgrPlugin(options = {}) {
  const filter = createFilter(options.include || '**/*.svg', options.exclude)
  const { babel = true } = options

  return {
    async transform(data, id) {
      if (!filter(id)) return null
      if(id.slice(-4) !== ".svg") return null;

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

      const jsCode = await svgr(load, options, {
        rollup: { previousExport },
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
              plugins: [
                '@babel/plugin-transform-react-constant-elements',
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
            (err, result) => {
              if (err) reject(err)
              else resolve(result.code)
            },
          )
        })

      const code = babel ? await pBabelTransform(jsCode) : jsCode

      return { ast, code, map: { mappings: '' } }
    },
  }
}
