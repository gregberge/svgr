import { transform } from '@babel/core'
import plugin, { Options } from '.'

const testPlugin = (code: string, options: Options) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
    configFile: false,
  })

  return result?.code
}

describe('plugin', () => {
  it('should replace attribute values', () => {
    expect(
      testPlugin('<div something="cool" />', {
        values: [{ value: 'cool', newValue: 'not cool' }],
      }),
    ).toMatchInlineSnapshot(`"<div something=\\"not cool\\" />;"`)

    expect(
      testPlugin('<div something="cool" />', {
        values: [{ value: 'cool', newValue: 'props.color', literal: true }],
      }),
    ).toMatchInlineSnapshot(`"<div something={props.color} />;"`)
  })
})
