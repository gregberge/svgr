import { transparentize } from 'polished'

const secondaryColor = '#063855'
const accentColor = '#B0503A'

export default {
  fontFamilies: {
    primary: 'Lato',
  },
  colors: {
    primary: '#eb4755',
    secondary: secondaryColor,
    secondaryLight: '#E6EBEE',
    accent: accentColor,
    grayLight: '#f6f6f6',
    gray: '#515355',
    grayDark: '#333',
    layoutBorderColor: transparentize(0.9, secondaryColor),
    controlText: transparentize(0.2, secondaryColor),
    controlBorder: '#d7d7d7',
    controlBorderFocus: '#515355',
    disabledControl: transparentize(0.95, secondaryColor),
    placeholder: transparentize(0.6, secondaryColor),
  },
  mixins: {
    controlFocus: `
      outline: 0;
      box-shadow: 0 0 2px ${transparentize(0.1, accentColor)};
    `,
  },
  zIndexes: {
    control: 1,
    innerSwitch: 10,
    closeButton: 200,
    blockMenu: 300,
    activeBlock: 300,
    colorPicker: 500,
    toolbarMenu: 550,
    tooltip: 600,
    dragLayer: 700,
  },
}
