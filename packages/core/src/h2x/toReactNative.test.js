import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import toReactNative from './toReactNative'

describe('toReactNative', () => {
  it('should take svg and convert it to react-native', () => {
    const result = transform(
      `
      <svg>
        <g stroke="#063855" stroke-width="2">
          <path d="M51,37 L37,51" id="Shape"></path>
        </g>
      </svg>
    `,
      { plugins: [jsx, toReactNative()] },
    )

    expect(result).toMatchSnapshot()
  })
})
