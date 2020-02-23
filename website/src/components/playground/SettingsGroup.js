import * as React from 'react'
import styled, { up, css, Box } from '@xstyled/styled-components'
import { useHiddenState, Hidden, HiddenDisclosure } from 'reakit/Hidden'
import { ChevronLeft } from 'components/playground/icons/ChevronLeft'

const Container = styled.div`
  border-right: 1px solid;
  border-color: light400;
`

const Marker = styled(ChevronLeft)`
  width: 18;
  height: 18;
  transition: base;
  transform: rotate(90deg);

  ${up(
    'md',
    css`
      transform: rotate(0);
    `,
  )}
`

const Button = styled.buttonBox`
  font-size: 15;
  font-weight: bold;
  padding: 8 16;
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  transition: base;
  border: 0;
  border-bottom: 1px solid;
  border-color: light400;
  appearance: none;
  margin: 0;
  width: 100%;
  text-align: left;

  &[aria-expanded='true'] {
    ${Marker} {
      transform: rotate(-90deg);
    }
  }

  &:focus,
  &:hover {
    background-color: light200;
    outline: none;
  }
`

const Content = styled.div`
  border-bottom: 1px solid;
  border-color: light400;
`

export function SettingsGroup({ title, children }) {
  const hidden = useHiddenState({ visible: true })
  return (
    <Container>
      <HiddenDisclosure {...hidden}>
        {hiddenDisclosureProps => (
          <Button row {...hiddenDisclosureProps}>
            <Box col>{title}</Box>
            <Box col="auto">
              <Marker />
            </Box>
          </Button>
        )}
      </HiddenDisclosure>
      <Hidden as={Content} {...hidden}>
        {children}
      </Hidden>
    </Container>
  )
}
