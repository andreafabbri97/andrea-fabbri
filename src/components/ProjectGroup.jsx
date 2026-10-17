import ProjectDetail from './ProjectDetail'

// A group of projects inside the drawn rails: heading and one line, then each project, separated
// by a rule with a crosshair where it meets the rails.
export default function ProjectGroup({ group, copy, lang, positions, total }) {
  const header = copy.groups[group.id]
  const note = group.id === 'clients' ? copy.labels.private : group.id === 'personal' ? copy.labels.privateOwn : null
  return (
    <section id={`group-${group.id}`} data-sezione={group.id} className="contenitore">
      <div className="sm:border-x border-linea">
        <div className="relative border-t border-linea pt-16 sm:pt-24 pb-12 sm:px-8 lg:px-10">
          <span className="mirino hidden sm:block -left-[6px]" aria-hidden />
          <span className="mirino hidden sm:block -right-[6px]" aria-hidden />
          <div data-reveal className="max-w-[56rem]">
            <h2 className="largo text-[clamp(2rem,5vw,3.6rem)] font-extrabold text-inchiostro leading-[1.02] mb-4">{header.title}</h2>
            <p className="text-tenue text-lg leading-relaxed max-w-[46rem]">{header.intro}</p>
          </div>
        </div>
        {group.projects.map((m) => (
          <ProjectDetail key={m.id} meta={m} project={copy.projects[m.id]} copy={copy} note={note} lang={lang}
            position={positions[m.id]} total={total} />
        ))}
      </div>
    </section>
  )
}
