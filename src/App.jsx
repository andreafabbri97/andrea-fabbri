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

const LANG_KEY = 'af-lingua'

const readLang = () => {
  try { return localStorage.getItem(LANG_KEY) === 'it' ? 'it' : 'en' } catch { return 'en' }
}

export default function App() {
  const [lang, setLang] = useState(readLang)
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
    try { localStorage.setItem(LANG_KEY, lang) } catch { /* private mode: English next time */ }
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
