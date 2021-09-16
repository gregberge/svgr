import * as React from 'react'
import styled, { keyframes } from '@xstyled/styled-components'
import { graphql, StaticQuery } from 'gatsby'

const QUERY = graphql`
  query Loading {
    logo: file(relativePath: { eq: "home-logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

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
  return (
    <StaticQuery
      query={QUERY}
      render={(data) => (
        <Loader
          style={{ backgroundImage: data.logo.childImageSharp.fluid.src }}
        />
      )}
    />
  )
}
