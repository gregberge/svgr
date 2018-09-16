import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0.4; }
`

const Loading = styled.div`
  flex: 1;
  animation: ${fadeIn} 1000ms ease-in infinite alternate;
  background: url('/static/svgr-logo.png') center no-repeat;
  background-size: 30%;
`

export default Loading
