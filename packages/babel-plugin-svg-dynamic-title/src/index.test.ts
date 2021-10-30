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
  it('should add title attribute if not present', () => {
    expect(testPlugin('<svg></svg>')).toMatchInlineSnapshot(
      `"<svg>{title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
  })

  it('should add title element and fallback to existing title', () => {
    // testing when the existing title contains a simple string
    expect(testPlugin(`<svg><title>Hello</title></svg>`)).toMatchInlineSnapshot(
      `"<svg>{title === undefined ? <title id={titleId}>Hello</title> : title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
    // testing when the existing title contains an JSXExpression
    expect(
      testPlugin(`<svg><title>{"Hello"}</title></svg>`),
    ).toMatchInlineSnapshot(
      `"<svg>{title === undefined ? <title id={titleId}>{\\"Hello\\"}</title> : title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
  })
  it('should preserve any existing title attributes', () => {
    // testing when the existing title contains a simple string
    expect(
      testPlugin(`<svg><title id='a'>Hello</title></svg>`),
    ).toMatchInlineSnapshot(
      `"<svg>{title === undefined ? <title id={titleId || 'a'}>Hello</title> : title ? <title id={titleId || 'a'}>{title}</title> : null}</svg>;"`,
    )
  })
  it('should support empty title', () => {
    expect(testPlugin('<svg><title></title></svg>')).toMatchInlineSnapshot(
      `"<svg>{title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
  })
  it('should support self closing title', () => {
    expect(testPlugin('<svg><title /></svg>')).toMatchInlineSnapshot(
      `"<svg>{title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
  })

  it('should work if an attribute is already present', () => {
    expect(testPlugin('<svg><foo /></svg>')).toMatchInlineSnapshot(
      `"<svg>{title ? <title id={titleId}>{title}</title> : null}<foo /></svg>;"`,
    )
  })
})
