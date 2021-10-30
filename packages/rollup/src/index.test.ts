import { rollup, RollupBuild } from 'rollup'
// @ts-ignore
import image from 'rollup-plugin-image'
// @ts-ignore
import url from 'rollup-plugin-url'
import svgr from './index'

const compile = (plugins = [svgr()]) =>
  rollup({
    input: './__fixtures__/simple/file.svg',
    plugins,
  })

const getCode = (bundler: RollupBuild) =>
  bundler.cache?.modules?.find(
    ({ id }) =>
      id.includes('__fixtures__/simple/file.svg') ||
      id.includes('__fixtures__\\simple\\file.svg'),
  )?.code

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
