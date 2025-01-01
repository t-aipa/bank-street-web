import { createTheme } from '@shopify/restyle'

const palette = {
  // Tokyo Metro colors
  marunouchi: '#F62E36',
  tozai: '#009BBF',
  chiyoda: '#00BB85',
  ginza: '#FF9500',
  hanzomon: '#8F76D6',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray300: '#D4D4D8',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray600: '#52525B',
  gray700: '#3F3F46',
  gray800: '#27272A',
  gray900: '#18181B',

  // Semantic colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
}

const theme = createTheme({
  colors: {
    ...palette,
    mainBackground: palette.white,
    cardBackground: palette.white,
    primaryText: palette.gray900,
    secondaryText: palette.gray500,
    primary: palette.tozai,
    secondary: palette.marunouchi,
    accent: palette.ginza
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
  },
  textVariants: {
    defaults: {
      fontFamily: 'System',
      fontSize: 16,
      color: 'primaryText',
    },
    header: {
      fontFamily: 'System',
      fontWeight: 'bold',
      fontSize: 34,
      color: 'primaryText',
    },
    subheader: {
      fontFamily: 'System',
      fontWeight: '600',
      fontSize: 28,
      color: 'primaryText',
    },
    body: {
      fontFamily: 'System',
      fontSize: 16,
      color: 'primaryText',
    },
    caption: {
      fontFamily: 'System',
      fontSize: 12,
      color: 'secondaryText',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
})

export type Theme = typeof theme
export default theme
