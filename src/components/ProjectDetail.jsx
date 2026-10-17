import { useId, useRef, useState } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import Collapsible from './Collapsible'
import StatusBadge from './StatusBadge'
import FlagshipExtras from './FlagshipExtras'
import CountUp from './CountUp'
import Frame from './Frame'

// One project, always the same model so they compare at a glance: sector, title, status, one line,
// description and stack on the left, the frame (the diagram) on the right, the numbers in a
// strip with drawn borders, then the features. The first two features stay visible; the rest and
// "the hard part" open with "Show more". --hue gives the project its sector color.

const VISIBLE_FEATURES = 2
// Height of the fixed bar plus some air: where the first revealed feature lands after opening.
const BAR_CLEARANCE = 88

function Metrics({ metrics, label }) {
  return (
    <dl aria-label={label} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-linea border-y border-linea">
      {metrics.map((m) => (
        <div key={m.label} className="bg-carta px-0 sm:px-5 py-5 relative">
          <span className="absolute left-0 sm:left-5 top-0 w-8 h-[3px] bg-tinta" aria-hidden />
          <dt className="sr-only">{m.label}</dt>
          <dd className={`largo cifre text-[clamp(1.9rem,3.4vw,2.6rem)] font-extrabold leading-none mb-2 ${m.money ? 'text-oro' : 'text-inchiostro'}`}>
            <CountUp value={m.value} />
          </dd>
          <dd className="text-sm text-tenue leading-snug pr-3">{m.label}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function ProjectDetail({ project, meta, copy, note, lang, position, total }) {
  const { tone, tags, links, extras, hue } = meta
  const { label, title, tagline, desc, features, metrics, challenge } = project
  const [open, setOpen] = useState(false)
  const moreId = useId()
  const moreRef = useRef(null)
  const shown = features.slice(0, VISIBLE_FEATURES)
  const hidden = features.slice(VISIBLE_FEATURES)
  const hasMore = hidden.length > 0 || Boolean(challenge)

  // The section opens downwards (scroll anchoring is off, or the browser would pin the button and
  // push the new text up out of sight). If the first new feature still starts above the screen,
  // bring it into view.
  const toggle = () => {
    const opening = !open
    setOpen(opening)
    if (!opening) return
    requestAnimationFrame(() => {
      const top = moreRef.current?.getBoundingClientRect().top
      if (top !== undefined && top < BAR_CLEARANCE) {
        window.scrollBy({ top: top - BAR_CLEARANCE, behavior: 'smooth' })
      }
    })
  }

  return (
    <article id={meta.id} style={{ '--hue': hue }} className="relative border-t border-linea py-12 sm:py-16 sm:px-8 lg:px-10 [overflow-anchor:none]">
      <span className="mirino hidden sm:block -left-[6px]" aria-hidden />
      <span className="mirino hidden sm:block -right-[6px]" aria-hidden />

      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-start">
        <header className="lg:col-span-6">
          <p className="flex items-center gap-2 text-tenue font-medium mb-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-tinta" aria-hidden />
            {label}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-3">
            <h3 className="titolo text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold text-inchiostro leading-[1.02]">{title}</h3>
            <StatusBadge tone={tone}>{copy.badges[meta.badge ?? tone]}</StatusBadge>
          </div>
          <p className="text-xl text-tinta font-semibold leading-snug mb-5 max-w-[40rem]">{tagline}</p>
          <p className="text-inchiostro/85 leading-relaxed max-w-[42rem] mb-6">{desc}</p>
          <p className="text-sm text-tenue">
            <span className="font-semibold text-inchiostro mr-2">{copy.frame.stack}</span>
            {tags.join(', ')}
          </p>
        </header>

        <div className="lg:col-span-6">
          <Frame meta={meta} project={project} copy={copy} lang={lang} position={position} total={total} />
          {note && <p className="text-sm text-tenue mt-3">{note}</p>}
        </div>
      </div>

      {metrics && <div className="mt-10"><Metrics metrics={metrics} label={copy.labels.numbers} /></div>}

      <div className="mt-10">
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
          {shown.map((f) => <Feature key={f} text={f} />)}
        </ul>
        {hasMore && (
          <Collapsible open={open} id={moreId}>
            <ul ref={moreRef} className="grid md:grid-cols-2 gap-x-10 gap-y-4 pt-4">
              {hidden.map((f) => <Feature key={f} text={f} />)}
            </ul>
            {challenge && (
              <div className="mt-8 border-l-2 border-tinta pl-5 max-w-[48rem]">
                <p className="font-semibold text-inchiostro mb-1">{copy.labels.challenge}</p>
                <p className="text-tenue leading-relaxed">{challenge}</p>
              </div>
            )}
          </Collapsible>
        )}

        <div className="flex flex-wrap items-center gap-3 mt-7">
          {hasMore && (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls={moreId}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-linea text-inchiostro font-semibold hover-sfondo"
            >
              {open ? copy.labels.showLess : copy.labels.showMore}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
          )}
          {links?.live && (
            <a href={links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-inchiostro text-carta font-semibold">
              <ExternalLink className="w-4 h-4" aria-hidden /> {project.links.live}
            </a>
          )}
        </div>
      </div>

      {extras && <FlagshipExtras kind={extras} project={project} lang={lang} />}
    </article>
  )
}

function Feature({ text }) {
  return (
    <li className="flex gap-3 text-inchiostro/90 leading-relaxed">
      <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-tinta shrink-0" aria-hidden />
      <span>{text}</span>
    </li>
  )
}
