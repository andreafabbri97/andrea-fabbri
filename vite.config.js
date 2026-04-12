import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: set to '/andrea-fabbri/' for GitHub Pages project page
// Change to '/' if deploying to andreafabbri97.github.io (user page)
export default defineConfig({
  plugins: [react()],
  base: '/andrea-fabbri/',
})
