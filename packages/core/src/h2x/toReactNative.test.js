import jsx from 'h2x-plugin-jsx'
import { transform } from 'h2x-core'
import toReactNative from './toReactNative'

describe('toReactNative', () => {
  it('should take svg and convert it to react-native', () => {
    const result = transform(
      `
      <svg>
        <defs>
          <mask id="mask1" x="0" y="0" width="100" height="100" >
            <rect x="0" y="0" width="100" height="50"
                style="stroke:none; fill: #ffffff"/>
          </mask>
        </defs>    
        <image xlink:href="firefox.jpg" x="0" y="0" height="50px" width="50px"/>        
        <rect x="1" y="1" width="100" height="100"
            style="stroke: none; fill: #0000ff; mask: url(#mask1)"/>
        </svg>
    `,
      { plugins: [jsx, toReactNative()] },
    )

    expect(result).toMatchSnapshot()
  })
})
