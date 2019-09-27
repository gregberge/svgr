/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Box, styled, up, down, css, th } from '@smooth-ui/core-sc'
import Settings from 'components/playground/Settings'
import svgr from 'components/playground/modules/svgr'
import defaultSvg from 'components/playground/defaultSVG'
import DropArea from 'components/playground/DropArea'
import Loading from 'components/playground/Loading'
import {
  settings,
  getInitialState,
  transformSettings,
} from 'components/playground/config/settings'
import CodeFund from './CodeFund'

const GlobalStyle = createGlobalStyle`
  .loading {
    transition: opacity 300ms;
    opacity: 0.5;
  }

  .ace_gutter {
    ${down(
      'sm',
      css`
        width: 5px !important;
      `,
    )}
  }
`

const editorProps = { $blockScrolling: true }

const PlaygroundContainer = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100vh - ${th('sizes.header-height')}px);
  ${up('md', 'flex-direction: row;')}
`

const PlaygroundEditors = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 50%;
  ${up('md', 'height: 100%;')}
`

const FloatingAd = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 500;
  ${down('md', 'display: none;')}
`

class Playground extends React.Component {
  state = {
    input: defaultSvg,
    settings: getInitialState(),
    output: '',
    loading: false,
    Editor: null,
  }

  componentDidMount() {
    import('components/playground/Editor').then(({ default: Editor }) =>
      this.setState({ Editor }),
    )
    this.transform(this.state)
  }

  transformId = 0

  handleInputChange = async input => {
    this.setState({ input })
    this.transform({ input, settings: this.state.settings })
  }

  handleSettingsChange = settings => {
    this.setState({ settings })
    this.transform({ settings, input: this.state.input })
  }

  async transform({ input, settings }) {
    if (input.trim() === '') {
      this.setState({ output: '' })
      return
    }

    this.setState({ loading: true })

    try {
      /* eslint-disable-next-line no-plusplus */
      const transformId = ++this.transformId
      const output = await svgr(input, transformSettings(settings))
      if (transformId === this.transformId) {
        this.setState({ output })
        this.setState({ loading: false })
      }
    } catch (error) {
      // We do nothing and assume that provided code is not correct
    }
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <PlaygroundContainer
          display="flex"
          flex="1 0 auto"
          backgroundColor="white"
        >
          <Settings
            settings={settings}
            onChange={this.handleSettingsChange}
            initialValues={this.state.settings}
          />
          {this.state.Editor ? (
            <PlaygroundEditors>
              <Box flex={1}>
                <DropArea onChange={this.handleInputChange}>
                  <this.state.Editor
                    width="100%"
                    height="100%"
                    showPrintMargin={false}
                    mode="xml"
                    theme="tomorrow_night"
                    onChange={this.handleInputChange}
                    value={this.state.input}
                    name="input"
                    editorProps={editorProps}
                    scrollMargin={[10, 0, 0, 0]}
                    fontSize={13}
                  />
                </DropArea>
              </Box>
              <Box flex={1} className={this.state.loading ? 'loading' : ''}>
                <this.state.Editor
                  width="100%"
                  height="100%"
                  showPrintMargin={false}
                  mode="jsx"
                  theme="tomorrow_night"
                  value={this.state.output}
                  name="output"
                  readOnly
                  editorProps={editorProps}
                  scrollMargin={[10, 0, 0, 0]}
                  fontSize={13}
                />
              </Box>
            </PlaygroundEditors>
          ) : (
            <Loading />
          )}
          <FloatingAd>
            <CodeFund />
          </FloatingAd>
        </PlaygroundContainer>
      </>
    )
  }
}

export default Playground
