import * as React from 'react'
import styled, { up, css } from '@xstyled/styled-components'
import {
  useDisclosureState,
  DisclosureContent,
  Disclosure,
} from 'reakit/Disclosure'
import { IoChevronBack } from 'react-icons/io5'

const Marker = styled(IoChevronBack)`
  width: 18;
  height: 18;
  transition: base;
  transition-property: transform;
  transform: rotate(90deg);

  ${up(
    'md',
    css`
      transform: rotate(0);
    `,
  )}
`

const Button = styled.button`
  font-size: 15;
  height: 28;
  font-weight: 500;
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  border: 0;
  border-bottom: 1;
  border-color: layout-border;
  appearance: none;
  margin: 0;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
  width: 100%;

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
  display: grid;
  gap: 1;
  padding: 2;
  border-bottom: 1;
  border-color: layout-border;
`

export function SettingsGroup({ title, children }) {
  const disclosure = useDisclosureState({ visible: true })
  return (
    <div>
      <Disclosure {...disclosure}>
        {(DisclosureProps) => (
          <Button {...DisclosureProps}>
            {title} <Marker />
          </Button>
        )}
      </Disclosure>
      <DisclosureContent as={Content} {...disclosure}>
        {children}
      </DisclosureContent>
    </div>
  )
}
