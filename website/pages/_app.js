import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'

export default class WebsiteApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>SVGR: The SVG to JSX transformer</title>
          <meta
            name="description"
            content="Transform SVG into JSX React components with SVGR."
          />
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}
