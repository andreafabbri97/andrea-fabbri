// After `vite build` (the page) and `vite build --ssr` (src/entry-server.jsx): writes every page complete, in
// English and Italian (the home page at dist/index.html and dist/it/index.html, each service page in its own
// folder), with title, description, hreflang and structured data in each language, plus sitemap.xml and
// llms.txt. Runs inside `npm run build`.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist')
const server = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const { SITE, PAGES, urlFor, pathOf, render, metaFor, jsonLdFor, llmsText } = server

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const LANGS = ['en', 'it']
const OTHER = { en: 'it', it: 'en' }
const PATH = new URL(SITE).pathname // '/andrea-fabbri/': a path, so the redirect works on localhost too

// Before the first paint: someone who picked the other language with the EN/IT switch, or who arrives
// on the English page with an Italian browser and no choice yet, goes to their page. Crawlers carry
// no saved choice and an English browser, so they always stay on the page they asked for.
const redirect = (lang, page) => `<script>
      (function () {
        var s = null;
        try { s = localStorage.getItem('af-lingua-scelta'); } catch (e) {}
        var it = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''])
          .some(function (l) { return String(l).toLowerCase().indexOf('it') === 0; });
        var vai = ${lang === 'en' ? "s === 'it' || (!s && it)" : "s === 'en'"};
        if (vai) location.replace('${PATH}${pathOf(OTHER[lang], page)}' + location.hash);
      })();
    </script>`

const head = (lang, page) => {
  const m = metaFor(lang, page)
  return `<title>${esc(m.title)}</title>
    <meta name="description" content="${esc(m.description)}" />
    <link rel="canonical" href="${urlFor(lang, page)}" />
    <link rel="alternate" hreflang="en" href="${urlFor('en', page)}" />
    <link rel="alternate" hreflang="it" href="${urlFor('it', page)}" />
    <link rel="alternate" hreflang="x-default" href="${urlFor('en', page)}" />
    <meta property="og:type" content="${page === 'home' ? 'profile' : 'website'}" />
    <meta property="og:url" content="${urlFor(lang, page)}" />
    <meta property="og:title" content="${esc(m.title)}" />
    <meta property="og:description" content="${esc(m.ogDescription)}" />
    <meta property="og:locale" content="${m.locale}" />
    <meta property="og:locale:alternate" content="${metaFor(OTHER[lang]).locale}" />
    <script type="application/ld+json">${JSON.stringify(jsonLdFor(lang, page)).replace(/</g, '\\u003c')}</script>
    ${redirect(lang, page)}`
}

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
for (const marker of ['<!--seo-->', '<!--app-->', '<html lang="en">']) {
  if (!template.includes(marker)) throw new Error(`index.html: missing ${marker}`)
}

const written = []
for (const page of PAGES) {
  for (const lang of LANGS) {
    const html = template
      .replace('<html lang="en">', `<html lang="${lang}">`)
      .replace('<!--seo-->', head(lang, page))
      .replace('<!--app-->', render(lang, page))
    const dir = resolve(dist, pathOf(lang, page))
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'index.html'), html)
    written.push(pathOf(lang, page) || '/')
  }
}

const today = new Date().toLocaleDateString('sv') // YYYY-MM-DD, local date
const alternates = (page) => LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l, page)}" />`).join('\n')
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGES.flatMap((page) => LANGS.map((l) => `  <url>
    <loc>${urlFor(l, page)}</loc>
    <lastmod>${today}</lastmod>
${alternates(page)}
  </url>`)).join('\n')}
</urlset>
`)
writeFileSync(resolve(dist, 'llms.txt'), llmsText())

rmSync(resolve('dist-ssr'), { recursive: true, force: true })
console.log(`prerender: ${written.length} pages (${written.join(', ')}), sitemap.xml, llms.txt`)
