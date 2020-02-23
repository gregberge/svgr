/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import Helmet from 'react-helmet'
import { HomeHero, ShowCase, BaseLayout } from 'smooth-doc/components'

export default function Index() {
  return (
    <BaseLayout>
      <Helmet>
        <title>SVGR - Transform SVG into React components</title>
      </Helmet>

      <HomeHero title="Transform SVGs into React components." />

      <ShowCase>
        <Box maxWidth={660} px={20}>
          <Box row>
            <Box col={{ xs: 1, md: true }}>
              <h2>What is it?</h2>
              <ul>
                <li>A SVG to React transformer</li>
                <li>A Node library</li>
                <li>A CLI tool</li>
                <li>A webpack plugin</li>
              </ul>
            </Box>
            <Box col={{ xs: 1, md: 'auto' }}>
              <h2>Why</h2>
              <ul>
                <li>Easy integration</li>
                <li>Flexibility</li>
                <li>Performances</li>
              </ul>
            </Box>
          </Box>
        </Box>
      </ShowCase>
    </BaseLayout>
  )
}
