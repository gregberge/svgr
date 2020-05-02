import { transformAsync, createConfigItem } from '@babel/core'
import svgo from '@svgr/plugin-svgo'
import jsx from '@svgr/plugin-jsx'
import convert from '@svgr/core'
import presetReact from '@babel/preset-react'
import presetEnv from '@babel/preset-env'
import pluginTransformReactConstantElements from '@babel/plugin-transform-react-constant-elements'

/* eslint-disable global-require, import/no-unresolved */
function requireParcel() {
  try {
    return require('parcel')
  } catch (error) {
    return require('parcel-bundler')
  }
}
/* eslint-enable global-require, import/no-unresolved */

const { Asset } = requireParcel()

const babelOptions = {
  babelrc: false,
  configFile: false,
  presets: [
    createConfigItem(presetReact, { type: 'preset' }),
    createConfigItem([presetEnv, { modules: false }], { type: 'preset' }),
  ],
  plugins: [createConfigItem(pluginTransformReactConstantElements)],
}

class ReactSVGAsset extends Asset {
  type = 'svg'

  async parse(contents) {
    const code = await convert(
      contents,
      {},
      {
        caller: {
          name: '@svgr/parcel',
          defaultPlugins: [svgo, jsx],
        },
        filePath: this.name,
      },
    )

    const { code: babelCode } = await transformAsync(code, babelOptions)

    return babelCode
  }

  async generate() {
    return [
      { type: 'svg', value: this.contents },  // original SVG (for CSS imports)
      { type: 'js', value: this.ast }         // transformed AST (for JS imports)
    ]
  }
}

module.exports = ReactSVGAsset
