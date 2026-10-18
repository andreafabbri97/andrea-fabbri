// Immagini 4:3 (1600 × 1200) per la scheda di Google Business: per ogni servizio il titolo e il disegno
// del primo progetto del settore, presi dalla pagina vera del sito (tema chiaro), 18/10/2026.
// Uso: npm run build, npx vite preview --port 4318, poi node strumenti/google-business/immagini-servizi.js strumenti/google-business
const { chromium } = require('C:/Users/andre/.claude/cruscotto/trova-playwright.js')
const path = require('path')

const OUT = process.argv[2]
const PAGINE = [
  ['gestionale-su-misura', '1-gestionale-su-misura'],
  ['gestionale-ristoranti-pizzerie', '2-ristoranti-pizzerie'],
  ['software-ncc-transfer', '3-ncc-transfer'],
  ['gestionale-edilizia', '4-edilizia'],
  ['gestionale-commercialisti', '5-commercialisti'],
  ['siti-negozi-prenota-ritira', '6-negozi'],
  ['automazione-ia-aziende', '7-automazione-ia'],
]

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, colorScheme: 'light', reducedMotion: 'reduce' })
  await page.addInitScript(() => { localStorage.setItem('af-tema', 'light'); localStorage.setItem('af-lingua-scelta', 'it') })
  for (const [slug, nome] of PAGINE) {
    await page.goto(`http://localhost:4318/andrea-fabbri/it/${slug}/`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(() => {
      const etichetta = document.querySelector('main p.flex.items-center').textContent.trim()
      const titolo = document.querySelector('h1').textContent.trim()
      const figura = document.querySelector('main figure').cloneNode(true)
      const tinta = getComputedStyle(document.querySelector('main')).getPropertyValue('--hue')
      const hueFigura = getComputedStyle(document.querySelector('main figure').parentElement).getPropertyValue('--hue')
      const tela = document.createElement('div')
      tela.style.cssText = `position:fixed;inset:0;z-index:99999;background:rgb(var(--carta));display:flex;flex-direction:column;gap:44px;padding:80px 96px;--hue:${tinta}`
      tela.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:18px">
          <p style="display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600;color:rgb(var(--tenue));margin:0">
            <span class="bg-tinta" style="width:20px;height:20px;border-radius:4px;display:inline-block"></span>${etichetta}</p>
          <h1 class="largo" style="font-size:66px;line-height:1.02;font-weight:800;color:rgb(var(--inchiostro));margin:0">${titolo}</h1>
          <p style="font-size:28px;color:rgb(var(--tenue));margin:0">Andrea Fabbri · ingegnere gestionale freelance</p>
        </div>`
      const scatola = document.createElement('div')
      scatola.style.cssText = `flex:1;min-height:0;display:flex;align-items:flex-start;--hue:${hueFigura}`
      figura.style.cssText = 'width:100%;font-size:22px'
      figura.querySelector('figcaption').style.cssText += ';height:auto;padding:14px 22px;font-size:20px'
      scatola.style.justifyContent = 'center'
      scatola.appendChild(figura)
      tela.appendChild(scatola)
      document.documentElement.classList.remove('anima')
      document.body.appendChild(tela)
      // Tutto il disegno dentro lo spazio che resta: se è troppo alto, si stringe in proporzione.
      const spazio = scatola.getBoundingClientRect().height
      const alto = figura.getBoundingClientRect().height
      if (alto > spazio) figura.style.width = `${Math.floor(figura.getBoundingClientRect().width * spazio / alto)}px`
    })
    await page.waitForTimeout(300)
    await page.screenshot({ path: path.join(OUT, `${nome}.png`) })
  }
  await browser.close()
  console.log('fatto')
})()
