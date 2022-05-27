import { transform } from '@babel/core'
import plugin from '.'

const testPlugin = (code: string, tag: string = 'title') => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', tag ? () => plugin(tag) : plugin],
    configFile: false,
  })

  return result?.code
}

const testTitlePlugin = (code: string) => {
  return testPlugin(code)
}

const testDescPlugin = (code: string) => {
  return testPlugin(code, 'desc')
}

describe('title plugin', () => {
  it('should add title attribute if not present', () => {
    expect(testTitlePlugin('<svg></svg>')).toMatchInlineSnapshot(
      `"<svg>{title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
  })

  it('should add title element and fallback to existing title', () => {
    // testing when the existing title contains a simple string
    expect(
      testTitlePlugin(`<svg><title>Hello</title></svg>`),
    ).toMatchInlineSnapshot(
      `"<svg>{title === undefined ? <title id={titleId}>Hello</title> : title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
    // testing when the existing title contains an JSXExpression
    expect(
      testTitlePlugin(`<svg><title>{"Hello"}</title></svg>`),
    ).toMatchInlineSnapshot(
      `"<svg>{title === undefined ? <title id={titleId}>{\\"Hello\\"}</title> : title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
  })
  it('should preserve any existing title attributes', () => {
    // testing when the existing title contains a simple string
    expect(
      testTitlePlugin(`<svg><title id='a'>Hello</title></svg>`),
    ).toMatchInlineSnapshot(
      `"<svg>{title === undefined ? <title id={titleId || 'a'}>Hello</title> : title ? <title id={titleId || 'a'}>{title}</title> : null}</svg>;"`,
    )
  })
  it('should support empty title', () => {
    expect(testTitlePlugin('<svg><title></title></svg>')).toMatchInlineSnapshot(
      `"<svg>{title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
  })
  it('should support self closing title', () => {
    expect(testTitlePlugin('<svg><title /></svg>')).toMatchInlineSnapshot(
      `"<svg>{title ? <title id={titleId}>{title}</title> : null}</svg>;"`,
    )
  })

  it('should work if an attribute is already present', () => {
    expect(testTitlePlugin('<svg><foo /></svg>')).toMatchInlineSnapshot(
      `"<svg>{title ? <title id={titleId}>{title}</title> : null}<foo /></svg>;"`,
    )
  })
})

describe('desc plugin', () => {
  it('should add desc attribute if not present', () => {
    expect(testDescPlugin('<svg></svg>')).toMatchInlineSnapshot(
      `"<svg>{desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
  })

  it('should add desc element and fallback to existing desc', () => {
    // testing when the existing desc contains a simple string
    expect(
      testDescPlugin(`<svg><desc>Hello</desc></svg>`),
    ).toMatchInlineSnapshot(
      `"<svg>{desc === undefined ? <desc id={descId}>Hello</desc> : desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
    // testing when the existing desc contains an JSXExpression
    expect(
      testDescPlugin(`<svg><desc>{"Hello"}</desc></svg>`),
    ).toMatchInlineSnapshot(
      `"<svg>{desc === undefined ? <desc id={descId}>{\\"Hello\\"}</desc> : desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
  })
  it('should preserve any existing desc attributes', () => {
    // testing when the existing desc contains a simple string
    expect(
      testDescPlugin(`<svg><desc id='a'>Hello</desc></svg>`),
    ).toMatchInlineSnapshot(
      `"<svg>{desc === undefined ? <desc id={descId || 'a'}>Hello</desc> : desc ? <desc id={descId || 'a'}>{desc}</desc> : null}</svg>;"`,
    )
  })
  it('should support empty desc', () => {
    expect(testDescPlugin('<svg><desc></desc></svg>')).toMatchInlineSnapshot(
      `"<svg>{desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
  })
  it('should support self closing desc', () => {
    expect(testDescPlugin('<svg><desc /></svg>')).toMatchInlineSnapshot(
      `"<svg>{desc ? <desc id={descId}>{desc}</desc> : null}</svg>;"`,
    )
  })

  it('should work if an attribute is already present', () => {
    expect(testDescPlugin('<svg><foo /></svg>')).toMatchInlineSnapshot(
      `"<svg>{desc ? <desc id={descId}>{desc}</desc> : null}<foo /></svg>;"`,
    )
  })
})
