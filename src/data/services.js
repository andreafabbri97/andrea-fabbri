// The service pages (18/10/2026, Andrea: «scrivi le pagine per servizio e settore, in italiano e inglese»):
// one page per thing a client can buy, so the site answers more searches than the name alone.
// What does not change with the language: id, sector color (OKLCH hue), address and the real projects
// shown on the page (ids of projectsMeta.js; the first one draws the frame at the top). Words: servicesIt.js / servicesEn.js.

export const services = [
  { id: 'custom', hue: 235, slug: { en: 'custom-business-software', it: 'gestionale-su-misura' }, projects: ['platform', 'pizzeria', 'excavation', 'school'] },
  { id: 'restaurants', hue: 27, slug: { en: 'restaurant-software', it: 'gestionale-ristoranti-pizzerie' }, projects: ['pizzeria', 'platform', 'restaurant'] },
  { id: 'transport', hue: 262, slug: { en: 'chauffeur-transfer-software', it: 'software-ncc-transfer' }, projects: ['chauffeur'] },
  { id: 'construction', hue: 78, slug: { en: 'construction-software', it: 'gestionale-edilizia' }, projects: ['excavation', 'building-supplies'] },
  { id: 'accounting', hue: 215, slug: { en: 'accounting-firm-software', it: 'gestionale-commercialisti' }, projects: ['accounting'] },
  { id: 'retail', hue: 130, slug: { en: 'retail-websites-online-ordering', it: 'siti-negozi-prenota-ritira' }, projects: ['supermarket', 'supplements', 'sup'] },
  { id: 'ai', hue: 295, slug: { en: 'ai-automation', it: 'automazione-ia-aziende' }, projects: ['pryor', 'platform', 'school', 'accounting'] },
]

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]))

// Paths inside the site, without the base: '' and 'it/' are the home pages.
export const pathFor = (lang, page = 'home') => {
  const prefix = lang === 'it' ? 'it/' : ''
  return page === 'home' ? prefix : `${prefix}${serviceById[page].slug[lang]}/`
}

// The other way round: from a path inside the site to { lang, page }. Unknown paths are the home page.
export const routeFor = (path) => {
  const clean = path.replace(/^\/+|\/+$/g, '')
  const [first, second] = clean.split('/')
  const lang = first === 'it' ? 'it' : 'en'
  const slug = lang === 'it' ? second : first
  const found = services.find((s) => s.slug[lang] === slug)
  return { lang, page: found ? found.id : 'home' }
}
