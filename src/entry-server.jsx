import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { siteCopy } from './data/siteCopy'
import { copyFor } from './data/projectsCopy'
import { groups } from './data/projectsMeta'
import { services, pathFor } from './data/services'
import { servicesEn } from './data/servicesEn'
import { servicesIt } from './data/servicesIt'

// Used only at build time by scripts/prerender.mjs: it writes every page whole, the home page in English at
// /andrea-fabbri/ and in Italian at /andrea-fabbri/it/, and each service page in both languages, so search
// engines and AI crawlers read the text without running JavaScript (until 18/10/2026 the HTML had 106 words
// and the Italian version had no address at all).

export const SITE = 'https://andreafabbri97.github.io/andrea-fabbri/'
export const PAGES = ['home', ...services.map((v) => v.id)]
export const urlFor = (lang, page = 'home') => SITE + pathFor(lang, page)
export const pathOf = (lang, page = 'home') => pathFor(lang, page)

export const render = (lang, page = 'home') => renderToString(<App lang={lang} page={page} />)

const servicesCopy = { en: servicesEn, it: servicesIt }

const META = {
  en: {
    title: 'Andrea Fabbri — Freelance Management Engineer & AI Automation',
    description: 'Andrea Fabbri, freelance management engineer based in San Marino, working remotely worldwide: custom management software, ERPs and AI automation that replace manual operations. Sixteen systems, most of them in daily use.',
    ogDescription: 'Production software that replaces manual operations: sixteen systems, most of them in daily use.',
    jobTitle: 'Freelance Management Engineer, AI & Automation',
    locale: 'en_US',
  },
  it: {
    title: 'Andrea Fabbri — Ingegnere gestionale freelance, IA e automazione',
    description: 'Andrea Fabbri, ingegnere gestionale freelance con base a San Marino, lavora da remoto in tutto il mondo: gestionali su misura, ERP e automazioni con l\'intelligenza artificiale che sostituiscono il lavoro manuale. Sedici sistemi, quasi tutti in uso ogni giorno.',
    ogDescription: 'Software in produzione che sostituisce il lavoro manuale: sedici sistemi, quasi tutti in uso ogni giorno.',
    jobTitle: 'Ingegnere gestionale freelance, IA e automazione',
    locale: 'it_IT',
  },
}

export const metaFor = (lang, page = 'home') => {
  if (page === 'home') return META[lang]
  const p = servicesCopy[lang].pages[page]
  return { title: p.metaTitle, description: p.metaDescription, ogDescription: p.metaDescription, locale: META[lang].locale }
}

const allProjects = () => groups.flatMap((g) => g.projects)

// The structured data: who Andrea is (Person), the page about him (ProfilePage) and the list of his work.
function homeJsonLd(lang) {
  const t = siteCopy[lang]
  const copy = copyFor(lang)
  const url = urlFor(lang)
  const person = {
    '@type': 'Person',
    '@id': `${SITE}#andrea`,
    name: 'Andrea Fabbri',
    jobTitle: META[lang].jobTitle,
    description: META[lang].description,
    url: SITE,
    image: `${SITE}anteprima.jpg`,
    homeLocation: { '@type': 'Country', name: 'San Marino' },
    address: { '@type': 'PostalAddress', addressCountry: 'SM' },
    knowsLanguage: ['it', 'en'],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Università degli Studi della Repubblica di San Marino' },
      { '@type': 'CollegeOrUniversity', name: 'Alma Mater Studiorum – Università di Bologna' },
    ],
    knowsAbout: t.skillGroups.filter((g) => !/soft/i.test(g.group)).flatMap((g) => g.items),
    sameAs: ['https://github.com/andreafabbri97', 'https://www.linkedin.com/in/andreafabbri97/'],
    makesOffer: services.map((v) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: servicesCopy[lang].pages[v.id].title, url: urlFor(lang, v.id) },
    })),
  }
  const work = {
    '@type': 'ItemList',
    name: copy.index.title,
    itemListElement: allProjects().map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: copy.projects[p.id].title,
        description: copy.projects[p.id].tagline,
        applicationCategory: 'BusinessApplication',
        url: `${url}#${p.id}`,
        author: { '@id': `${SITE}#andrea` },
      },
    })),
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ProfilePage', '@id': url, url, name: META[lang].title, inLanguage: lang, mainEntity: { '@id': `${SITE}#andrea` }, hasPart: work },
      person,
    ],
  }
}

// A service page: the page, the service offered by Andrea, where it sits (breadcrumb) and its questions.
function serviceJsonLd(lang, page) {
  const p = servicesCopy[lang].pages[page]
  const s = servicesCopy[lang]
  const url = urlFor(lang, page)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: p.metaTitle, description: p.metaDescription, inLanguage: lang, about: { '@id': `${url}#service` } },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: p.title,
        serviceType: p.label,
        description: p.lead,
        url,
        provider: { '@type': 'Person', '@id': `${SITE}#andrea`, name: 'Andrea Fabbri', url: SITE },
        areaServed: [{ '@type': 'Country', name: 'San Marino' }, 'Worldwide'],
        availableLanguage: ['it', 'en'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: s.labels.home, item: urlFor(lang) },
          { '@type': 'ListItem', position: 2, name: s.labels.kicker, item: `${urlFor(lang)}#services` },
          { '@type': 'ListItem', position: 3, name: p.label, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }
}

export const jsonLdFor = (lang, page = 'home') => (page === 'home' ? homeJsonLd(lang) : serviceJsonLd(lang, page))

// llms.txt: the site in plain text for AI assistants (the llmstxt.org convention), built from the same copy.
export function llmsText() {
  const en = copyFor('en')
  const lines = [
    '# Andrea Fabbri',
    '',
    `> ${META.en.description}`,
    '',
    `Italian version: ${urlFor('it')}`,
    '',
    '## Work',
    '',
    ...groups.flatMap((g) => [
      `### ${en.groups[g.id].title}`,
      '',
      en.groups[g.id].intro,
      '',
      ...g.projects.map((p) => `- [${en.projects[p.id].title}](${SITE}#${p.id}): ${en.projects[p.id].label}. ${en.projects[p.id].tagline}. Built with ${p.tags.join(', ')}.`),
      '',
    ]),
    '## Services',
    '',
    ...services.map((v) => `- [${servicesEn.pages[v.id].title}](${urlFor('en', v.id)}) (Italian: ${urlFor('it', v.id)}): ${servicesEn.pages[v.id].metaDescription}`),
    '',
    '## Profiles',
    '',
    '- [GitHub](https://github.com/andreafabbri97)',
    '- [LinkedIn](https://www.linkedin.com/in/andreafabbri97/)',
    '',
  ]
  return lines.join('\n')
}
