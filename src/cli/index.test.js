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

  it('--no-svgo', async () => {
    const [stdout] = await exec('bin/svgr --no-svgo __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-prettier', async () => {
    const [stdout] = await exec('bin/svgr --no-prettier __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-expand-props', async () => {
    const [stdout] = await exec(
      'bin/svgr --no-expand-props __fixtures__/one.svg',
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

  it('--no-view-box', async () => {
    const [stdout] = await exec('bin/svgr --no-view-box __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--replace-attr-value', async () => {
    const [stdout] = await exec(
      'bin/svgr --replace-attr-value "#063855=currentColor" __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--precision', async () => {
    const [stdout] = await exec('bin/svgr --precision 10 __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--tab-width', async () => {
    const [stdout] = await exec('bin/svgr --tab-width 4 __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-title', async () => {
    const [stdout] = await exec('bin/svgr --no-title __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-semi', async () => {
    const [stdout] = await exec('bin/svgr --no-semi __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--template', async () => {
    const [stdout] = await exec(
      'bin/svgr --template __fixtures__/template.js __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--native', async () => {
    const [stdout] = await exec('bin/svgr --native __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('should work with stdin', async () => {
    const [stdout] = await exec('bin/svgr < __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('should work with output directory', async () => {
    await exec('bin/svgr --out-dir __fixtures_build__ __fixtures__')
    expect(
      await fs.readFile('__fixtures_build__/One.js', 'utf-8'),
    ).toMatchSnapshot()
    expect(
      await fs.readFile('__fixtures_build__/nested/Two.js', 'utf-8'),
    ).toMatchSnapshot()
  })
})
