import path from 'path'
import { exec } from 'mz/child_process'

const svgr = path.join(__dirname, 'index.js')
const babelNode = path.join(__dirname, '../../../node_modules/.bin/babel-node')

describe('cli', () => {
  const cli = async args => {
    const [stdout] = await exec(`${babelNode} ${svgr} ${args}`)
    return stdout
  }

  it('should work with a simple file', async () => {
    const result = await cli('__fixtures__/one.svg')
    expect(result).toMatchSnapshot()
  })

  it('should work with stdin', async () => {
    const result = await cli('< __fixtures__/one.svg')
    expect(result).toMatchSnapshot()
  })

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
          const result = await cli(`${args} __fixtures__/one.svg`)
          expect(result).toMatchSnapshot({}, args)
        }),
      )
    },
    30000,
  )
})
