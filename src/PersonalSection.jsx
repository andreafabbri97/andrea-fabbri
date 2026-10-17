import { Brain, Swords, ScrollText } from 'lucide-react'

// ─── Personal systems: tools built for my own work and free time ─────────────
// Private projects: no live demo or source links, and no screenshots (they show
// client names and friends' data).

const personalCopy = {
  en: {
    label: 'Personal Systems · Built for my own work',
    title: 'Tools I use every day',
    intro: 'Not everything I build is for clients. These run my own work and free time — and they are where I try out the ideas that later end up in production.',
    badge: 'In daily use',
    private: 'Private project',
    projects: [
      {
        id: 'second-brain',
        icon: Brain,
        title: 'Second Brain',
        subtitle: 'Shared memory and control room for my AI coding agents',
        desc: 'Every Claude Code session I open — on two computers or in the cloud — starts with the same rules, project notes and status. Sessions coordinate with each other, hand off work across machines, and report to a dashboard I check from my phone.',
        features: [
          'Automatic sync between desktop, laptop and cloud sessions through a private Git repository',
          'Requests sent from the phone reach the right project session, even a closed one, and the outcome comes back as a push notification',
          'Installable dashboard with one card per project: what works, what is missing, what is waiting on me',
          'GitHub sign-in with 2FA: the site holds no write key of its own',
        ],
        tags: ['Claude Code', 'Node.js', 'GitHub API', 'Vercel', 'Web Push', 'PWA'],
      },
      {
        id: 'lol-coach',
        icon: Swords,
        title: 'LoL Coach',
        subtitle: 'Match analysis for me and six friends',
        desc: 'A League of Legends coach built on the official Riot API. It records the match while we play and, when it ends, writes a full review: every death explained in context, objectives, and numbers measured against the targets for our next rank.',
        features: [
          'Rank, recent form and premade groups of all ten players at the start of each match',
          'A personal page for each of the seven players, installable as an app and recalculated at every update',
          'Habits that are measured, not guessed: how often we win when we follow a rule and when we break it',
          'Matchup data refreshed automatically every patch',
        ],
        tags: ['Riot API', 'Claude Code', 'Vercel', 'PWA'],
      },
      {
        id: 'questzip',
        icon: ScrollText,
        title: 'QuestZip',
        subtitle: 'D&D 5e campaign manager for my group',
        desc: 'A web app for game masters and players that keeps a whole campaign in one place: character sheets, real-time combat, maps and chat.',
        features: [
          'Real-time combat tracker and chat shared by the whole table',
          'Character sheets for players, campaign tools for the game master',
          'Google sign-in',
          '800+ unit tests and 49 end-to-end tests',
        ],
        tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'PartyKit', 'Playwright'],
      },
    ],
  },
  it: {
    label: 'Sistemi personali · Costruiti per il mio lavoro',
    title: 'Strumenti che uso ogni giorno',
    intro: 'Non tutto quello che costruisco è per i clienti. Questi fanno girare il mio lavoro e il mio tempo libero, e sono il posto dove provo le idee che poi finiscono in produzione.',
    badge: 'In uso ogni giorno',
    private: 'Progetto privato',
    projects: [
      {
        id: 'second-brain',
        icon: Brain,
        title: 'Second Brain',
        subtitle: 'Memoria condivisa e sala di controllo per i miei agenti di programmazione IA',
        desc: 'Ogni sessione di Claude Code che apro, su due computer o nel cloud, parte con le stesse regole, le stesse note dei progetti e lo stesso stato. Le sessioni si coordinano tra loro, si passano il lavoro da un computer all\'altro e riferiscono a un cruscotto che guardo dal telefono.',
        features: [
          'Sincronizzazione automatica tra fisso, portatile e sessioni nel cloud tramite un repository Git privato',
          'Le richieste mandate dal telefono arrivano alla sessione del progetto giusto, anche se è chiusa, e l\'esito torna come notifica',
          'Cruscotto installabile con una scheda per progetto: cosa funziona, cosa manca, cosa aspetta me',
          'Accesso con GitHub e verifica in due passaggi: il sito non ha una chiave sua per scrivere',
        ],
        tags: ['Claude Code', 'Node.js', 'GitHub API', 'Vercel', 'Web Push', 'PWA'],
      },
      {
        id: 'lol-coach',
        icon: Swords,
        title: 'Coach di LoL',
        subtitle: 'Analisi delle partite per me e sei amici',
        desc: 'Un coach di League of Legends costruito sulle API ufficiali di Riot. Registra la partita mentre giochiamo e, alla fine, scrive l\'analisi completa: ogni morte spiegata nel suo contesto, gli obiettivi e i numeri confrontati con quelli del rango successivo.',
        features: [
          'Rango, forma recente e gruppi di tutti e dieci i giocatori all\'inizio di ogni partita',
          'Una pagina personale per ognuno dei sette, installabile come app e ricalcolata a ogni aggiornamento',
          'Abitudini misurate, non indovinate: quanto vinciamo quando rispettiamo una regola e quando no',
          'Dati sui matchup aggiornati da soli a ogni patch',
        ],
        tags: ['Riot API', 'Claude Code', 'Vercel', 'PWA'],
      },
      {
        id: 'questzip',
        icon: ScrollText,
        title: 'QuestZip',
        subtitle: 'Gestore di campagne di D&D 5e per il mio gruppo',
        desc: 'Un\'app web per master e giocatori che tiene un\'intera campagna in un posto solo: schede dei personaggi, combattimento in tempo reale, mappe e chat.',
        features: [
          'Combattimento e chat in tempo reale, condivisi da tutto il tavolo',
          'Schede dei personaggi per i giocatori, strumenti di campagna per il master',
          'Accesso con Google',
          'Oltre 800 test unitari e 49 test end-to-end',
        ],
        tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'PartyKit', 'Playwright'],
      },
    ],
  },
}

function PersonalCard({ project, badge, privateLabel }) {
  const { icon: Icon, title, subtitle, desc, features, tags } = project
  return (
    <article className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 card-hover flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
        <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">{privateLabel}</p>
      </div>
    </article>
  )
}

export default function PersonalSection({ lang }) {
  const c = personalCopy[lang] ?? personalCopy.en
  return (
    <section id="personal" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-purple-400 mb-3 sm:mb-4">
          <span className="w-6 sm:w-8 h-px bg-purple-500" />
          {c.label}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3 sm:mb-4">{c.title}</h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 sm:mb-12">{c.intro}</p>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.projects.map((p) => (
            <PersonalCard key={p.id} project={p} badge={c.badge} privateLabel={c.private} />
          ))}
        </div>
      </div>
    </section>
  )
}
