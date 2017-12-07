import jsx from 'h2x-plugin-jsx'
import h2x from '../plugins/h2x'
import toReactNative from './toReactNative'

describe('toReactNative', () => {
  it('should take svg and convert it to react-native', () => {
    const result = h2x(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, toReactNative] },
    )

    expect(result.trim()).toBe(`<Svg>
  <G stroke="#063855" strokeWidth={2}>
    <Path d="M51,37 L37,51" id="Shape" />
  </G>
</Svg>`)
  })
})
