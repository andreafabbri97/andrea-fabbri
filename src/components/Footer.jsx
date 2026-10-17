import { services } from '../data/services'

// The foot of every page: the service pages (links that search engines follow from anywhere) and the line.
export default function Footer({ t, s, href }) {
  return (
    <footer className="border-t border-linea py-10">
      <div className="contenitore">
        <nav aria-label={s.labels.kicker} className="mb-6">
          <p className="font-semibold text-inchiostro mb-3">{s.labels.kicker}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-tenue">
            {services.map((v) => (
              <li key={v.id}><a href={href(v.id)} className="underline decoration-transparent underline-offset-4 hover-testo hover-sottolinea">{s.pages[v.id].label}</a></li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-tenue">{t.footer}</p>
      </div>
    </footer>
  )
}
