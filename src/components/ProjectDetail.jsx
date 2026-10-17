import { useId, useRef, useState } from 'react'
import { ChevronDown, ExternalLink, GitBranch } from 'lucide-react'
import Collapsible from './Collapsible'
import StatusBadge from './StatusBadge'
import FlagshipExtras from './FlagshipExtras'

// One project, always the same model so they compare at a glance: sector, title, status, one
// line, description, numbers, stack, then the features. The first two features stay visible;
// the rest and "the hard part" open with "Show more".

const VISIBLE_FEATURES = 2
// Height of the fixed bar plus some air: where the first revealed feature lands after opening.
const BAR_CLEARANCE = 88

function Metrics({ metrics, label }) {
  return (
    <div>
      <p className="text-sm font-medium text-tenue mb-3">{label}</p>
      <dl className="grid grid-cols-2 gap-px bg-linea border border-linea rounded-2xl overflow-hidden">
        {metrics.map((m) => (
          <div key={m.label} className="bg-foglio p-4 sm:p-5">
            <dt className="sr-only">{m.label}</dt>
            <dd className={`titolo cifre text-3xl sm:text-4xl font-bold leading-none mb-2 ${m.money ? 'text-oro' : 'text-inchiostro'}`}>{m.value}</dd>
            <dd className="text-sm text-tenue leading-snug">{m.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Screenshot({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width="1920"
      height="1080"
      className="w-full rounded-2xl border border-linea shadow-[0_24px_60px_-30px_rgb(var(--inchiostro)/0.45)]"
    />
  )
}

export default function ProjectDetail({ project, meta, copy, note, lang }) {
  const { tone, tags, image, links, extras } = meta
  const { label, title, tagline, desc, features, metrics, challenge } = project
  const [open, setOpen] = useState(false)
  const moreId = useId()
  const moreRef = useRef(null)
  const shown = features.slice(0, VISIBLE_FEATURES)
  const hidden = features.slice(VISIBLE_FEATURES)
  const hasMore = hidden.length > 0 || Boolean(challenge)
  const imageBeside = image && !metrics

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
    <article id={meta.id} className="py-14 sm:py-20 [overflow-anchor:none]">
      <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10">
        <header className="lg:col-span-7">
          <p className="text-tenue font-medium mb-2">{label}</p>
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-3">
            <h3 className="titolo text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-inchiostro leading-[1.02]">{title}</h3>
            <StatusBadge tone={tone}>{copy.badges[meta.badge ?? tone]}</StatusBadge>
          </div>
          <p className="text-xl text-azzurro font-medium leading-snug mb-5 max-w-[40rem]">{tagline}</p>
          <p className="text-inchiostro/85 leading-relaxed max-w-[42rem] mb-6">{desc}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-tenue" aria-label="Stack">
            {tags.map((tag) => <li key={tag} className="whitespace-nowrap">{tag}</li>)}
          </ul>
        </header>

        <aside className="lg:col-span-5 lg:pt-8">
          {metrics && <Metrics metrics={metrics} label={copy.labels.numbers} />}
          {imageBeside && <Screenshot src={image} alt={project.imageAlt} />}
          {note && <p className="text-sm text-tenue mt-3">{note}</p>}
        </aside>
      </div>

      {image && !imageBeside && (
        <div className="mt-10">
          <Screenshot src={image} alt={project.imageAlt} />
        </div>
      )}

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
              <div className="mt-8 border-l-2 border-azzurro pl-5 max-w-[48rem]">
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
          {links?.source && (
            <a href={links.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-linea text-inchiostro font-semibold hover-sfondo">
              <GitBranch className="w-4 h-4" aria-hidden /> {project.links.source}
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
      <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-azzurro shrink-0" aria-hidden />
      <span>{text}</span>
    </li>
  )
}
