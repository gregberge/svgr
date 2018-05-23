/* globals jasmine */
import fs from 'mz/fs'
import { exec } from 'mz/child_process'

describe('cli', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  })

  it('should work with a simple file', async () => {
    const [stdout] = await exec('bin/svgr __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('should work with stdin', async () => {
    const [stdout] = await exec('bin/svgr < __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--config', async () => {
    const [stdout] = await exec(
      'babel-node src/cli/index.js --config src/__fixtures__/svgr/.svgrrc __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--icon', async () => {
    const [stdout] = await exec('bin/svgr --icon __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--ids', async () => {
    const [stdout] = await exec('bin/svgr --ids __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--jsx-bracket-same-line', async () => {
    const [stdout] = await exec(
      'bin/svgr --jsx-bracket-same-line __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--keep-useless-defs', async () => {
    const [stdout] = await exec(
      'bin/svgr --keep-useless-defs __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--native', async () => {
    const [stdout] = await exec('bin/svgr --native __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-bracket-spacing', async () => {
    const [stdout] = await exec(
      'bin/svgr --no-bracket-spacing __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--no-dimensions', async () => {
    const [stdout] = await exec('bin/svgr --no-dimensions __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-dimensions --no-view-box', async () => {
    const [stdout] = await exec(
      'bin/svgr --no-dimensions --no-view-box __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--no-expand-props', async () => {
    const [stdout] = await exec(
      'bin/svgr --no-expand-props __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--no-prettier', async () => {
    const [stdout] = await exec('bin/svgr --no-prettier __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-semi', async () => {
    const [stdout] = await exec('bin/svgr --no-semi __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-svgo', async () => {
    const [stdout] = await exec('bin/svgr --no-svgo __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-title', async () => {
    const [stdout] = await exec('bin/svgr --no-title __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-view-box', async () => {
    const [stdout] = await exec('bin/svgr --no-view-box __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--ref', async () => {
    const [stdout] = await exec('bin/svgr --ref __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--ref --no-expand-props', async () => {
    const [stdout] = await exec(
      'bin/svgr --ref --no-expand-props __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--replace-attr-value', async () => {
    const [stdout] = await exec(
      'bin/svgr --replace-attr-value "#063855=currentColor" __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--single-quote', async () => {
    const [stdout] = await exec('bin/svgr --single-quote __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--tab-width', async () => {
    const [stdout] = await exec('bin/svgr --tab-width 4 __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--template', async () => {
    const [stdout] = await exec(
      'bin/svgr --template __fixtures__/template.js __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  describe('--trailing-comma', () => {
    it('none', async () => {
      const [stdout] = await exec(
        `bin/svgr --trailing-comma none __fixtures__/one.svg`,
      )
      expect(stdout).toMatchSnapshot()
    })

    it('es5', async () => {
      const [stdout] = await exec(
        `bin/svgr --trailing-comma es5 __fixtures__/one.svg`,
      )
      expect(stdout).toMatchSnapshot()
    })

    it('all', async () => {
      const [stdout] = await exec(
        `bin/svgr --trailing-comma all __fixtures__/one.svg`,
      )
      expect(stdout).toMatchSnapshot()
    })
  })

  it('--use-tabs', async () => {
    const [stdout] = await exec('bin/svgr --use-tabs __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--out-dir', async () => {
    await exec('bin/svgr --out-dir __fixtures_build__ __fixtures__')
    expect(
      await fs.readFile('__fixtures_build__/One.js', 'utf-8'),
    ).toMatchSnapshot()
    expect(
      await fs.readFile('__fixtures_build__/nested/Two.js', 'utf-8'),
    ).toMatchSnapshot()
  })

  it('--precision', async () => {
    const [stdout] = await exec('bin/svgr --precision 10 __fixtures__/one.svg')
    const [shorthand] = await exec('bin/svgr -p 10 __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
    expect(shorthand).toEqual(stdout)
  })

  it('--svg-attributes', async () => {
    const [stdout] = await exec(
      'bin/svgr --svg-attribute focusable=false --svg-attribute hidden=0 __fixtures__/one.svg',
    )

    expect(stdout).toMatchSnapshot()
  })

  it('--title-prop', async () => {
    const [stdout] = await exec('bin/svgr --title-prop __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })
})
