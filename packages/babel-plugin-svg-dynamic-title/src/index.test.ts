import { transform } from '@babel/core'
import plugin, { Options } from '.'

const testPlugin = (code: string, options: Options = { tag: 'title' }) => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', [plugin, options]],
    configFile: false,
  })

  return result?.code
}

describe('title plugin', () => {
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
      `"<svg>{title === undefined ? <title id={titleId}>{"Hello"}</title> : title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
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

describe('desc plugin', () => {
  it('should add desc attribute if not present', () => {
    expect(testPlugin('<svg></svg>', { tag: 'desc' })).toMatchInlineSnapshot(
      `"<svg>{desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
  })

  it('should add desc element and fallback to existing desc', () => {
    // testing when the existing desc contains a simple string
    expect(
      testPlugin(`<svg><desc>Hello</desc></svg>`, { tag: 'desc' }),
    ).toMatchInlineSnapshot(
      `"<svg>{desc === undefined ? <desc id={descId}>Hello</desc> : desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
    // testing when the existing desc contains an JSXExpression
    expect(
      testPlugin(`<svg><desc>{"Hello"}</desc></svg>`, { tag: 'desc' }),
    ).toMatchInlineSnapshot(
      `"<svg>{desc === undefined ? <desc id={descId}>{"Hello"}</desc> : desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
  })
  it('should preserve any existing desc attributes', () => {
    // testing when the existing desc contains a simple string
    expect(
      testPlugin(`<svg><desc id='a'>Hello</desc></svg>`, { tag: 'desc' }),
    ).toMatchInlineSnapshot(
      `"<svg>{desc === undefined ? <desc id={descId || 'a'}>Hello</desc> : desc ? <desc id={descId || 'a'}>{desc}</desc> : null}</svg>;"`,
    )
  })
  it('should support empty desc', () => {
    expect(
      testPlugin('<svg><desc></desc></svg>', { tag: 'desc' }),
    ).toMatchInlineSnapshot(
      `"<svg>{desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
  })
  it('should support self closing desc', () => {
    expect(
      testPlugin('<svg><desc /></svg>', { tag: 'desc' }),
    ).toMatchInlineSnapshot(
      `"<svg>{desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
  })

  it('should work if an attribute is already present', () => {
    expect(
      testPlugin('<svg><foo /></svg>', { tag: 'desc' }),
    ).toMatchInlineSnapshot(
      `"<svg>{desc ? <desc id={descId}>{desc}</desc> : null}<foo /></svg>;"`,
    )
  })
})
