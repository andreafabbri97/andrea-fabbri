import { drawings } from './drawings'

// The dark frame that carries the color of each project: a screenshot when the project has one,
// otherwise a diagram drawn from what the project handles. A bar on top says what it is and where
// the project sits in the index.
export default function Frame({ meta, project, copy, lang, position, total }) {
  const Drawing = drawings[meta.id]
  const kind = meta.image ? copy.frame.screenshot : copy.frame.diagram
  return (
    <figure className="rounded-xl overflow-hidden border border-linea bg-[rgb(var(--cornice))]" data-disegna={Drawing ? '' : undefined}>
      <figcaption className="flex items-center justify-between gap-4 px-4 h-10 border-b border-white/10 text-[0.8rem] text-white/60">
        <span className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-sm bg-tinta shrink-0" aria-hidden />
          <span className="truncate"><span className="text-white/85 font-semibold mr-2">{kind}</span>{project.label}</span>
        </span>
        <span className="cifre whitespace-nowrap">{position} {copy.frame.of} {total}</span>
      </figcaption>
      {meta.image ? (
        <img src={meta.image} alt={project.imageAlt} loading="lazy" width="1920" height="1080" className="block w-full h-auto" />
      ) : (
        Drawing && <div className="p-3 sm:p-5"><Drawing label={`${kind}: ${project.title}`} lang={lang} /></div>
      )}
    </figure>
  )
}
