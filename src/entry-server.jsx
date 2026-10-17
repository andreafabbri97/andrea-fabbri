import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { siteCopy } from './data/siteCopy'
import { copyFor } from './data/projectsCopy'
import { groups } from './data/projectsMeta'

// Used only at build time by scripts/prerender.mjs: it writes the whole page, in English at /andrea-fabbri/
// and in Italian at /andrea-fabbri/it/, so search engines and AI crawlers read the text without running
// JavaScript (until 18/10/2026 the HTML had 106 words and the Italian version had no address at all).

export const SITE = 'https://andreafabbri97.github.io/andrea-fabbri/'
export const urlFor = (lang) => (lang === 'it' ? `${SITE}it/` : SITE)

export const render = (lang) => renderToString(<App lang={lang} />)

const META = {
  en: {
    title: 'Andrea Fabbri — Management Engineer & AI Automation',
    description: 'Andrea Fabbri, management engineer based in San Marino, working remotely worldwide: custom management software, ERPs and AI automation that replace manual operations. Sixteen systems, most of them in daily use.',
    ogDescription: 'Production software that replaces manual operations: sixteen systems, most of them in daily use.',
    jobTitle: 'Management Engineer, AI & Automation',
    locale: 'en_US',
  },
  it: {
    title: 'Andrea Fabbri — Ingegnere gestionale, IA e automazione',
    description: 'Andrea Fabbri, ingegnere gestionale con base a San Marino, lavora da remoto in tutto il mondo: gestionali su misura, ERP e automazioni con l\'intelligenza artificiale che sostituiscono il lavoro manuale. Sedici sistemi, quasi tutti in uso ogni giorno.',
    ogDescription: 'Software in produzione che sostituisce il lavoro manuale: sedici sistemi, quasi tutti in uso ogni giorno.',
    jobTitle: 'Ingegnere gestionale, IA e automazione',
    locale: 'it_IT',
  },
}

export const metaFor = (lang) => META[lang]

const allProjects = () => groups.flatMap((g) => g.projects)

// The structured data: who Andrea is (Person), the page about him (ProfilePage) and the list of his work.
export function jsonLdFor(lang) {
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
    sameAs: ['https://github.com/andreafabbri97', 'https://www.linkedin.com/in/andrea-fabbri-9873081a6/'],
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
    '## Profiles',
    '',
    '- [GitHub](https://github.com/andreafabbri97)',
    '- [LinkedIn](https://www.linkedin.com/in/andrea-fabbri-9873081a6/)',
    '',
  ]
  return lines.join('\n')
}
