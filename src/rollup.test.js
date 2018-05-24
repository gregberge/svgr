import { rollup } from 'rollup'
import image from 'rollup-plugin-image'
import url from 'rollup-plugin-url'
import svgr from './rollup'

const compile = (plugins = [svgr()]) =>
  rollup({
    input: './__fixtures__/one.svg',
    plugins,
  })

const getCode = bundler =>
  bundler.modules.find(({ id }) => id.includes('__fixtures__/one.svg')).code

describe('rollup loader', () => {
  it('should convert file', async () => {
    const code = await compile([svgr()])
    expect(getCode(code)).toMatchSnapshot()
  })

  it('should convert file without babel', async () => {
    const code = await compile([svgr({ babel: false })])
    expect(getCode(code)).toMatchSnapshot()
  })

  it('should convert file with previousExport of image plugin', async () => {
    const code = await compile([image(), svgr({ babel: false })])

    expect(getCode(code)).toMatchSnapshot()
  })

  it('should convert file with previousExport of url plugin', async () => {
    const code = await compile([url(), svgr({ babel: false })])

    expect(getCode(code)).toMatchSnapshot()
  })
})
