import * as React from 'react'
import { Link } from 'gatsby'
import {
  Button,
  Hero,
  HeroBody,
  HeroSection,
  HeroTitle,
  HeroTeaser,
  ScreenContainer,
  HeroActionList,
  HeroAction,
  FeatureSection,
  FeatureList,
  Feature,
  FeatureTitle,
  FeatureText,
} from 'smooth-doc/components'
import heroBackgroundURL from './images/hero-bg.png'

export const Home = () => (
  <>
    <HeroSection>
      <ScreenContainer>
        <Hero backgroundImageURL={heroBackgroundURL}>
          <HeroBody>
            <HeroTitle>Transform SVGs into React components</HeroTitle>
            <HeroTeaser>
              A complete tool box to take advantage of using SVGs in your React
              applications.
            </HeroTeaser>
            <HeroActionList>
              <HeroAction>
                <Button as={Link} to="/docs/getting-started">
                  Getting Started
                </Button>
              </HeroAction>
              <HeroAction>
                <Button
                  variant="neutral"
                  as="a"
                  href="https://github.com/gregberge/svgr"
                >
                  Browse GitHub
                </Button>
              </HeroAction>
            </HeroActionList>
          </HeroBody>
        </Hero>
      </ScreenContainer>
    </HeroSection>
    <FeatureSection>
      <FeatureList>
        <Feature>
          <FeatureTitle>Powerful</FeatureTitle>
          <FeatureText>
            SVGR handles all type of SVG and transforms it into a React
            component.
          </FeatureText>
        </Feature>
        <Feature>
          <FeatureTitle>Universal</FeatureTitle>
          <FeatureText>
            SVGR is everywhere. Available online, in CLI, Node.js, as a webpack
            plugin... The list is long.
          </FeatureText>
        </Feature>
        <Feature>
          <FeatureTitle>Customizable</FeatureTitle>
          <FeatureText>
            SVGR is entirely configurable. Use built-in settings or create your
            own plugin for advanced use-cases.
          </FeatureText>
        </Feature>
        <Feature>
          <FeatureTitle>Used by everyone</FeatureTitle>
          <FeatureText>
            SVGR is literally everywhere. WordPress, Next.js, Create React App.
            You probably already use SVGR in your project.
          </FeatureText>
        </Feature>
      </FeatureList>
    </FeatureSection>
  </>
)
