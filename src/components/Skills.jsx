// Four groups of skills as plain columns: names, not badges.
export default function Skills({ t }) {
  return (
    <section id="skills" className="border-t border-linea py-16 sm:py-24">
      <div className="contenitore">
        <h2 data-reveal className="titolo text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-inchiostro leading-[1] mb-10 sm:mb-14">{t.skillsTitle}</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-10">
          {t.skillGroups.map((g) => (
            <div key={g.group} className="border-t-2 border-inchiostro pt-4">
              <h3 className="font-bold text-inchiostro mb-4">{g.group}</h3>
              <ul className="space-y-1.5 text-tenue">
                {g.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
