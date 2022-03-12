/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react'
import { useState, useEffect, lazy, useRef, Suspense } from 'react'
import styled, { x, createGlobalStyle } from '@xstyled/styled-components'
import {
  useDialogState,
  Dialog as ReakitDialog,
  DialogBackdrop as ReakitDialogBackdrop,
} from 'reakit/Dialog'
import { CarbonAd } from 'smooth-doc/src/components/CarbonAd'
import { lighten } from 'polished'
import { Settings } from './Settings'
import { svgr } from './modules/svgr'
import defaultSvg from './defaultSVG'
import { DropArea } from './DropArea'
import { Loading } from './Loading'
import { settings, getInitialState, stateToSettings } from './config/settings'
import { useQuery } from './Query'

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
  }

  .xstyled-color-mode-dark {
    color-scheme: dark;
  }

  .loading {
    transition: opacity 300ms;
    opacity: 0.5;
  }

  .ace_gutter {
    @media(max-width: sm) {
      width: 5px !important;
    }
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  height: calc(100vh - 50px);
  background-color: background;
`

const Editors = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  > :first-child {
    border-right: 1px solid;
    border-color: layout-border;
  }
`

const EditorContainer = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  transition: opacity 300ms;

  &[data-loading] {
    opacity: 0.5;
  }
`

const FloatingAd = styled.div`
  position: absolute;
  bottom: 16;
  right: 16;
  z-index: 500;
  width: 400;
`

const EditorTitleContainer = styled.div`
  padding: 0 2;
  font-size: 12;
  height: 28;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  border-bottom: 1;
  border-color: layout-border;
  color: on-background-light;
`

const EditorTitle = styled.h3`
  display: flex;
  align-items: center;
  font-weight: bold;
`

const EditorTitleButton = styled.button`
  border-radius: 4;
  height: 20;
`

const InnerDialog = styled.div`
  background-color: background-light;
  color: on-background;
  position: fixed;
  top: 20%;
  left: 50%;
  max-width: 90%;
  min-width: 600;
  transform: translateX(-50%);
  border-radius: 10;
  padding: 5;
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
  background-color: on-background;
  opacity: 0.4;
  z-index: 899;
`

const ThankBody = styled.div`
  text-align: center;

  h2 {
    font-size: 18;
    font-weight: 500;
    margin: 2;
  }
`

const Link = styled.a`
  display: inline-block;
  color: inherit;
  transition: base;

  &:hover {
    text-decoration: none;
    transform: translateY(-2px);
  }
`

const SponsorLink = styled.aBox`
  display: inline-block;
  font-weight: 500;
  color: white;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.4), 0 0 3px rgba(0, 0, 0, 0.2);
  min-width: 300;
  text-decoration: none !important;
  padding: 2;
  border-radius: 3;
  transition: base;

  &:hover {
    color: white;
    transform: scale(1.08);
  }
`

function trackLink(event) {
  if (window.ga) {
    event.preventDefault()
    const url = event.currentTarget.href
    window.ga('send', 'event', 'outbound', 'click', url, {
      transport: 'beacon',
      hitCallback() {
        document.location = url
      },
    })
  }
}

function CopyFeedback(props) {
  return (
    <>
      <ReakitDialogBackdrop as={InnerBackdrop} {...props} />
      <ReakitDialog as={InnerDialog} {...props} aria-label="Thank you">
        <ThankBody>
          <h2>
            SVGR is made with ❤️ by{' '}
            <Link
              onClick={trackLink}
              href="https://gregberge.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Greg Bergé
            </Link>
          </h2>
          <p>
            Glad it helps!
            <br />A few ways to say thank you 👇
          </p>
          <x.div my={24}>
            <SponsorLink
              onClick={trackLink}
              href="https://github.com/sponsors/gregberge"
              target="_blank"
              rel="noopener noreferrer"
              bg="#EA4BAA"
            >
              ❤️ Sponsor me on GitHub
            </SponsorLink>
          </x.div>
          <x.div my={24}>
            <SponsorLink
              onClick={trackLink}
              href="https://opencollective.com/svgr"
              target="_blank"
              rel="noopener noreferrer"
              bg="#2A7EFF"
            >
              💸 Donate on OpenCollective
            </SponsorLink>
          </x.div>
          <x.div my={24}>
            <SponsorLink
              onClick={trackLink}
              href="https://twitter.com/neoziro"
              target="_blank"
              rel="noopener noreferrer"
              bg="#1DA1F3"
            >
              😉 Follow me on Twitter
            </SponsorLink>
          </x.div>
        </ThankBody>
      </ReakitDialog>
    </>
  )
}

const Editor = lazy(() => import('./Editor'))

const ClientOnly = ({ children }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(true)
  }, [])
  return visible ? children : null
}

const Copy = 'Copy'
const Copied = 'Copied!'

export function Playground() {
  const [input, setInput] = useState(defaultSvg)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [state, setState] = useQuery(getInitialState)
  const dialog = useDialogState({ visible: false })
  const dialogDisplayedRef = useRef(false)

  const transformIdRef = useRef(0)

  useEffect(() => {
    async function transform() {
      if (input.trim() === '') {
        setOutput('')
        return
      }

      setLoading(true)

      if (window.ga) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'Playground',
          eventAction: 'transform',
        })
      }

      try {
        /* eslint-disable-next-line no-plusplus */
        const transformId = ++transformIdRef.current
        const output = await svgr(input, stateToSettings(state))
        if (transformId === transformIdRef.current) {
          setOutput(output)
          setLoading(false)
        }
      } catch (error) {
        // We do nothing and assume that provided code is not correct
      }
    }

    transform()
  }, [input, JSON.stringify(state)])

  const handleButtonClick = (event) => {
    navigator.clipboard.writeText(output)
    !dialogDisplayedRef.current &&
      setTimeout(() => {
        dialog.show()
        dialogDisplayedRef.current = true
      }, 50)
    const button = event.target
    button.innerText = Copied
    setTimeout(() => {
      button.innerText = Copy
    }, 2000)
  }

  return (
    <>
      <GlobalStyle />
      <ClientOnly>
        <Container>
          <Settings
            settings={settings}
            initialValues={state}
            onChange={setState}
          />
          <Suspense fallback={<Loading />}>
            <Editors>
              <EditorContainer>
                <EditorTitleContainer>
                  <EditorTitle>SVG input</EditorTitle>
                </EditorTitleContainer>
                <DropArea onChange={setInput}>
                  <Editor
                    name="input"
                    mode="xml"
                    onChange={setInput}
                    value={input}
                  />
                </DropArea>
              </EditorContainer>
              <EditorContainer
                data-loading={loading ? '' : undefined}
                onKeyDown={(event) => {
                  if (dialogDisplayedRef.current) return
                  // Detect copy
                  if ((event.metaKey || event.ctrlKey) && event.key === 'c') {
                    setTimeout(() => {
                      dialog.show()
                      dialogDisplayedRef.current = true
                    }, 50)
                  }
                }}
              >
                <EditorTitleContainer>
                  <EditorTitle>JSX output</EditorTitle>
                  <EditorTitleButton onClick={handleButtonClick}>
                    {Copy}
                  </EditorTitleButton>
                </EditorTitleContainer>
                <Editor name="output" mode="jsx" readOnly value={output} />
              </EditorContainer>
            </Editors>
          </Suspense>
          <CopyFeedback {...dialog} />
          <FloatingAd>
            <CarbonAd />
          </FloatingAd>
        </Container>
      </ClientOnly>
    </>
  )
}
