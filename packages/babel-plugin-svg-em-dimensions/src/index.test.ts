import { transform } from '@babel/core'
import plugin, { Options } from '.'

const testPlugin = (code: string, options?: Options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
    configFile: false,
  })

  return result?.code
}

describe('plugin', () => {
  it('replaces width / height attributes', () => {
    expect(
      testPlugin('<svg foo="bar" width="100" height="200" />'),
    ).toMatchInlineSnapshot(
      `"<svg foo=\\"bar\\" width=\\"1em\\" height=\\"1em\\" />;"`,
    )
  })

  it('adds theme if they are not present', () => {
    expect(testPlugin('<svg foo="bar" />')).toMatchInlineSnapshot(
      `"<svg foo=\\"bar\\" width=\\"1em\\" height=\\"1em\\" />;"`,
    )
  })

  it('accepts numeric values', () => {
    expect(
      testPlugin('<svg foo="bar" />', { width: 24, height: 24 }),
    ).toMatchInlineSnapshot(`"<svg foo=\\"bar\\" width={24} height={24} />;"`)
  })

  it('accepts string values', () => {
    expect(
      testPlugin('<svg foo="bar" />', { width: '2em', height: '2em' }),
    ).toMatchInlineSnapshot(
      `"<svg foo=\\"bar\\" width=\\"2em\\" height=\\"2em\\" />;"`,
    )
  })
})
