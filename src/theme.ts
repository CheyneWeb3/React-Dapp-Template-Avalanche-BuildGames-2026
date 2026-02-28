import { createTheme } from '@mui/material/styles'

// Avalanche brand-ish palette (dark, AVAX red accents)
// Keep it simple: dark surfaces + red primary.
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E84142'
    },
    secondary: {
      main: '#FF6B6B'
    },
    background: {
      default: '#0B0D12',
      paper: 'rgba(15, 18, 26, 0.78)'
    },
    divider: 'rgba(255,255,255,0.10)'
  },
  shape: {
    borderRadius: 14
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700
        }
      }
    }
  }
})
