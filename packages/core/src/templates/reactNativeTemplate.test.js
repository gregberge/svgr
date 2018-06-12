import reactNativeTemplate from './reactNativeTemplate'

describe('reactNativeTemplate', () => {
  it('should wrap code into a component', () => {
    expect(
      reactNativeTemplate('<Svg />', {}, { componentName: 'Test' }),
    ).toMatchSnapshot()
    expect(
      reactNativeTemplate(
        '<Svg />',
        { titleProp: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
    expect(
      reactNativeTemplate('<Svg />', { ref: true }, { componentName: 'Test' }),
    ).toMatchSnapshot()
    expect(
      reactNativeTemplate(
        '<Svg />',
        { expandProps: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
    expect(
      reactNativeTemplate(
        '<Svg />',
        { titleProp: true, ref: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
    expect(
      reactNativeTemplate(
        '<Svg />',
        { titleProp: true, expandProps: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
    expect(
      reactNativeTemplate(
        '<Svg />',
        { ref: true, expandProps: true },
        { componentName: 'Test' },
      ),
    ).toMatchSnapshot()
  })

  it('should import used components', () => {
    expect(
      reactNativeTemplate(
        '<Svg />',
        {},
        {
          componentName: 'Test',
          reactNativeSvgReplacedComponents: new Set(['Group']),
        },
      ),
    ).toMatchSnapshot()
  })

  it('should log unsupported components', () => {
    expect(
      reactNativeTemplate(
        '<Svg />',
        {},
        {
          componentName: 'Test',
          unsupportedComponents: new Set(['Group']),
        },
      ),
    ).toMatchSnapshot()
  })
})
