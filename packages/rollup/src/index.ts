import * as fs from 'fs'
import { Config, transform } from '@svgr/core'
import { createFilter, CreateFilter } from '@rollup/pluginutils'
import { createConfigItem, transformAsync } from '@babel/core'
import svgo from '@svgr/plugin-svgo'
import jsx, { getJsxRuntimeOptions } from '@svgr/plugin-jsx'
// @ts-ignore
import presetReact from '@babel/preset-react'
// @ts-ignore
import presetEnv from '@babel/preset-env'
// @ts-ignore
import presetTS from '@babel/preset-typescript'
// @ts-ignore
import pluginTransformReactConstantElements from '@babel/plugin-transform-react-constant-elements'
import type { PluginImpl } from 'rollup'

// Removes `jsx` prefix from options (e.g. jsxRuntime -> runtime)
const transformJsxOptions = (config: Config): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(config).map(([key, value]) => {
      if (!key.startsWith('jsx')) return [key, value]

      return [
        key
          .replace(/^jsx/, '')
          .replace(/^([A-Z])/, (match) => `${match.toLowerCase()}`),
        value,
      ]
    }),
  )

const getBabelOptions = (config: Config) => ({
  babelrc: false,
  configFile: false,
  presets: [
    createConfigItem(
      [presetReact, transformJsxOptions(getJsxRuntimeOptions(config))],
      { type: 'preset' },
    ),
    createConfigItem([presetEnv, { modules: false }], { type: 'preset' }),
  ],
  plugins: [createConfigItem(pluginTransformReactConstantElements)],
})

const getTypeScriptBabelOptions = (config: Config) => {
  const babelOptions = getBabelOptions(config)

  return {
    ...babelOptions,
    presets: [
      ...babelOptions.presets,
      createConfigItem(
        [presetTS, { allowNamespaces: true, allExtensions: true, isTSX: true }],
        { type: 'preset' },
      ),
    ],
  }
}

export interface Options extends Config {
  include?: Parameters<CreateFilter>[0]
  exclude?: Parameters<CreateFilter>[1]
  babel?: boolean
}

const plugin: PluginImpl<Options> = (options = {}) => {
  const EXPORT_REGEX = /(module\.exports *= *|export default)/
  const filter = createFilter(options.include || '**/*.svg', options.exclude)
  const { babel = true } = options

  return {
    name: 'svgr',
    async transform(data, id) {
      if (!filter(id)) return null
      if (id.slice(-4) !== '.svg') return null

      const load = fs.readFileSync(id, 'utf8')

      const previousExport = EXPORT_REGEX.test(data) ? data : null

      const jsCode = await transform(load, options, {
        filePath: id,
        caller: {
          name: '@svgr/rollup',
          previousExport,
          defaultPlugins: [svgo, jsx],
        },
      })

      if (babel) {
        const result = await transformAsync(
          jsCode,
          options.typescript
            ? getTypeScriptBabelOptions(options)
            : getBabelOptions(options),
        )
        if (!result?.code) {
          throw new Error(`Error while transforming using Babel`)
        }
        return { code: result.code, map: null }
      }

      return {
        ast: {
          type: 'Program',
          start: 0,
          end: 0,
          sourceType: 'module',
          body: [],
        },
        code: jsCode,
        map: null,
      }
    },
  }
}

export default plugin
