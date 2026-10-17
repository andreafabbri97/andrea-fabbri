// One full section per project, in the same spirit as Restaurant Manager and SUP Manager.
// These projects are private: instead of the screenshot, the right column holds the key
// numbers and the problem the project had to solve.

const badgeTones = {
  live: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  building: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  demo: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
}
const dotTones = { live: 'bg-emerald-400', building: 'bg-amber-400', demo: 'bg-sky-400' }

function StatusBadge({ tone, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeTones[tone] ?? badgeTones.live}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotTones[tone] ?? dotTones.live}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotTones[tone] ?? dotTones.live}`}></span>
      </span>
      {children}
    </span>
  )
}

export function GroupHeader({ id, label, title, intro }) {
  return (
    <div id={id} className="border-t border-white/5 px-4 sm:px-6 pt-16 sm:pt-24">
      <div className="max-w-6xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-purple-400 mb-3 sm:mb-4">
          <span className="w-6 sm:w-8 h-px bg-purple-500" />
          {label}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3 sm:mb-4">{title}</h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">{intro}</p>
      </div>
    </div>
  )
}

export default function ProjectDetail({ project, meta, badge, labels }) {
  const { icon: Icon, tone, tags } = meta
  const { label, title, tagline, desc, features, metrics, challenge } = project
  return (
    <section id={meta.id} className="py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:items-start">
          <div className="lg:w-7/12">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-px bg-indigo-500" />
              {label}
            </span>
            <div className="flex items-center flex-wrap gap-3 mb-2 sm:mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{title}</h3>
              <StatusBadge tone={tone}>{badge}</StatusBadge>
            </div>
            <p className="text-purple-300/90 text-base sm:text-lg font-medium italic mb-4 sm:mb-5">{tagline}</p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">{desc}</p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold border px-3 py-1 rounded-full text-indigo-300 bg-indigo-500/10 border-indigo-500/20">
                  {tag}
                </span>
              ))}
            </div>

            <ul className="space-y-2.5 sm:space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:w-5/12 w-full lg:sticky lg:top-24">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-4">{labels.numbers}</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                {metrics.map((m) => (
                  <div key={m.label} className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4">
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">{m.value}</div>
                    <div className="text-[11px] sm:text-xs text-slate-400 leading-snug">{m.label}</div>
                  </div>
                ))}
              </div>
              {challenge && (
                <>
                  <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-2">{labels.challenge}</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">{challenge}</p>
                </>
              )}
              <p className="text-[11px] uppercase tracking-widest text-slate-600 font-semibold">{labels.private}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
