import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Each language has its own address (/andrea-fabbri/ and /andrea-fabbri/it/), and the build already wrote
// the page in it (scripts/prerender.mjs). createRoot and not hydrateRoot: the ruler, the theme and the
// short progress line depend on the screen, so the browser's first render differs from the written one.
const lang = /\/it\/?$/.test(location.pathname) ? 'it' : 'en'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App lang={lang} />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/andrea-fabbri/sw.js')
  })
}
