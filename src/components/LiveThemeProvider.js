// @flow
import React from 'react'
import { connect } from 'react-redux'
import { themeSelector } from "reducers/settings";
import { ThemeProvider } from "styled-components";
import theme from 'styles/theme'

type Props = {
  children: any,
  themeConfig: ?string,
}

const themes = {
  light: {
    separator: 'rgba(0, 0, 0, 0.1)',
    background: {
      secondary: '#f9f9f9',
      primary: 'white',
      tertiary: '#999999'
    },
    text: {
      primary: '#142533',
      secondary: '#666666',
      error: '#ea2e49',
      success: '#66be54'
    }
  },
  dusk: {
    separator: 'rgba(255, 255, 255, 0.1)',
    background: {
      secondary: '#254065',
      primary: '#1B243F',
      tertiary: '#767676'
    },
    text: {
      primary: '#ffffff',
      secondary: '#afafaf',
      error: '#ea2e49',
      success: '#66be54'
    }
  },
  dark: {
    separator: 'rgba(255, 255, 255, 0.1)',
    background: {
      secondary: '#3A4550',
      primary: '#23303C',
      tertiary: '#767676'
    },
    text: {
      primary: '#ffffff',
      secondary: '#afafaf',
      error: '#ea2e49',
      success: '#66be54'
    }
  },
}

const LiveThemeProvider = ({ children, themeConfig }: Props) => {
  const liveTheme = {
    ...theme,
    // eslint-disable-next-line import/no-named-as-default-member
    colors: { ...theme.colors, ...themes[themeConfig || 'light'] }
  }

  return (
    <ThemeProvider theme={liveTheme}>
      {children}
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  themeConfig: themeSelector(state)
})

export default connect(mapStateToProps)(LiveThemeProvider)