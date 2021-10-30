import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = (code: string) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', plugin],
    configFile: false,
  })

  return result?.code
}

describe('plugin', () => {
  it('should remove empty expression', () => {
    expect(testPlugin('<div>{/* Hello */}<a /></div>')).toMatchInlineSnapshot(
      `"<div><a /></div>;"`,
    )
  })
})
