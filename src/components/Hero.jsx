import { Mail } from 'lucide-react'
import ProjectIndex from './ProjectIndex'
import Titano from './Titano'
import GithubIcon from './GithubIcon'

// Opening: who I am on the left, the index of everything I built on the right.
export default function Hero({ t, copy }) {
  return (
    <section id="top" className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20">
      <Titano label={copy.titano} />
      <div className="relative contenitore grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-28">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-verde mb-6">
            <span className="w-2 h-2 rounded-full bg-verde" aria-hidden />
            {t.heroStatus}
          </p>
          <h1 className="largo font-extrabold text-inchiostro leading-[0.9] text-[clamp(3rem,10vw,7.25rem)] mb-6">
            <span className="block entra-nome">{t.heroTitle1}</span>
            <span className="block entra-nome" style={{ animationDelay: '0.12s' }}>{t.heroTitle2}</span>
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-inchiostro mb-4">{t.heroSubtitle}</p>
          <p className="text-tenue text-lg leading-relaxed max-w-[38rem] mb-8">{t.heroDesc}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#lenny" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-inchiostro text-carta font-semibold">
              {t.heroBtn1}
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-linea bg-carta text-inchiostro font-semibold hover-sfondo">
              <Mail className="w-4 h-4" aria-hidden /> {t.heroBtn3}
            </a>
            <a href="https://github.com/andreafabbri97" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-linea bg-carta text-inchiostro font-semibold hover-sfondo">
              <GithubIcon /> {t.heroBtn2}
            </a>
          </div>
        </div>
        <div className="lg:col-span-6 xl:col-span-5">
          <ProjectIndex copy={copy} />
        </div>
      </div>
    </section>
  )
}
