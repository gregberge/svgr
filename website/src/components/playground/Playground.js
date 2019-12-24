/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import styled, {
  Box,
  createGlobalStyle,
  up,
  down,
  css,
} from '@xstyled/styled-components'
import {
  useDialogState,
  Dialog as ReakitDialog,
  DialogBackdrop as ReakitDialogBackdrop,
} from 'reakit/Dialog'
import { lighten } from 'polished'
import { Button } from '@smooth-ui/core-sc'
import { Settings } from './Settings'
import { svgr } from './modules/svgr'
import defaultSvg from './defaultSVG'
import { DropArea } from './DropArea'
import { Loading } from './Loading'
import { settings, getInitialState, transformSettings } from './config/settings'
import { CodeFund } from './CodeFund'

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

const PlaygroundContainer = styled.box`
  display: flex;
  flex-direction: column;
  background-color: lighter;
  height: calc(100vh - 67px);

  ${up(
    'md',
    css`
      flex-direction: row;
    `,
  )}
`

const PlaygroundEditors = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: lighter;
  height: 50%;

  ${up(
    'md',
    css`
      height: 100%;

      > :first-child {
        border-right: 1px solid;
        border-color: light400;
      }
    `,
  )}
`

const FloatingAd = styled.div`
  position: absolute;
  bottom: 16;
  right: 16;
  z-index: 500;
  background-color: black !important;
  ${down(
    'md',
    css`
      display: none;
    `,
  )}
`

const EditorTitle = styled.div`
  background-color: light100;
  color: light900;
  padding: 4 8;
  font-size: 12;
  text-transform: uppercase;
  font-weight: bold;
  border-bottom: 1px solid;
  border-color: light400;
`

const InnerDialog = styled.div`
  background-color: light900;
  color: lighter;
  position: fixed;
  top: 20%;
  left: 50%;
  max-width: 90%;
  min-width: 500;
  transform: translateX(-50%);
  border-radius: 10;
  padding: 8;
  outline: 0;
  z-index: 999;
  box-shadow: 5px 5px rgba(50, 50, 50, 0.4), 10px 10px rgba(50, 50, 50, 0.3),
    15px 15px rgba(50, 50, 50, 0.2), 20px 20px rgba(50, 50, 50, 0.1),
    25px 25px rgba(50, 50, 50, 0.05);
`

const InnerBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: light800;
  opacity: 0.4;
  z-index: 899;
`

const ThankBody = styled.div`
  text-align: center;

  a {
    color: lighter;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  h2 {
    font-size: 18;
    font-weight: 500;
  }
`

const SponsorButton = styled(Button)`
  font-weight: 500;
  color: white;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.4), 0 0 3px rgba(0, 0, 0, 0.2);
  min-width: 300;
  text-decoration: none !important;

  &:hover {
    color: white !important;
    transform: scale(1.2);
  }
`

function CopyFeedback(props) {
  return (
    <>
      <ReakitDialogBackdrop as={InnerBackdrop} {...props} />
      <ReakitDialog as={InnerDialog} {...props} aria-label="Thank you">
        <ThankBody>
          <h2>
            SVGR is made with ❤️ by{' '}
            <a
              href="https://gregberge.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Greg Bergé
            </a>
          </h2>
          <p>
            Glad it helps!
            <br />A few ways to say thank you 👇
          </p>
          <Box my={24}>
            <SponsorButton
              forwardedAs="a"
              href="https://github.com/sponsors/gregberge"
              target="_blank"
              rel="noopener noreferrer"
              variant={lighten(0.1, '#EA4BAA')}
            >
              ❤️ Sponsor me on GitHub
            </SponsorButton>
          </Box>
          <Box my={24}>
            <SponsorButton
              forwardedAs="a"
              href="https://opencollective.com/svgr"
              target="_blank"
              rel="noopener noreferrer"
              variant={lighten(0.1, '#2A7EFF')}
            >
              💸 Donate on OpenCollective
            </SponsorButton>
          </Box>
          <Box my={24}>
            <SponsorButton
              forwardedAs="a"
              href="https://twitter.com/neoziro"
              target="_blank"
              rel="noopener noreferrer"
              variant={lighten(0.1, '#1DA1F3')}
            >
              😉 Follow me on Twitter
            </SponsorButton>
          </Box>
        </ThankBody>
      </ReakitDialog>
    </>
  )
}

const Editor = React.lazy(() => import('components/playground/Editor'))

function ClientOnly({ children }) {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    setVisible(true)
  })
  return visible && children
}

export function Playground() {
  const [input, setInput] = React.useState(defaultSvg)
  const [output, setOutput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [state, setState] = React.useState(getInitialState)

  const dialog = useDialogState({ visible: false })

  const transformIdRef = React.useRef(0)

  async function transform(input) {
    if (input.trim() === '') {
      setOutput('')
      return
    }

    setLoading(true)

    try {
      /* eslint-disable-next-line no-plusplus */
      const transformId = ++transformIdRef.current
      const output = await svgr(input, transformSettings(state))
      if (transformId === transformIdRef.current) {
        setOutput(output)
        setLoading(false)
      }
    } catch (error) {
      // We do nothing and assume that provided code is not correct
    }
  }

  function handleInputChange(input) {
    setInput(input)
    transform(input)
  }

  React.useEffect(() => {
    transform(input)
  }, [])

  return (
    <>
      <GlobalStyle />
      <ClientOnly>
        <PlaygroundContainer>
          <Settings
            settings={settings}
            initialValues={state}
            onChange={setState}
          />
          <React.Suspense fallback={<Loading />}>
            <PlaygroundEditors>
              <Box flex={1} display="flex" flexDirection="column">
                <EditorTitle>SVG input</EditorTitle>
                <Box flex={1} position="relative">
                  <DropArea onChange={handleInputChange}>
                    <Editor
                      name="input"
                      mode="xml"
                      onChange={handleInputChange}
                      value={input}
                    />
                  </DropArea>
                </Box>
              </Box>
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                className={loading ? 'loading' : ''}
              >
                <EditorTitle>JSX output</EditorTitle>
                <Box
                  flex={1}
                  position="relative"
                  onKeyDown={event => {
                    // Detect copy
                    if ((event.metaKey || event.ctrlKey) && event.key === 'c') {
                      dialog.show()
                    }
                  }}
                >
                  <Editor name="output" mode="jsx" readOnly value={output} />
                </Box>
              </Box>
            </PlaygroundEditors>
          </React.Suspense>
          <CopyFeedback {...dialog} />
          <FloatingAd>
            <CodeFund />
          </FloatingAd>
        </PlaygroundContainer>
      </ClientOnly>
    </>
  )
}
