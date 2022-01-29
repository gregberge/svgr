import { promises as fs } from 'fs'
import * as path from 'path'
import { exec as execCb } from 'child_process'
import { promisify } from 'util'
// @ts-ignore
import del from 'del'

const exec = promisify(execCb)

const svgr = path.join(__dirname, '../bin/svgr')

describe('cli', () => {
  const cli = async (args: string) => {
    const { stdout } = await exec(`${svgr} ${args}`)
    return stdout
  }

  it('should work with a simple file', async () => {
    const result = await cli('__fixtures__/simple/file.svg')
    expect(result).toMatchSnapshot()
  })

  it('should not work with a directory without --out-dir option', async () => {
    expect.assertions(1)
    try {
      await cli('__fixtures__/nesting')
    } catch (error: any) {
      expect(error.message).toMatch(
        'Directory are not supported without `--out-dir` option instead',
      )
    }
  })

  it('should not work with several files without destination', async () => {
    expect.assertions(1)
    try {
      await cli('__fixtures__/simple/file.svg __fixtures__/nesting/one.svg')
    } catch (error: any) {
      expect(error.message).toMatch(
        'Please specify only one filename or use `--out-dir` option',
      )
    }
  })

  it('should work with stdin', async () => {
    const result = await cli('< __fixtures__/simple/file.svg')
    expect(result).toMatchSnapshot()
  })

  it('should support stdin filepath', async () => {
    const result = await cli(
      '--stdin-filepath __fixtures__/simple/file.svg < __fixtures__/simple/file.svg',
    )
    expect(result).toMatchSnapshot()
  })

  it('should transform a whole directory and output relative destination paths', async () => {
    const result = await cli('--out-dir __fixtures_build__/whole __fixtures__')
    const sorted = result
      .split(/\n/)
      .sort()
      .map((x) => x.toLowerCase())
      .join('\n')
    expect(sorted).toMatchSnapshot()
  })

  it('should transform a whole directory with --typescript', async () => {
    const result = await cli(
      '--typescript --out-dir __fixtures_build__/whole __fixtures__',
    )
    const sorted = result
      .split(/\n/)
      .sort()
      .map((x) => x.toLowerCase())
      .join('\n')
    expect(sorted).toMatchSnapshot()
  })

  it('should suppress output when transforming a directory with a --silent option', async () => {
    const result = await cli(
      '--silent --out-dir __fixtures_build__/whole __fixtures__',
    )
    const sorted = result.split(/\n/).sort().join('\n')
    expect(sorted).toMatchSnapshot()
  })

  it('should support --prettier-config as json', async () => {
    const result = await cli(
      `--prettier-config '{"tabWidth": 5}' __fixtures__/simple/file.svg`,
    )
    expect(result).toMatchSnapshot()
  })

  it('should support --prettier-config as file', async () => {
    const result = await cli(
      `--prettier-config __fixtures__/withPrettierRc/.prettierrc __fixtures__/simple/file.svg`,
    )
    expect(result).toMatchSnapshot()
  })

  it('should support --svgo-config as json', async () => {
    const result = await cli(
      `--svgo-config '{"plugins":[{"name":"preset-default","params":{"overrides":{"removeTitle":false}}}]}' __fixtures__/simple/file.svg`,
    )
    expect(result).toMatchSnapshot()
  })

  it('should support --svgo-config as file', async () => {
    const result = await cli(
      `--svgo-config __fixtures__/withSvgoConfig/svgo.config.js __fixtures__/simple/file.svg`,
    )
    expect(result).toMatchSnapshot()
  })

  it.each([
    ['--no-dimensions'],
    ['--jsx-runtime classic-preact'],
    ['--jsx-runtime automatic'],
    ['--expand-props none'],
    ['--expand-props start'],
    ['--icon'],
    ['--icon 24'],
    ['--icon 2em'],
    ['--native'],
    ['--native --icon'],
    ['--native --expand-props none'],
    ['--native --ref'],
    ['--ref'],
    ['--replace-attr-values "#063855=currentColor"'],
    [`--svg-props "hidden={true},id=hello"`],
    ['--no-svgo'],
    ['--no-prettier'],
    ['--title-prop'],
    ['--typescript'],
    ['--typescript --ref'],
    ['--typescript --ref --title-prop'],
  ])(
    'should support various args',
    async (args) => {
      const result = await cli(`${args} -- __fixtures__/simple/file.svg`)
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
      expect(await fs.readdir(outDir)).toMatchSnapshot(args)
    },
    10000,
  )

  it('should support custom file extension', async () => {
    const inDir = '__fixtures__/simple'
    const outDir = '__fixtures_build__/ext'
    await del(outDir)
    await cli(`--ext=ts ${inDir} --out-dir=${outDir}`)
    expect(await fs.readdir(outDir)).toMatchSnapshot()
  })

  it('should support "--ignore-existing"', async () => {
    const inDir = '__fixtures__/simple'
    const outDir = '__fixtures__/simple-existing'
    await cli(`${inDir} --out-dir=${outDir} --ignore-existing`)
    const content = await fs.readFile(path.join(outDir, 'File.js'), 'utf-8')
    expect(content).toBe('// nothing')
  })

  it('should not override config with cli defaults', async () => {
    const result = await cli(
      '__fixtures__/simple/file.svg --config-file=__fixtures__/overrides.config.js',
    )
    expect(result).toMatchSnapshot()
  })

  it('should add Svg prefix to index.js exports staring with number', async () => {
    const inDir = '__fixtures__/numeric'
    const outDir = `__fixtures_build__/prefix-exports`
    await del(outDir)
    await cli(`${inDir} --out-dir=${outDir}`)
    const content = await fs.readFile(path.join(outDir, 'index.js'), 'utf-8')
    expect(content).toMatchSnapshot()
  })

  it('should support custom index.js with directory output', async () => {
    const inDir = '__fixtures__/simple'
    const outDir = `__fixtures_build__/custom-index`
    await del(outDir)
    await cli(
      `${inDir} --out-dir=${outDir} --config-file=__fixtures__/custom-index.config.js`,
    )
    const content = await fs.readFile(path.join(outDir, 'index.js'), 'utf-8')
    expect(content).toMatchSnapshot()
  })

  it('using typescript option, it creates index with `.ts` extension', async () => {
    const inDir = '__fixtures__/simple'
    const outDir = `__fixtures_build__/ts-index`
    await del(outDir)
    await cli(`${inDir} --out-dir=${outDir} --typescript`)
    const content = await fs.readFile(path.join(outDir, 'index.ts'), 'utf-8')
    expect(content).toMatchSnapshot()
  })

  it('should support --index-template in cli', async () => {
    const inDir = '__fixtures__/simple'
    const outDir = `__fixtures_build__/custom-index-arg`
    await del(outDir)
    await cli(
      `${inDir} --out-dir=${outDir} --index-template=__fixtures__/custom-index-template.js`,
    )
    const content = await fs.readFile(path.join(outDir, 'index.js'), 'utf-8')
    expect(content).toMatchSnapshot()
  })

  it('should support --no-index', async () => {
    const inDir = '__fixtures__/simple'
    const outDir = `__fixtures_build__/no-index-case`
    await del(outDir)
    await cli(`--no-index ${inDir} --out-dir=${outDir}`)
    expect(await fs.readdir(outDir)).toMatchSnapshot()
  })
})
