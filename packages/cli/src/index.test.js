import fs from 'fs'
import path from 'path'
import childProcess from 'child_process'
import util from 'util'
import del from 'del'

const readdir = util.promisify(fs.readdir)
const exec = util.promisify(childProcess.exec)

const svgr = path.join(__dirname, 'index.js')
const babelNode = path.join(__dirname, '../../../node_modules/.bin/babel-node')

describe('cli', () => {
  const cli = async args => {
    const { stdout } = await exec(`${babelNode} -- ${svgr} ${args}`)
    return stdout
  }

  it(
    'should work with a simple file',
    async () => {
      const result = await cli('__fixtures__/simple/file.svg')
      expect(result).toMatchSnapshot()
    },
    10000,
  )

  it(
    'should not work with a directory without --out-dir option',
    async () => {
      expect.assertions(1)
      try {
        await cli('__fixtures__/nesting')
      } catch (error) {
        expect(error.message).toMatch(
          'Directory are not supported without `--out-dir` option instead',
        )
      }
    },
    10000,
  )

  it(
    'should not work with several files without destination',
    async () => {
      expect.assertions(1)
      try {
        await cli('__fixtures__/simple/file.svg __fixtures__/nesting/one.svg')
      } catch (error) {
        expect(error.message).toMatch(
          'Please specify only one filename or use `--out-dir` option',
        )
      }
    },
    10000,
  )

  it(
    'should work with stdin',
    async () => {
      const result = await cli('< __fixtures__/simple/file.svg')
      expect(result).toMatchSnapshot()
    },
    10000,
  )

  it(
    'should transform a whole directory',
    async () => {
      await cli('--out-dir __fixtures_build__/whole __fixtures__')
    },
    10000,
  )

  it(
    'should support --prettier-config as json',
    async () => {
      const result = await cli(
        `--prettier-config '{"tabWidth": 5}' __fixtures__/simple/file.svg`,
      )
      expect(result).toMatchSnapshot()
    },
    10000,
  )

  it(
    'should support --prettier-config as file',
    async () => {
      const result = await cli(
        `--prettier-config __fixtures__/withPrettierRc/.prettierrc __fixtures__/simple/file.svg`,
      )
      expect(result).toMatchSnapshot()
    },
    10000,
  )

  it(
    'should support --svgo-config as json',
    async () => {
      const result = await cli(
        `--svgo-config '{"plugins": [{"removeTitle": false}]}' __fixtures__/simple/file.svg`,
      )
      expect(result).toMatchSnapshot()
    },
    10000,
  )

  it(
    'should support --svgo-config as file',
    async () => {
      const result = await cli(
        `--svgo-config __fixtures__/withSvgoYml/.svgo.json __fixtures__/simple/file.svg`,
      )
      expect(result).toMatchSnapshot()
    },
    10000,
  )

  it.each([
    ['--no-dimensions'],
    ['--expand-props none'],
    ['--expand-props start'],
    ['--icon'],
    ['--native'],
    ['--native --icon'],
    ['--native --expand-props none'],
    ['--native --ref'],
    ['--ref'],
    ['--replace-attr-values "#063855=currentColor"'],
    [`--svg-props "hidden={true}"`],
    ['--no-svgo'],
    ['--no-prettier'],
    ['--title-prop'],
  ])(
    'should support various args',
    async args => {
      const result = await cli(`${args} __fixtures__/simple/file.svg`)
      expect(result).toMatchSnapshot(args)
    },
    10000,
  )

  it.each([
    [0, ''],
    [1, '--filename-case=camel'],
    [2, '--filename-case=pascal'],
    [3, '--filename-case=kebab'],
  ])(
    'should support different filename cases with directory output',
    async (index, args) => {
      const inDir = '__fixtures__/cased'
      const outDir = `__fixtures_build__/filename-case-${index}`
      await del(outDir)
      await cli(`${args} ${inDir} --out-dir=${outDir}`)
      expect(await readdir(outDir)).toMatchSnapshot(args)
    },
    10000,
  )

  it(
    'should support custom file extension',
    async () => {
      const inDir = '__fixtures__/simple'
      const outDir = '__fixtures_build__/ext'
      await del(outDir)
      await cli(`--ext=ts ${inDir} --out-dir=${outDir}`)
      expect(await readdir(outDir)).toMatchSnapshot()
    },
    10000,
  )

  it(
    'should not override config with cli defaults',
    async () => {
      const result = await cli(
        '__fixtures__/simple/file.svg --config-file=__fixtures__/overrides.config.js',
      )
      expect(result).toMatchSnapshot()
    },
    10000,
  )
})
