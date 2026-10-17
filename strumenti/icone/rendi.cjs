// Renders the files written by disegna.py into public/ with Chromium (Playwright).
// Run from this folder: node rendi.cjs   (then: convert anteprima.png -strip -quality 88 ../../public/anteprima.jpg)
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright')
const fs = require('fs')
const path = require('path')
const pub = path.join(__dirname, '..', '..', 'public')

;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage()
  const icona = fs.readFileSync(path.join(__dirname, 'icona.svg'), 'utf8')
  for (const [nome, s] of [['pwa-512x512.png', 512], ['pwa-192x192.png', 192], ['apple-touch-icon.png', 180]]) {
    await p.setViewportSize({ width: s, height: s })
    await p.setContent(`<body style="margin:0">${icona.replace('width="512" height="512"', `width="${s}" height="${s}"`)}</body>`)
    await p.screenshot({ path: path.join(pub, nome), clip: { x: 0, y: 0, width: s, height: s } })
  }
  fs.copyFileSync(path.join(__dirname, 'favicon.svg'), path.join(pub, 'favicon.svg'))
  await p.setViewportSize({ width: 1200, height: 630 })
  await p.goto('file://' + path.join(__dirname, 'anteprima.html'))
  await p.evaluate(() => document.fonts.ready)
  await p.screenshot({ path: path.join(__dirname, 'anteprima.png') })
  await b.close()
  console.log('icone in public/, anteprima.png qui')
})()
