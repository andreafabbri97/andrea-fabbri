import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { routeFor } from './data/services'

// Each page has its own address in each language (/andrea-fabbri/, /andrea-fabbri/it/ and the service pages,
// src/data/services.js), and the build already wrote it (scripts/prerender.mjs). createRoot and not hydrateRoot: the ruler, the theme and the
// short progress line depend on the screen, so the browser's first render differs from the written one.
const { lang, page } = routeFor(location.pathname.slice(import.meta.env.BASE_URL.length))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App lang={lang} page={page} />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/andrea-fabbri/sw.js')
  })
}
