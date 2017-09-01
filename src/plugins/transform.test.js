import transform from './transform'

describe('transform', () => {
  it('should wrap it into component', () => {
    const result = transform(
      `<div />`,
      { transform: (code, state) => `${state.foo}${code}` },
      { foo: 'bar' },
    )

    expect(result).toBe('bar<div />')
  })
})
