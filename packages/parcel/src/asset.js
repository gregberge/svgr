import { Asset } from 'parcel-bundler'
import { transform as babelTransform } from '@babel/core'
import convert from '@svgr/core'

class ReactSVGAsset extends Asset {
  async parse(contents) {
    const jsCode = await convert(contents, {
      prettier: false,
      svgo: true
    })

    const pBabelTransform = code =>
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

    this.contents = await pBabelTransform(jsCode)
  }

  generate() {
    return [
      {
        type: 'js',
        value: this.contents
      }
    ]
  }
}

module.exports = ReactSVGAsset
