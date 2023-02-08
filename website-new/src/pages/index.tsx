import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={styles.heroOuter}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroMain}>
            <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.heroButtons}>
              <Link
                className={clsx(styles.heroButton, styles.primary)}
                href="/docs/getting-started"
              >
                Getting started
              </Link>
              <Link
                className={styles.heroButton}
                href="https://github.com/gregberge/svgr"
              >
                Browse GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresInner}>
        <div className={styles.featuresItem}>
          <h2 className={styles.featuresItemTitle}>Powerful</h2>
          <p>
            SVGR handles all type of SVG and transforms it into a React
            component.
          </p>
        </div>

        <div className={styles.featuresItem}>
          <h2 className={styles.featuresItemTitle}>Universal</h2>
          <p>
            SVGR is everywhere. Available online, in CLI, Node.js, as a webpack
            plugin... The list is long.
          </p>
        </div>

        <div className={styles.featuresItem}>
          <h2 className={styles.featuresItemTitle}>Customizable</h2>
          <p>
            SVGR is entirely configurable. Use built-in settings or create your
            own plugin for advanced use-cases.
          </p>
        </div>

        <div className={styles.featuresItem}>
          <h2 className={styles.featuresItemTitle}>Used by everyone</h2>
          <p>
            SVGR is literally everywhere. WordPress, Next.js, Create React App.
            You probably already use SVGR in your project.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
