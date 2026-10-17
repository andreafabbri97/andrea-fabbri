import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectGroup from './components/ProjectGroup'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { siteCopy } from './data/siteCopy'
import { copyFor } from './data/projectsCopy'
import { groups } from './data/projectsMeta'
import { startReveals } from './components/motion'
import useCurrentProject from './components/useCurrentProject'
import Striscia from './components/Striscia'
import Righello from './components/Righello'
import Avanzamento from './components/Avanzamento'

// Where each project sits in the index of work: "3 of 16" on its frame.
const POSITIONS = Object.fromEntries(groups.flatMap((g) => g.projects).map((p, i) => [p.id, i + 1]))
const TOTAL = Object.keys(POSITIONS).length

// 'af-lingua-scelta' and not 'af-lingua': until 17/10/2026 the site saved the language even when nobody chose it
// (always English), and that old value would have hidden the browser's language. The old key is removed.
const LANG_KEY = 'af-lingua-scelta'
try { localStorage.removeItem('af-lingua') } catch { /* private mode */ }

// The language: the one chosen with the EN/IT switch if there is one, otherwise the browser's. Italian browsers
// get Italian, every other language English (Andrea, 17/10/2026: the site speaks to people abroad too).
const browserLang = () => {
  const langs = (typeof navigator !== 'undefined' && (navigator.languages?.length ? navigator.languages : [navigator.language])) || []
  return langs.some((l) => String(l).toLowerCase().startsWith('it')) ? 'it' : 'en'
}
const readLang = () => {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'it' || saved === 'en') return saved
  } catch { /* private mode: no saved choice */ }
  return browserLang()
}

export default function App() {
  const [lang, setLangState] = useState(readLang)
  // Saved only when someone picks a language with the switch: the automatic one follows the browser.
  const setLang = (next) => {
    setLangState(next)
    try { localStorage.setItem(LANG_KEY, next) } catch { /* private mode: the choice lasts this visit */ }
  }
  const t = siteCopy[lang]
  const copy = copyFor(lang)
  const current = useCurrentProject()

  useEffect(() => startReveals(), [])

  const sections = useMemo(() => [
    ...groups.map((g) => ({ id: g.id, href: `#group-${g.id}`, label: copy.short[g.id] })),
    ...['experience', 'skills', 'contact'].map((id) => ({ id, href: `#${id}`, label: copy.short[id] })),
  ], [copy])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} current={current ? { id: current, title: copy.projects[current].title } : null} />
      <main>
        <Hero t={t} copy={copy} />
        <Striscia label={copy.technologies} />
        {groups.map((g) => <ProjectGroup key={g.id} group={g} copy={copy} lang={lang} positions={POSITIONS} total={TOTAL} />)}
        <Experience t={t} />
        <Skills t={t} />
        <Contact t={t} />
      </main>
      <Righello sections={sections} label={copy.frame.where} />
      <Avanzamento sections={sections} />
      <footer className="border-t border-linea py-8">
        <p className="contenitore text-sm text-tenue">{t.footer}</p>
      </footer>
    </>
  )
}
