import React from 'react'
import styled, { keyframes } from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'

const QUERY = graphql`
  query Loading {
    logo: file(relativePath: { eq: "logo.png" }) {
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
  background: url(${p => p.backgroundImage}) center no-repeat;
  background-size: 30%;
`

const Loading = () => (
  <StaticQuery
    query={QUERY}
    render={data => (
      <Loader backgroundImage={data.logo.childImageSharp.fluid.src} />
    )}
  />
)

export default Loading
