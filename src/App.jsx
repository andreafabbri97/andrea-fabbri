import { useEffect, useState } from 'react'
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

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(LANG_KEY, lang) } catch { /* private mode: English next time */ }
  }, [lang])

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} current={current ? { id: current, title: copy.projects[current].title } : null} />
      <main>
        <Hero t={t} copy={copy} />
        {groups.map((g) => <ProjectGroup key={g.id} group={g} copy={copy} lang={lang} />)}
        <Experience t={t} />
        <Skills t={t} />
        <Contact t={t} />
      </main>
      <footer className="border-t border-linea py-8">
        <p className="contenitore text-sm text-tenue">{t.footer}</p>
      </footer>
    </>
  )
}
