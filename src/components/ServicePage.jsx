import { Mail } from 'lucide-react'
import Titano from './Titano'
import Contact from './Contact'
import Frame from './Frame'
import StatusBadge from './StatusBadge'
import { Metrics } from './ProjectDetail'
import { groups } from '../data/projectsMeta'
import { services, serviceById } from '../data/services'

// A service page: who it is for, the problem, what the software does, the real projects in that sector
// (with their numbers and a link to the full project on the home page), how I work, questions, contacts.
// Same rails, crosshairs and type as the home page (DESIGN.md); the color is the sector's.

const allProjects = groups.flatMap((g) => g.projects)
const metaById = Object.fromEntries(allProjects.map((p) => [p.id, p]))
const positionOf = Object.fromEntries(allProjects.map((p, i) => [p.id, i + 1]))

const WHATSAPP = 'https://wa.me/393334765551'

function Block({ id, title, children, wide = false }) {
  return (
    <section id={id} data-sezione={id} className="contenitore">
      <div className="relative sm:border-x border-t border-linea py-14 sm:py-20 sm:px-8 lg:px-10">
        <span className="mirino hidden sm:block -left-[6px]" aria-hidden />
        <span className="mirino hidden sm:block -right-[6px]" aria-hidden />
        <h2 data-reveal className={`largo text-[clamp(1.9rem,4.4vw,3.2rem)] font-extrabold text-inchiostro leading-[1.04] mb-8 sm:mb-10 ${wide ? '' : 'max-w-[48rem]'}`}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

function Dots({ items }) {
  return (
    <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
      {items.map((text) => (
        <li key={text} className="flex gap-3 text-inchiostro/90 leading-relaxed">
          <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-tinta shrink-0" aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ServicePage({ id, s, copy, t, lang, home, href }) {
  const service = serviceById[id]
  const page = s.pages[id]
  const first = service.projects[0]

  return (
    <main style={{ '--hue': service.hue }}>
      <section id="top" className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20">
        <Titano />
        <div className="relative contenitore grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="misura lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-sm text-tenue mb-6">
              <ol className="flex flex-wrap items-center gap-x-2">
                <li><a href={home} className="underline decoration-transparent underline-offset-4 hover-testo hover-sottolinea">{s.labels.home}</a></li>
                <li aria-hidden>/</li>
                <li><a href={`${home}#services`} className="underline decoration-transparent underline-offset-4 hover-testo hover-sottolinea">{s.labels.kicker}</a></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-inchiostro">{page.label}</li>
              </ol>
            </nav>
            <p className="flex items-center gap-2 text-tenue font-medium mb-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-tinta" aria-hidden />
              {page.label}
            </p>
            <h1 className="largo font-extrabold text-inchiostro leading-[1] text-[length:min(clamp(2.1rem,5vw,4.2rem),7.4cqi)] mb-6">
              {page.title}
            </h1>
            <p className="text-lg sm:text-xl text-inchiostro/85 leading-relaxed max-w-[40rem] mb-8">{page.lead}</p>
            <div className="flex flex-wrap gap-3" data-bottoni>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-inchiostro text-carta font-semibold">
                <Mail className="w-4 h-4" aria-hidden /> {s.labels.write}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-linea bg-carta text-inchiostro font-semibold hover-sfondo">
                {t.ui.whatsapp}
              </a>
              <a href={`${home}#work`} className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-linea bg-carta text-inchiostro font-semibold hover-sfondo">
                {s.labels.allWork}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5" style={{ '--hue': metaById[first].hue }}>
            <Frame meta={metaById[first]} project={copy.projects[first]} copy={copy} lang={lang} position={positionOf[first]} total={allProjects.length} />
          </div>
        </div>
      </section>

      <Block id="problems" title={s.labels.problems}><Dots items={page.problems} /></Block>
      <Block id="solution" title={s.labels.solution}><Dots items={page.solution} /></Block>

      <Block id="work" title={s.labels.work}>
        <p className="text-tenue -mt-4 mb-8">{s.labels.workNote}</p>
        <div className="divide-y divide-linea border-y border-linea">
          {service.projects.map((pid) => {
            const meta = metaById[pid]
            const p = copy.projects[pid]
            return (
              <div key={pid} style={{ '--hue': meta.hue }} className="py-8 sm:py-10">
                <p className="flex items-center gap-2 text-tenue font-medium mb-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-tinta" aria-hidden />
                  {p.label}
                </p>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-3">
                  <h3 className="titolo text-[clamp(1.6rem,3.4vw,2.3rem)] font-extrabold text-inchiostro leading-[1.05]">{p.title}</h3>
                  <StatusBadge tone={meta.tone}>{copy.badges[meta.badge ?? meta.tone]}</StatusBadge>
                </div>
                <p className="text-lg text-tinta font-semibold leading-snug mb-4 max-w-[44rem]">{p.tagline}</p>
                <p className="text-inchiostro/85 leading-relaxed max-w-[48rem] mb-6">{p.desc}</p>
                {p.metrics && <div className="mb-6"><Metrics metrics={p.metrics} label={copy.labels.numbers} /></div>}
                <a href={`${home}#${pid}`} className="font-semibold text-azzurro underline decoration-azzurro/30 underline-offset-4 hover-sottolinea">
                  {s.labels.readProject}: {p.title}
                </a>
              </div>
            )
          })}
        </div>
      </Block>

      <Block id="process" title={s.labels.process}>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-linea border-y border-linea">
          {s.process.map((step, i) => (
            <li key={step.title} className="bg-carta py-6 sm:px-5 relative">
              <span className="absolute left-0 sm:left-5 top-0 w-8 h-[3px] bg-tinta" aria-hidden />
              <p className="largo cifre text-3xl font-extrabold text-inchiostro leading-none mb-3">{i + 1}</p>
              <h3 className="titolo text-xl font-bold text-inchiostro leading-snug mb-2">{step.title}</h3>
              <p className="text-tenue leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="faq" title={s.labels.faq}>
        <div className="divide-y divide-linea border-y border-linea max-w-[56rem]">
          {page.faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none titolo text-xl font-bold text-inchiostro leading-snug [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="mt-1 text-tinta text-2xl leading-none transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="text-inchiostro/85 leading-relaxed mt-3 max-w-[48rem]">{f.a}</p>
            </details>
          ))}
        </div>
      </Block>

      {/* The contacts and, under them, the other services. */}
      <ContactAndOthers t={t} s={s} id={id} href={href} />
    </main>
  )
}

function ContactAndOthers({ t, s, id, href }) {
  return (
    <>
      <Contact t={t} />
      <section className="contenitore">
        <div className="relative sm:border-x border-t border-linea py-12 sm:py-16 sm:px-8 lg:px-10">
          <span className="mirino hidden sm:block -left-[6px]" aria-hidden />
          <span className="mirino hidden sm:block -right-[6px]" aria-hidden />
          <h2 className="titolo text-2xl font-bold text-inchiostro mb-5">{s.labels.others}</h2>
          <ul className="flex flex-wrap gap-3">
            {services.filter((v) => v.id !== id).map((v) => (
              <li key={v.id} style={{ '--hue': v.hue }}>
                <a href={href(v.id)} className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-linea text-inchiostro font-semibold hover-sfondo">
                  <span className="w-2.5 h-2.5 rounded-sm bg-tinta" aria-hidden />
                  {s.pages[v.id].label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
