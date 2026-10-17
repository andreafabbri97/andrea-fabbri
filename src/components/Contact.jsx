import { ExternalLink } from 'lucide-react'
import GithubIcon from './GithubIcon'

const WHATSAPP_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

// The close: the e-mail address is the biggest thing on the page after the name.
export default function Contact({ t }) {
  return (
    <section id="contact" data-sezione="contact" className="contenitore">
      <div className="relative sm:border-x border-t border-linea py-16 sm:py-24 sm:px-8 lg:px-10 grid lg:grid-cols-12 gap-x-14 gap-y-8">
        <span className="mirino hidden sm:block -left-[6px]" aria-hidden />
        <span className="mirino hidden sm:block -right-[6px]" aria-hidden />
        <div className="misura lg:col-span-7">
          <h2 data-reveal className="largo text-[length:min(clamp(2.5rem,7vw,5rem),11cqi)] font-extrabold text-inchiostro leading-[0.98] mb-6">{t.contactTitle}</h2>
          <p className="text-tenue text-lg leading-relaxed max-w-[38rem]">{t.contactDesc}</p>
        </div>
        <div className="lg:col-span-5 lg:pt-4 flex flex-col gap-4">
          <a
            href="mailto:andreafabbri97@gmail.com"
            className="titolo text-[clamp(1.35rem,3.2vw,2rem)] font-bold text-azzurro underline decoration-azzurro/30 underline-offset-[6px] hover-sottolinea break-all"
          >
            andreafabbri97@gmail.com
          </a>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/andreafabbri97" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-linea text-inchiostro font-semibold hover-sfondo">
              <GithubIcon /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/andrea-fabbri-9873081a6/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-linea text-inchiostro font-semibold hover-sfondo">
              <ExternalLink className="w-4 h-4" aria-hidden /> {t.contactLinkedIn}
            </a>
            <a href="https://wa.me/393334765551" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-linea text-inchiostro font-semibold hover-sfondo">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden><path d={WHATSAPP_PATH} /></svg>
              {t.ui.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
