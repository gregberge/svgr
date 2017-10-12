/* globals jasmine */
import fs from 'mz/fs'
import { exec } from 'mz/child_process'

describe('cli', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  })

  it('should work with a simple file', async () => {
    const [stdout] = await exec('babel-node src/cli __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('--no-svgo', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --no-svgo __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--no-prettier', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --no-prettier __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--no-expand-props', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --no-expand-props __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--icon', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --icon __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--replace-attr-value', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --replace-attr-value "#063855=currentColor" __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--precision', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --precision 1 __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--no-title', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --no-title __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--no-semi', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --no-semi __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('--template', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --template __fixtures__/template.js __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('should work with stdin', async () => {
    const [stdout] = await exec('babel-node src/cli < __fixtures__/one.svg')
    expect(stdout).toMatchSnapshot()
  })

  it('should work with output directory', async () => {
    await exec('babel-node src/cli --out-dir __fixtures_build__ __fixtures__')
    expect(
      await fs.readFile('__fixtures_build__/One.js', 'utf-8'),
    ).toMatchSnapshot()
    expect(
      await fs.readFile('__fixtures_build__/nested/two.js', 'utf-8'),
    ).toMatchSnapshot()
  })
})
