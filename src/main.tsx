import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

// Initialize Reown AppKit once (side-effect import)
import './appkit'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
