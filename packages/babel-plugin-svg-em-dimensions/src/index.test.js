import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = (code, options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
    configFile: false,
  })

  return result.code
}

describe('plugin', () => {
  it('should replace width / height attributes', () => {
    expect(
      testPlugin('<svg foo="bar" width="100" height="200" />'),
    ).toMatchInlineSnapshot(
      `"<svg foo=\\"bar\\" width=\\"1em\\" height=\\"1em\\" />;"`,
    )
  })

  it('should add theme if they are not present', () => {
    expect(testPlugin('<svg foo="bar" />')).toMatchInlineSnapshot(
      `"<svg foo=\\"bar\\" width=\\"1em\\" height=\\"1em\\" />;"`,
    )
  })
})
