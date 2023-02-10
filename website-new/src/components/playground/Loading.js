import * as React from 'react'
import styled, { keyframes } from '@xstyled/styled-components'

const fadeIn = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0.4; }
`

const Loader = styled.div`
  flex: 1;
  animation: ${fadeIn} 1000ms ease-in infinite alternate;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30%;
`

export const Loading = () => {
  return <Loader style={{ backgroundImage: 'img/home-logo.png' }} />
}
