import React from 'react'
import styled from 'styled-components'
import Github from 'components/icons/Github'

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: linear-gradient(to bottom, #b0503a 0%, #893e29 100%);
  color: #fff;
`
const Logo = styled.div`
  width: 35px;
  height: 35px;
  background-image: url('/static/svgr-logo.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #fff;
`
const Title = styled.h1`
  font-size: 20px;
  font-weight: 300;
  flex: 1;
`

const Social = styled.div`
  font-size: 20px;

  a {
    color: #fff;
    margin-left: 10px;
  }

  svg {
    width: 35px;
    height: 35px;
  }
`

const Smooth = styled.div`
  font-size: 11px;
  font-weight: 300;
  margin-right: 20px;

  a {
    color: #fff;
  }
`

const Header = () => (
  <Container>
    <Logo />
    <Title>SVGR : The SVG to JSX transformer</Title>
    <Smooth>
      Made with{' '}
      <span role="img" aria-label="love">
        ❤️
      </span>{' '}
      by <a href="https://www.smooth-code.com">Smooth Code</a>
    </Smooth>
    <Social>
      <a href="https://github.com/smooth-code/svgr">
        <Github />
      </a>
    </Social>
  </Container>
)

export default Header
