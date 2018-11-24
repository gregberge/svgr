import Bundler from 'parcel-bundler'
import path from 'path'
import plugin from '.'

const getCode = bundle =>
  Array.from(bundle.assets).filter(
    asset => asset.id === 'icon.svg'
  ).map(
    asset => asset.generated
  )

describe('parcel plugin', () => {
  it(
    'should convert file',
    async () => {
      const bundler = new Bundler(
        path.join(__dirname, '__fixtures__/icon.svg'),
        {
          outDir: '__fixtures_build__',
          cache: false,
          detailedReport: false,
          hmr: false,
          logLevel: 0,
          target: 'node',
          watch: false
        }
      )

      plugin(bundler)

      const bundle = await bundler.bundle()
      const code = getCode(bundle)
      expect(code).toMatchSnapshot()
    },
    15000,
  )
})
