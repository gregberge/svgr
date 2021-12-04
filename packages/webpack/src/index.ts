import { callbackify } from 'util'
import { transformAsync, createConfigItem } from '@babel/core'
import { transform, Config, State } from '@svgr/core'
import { normalize } from 'path'
import svgo from '@svgr/plugin-svgo'
import jsx from '@svgr/plugin-jsx'
// @ts-ignore
import presetReact from '@babel/preset-react'
// @ts-ignore
import presetEnv from '@babel/preset-env'
// @ts-ignore
import presetTS from '@babel/preset-typescript'
// @ts-ignore
import pluginTransformReactConstantElements from '@babel/plugin-transform-react-constant-elements'
import type * as webpack from 'webpack'

const babelOptions = {
  babelrc: false,
  configFile: false,
  presets: [
    createConfigItem(presetReact, { type: 'preset' }),
    createConfigItem([presetEnv, { modules: false }], { type: 'preset' }),
  ],
  plugins: [createConfigItem(pluginTransformReactConstantElements)],
}

const typeScriptBabelOptions = {
  ...babelOptions,
  presets: [
    ...babelOptions.presets,
    createConfigItem(
      [presetTS, { allowNamespaces: true, allExtensions: true, isTSX: true }],
      { type: 'preset' },
    ),
  ],
}

interface LoaderOptions extends Config {
  babel?: boolean
}

const tranformSvg = callbackify(
  async (contents: string, options: LoaderOptions, state: Partial<State>) => {
    const { babel = true, ...config } = options
    const jsCode = await transform(contents, config, state)
    if (!babel) return jsCode
    const result = await transformAsync(
      jsCode,
      options.typescript ? typeScriptBabelOptions : babelOptions,
    )
    if (!result?.code) {
      throw new Error(`Error while transforming using Babel`)
    }
    return result.code
  },
)

function svgrLoader(
  this: webpack.LoaderContext<LoaderOptions>,
  contents: string,
): void {
  this.cacheable && this.cacheable()
  const callback = this.async()

  const options = this.getOptions()

  const previousExport = (() => {
    if (contents.startsWith('export ')) return contents
    const exportMatches = contents.match(/^module.exports\s*=\s*(.*)/)
    return exportMatches ? `export default ${exportMatches[1]}` : null
  })()

  const state = {
    caller: {
      name: '@svgr/webpack',
      previousExport,
      defaultPlugins: [svgo, jsx],
    },
    filePath: normalize(this.resourcePath),
  }

  if (!previousExport) {
    tranformSvg(contents, options, state, callback)
  } else {
    this.fs.readFile(this.resourcePath, (err, result) => {
      if (err) {
        callback(err)
        return
      }
      tranformSvg(String(result), options, state, (err, content) => {
        if (err) {
          callback(err)
          return
        }
        callback(null, content)
      })
    })
  }
}

export default svgrLoader
