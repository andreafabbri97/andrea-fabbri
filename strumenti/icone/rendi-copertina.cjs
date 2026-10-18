// Renders copertina-linkedin.html (written by copertina-linkedin.py) into copertina-linkedin.png, 1584 x 396.
// Run from this folder: node rendi-copertina.cjs
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright')
const path = require('path')

;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1584, height: 396 } })
  await p.goto('file://' + path.join(__dirname, 'copertina-linkedin.html'), { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready)
  await p.screenshot({ path: path.join(__dirname, 'copertina-linkedin.png') })
  await b.close()
  console.log('copertina-linkedin.png')
})()
