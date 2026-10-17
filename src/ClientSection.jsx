import { Pizza, Car, CalendarClock, HardHat, Calculator, Warehouse, ShoppingCart, Dumbbell } from 'lucide-react'
import ProjectCard from './ProjectCard'

// ─── Client work: software built for specific businesses, names withheld ─────
// Each project has the same id, icon, status and tags in both languages; only the words change.

const clientProjects = [
  { id: 'pizzeria', icon: Pizza, tone: 'building', tags: ['Next.js 16', 'Neon Postgres', 'Drizzle', 'Web Push', 'Leaflet', 'PWA'] },
  { id: 'chauffeur', icon: Car, tone: 'live', tags: ['Next.js 16', 'Tailwind CSS 4', 'Web Push', 'PWA'] },
  { id: 'school', icon: CalendarClock, tone: 'live', tags: ['Next.js 16', 'Neon Postgres', 'Drizzle', 'Gemini', 'ExcelJS'] },
  { id: 'excavation', icon: HardHat, tone: 'building', tags: ['Next.js 16', 'Neon Postgres', 'Drizzle', 'Auth.js', 'Playwright', 'PWA'] },
  { id: 'accounting', icon: Calculator, tone: 'demo', tags: ['Next.js 16', 'Neon Postgres', 'Drizzle', 'Vitest', 'Playwright'] },
  { id: 'building-supplies', icon: Warehouse, tone: 'demo', tags: ['Next.js 16', 'Neon Postgres', 'Drizzle', 'Auth.js', 'Playwright'] },
  { id: 'supermarket', icon: ShoppingCart, tone: 'demo', tags: ['Next.js 16', 'Neon Postgres', 'Web Push', 'Playwright'] },
  { id: 'supplements', icon: Dumbbell, tone: 'demo', tags: ['Next.js 16', 'Tailwind CSS 4', 'Neon Postgres', 'Drizzle', 'Playwright'] },
]

const clientCopy = {
  en: {
    label: 'Client Work · Names withheld',
    title: 'Built to measure for local businesses',
    intro: 'Software made for specific businesses, most of them in San Marino — where there is no VAT but a single-stage tax, no GDPR but a data-protection law of its own, and generic software gets things quietly wrong. Client names are left out on purpose.',
    badges: { live: 'In production', building: 'In development', demo: 'Working demo' },
    projects: {
      pizzeria: {
        title: 'Pizzeria management system',
        subtitle: 'Takeaway and delivery: back office plus a customer ordering app',
        desc: 'Built to replace the till software a busy pizzeria has used for years, without retraining the staff: the order board by time slot, kitchen capacity, delivery rounds and shifts, plus an app where customers order.',
        features: [
          'Order board by time slot, with oven capacity and driver availability checked live',
          'Customer ordering app with real time slots and order-status push notifications',
          'Recipes and food cost per dish, menu engineering and statistics on two years of imported history',
          'Role-based access: the till never sees the admin numbers',
          '2,400+ automated tests',
        ],
      },
      chauffeur: {
        title: 'Private hire manager',
        subtitle: 'Bookings and rides, managed from the car',
        desc: 'A public site to book transfers to clubs and events, and a back office the driver uses from his phone while working: big buttons, little to read, a notification for every new booking.',
        features: [
          'Public booking site, installable as an app',
          'Rides assigned to drivers with push notifications and quick filters',
          'Distances computed automatically, takings, history and analytics',
        ],
      },
      school: {
        title: 'Support-teacher timetable for a high school',
        subtitle: 'A week of 700+ hours, proposed automatically',
        desc: 'Builds the weekly timetable of support teachers and educators for a secondary school, proposes it on its own and prints it, replacing manual work on spreadsheets.',
        features: [
          'Automatic proposal for 700+ weekly hours across two dozen teachers and a dozen educators',
          'Follows the rules set by the coordinator, including work placements and subject constraints',
          'Class timetables read from the school files with AI (Gemini)',
          'Printable sheets per teacher, student and class; any hour can be swapped between two people',
        ],
      },
      excavation: {
        title: 'Management system for an excavation company',
        subtitle: 'From hours on site to the invoice',
        desc: 'Records who worked where, with which machine and for how many hours — even on sites with no signal — and turns it into the job report and the invoice.',
        features: [
          'Daily site reports that work offline and sync when the connection is back',
          'Machines, rates frozen at approval, deadlines and waste-transport authorisations',
          'Job reports, quotes and invoices with editable lines',
          'Built-in help on every page',
        ],
      },
      accounting: {
        title: 'Software for accounting firms',
        subtitle: 'Full bookkeeping, built on local tax rules',
        desc: 'A complete demo for accountants, from the daily journal to the year-end closing, with the local laws searchable inside the app.',
        features: [
          'Journal, ledgers, balance sheet with comparison and year-end closing',
          'Fixed assets, job costing and deadline calendar',
          'Local legislation searchable in-app, with an AI assistant that cites its sources',
          'Personal logins and a tamper-proof audit log',
        ],
      },
      'building-supplies': {
        title: 'Website and back office for a building-supplies merchant',
        subtitle: 'B2B "reserve and collect"',
        desc: 'Trade customers reserve materials online and collect them at the warehouse; the back office runs catalogue and orders.',
        features: [
          'Full reserve-and-collect flow, customer area and "order again"',
          'Catalogue managed from the back office',
          'Encrypted nightly backups, with restore tested on real data',
          '1,000+ automated tests',
        ],
      },
      supermarket: {
        title: 'Website and back office for a supermarket chain',
        subtitle: 'Store pages, pre-orders and customer cards',
        desc: 'A showcase site for every store and a back office for orders: customers book their shopping, staff receive it with a notification.',
        features: [
          'Showcase site for every store',
          'Pre-orders with notifications, and a dedicated page for large orders',
          'Two-factor login, backups, customer cards with notes and tags',
          'Data analysis for the management',
        ],
      },
      supplements: {
        title: 'Showcase and orders for a supplements shop',
        subtitle: '"Reserve and collect" over WhatsApp',
        desc: 'Not an online store: customers fill a basket, the order reaches the shopkeeper on WhatsApp with a code, and they pay at the till when they collect.',
        features: [
          'Order code, WhatsApp message and an order page for the shopkeeper',
          'Catalogue search and product photos uploaded from the phone',
          'Back office with analytics and guides',
        ],
      },
    },
  },
  it: {
    label: 'Lavori per i clienti · Nomi riservati',
    title: 'Su misura per le aziende del territorio',
    intro: 'Software fatto per aziende precise, quasi tutte a San Marino: qui non c\'è l\'IVA ma la monofase, non c\'è il GDPR ma una legge sulla privacy tutta sua, e un programma generico sbaglia in silenzio. I nomi dei clienti sono tenuti fuori apposta.',
    badges: { live: 'In produzione', building: 'In sviluppo', demo: 'Demo funzionante' },
    projects: {
      pizzeria: {
        title: 'Gestionale per una pizzeria',
        subtitle: 'Asporto e domicilio: gestionale più app per ordinare',
        desc: 'Costruito per sostituire il programma di cassa che una pizzeria molto attiva usa da anni, senza dover rifare la formazione a chi ci lavora: la lavagna delle fasce orarie, il carico della cucina, i giri delle consegne e i turni, più un\'app da cui i clienti ordinano.',
        features: [
          'Lavagna per fasce orarie, con forno e driver disponibili controllati dal vivo',
          'App dei clienti con gli orari veri e le notifiche sullo stato dell\'ordine',
          'Ricette e food cost per piatto, analisi del menu e statistiche su due anni di storico importato',
          'Accessi per ruolo: chi sta in cassa non vede i numeri amministrativi',
          'Oltre 2.400 test automatici',
        ],
      },
      chauffeur: {
        title: 'Gestionale per un servizio NCC',
        subtitle: 'Prenotazioni e corse, gestite dalla macchina',
        desc: 'Un sito pubblico per prenotare transfer per discoteche ed eventi, e un gestionale che l\'autista usa dal telefono mentre lavora: tasti grandi, poco da leggere, una notifica per ogni prenotazione nuova.',
        features: [
          'Sito pubblico per prenotare, installabile come app',
          'Corse assegnate agli autisti con notifica e filtri rapidi',
          'Chilometri calcolati da soli, incassi, storico e analisi',
        ],
      },
      school: {
        title: 'Orario di sostegno per una scuola superiore',
        subtitle: 'Una settimana da oltre 700 ore, proposta in automatico',
        desc: 'Costruisce l\'orario settimanale di insegnanti di sostegno ed educatori di una scuola superiore, lo propone da solo e lo stampa, al posto del lavoro a mano sui fogli di calcolo.',
        features: [
          'Proposta automatica di oltre 700 ore settimanali per una ventina di docenti e una dozzina di educatori',
          'Rispetta le regole della referente, compresi alternanza scuola-lavoro e vincoli sulle materie',
          'Orari delle classi letti dai file della scuola con l\'IA (Gemini)',
          'Fogli stampabili per docente, alunno e classe; ogni ora si può scambiare fra due persone',
        ],
      },
      excavation: {
        title: 'Gestionale per un\'impresa di scavi',
        subtitle: 'Dalle ore in cantiere alla fattura',
        desc: 'Registra chi ha lavorato dove, con quale mezzo e per quante ore, anche nei cantieri senza campo, e ne ricava il consuntivo e la fattura.',
        features: [
          'Rapportini che funzionano senza rete e si sincronizzano quando torna',
          'Mezzi, tariffe congelate alla validazione, scadenze e autorizzazioni per il trasporto rifiuti',
          'Consuntivi, preventivi e fatture con righe modificabili',
          'Guida dentro ogni pagina',
        ],
      },
      accounting: {
        title: 'Gestionale per studi commercialisti',
        subtitle: 'Contabilità completa, costruita sulle regole fiscali locali',
        desc: 'Una demo completa per i commercialisti, dalla prima nota alla chiusura d\'esercizio, con le leggi locali consultabili dentro il programma.',
        features: [
          'Prima nota, libri, bilancio con confronto e chiusura d\'esercizio',
          'Cespiti, commesse e scadenzario',
          'Leggi consultabili nel programma, con un assistente IA che cita le fonti',
          'Accessi personali e registro delle azioni non modificabile',
        ],
      },
      'building-supplies': {
        title: 'Sito e gestionale per un magazzino edile',
        subtitle: '«Prenota e ritira» per le imprese',
        desc: 'I clienti professionali prenotano il materiale online e lo ritirano in magazzino; dal gestionale si curano catalogo e ordini.',
        features: [
          'Giro «prenota e ritira» completo, area del cliente e «Ordina di nuovo»',
          'Catalogo gestibile dal gestionale',
          'Copie di sicurezza cifrate ogni notte, con il ripristino provato su dati veri',
          'Oltre 1.000 test automatici',
        ],
      },
      supermarket: {
        title: 'Sito e gestionale per una catena di supermercati',
        subtitle: 'Punti vendita, prenotazioni e scheda dei clienti',
        desc: 'Un sito vetrina per ogni punto vendita e un gestionale per gli ordini: il cliente prenota la spesa, il personale la riceve con una notifica.',
        features: [
          'Sito vetrina con tutti i punti vendita',
          'Ordini su prenotazione con notifiche, e una pagina apposta per gli ordini con molti articoli',
          'Accesso in due passaggi, copie di sicurezza, scheda dei clienti con note ed etichette',
          'Analisi dei dati per la direzione',
        ],
      },
      supplements: {
        title: 'Vetrina e ordini per un negozio di integratori',
        subtitle: '«Prenota e ritira» su WhatsApp',
        desc: 'Non è un negozio online: il cliente riempie il carrello, l\'ordine arriva al negoziante su WhatsApp con un codice, e si paga in cassa al ritiro.',
        features: [
          'Codice dell\'ordine, messaggio WhatsApp e pagina dell\'ordine per il negoziante',
          'Ricerca nel catalogo e foto dei prodotti caricate dal telefono',
          'Gestionale con analisi e guide',
        ],
      },
    },
  },
}

export default function ClientSection({ lang }) {
  const c = clientCopy[lang] ?? clientCopy.en
  return (
    <section id="clients" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-purple-400 mb-3 sm:mb-4">
          <span className="w-6 sm:w-8 h-px bg-purple-500" />
          {c.label}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3 sm:mb-4">{c.title}</h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 sm:mb-12">{c.intro}</p>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clientProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={{ ...p, ...c.projects[p.id] }}
              badge={c.badges[p.tone]}
              tone={p.tone}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
