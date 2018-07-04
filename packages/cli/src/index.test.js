import path from 'path'
import childProcess from 'child_process'
import util from 'util'

const exec = util.promisify(childProcess.exec)

const svgr = path.join(__dirname, 'index.js')
const babelNode = path.join(__dirname, '../../../node_modules/.bin/babel-node')

describe('cli', () => {
  const cli = async args => {
    const { stdout } = await exec(`${babelNode} ${svgr} ${args}`)
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
    'should not work with a directory',
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
    'should not work with several files',
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
      await cli('--out-dir __fixtures_build__ __fixtures__')
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

  const argPresets = [
    '--no-dimensions',
    '--no-expand-props',
    '--icon',
    '--native',
    '--native --icon',
    '--native --no-expand-props',
    '--native --ref',
    '--ref',
    '--replace-attr-values "#063855=currentColor"',
    '--svg-attributes "focusable=false"',
    '--no-svgo',
    '--no-prettier',
    '--title-prop',
  ]

  it(
    'should support various args',
    async () => {
      await Promise.all(
        argPresets.map(async args => {
          const result = await cli(`${args} __fixtures__/simple/file.svg`)
          expect(result).toMatchSnapshot({}, args)
        }),
      )
    },
    30000,
  )

  it(
    'should work convert to typescript',
    async () => {
      const result = await cli('--typescript __fixtures__/simple/file.svg')
      expect(result).toMatchSnapshot()
    },
    10000,
  )
})
