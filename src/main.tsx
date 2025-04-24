
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './components/agents/office/styles/animations.css'
import './components/agents/office/styles/neon-effects.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './providers/theme-provider'
import { Toaster } from './components/ui/toaster'
import { LanguageProvider } from './contexts/LanguageContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="flowstate-theme">
        <HelmetProvider>
          <LanguageProvider>
            <App />
            <Toaster />
          </LanguageProvider>
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
