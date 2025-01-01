export const tokyoMetroTheme = {
  colors: {
    // Line Colors
    ginza: '#FF9500',
    marunouchi: '#F62E36',
    hibiya: '#B5B5AC',
    tozai: '#009BBF',
    chiyoda: '#00BB85',
    yurakucho: '#C1A470',
    hanzomon: '#8F76D6',
    namboku: '#00AC9B',
    fukutoshin: '#9C5E31',
    
    // UI Colors
    primary: '#009BBF', // Using Tozai line blue as primary
    secondary: '#00BB85', // Using Chiyoda line green as secondary
    background: '#FFFFFF',
    backgroundDark: '#1A1A1A',
    text: '#333333',
    textDark: '#FFFFFF',
    border: '#E5E5E5',
    borderDark: '#333333',
    error: '#F62E36', // Using Marunouchi line red for errors
    success: '#00BB85', // Using Chiyoda line green for success
  },
  
  typography: {
    fontFamily: {
      sans: ['Source Han Sans', 'Hiragino Sans', 'sans-serif'],
      mono: ['Source Code Pro', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    grid: '8px', // Base grid unit
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '450ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  
  elevation: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
}
