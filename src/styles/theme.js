// @flow

import { rgba } from './helpers'

export const space = [0, 5, 10, 15, 20, 30, 40, 50, 70]
export const fontSizes = [8, 9, 10, 12, 13, 16, 18, 22, 32]
export const radii = [0, 4]
export const shadows = ['0 4px 8px 0 rgba(0, 0, 0, 0.03)']

export const fontFamilies = {
  'Open Sans': {
    Light: {
      weight: 300,
      style: 'normal',
    },
    Regular: {
      weight: 400,
      style: 'normal',
    },
    SemiBold: {
      weight: 600,
      style: 'normal',
    },
    Bold: {
      weight: 700,
      style: 'normal',
    },
    ExtraBold: {
      weight: 800,
      style: 'normal',
    },
  },

  'Museo Sans': {
    ExtraLight: {
      weight: 100,
      style: 'normal',
    },
    Light: {
      weight: 300,
      style: 'normal',
    },
    Regular: {
      weight: 500,
      style: 'normal',
    },
    Bold: {
      weight: 700,
      style: 'normal',
    },
    ExtraBold: {
      weight: 900,
      style: 'normal',
    },
  },

  Rubik: {
    Regular: {
      weight: 500,
      style: 'normal',
    },
  },
}
// (?<!\.)\bgrey\b

// \bgrey\b

const palette = {
  type: "dark",
  primary: {
    light: "",
    main: "#6490f1",
    dark: "",
    contrastText: "#ffffff"
  },
  secondary: {
    light: "",
    main: "",
    dark: "",
    contrastText: ""
  },
  error: "",
  text: {
    shade100: "rgba(255, 255, 255, 1)",
    shade80: "rgba(255, 255, 255, 0.8)",
    shade60: "rgba(255, 255, 255, 0.6)",
    shade40: "rgba(255, 255, 255, 0.4)"
  },
  divider: "rgba(255, 255, 255, 0.2)",
  background: {
    paper: "rgba(24, 37, 50, 1)",
    default: "rgba(19, 30, 40, 1)",
  },
  action: {
    active: "rgba(255, 255, 255, 0.2)",
    hover: "",
    hoverOpacity: "",
    selected: "",
    disabledBackground: ""
  }
}

export const colors = {
  transparent: 'transparent',

  pearl: '#ff0000',

  // new colors
  alertRed: '#ea2e49',
  warning: '#f57f17',
  black: '#000000',
  dark: '#142533',
  fog: '#d8d8d8',
  graphite: '#767676',
  grey: '#999999',
  identity: '#41ccb4',
  lightFog: '#eeeeee',
  sliderGrey: '#F0EFF1',
  lightGraphite: '#fafafa',
  lightGrey: '#f9f9f9',
  starYellow: '#FFD24A',
  orange: '#ffa726',
  positiveGreen: '#66be54',
  smoke: '#666666',
  wallet: '#6490f1',
  pillActiveBackground: rgba('#6490f1', 0.1),
  lightRed: rgba('#ea2e49', 0.1),
  white: '#ffffff',
  experimentalBlue: '#165edb',

  // market indicator
  marketUp_eastern: '#ea2e49',
  marketUp_western: '#66be54',
  marketDown_eastern: '#6490f1',
  marketDown_western: '#ea2e49',
  palette,
}

export default {
  sizes: {
    topBarHeight: 58,
    sideBarWidth: 230,
  },
  radii,
  fontFamilies,
  fontSizes,
  space,
  shadows,
  colors,
}
