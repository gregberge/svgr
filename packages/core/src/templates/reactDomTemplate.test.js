import reactDomTemplate from './reactDomTemplate'

describe('reactDomTemplate', () => {
  it('should wrap code into a component', () => {
    expect(
      reactDomTemplate('<Svg />', {}, { componentName: 'Test' }),
    ).toMatchSnapshot()
    expect(
      reactDomTemplate(
        '<Svg />',
        { titleProp: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
    expect(
      reactDomTemplate('<Svg />', { ref: true }, { componentName: 'Test' }),
    ).toMatchSnapshot()
    expect(
      reactDomTemplate(
        '<Svg />',
        { expandProps: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
    expect(
      reactDomTemplate(
        '<Svg />',
        { titleProp: true, ref: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
    expect(
      reactDomTemplate(
        '<Svg />',
        { titleProp: true, expandProps: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
    expect(
      reactDomTemplate(
        '<Svg />',
        { ref: true, expandProps: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
  })
})
