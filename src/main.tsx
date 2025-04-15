
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from 'next-themes';
import App from './App.tsx';
import './index.css';
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider defaultTheme="dark" attribute="class">
      <LanguageProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </HelmetProvider>
);
