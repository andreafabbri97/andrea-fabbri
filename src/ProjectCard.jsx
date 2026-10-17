// Card shared by the "Personal Systems" and "Client Work" sections.
// Private projects: no links and no screenshots, so the card carries the whole story.

const badgeTones = {
  live: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  building: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  demo: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
}
const dotTones = { live: 'bg-emerald-400', building: 'bg-amber-400', demo: 'bg-sky-400' }

export default function ProjectCard({ project, badge, tone = 'live', footnote }) {
  const { icon: Icon, title, subtitle, desc, features, tags } = project
  return (
    <article className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 card-hover flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <span className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold border px-2 py-1 rounded-full ${badgeTones[tone] ?? badgeTones.live}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dotTones[tone] ?? dotTones.live}`} />
          {badge}
        </span>
      </div>
      <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{title}</h3>
      <p className="text-purple-300 text-xs sm:text-sm font-medium mb-3">{subtitle}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
      <ul className="space-y-2.5 mb-5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-[11px] font-semibold border px-2.5 py-0.5 rounded-full text-purple-300 bg-purple-500/10 border-purple-500/20">
              {tag}
            </span>
          ))}
        </div>
        {footnote && (
          <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">{footnote}</p>
        )}
      </div>
    </article>
  )
}
