import { Asset } from 'parcel-bundler'
import { transformAsync, createConfigItem } from '@babel/core'
import svgo from '@svgr/plugin-svgo'
import jsx from '@svgr/plugin-jsx'
import convert from '@svgr/core'
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

class ReactSVGAsset extends Asset {
  type = 'js'

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
    return [{ type: 'js', value: this.ast }]
  }
}

module.exports = ReactSVGAsset
