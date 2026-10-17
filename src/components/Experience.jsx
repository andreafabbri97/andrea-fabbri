import { MapPin } from 'lucide-react'

// Experience and education are a real sequence in time, so here the dates lead each row.
export default function Experience({ t }) {
  return (
    <section id="experience" className="border-t border-linea py-16 sm:py-24">
      <div className="contenitore">
        <h2 data-reveal className="titolo text-[clamp(2.25rem,6vw,4rem)] font-extrabold text-inchiostro leading-[1] mb-10 sm:mb-14">{t.expTitle}</h2>
        <ol className="divide-y divide-linea border-y border-linea">
          {t.expItems.map((item) => (
            <li key={item.title} className="grid lg:grid-cols-12 gap-x-14 gap-y-3 py-8 sm:py-10">
              <div className="lg:col-span-4">
                <p className="cifre text-tenue font-medium mb-1">{item.period}</p>
                <p className="font-semibold text-inchiostro">{item.org}</p>
                <p className="flex items-center gap-1.5 text-sm text-tenue mt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden /> {item.location}
                </p>
              </div>
              <div className="lg:col-span-8">
                <h3 className="titolo text-2xl font-bold text-inchiostro leading-tight mb-4">{item.title}</h3>
                <ul className="space-y-2.5">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-inchiostro/85 leading-relaxed">
                      <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-linea shrink-0" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
