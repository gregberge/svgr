import fs from 'mz/fs'
import { exec } from 'mz/child_process'

describe('cli', () => {
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

  it('--replace-attr-value', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --replace-attr-value "#063855=currentColor" __fixtures__/one.svg',
    )
    expect(stdout).toMatchSnapshot()
  })

  it('should work with directory', async () => {
    const [stdout] = await exec('babel-node src/cli __fixtures__')
    expect(stdout).toMatchSnapshot()
  })

  it('should work with output directory', async () => {
    const [stdout] = await exec(
      'babel-node src/cli --out-dir __fixtures_build__ __fixtures__',
    )
    expect(stdout).toMatchSnapshot()
    expect(
      await fs.readFile('__fixtures_build__/one.js', 'utf-8'),
    ).toMatchSnapshot()
    expect(
      await fs.readFile('__fixtures_build__/nested/two.js', 'utf-8'),
    ).toMatchSnapshot()
  })
})
