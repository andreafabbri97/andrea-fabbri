import { lennyModules, pryorModules } from '../data/flagship'
import CountUp from './CountUp'

// The modules of the two flagship products, as a plain list in columns, and Lenny's savings.
function Modules({ title, modules }) {
  return (
    <div className="mt-12">
      <h4 className="titolo text-xl sm:text-2xl font-bold text-inchiostro mb-6">{title}</h4>
      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-8">
        {modules.map((m) => (
          <li key={m.title} className="border-t border-linea pt-4">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h5 className="font-semibold text-inchiostro leading-snug">{m.title}</h5>
              {m.saving && <span className="cifre text-sm font-semibold text-oro whitespace-nowrap">{m.saving}</span>}
            </div>
            <p className="text-[0.95rem] text-tenue leading-relaxed">{m.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function FlagshipExtras({ kind, project, lang }) {
  if (kind === 'pryor') return <Modules title={project.modulesTitle} modules={pryorModules(lang)} />
  return (
    <>
      <Modules title={project.modulesTitle} modules={lennyModules(lang)} />
      <div className="mt-12 border-y border-linea py-8 grid md:grid-cols-[auto_minmax(0,1fr)] gap-x-10 gap-y-2 items-end">
        <div>
          <p className="text-tenue font-medium mb-1">{project.savingsLabel}</p>
          <p className="titolo cifre text-oro font-extrabold leading-none text-[clamp(3rem,8vw,5.5rem)]"><CountUp value={project.savings} /></p>
        </div>
        <p className="text-tenue leading-relaxed max-w-[34rem]">{project.savingsFooter}</p>
      </div>
    </>
  )
}
