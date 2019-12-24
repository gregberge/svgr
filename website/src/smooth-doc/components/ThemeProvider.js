import React from 'react'
import { ThemeProvider as SCThemeProvider } from '@xstyled/styled-components'
import deepmerge from 'deepmerge'
import { theme as suiTheme } from '@smooth-ui/core-sc'
import { theme as smoothDocTheme } from 'smooth-doc/src/components/ThemeProvider'

const theme = deepmerge(
  { ...smoothDocTheme, useCustomProperties: false },
  suiTheme,
)

export function ThemeProvider({ children }) {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
}
