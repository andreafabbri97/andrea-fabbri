import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: set to '/andrea-fabbri/' for GitHub Pages project page
// Change to '/' if deploying to andreafabbri97.github.io (user page)
// In development the <!--seo--> marker gets just a title: the real head is written by scripts/prerender.mjs.
const devHead = {
  name: 'dev-head',
  apply: 'serve',
  transformIndexHtml: (html) => html.replace('<!--seo-->', '<title>Andrea Fabbri (dev)</title>'),
}

export default defineConfig({
  plugins: [react(), devHead],
  base: '/andrea-fabbri/',
})
