import { services } from '../data/services'

// The services on the home page: one block per page, in a grid with drawn borders. These links are also
// what lets the search engines find the service pages from the home page.
export default function ServicesIndex({ s, href }) {
  return (
    <section id="services" data-sezione="services" className="contenitore">
      <div className="relative sm:border-x border-t border-linea py-16 sm:py-24 sm:px-8 lg:px-10">
        <span className="mirino hidden sm:block -left-[6px]" aria-hidden />
        <span className="mirino hidden sm:block -right-[6px]" aria-hidden />
        <div data-reveal className="max-w-[56rem] mb-10 sm:mb-14">
          <h2 className="largo text-[clamp(2rem,5vw,3.6rem)] font-extrabold text-inchiostro leading-[1.02] mb-4">{s.home.title}</h2>
          <p className="text-tenue text-lg leading-relaxed max-w-[46rem]">{s.home.intro}</p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-linea border border-linea rounded-xl overflow-hidden">
          {services.map((v) => {
            const page = s.pages[v.id]
            return (
              <li key={v.id} style={{ '--hue': v.hue }} className="bg-carta">
                <a href={href(v.id)} className="flex flex-col h-full gap-2 p-5 sm:p-6 hover-sfondo">
                  <span className="flex items-center gap-2 text-sm text-tenue font-medium">
                    <span className="w-2.5 h-2.5 rounded-sm bg-tinta" aria-hidden />
                    {page.label}
                  </span>
                  <span className="titolo text-xl font-bold text-inchiostro leading-snug">{page.title}</span>
                </a>
              </li>
            )
          })}
          {/* The eighth block closes the grid (seven services in four columns) and leads to the contacts. */}
          <li className="bg-carta">
            <a href="#contact" className="flex flex-col h-full gap-2 p-5 sm:p-6 hover-sfondo">
              <span className="text-sm text-azzurro font-semibold">{s.home.otherKicker}</span>
              <span className="titolo text-xl font-bold text-inchiostro leading-snug">{s.home.otherTitle}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
