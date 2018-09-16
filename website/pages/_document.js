import React from 'react'
import NextDocument, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class Document extends NextDocument {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>SVGR: The SVG to JSX transformer</title>
          <meta
            name="description"
            content="Transform SVG into JSX React components with SVGR."
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Document
