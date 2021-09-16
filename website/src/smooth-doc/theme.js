import { theme as baseTheme, primaryColor } from 'smooth-doc/src/theme'

export const theme = {
  ...baseTheme,
  colors: { ...baseTheme.colors, ...primaryColor('orange') },
}
