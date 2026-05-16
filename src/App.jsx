import { useState, useEffect, useRef } from 'react'
import {
  Cpu, Database, Zap, TrendingUp, Users, Clock,
  Globe, ExternalLink, GitBranch,
  Mail, ChevronDown, BarChart2, Shield, Layers,
  DollarSign, Briefcase, GraduationCap,
  MapPin, ArrowRight, Bot, Menu, X,
} from 'lucide-react'

// ─── i18n ─────────────────────────────────────────────────────────────────────

const translations = {
  en: {
    // Navbar
    nav: ['Experience', 'Skills', 'Contact'],
    navProjects: 'Projects',
    navProjectItems: ['Lenny Platform', 'PRYOR', 'Restaurant SaaS', 'SUP Manager', 'B2Work'],

    // Hero
    heroStatus: 'Open to opportunities',
    heroTitle1: 'Andrea',
    heroTitle2: 'Fabbri',
    heroSubtitle: 'Management Engineer · AI Automation Specialist',
    heroDesc: (
      <>
        I engineer business-critical platforms that replace manual operations with
        intelligent automation. I build the software around your business like a tailor-made
        suit, designing every feature for your specific operations.
        My flagship product delivers{' '}
        <span className="text-white font-semibold">A$64,000+ in annual savings</span>{' '}
        and a <span className="text-white font-semibold">1,550% ROI</span> to a
        live food-delivery operation.
      </>
    ),
    heroBtn1: 'View Flagship Project',
    heroBtn2: 'GitHub',
    heroBtn3: 'Contact',

    // Lenny
    lennyLabel: 'Flagship Product · Proprietary ERP',
    lennyTitle: 'Lenny Platform',
    lennyIntro: (
      <>
        A full-stack ERP engineered from scratch and{' '}
        <span className="text-white font-semibold">already adopted by a real company in San Marino</span>.
        {' '}It replaces an entire ecosystem of spreadsheets and manual processes — the operational
        equivalent of{' '}
        <span className="text-white font-semibold">
          two full-time employees working 24/7
        </span>.
      </>
    ),
    lennyOverviewTitle: 'Platform Overview',
    lennyOverviewDesc: 'The platform handles everything from driver scheduling and payroll to partner billing, multi-channel marketing, and real-time business intelligence — all in a single production-grade interface.',
    lennyFeatures: [
      '778 API routes across 29 integrated modules',
      '8 automated cron jobs running 24/7 without human intervention',
      '7 third-party integrations: WhatsApp, Gemini AI, Firebase, Brevo, AWS RDS…',
      'Real-time WebSocket updates via Pusher for live operational dashboards',
      'Automated database backup to protect against attacks and data loss',
      'and more…',
    ],
    lennyScreenshotTitle: 'Dashboard Screenshot',
    lennyModulesTitle: 'Operational Modules — Quantified Business Value',
    lennySavingsLabel: 'Total Quantified Annual Savings',
    lennySavingsFooter: (
      <>Maintenance cost: <span className="text-white font-medium">~A$4,100/yr</span>{' · '}ROI:{' '}<span className="text-emerald-400 font-bold">1,550%</span>{' · '}Time saved:{' '}<span className="text-white font-medium">1,760 hrs/yr</span></>
    ),
    videoLabel1: '[ INSERT: lenny-demo.gif — screen recording ]',
    imgLabel1: '[ INSERT: lenny-sidebar-screenshot.jpg ]',

    // PRYOR
    pryorLabel: 'AI-Native SaaS · B2B Sales CRM',
    pryorTitle: 'PRYOR',
    pryorBeta: 'Closed Beta',
    pryorTagline: 'The CRM that knows what to do next.',
    pryorIntro: (
      <>
        An AI-native B2B sales CRM engineered from scratch and{' '}
        <span className="text-white font-semibold">currently in private beta</span>.
        {' '}Built on the conviction that{' '}
        <span className="text-white font-semibold">
          the next closed deal is already in your pipeline — you just don't know which one yet
        </span>. Powered by Google Gemini and live macro / regulatory / email feeds, PRYOR decides what to do next on every deal so AEs can think about deals instead of updating Salesforce.
      </>
    ),
    pryorOverviewTitle: 'Platform Overview',
    pryorOverviewDesc: "PRYOR is the first sales workspace that fuses Google Gemini with structured external data feeds to deliver a daily 'highest-value action' verdict per deal. Every component — from the morning play generation to the in-app Gmail client to the cron-driven risk-signal ingestion — was designed to keep the AE's attention on the deals, not on data entry.",
    pryorFeatures: [
      'Stack: Next.js 16 (App Router) + React 19 + TypeScript on Vercel',
      'Neon serverless Postgres with Drizzle ORM and Drizzle Studio migrations',
      'Auth.js v5 — GitHub OAuth + Resend magic-link + database sessions',
      'Vercel Cron orchestration for daily sequences and risk-feed ingestion',
      'Google Gemini API for the Today\'s Plays judgment engine',
      'Installable PWA — manifest + service worker, mobile-first AE workspace',
    ],
    pryorModulesTitle: 'Product Modules — What Each One Solves',
    pryorLiveDemo: 'View Landing & Waitlist',

    // Restaurant
    restLabel: 'SaaS Product · Public Repository',
    restTitle: 'Restaurant Manager',
    restDesc: 'A multi-tenant restaurant management system designed to scale across multiple clients. Each tenant operates their own Supabase instance; feature access is gated server-side through a custom license authority — protecting revenue and enabling tiered plans without code changes.',
    restFeatures: [
      'Multi-tenant SaaS with 3-tier license system (Demo / Standard / Premium) validated against a central license authority',
      'Real-time order management across dine-in, takeaway, and delivery channels',
      'Split bill engine: manual, alla romana, and per-item modes',
      'EOQ-based inventory with automatic ingredient cost-out on every order',
      'Automated food cost & profit margin calculation per dish',
      'Multi-language (IT/EN), PWA-installable, offline-capable with localStorage fallback',
    ],
    restLiveDemo: 'Live Demo',
    restSource: 'Source Code',
    videoLabel2: '[ INSERT: restaurant-manager-demo.gif ]',
    imgLabel2: '[ INSERT: restaurant-manager-mobile-mockup.jpg ]',

    // SUP
    supLabel: 'Internal Tool · Family Business',
    supTitle1: 'SUP & Equipment',
    supTitle2: 'Rental Manager',
    supDesc: 'Built for a water-sports rental business to replace a paper-based booking system. Manages SUP boards, life vests, and pedal boats — real-time availability, automated revenue tracking, payroll integration, and full seasonal accounting. Used on-site directly from a phone.',
    supFeatures: [
      'Booking calendar (day / week / month view) for SUP boards, life vests, and pedal boats',
      'Equipment package composition with custom duration and fixed pricing',
      'Automated hourly revenue calculation from bookings',
      'Expense tracking and payroll integration for seasonal staff',
      'Supabase RLS-secured multi-role access (admin / staff)',
      'PWA installable — operated directly on-site from a phone or tablet',
    ],
    supLiveDemo: 'Live Demo',
    supSource: 'Source Code',
    videoLabel3: '[ INSERT: sup-manager-demo.gif ]',
    imgLabel3: '[ INSERT: sup-manager-screenshot.jpg ]',

    // B2Work
    b2workLabel: 'Marketplace MVP · Side Project',
    b2workTitle: 'B2Work',
    b2workBeta: 'In Development',
    b2workDesc: 'A marketplace platform connecting hirers with freelance and occasional workers — waiters, baristas, housekeepers, runners. Built as a fully functional MVP with real-time search, verified profiles, protected payments, and OAuth sign-in.',
    b2workFeatures: [
      'Worker discovery with location-based search and rating system',
      'Verified profiles with role badges and availability status',
      'OAuth authentication (Google) via Supabase Auth',
      'Gig publishing flow for hirers with category filtering',
      'Protected payment infrastructure and response-time guarantees',
      'Responsive landing page with dark theme and mobile-first design',
    ],
    b2workLiveDemo: 'Live Demo',
    b2workSource: 'Source Code',

    // Experience
    expLabel: 'Background',
    expTitle: 'Experience & Education',
    expItems: [
      {
        icon: Briefcase,
        title: 'Management Engineer & Operations',
        org: 'Lenny SRL',
        period: 'Jun 2023 — Present',
        location: 'Borgo Maggiore, San Marino · Hybrid',
        bullets: [
          'Part of the management team responsible for business operations, administrative support, and strategic project coordination',
          'Applied data analysis and performance metrics to drive measurable improvements in company operations',
          'Day-to-day operational workload progressively automated by Lenny Platform — freeing time for higher-value decisions',
          'Cross-functional collaboration with colleagues in senior management to align business and technology objectives',
        ],
      },
      {
        icon: Briefcase,
        title: 'AI Automation Engineer & Software Architect',
        org: 'Lenny SRL',
        period: 'Jun 2023 — Present',
        location: 'Borgo Maggiore, San Marino · Hybrid',
        bullets: [
          'Sole architect of Lenny Platform — a 778-route ERP used daily in a live food-delivery operation, built through AI-assisted engineering',

          'Architected and delivered 29 software modules, eliminating all manual back-office processes',
          'Quantified A$64,400/yr in operational savings with a documented 1,550% ROI',
          'Integrated Google Gemini AI, WhatsApp Business API, Firebase Push, Brevo, and AWS RDS',
          'Implemented enterprise-grade security: AES-128 encryption, 8-role RBAC, audit trails, automated backups',
        ],
      },
      {
        icon: Briefcase,
        title: 'Marketing Assistant Manager',
        org: 'Lenny SRL',
        period: 'Sep 2022 — May 2023',
        location: 'Borgo Maggiore, San Marino · Part-time',
        bullets: [
          'Designed and executed multi-channel marketing campaigns (social media, email, advertising)',
          'Managed CRM data and business intelligence reporting to support operational decisions',
          'Supported senior management on project coordination and performance metrics analysis',
        ],
      },
      {
        icon: GraduationCap,
        title: "Bachelor's Degree — Management Engineering",
        org: 'UNIRSM – Università degli Studi della Repubblica di San Marino',
        period: 'Sep 2020 — Oct 2023',
        location: 'San Marino',
        bullets: [
          'Graduated with 100/110 — specialisation in operations management, process optimisation, and systems engineering',
          'Applied lean methodology and systems thinking — now core to every software solution I build',
          'Skills validated: Project Management, Business Analysis, Data Analysis, Business Intelligence, Performance Metrics',
        ],
      },
      {
        icon: GraduationCap,
        title: 'Studies in Physics',
        org: 'Alma Mater Studiorum – Università di Bologna',
        period: 'Sep 2017 — 2020',
        location: 'Bologna, Italy',
        bullets: [
          'Developed and applied advanced analytical and mathematical reasoning to high-level complexity problems',
          'Built rigorous problem-solving foundations in calculus, linear algebra, classical mechanics, thermodynamics, and relativity',
          'Applied laboratory methodologies and scientific instrumentation in experimental physics settings',
        ],
      },
    ],

    // Skills
    skillsLabel: 'Skills & Tools',
    skillsTitle: 'Skills & Tools',
    skillGroups: [
      {
        group: 'Business & Management',
        items: ['Project Management', 'Business Analysis', 'Data Analysis', 'Business Intelligence', 'Performance Metrics', 'Process Optimisation', 'CRM', 'Social Media', 'Microsoft Excel', 'Microsoft Office'],
      },
      {
        group: 'AI & Automation',
        items: ['Google Gemini AI', 'Claude AI', 'AI-Driven Development', 'Prompt Engineering', 'WhatsApp Business API', 'Firebase', 'Brevo (Email/SMS)', 'Workflow Automation'],
      },
      {
        group: 'Platforms & Tools',
        items: ['Supabase', 'PostgreSQL', 'AWS RDS', 'GitHub', 'Vite', 'Tailwind CSS', 'PWA'],
      },
      {
        group: 'Soft Skills',
        items: ['Problem Solving', 'Analytical Thinking', 'Project Coordination', 'Attention to Detail', 'Resource Management', 'Adaptability', 'Team Collaboration', 'Communication', 'Self-Management'],
      },
    ],

    // Contact
    contactLabel: 'Get in Touch',
    contactTitle: (
      <>Let&apos;s build something<br />that scales.</>
    ),
    contactDesc: "I'm actively seeking working opportunities for myself to grow — particularly roles where automation, data engineering, and operational excellence intersect. If you need someone who ships production-grade systems, let's talk.",
    contactLinkedIn: 'LinkedIn',

    // Footer
    footer: '© 2026 Andrea Fabbri · Management Engineer · Built with React + Tailwind CSS',
  },

  it: {
    // Navbar
    nav: ['Esperienza', 'Competenze', 'Contatti'],
    navProjects: 'Progetti',
    navProjectItems: ['Lenny Platform', 'PRYOR', 'Restaurant SaaS', 'SUP Manager', 'B2Work'],

    // Hero
    heroStatus: 'Disponibile',
    heroTitle1: 'Andrea',
    heroTitle2: 'Fabbri',
    heroSubtitle: 'Ingegnere Gestionale · Specialista AI & Automazione',
    heroDesc: (
      <>
        Sviluppo piattaforme mission-critical che sostituiscono processi manuali con
        automazione intelligente. Costruisco il software attorno alla tua azienda come un
        abito su misura, progettando ogni funzionalità per le tue specifiche esigenze operative.
        Il mio prodotto di punta genera{' '}
        <span className="text-white font-semibold">€37.000+ di risparmi annui</span>{' '}
        e un <span className="text-white font-semibold">ROI del 1.550%</span> per
        un'operazione di food delivery attiva.
      </>
    ),
    heroBtn1: 'Progetto Principale',
    heroBtn2: 'GitHub',
    heroBtn3: 'Contatti',

    // Lenny
    lennyLabel: 'Prodotto Principale · ERP Proprietario',
    lennyTitle: 'Lenny Platform',
    lennyIntro: (
      <>
        Un ERP full-stack sviluppato da zero e{' '}
        <span className="text-white font-semibold">già adottato da un'azienda reale di San Marino</span>.
        {' '}Sostituisce un intero ecosistema di fogli Excel e processi manuali —
        l'equivalente operativo di{' '}
        <span className="text-white font-semibold">
          due dipendenti a tempo pieno attivi 24/7
        </span>.
      </>
    ),
    lennyOverviewTitle: 'Panoramica della Piattaforma',
    lennyOverviewDesc: "La piattaforma gestisce tutto: dalla pianificazione dei turni driver e la busta paga, alla fatturazione dei partner, al marketing multicanale e alla business intelligence in tempo reale — tutto in un'unica interfaccia di livello enterprise.",
    lennyFeatures: [
      '778 route API distribuite su 29 moduli integrati',
      '8 cron job automatizzati attivi 24/7 senza intervento umano',
      '7 integrazioni di terze parti: WhatsApp, Gemini AI, Firebase, Brevo, AWS RDS…',
      'Aggiornamenti WebSocket in tempo reale via Pusher per dashboard operative live',
      'Backup automatico del database per protezione da attacchi e perdite di dati',
      'e altro…',
    ],
    lennyScreenshotTitle: 'Screenshot della Dashboard',
    lennyModulesTitle: 'Moduli Operativi — Valore di Business Quantificato',
    lennySavingsLabel: 'Risparmio Annuo Totale Quantificato',
    lennySavingsFooter: (
      <>Costo di manutenzione: <span className="text-white font-medium">~€2.400/anno</span>{' · '}ROI:{' '}<span className="text-emerald-400 font-bold">1.550%</span>{' · '}Ore risparmiate:{' '}<span className="text-white font-medium">1.760 ore/anno</span></>
    ),
    videoLabel1: '[ INSERIRE: lenny-demo.gif — registrazione schermo ]',
    imgLabel1: '[ INSERIRE: lenny-sidebar-screenshot.jpg ]',

    // PRYOR
    pryorLabel: 'SaaS AI-Native · CRM Sales B2B',
    pryorTitle: 'PRYOR',
    pryorBeta: 'Closed Beta',
    pryorTagline: 'Il CRM che sa cosa fare dopo.',
    pryorIntro: (
      <>
        Un CRM B2B AI-native progettato da zero e{' '}
        <span className="text-white font-semibold">attualmente in beta privata</span>.
        {' '}Costruito sulla convinzione che{' '}
        <span className="text-white font-semibold">
          il prossimo deal chiuso è già nella tua pipeline — semplicemente non sai ancora quale
        </span>. Alimentato da Google Gemini e da feed live macro / regolatori / email, PRYOR decide cosa fare dopo su ogni trattativa così l'AE può ragionare sui deal invece di aggiornare Salesforce.
      </>
    ),
    pryorOverviewTitle: 'Panoramica della Piattaforma',
    pryorOverviewDesc: "PRYOR è il primo workspace di vendita che fonde Google Gemini con feed di dati esterni strutturati per consegnare ogni giorno il verdetto 'azione a maggior valore' su ogni deal. Ogni componente — dalla generazione delle plays mattutine al client Gmail in-app fino all'ingestione cron-driven dei segnali di rischio — è progettato per tenere l'attenzione dell'AE sui deal, non sull'inserimento dati.",
    pryorFeatures: [
      'Stack: Next.js 16 (App Router) + React 19 + TypeScript su Vercel',
      'Neon Postgres serverless con Drizzle ORM e migrazioni via Drizzle Studio',
      'Auth.js v5 — OAuth GitHub + Resend magic-link + sessioni su database',
      'Orchestrazione cron Vercel per sequenze giornaliere e ingestione feed di rischio',
      'API Google Gemini per il motore decisionale Today\'s Plays',
      'PWA installabile — manifest + service worker, workspace AE mobile-first',
    ],
    pryorModulesTitle: 'Moduli del Prodotto — Cosa Risolve Ognuno',
    pryorLiveDemo: 'Landing & Waitlist',

    // Restaurant
    restLabel: 'Prodotto SaaS · Repository Pubblico',
    restTitle: 'Restaurant Manager',
    restDesc: "Sistema di gestione ristorante multi-tenant progettato per scalare su più clienti. Ogni tenant opera sulla propria istanza Supabase; l'accesso alle funzionalità è protetto lato server tramite un'autorità di licenza personalizzata — a tutela del revenue e per abilitare piani a livelli senza modifiche al codice.",
    restFeatures: [
      'SaaS multi-tenant con sistema di licenze a 3 livelli (Demo / Standard / Premium) validato tramite authority centrale',
      'Gestione ordini in tempo reale su canali sala, asporto e consegna',
      'Motore di divisione conto: manuale, alla romana e per voce',
      'Inventario basato su EOQ con calcolo automatico del food cost per ogni ordine',
      'Calcolo automatico del margine di profitto per piatto',
      'Multilingua (IT/EN), installabile come PWA, funziona offline con fallback localStorage',
    ],
    restLiveDemo: 'Demo Live',
    restSource: 'Codice Sorgente',
    videoLabel2: '[ INSERIRE: restaurant-manager-demo.gif ]',
    imgLabel2: '[ INSERIRE: restaurant-manager-mobile-mockup.jpg ]',

    // SUP
    supLabel: 'Strumento Interno · Azienda di Famiglia',
    supTitle1: 'SUP & Attrezzatura',
    supTitle2: 'Gestione Noleggi',
    supDesc: "Sviluppato per un'attività di noleggio sport acquatici per sostituire un sistema cartaceo. Gestisce tavole SUP, giubbotti e pedalò — disponibilità in tempo reale, calcolo ricavi automatico, integrazione stipendi e contabilità stagionale completa. Utilizzato in loco direttamente da smartphone.",
    supFeatures: [
      'Calendario prenotazioni (vista giorno / settimana / mese) per tavole SUP, giubbotti e pedalò',
      'Composizione pacchetti attrezzatura con durata personalizzata e prezzi fissi',
      'Calcolo automatico dei ricavi orari dalle prenotazioni',
      'Tracciamento spese e gestione stipendi per personale stagionale',
      'Accesso multi-ruolo protetto con Supabase RLS (admin / staff)',
      'Installabile come PWA — operativo in loco da smartphone o tablet',
    ],
    supLiveDemo: 'Demo Live',
    supSource: 'Codice Sorgente',
    videoLabel3: '[ INSERIRE: sup-manager-demo.gif ]',
    imgLabel3: '[ INSERIRE: sup-manager-screenshot.jpg ]',

    // B2Work
    b2workLabel: 'Marketplace MVP · Side Project',
    b2workTitle: 'B2Work',
    b2workBeta: 'In Sviluppo',
    b2workDesc: 'Una piattaforma marketplace che connette chi assume con lavoratori freelance e occasionali — camerieri, baristi, colf, runner. Costruita come MVP completamente funzionale con ricerca in tempo reale, profili verificati, pagamenti protetti e accesso OAuth.',
    b2workFeatures: [
      'Ricerca lavoratori geolocalizzata con sistema di valutazione',
      'Profili verificati con badge di ruolo e stato di disponibilità',
      'Autenticazione OAuth (Google) tramite Supabase Auth',
      'Flusso di pubblicazione offerte per chi assume con filtri per categoria',
      'Infrastruttura pagamenti protetti e garanzie sui tempi di risposta',
      'Landing page responsive con tema scuro e design mobile-first',
    ],
    b2workLiveDemo: 'Demo Live',
    b2workSource: 'Codice Sorgente',

    // Experience
    expLabel: 'Percorso',
    expTitle: 'Esperienza & Formazione',
    expItems: [
      {
        icon: Briefcase,
        title: 'Ingegnere Gestionale & Operations',
        org: 'Lenny SRL',
        period: 'Giu 2023 — Presente',
        location: 'Borgo Maggiore, San Marino · Ibrido',
        bullets: [
          'Parte del team di direzione aziendale: gestione operativa, supporto amministrativo e coordinamento strategico dei progetti',
          'Applicazione di analisi dati e metriche di performance per miglioramenti misurabili delle operations aziendali',
          'Il carico operativo quotidiano è stato progressivamente automatizzato dalla Lenny Platform — liberando tempo per decisioni ad alto valore',
          'Collaborazione trasversale con i colleghi di direzione per allineare obiettivi di business e tecnologia',
        ],
      },
      {
        icon: Briefcase,
        title: 'AI Automation Engineer & Software Architect',
        org: 'Lenny SRL',
        period: 'Giu 2023 — Presente',
        location: 'Borgo Maggiore, San Marino · Ibrido',
        bullets: [
          'Unico architetto della Lenny Platform — ERP con 778 route usato quotidianamente in una operazione food delivery attiva, costruito attraverso ingegneria AI-assistita',

          'Progettato e consegnato 29 moduli software, eliminando tutti i processi di back office manuali',
          'Quantificati €37.420/anno di risparmi operativi con un ROI documentato del 1.550%',
          'Integrazione di Google Gemini AI, WhatsApp Business API, Firebase Push, Brevo e AWS RDS',
          'Sicurezza enterprise: crittografia AES-128, RBAC 8 ruoli, audit trail, backup automatici',
        ],
      },
      {
        icon: Briefcase,
        title: 'Assistente Responsabile Marketing',
        org: 'Lenny SRL',
        period: 'Set 2022 — Mag 2023',
        location: 'Borgo Maggiore, San Marino · Part-time',
        bullets: [
          'Ideazione e realizzazione di campagne marketing multicanale (social media, email, pubblicità)',
          'Gestione dati CRM e reportistica di business intelligence a supporto delle decisioni operative',
          'Supporto alla direzione aziendale su coordinamento progettuale e analisi metriche di performance',
        ],
      },
      {
        icon: GraduationCap,
        title: 'Laurea Triennale — Ingegneria Gestionale',
        org: 'UNIRSM – Università degli Studi della Repubblica di San Marino',
        period: 'Set 2020 — Ott 2023',
        location: 'San Marino',
        bullets: [
          'Votazione 100/110 — specializzazione in gestione delle operations, ottimizzazione dei processi e ingegneria dei sistemi',
          'Applicazione della metodologia lean e del systems thinking — oggi al centro di ogni soluzione software sviluppata',
          'Competenze validate: Project Management, Analisi Aziendale, Analisi Dati, Business Intelligence, Metriche di Performance',
        ],
      },
      {
        icon: GraduationCap,
        title: 'Studi in Fisica',
        org: 'Alma Mater Studiorum – Università di Bologna',
        period: 'Set 2017 — 2020',
        location: 'Bologna, Italia',
        bullets: [
          'Sviluppato un pensiero analitico e matematico di livello avanzato, superiore ai curricula standard di ingegneria',
          'Costruite solide basi di problem-solving in calcolo, algebra lineare, meccanica classica, termodinamica e relatività',
          'Applicazione di metodologie di laboratorio e strumentazione scientifica in contesti di fisica sperimentale',
        ],
      },
    ],

    // Skills
    skillsLabel: 'Skills & Strumenti',
    skillsTitle: 'Competenze & Strumenti',
    skillGroups: [
      {
        group: 'Business & Management',
        items: ['Project Management', 'Analisi Aziendale', 'Analisi Dati', 'Business Intelligence', 'Metriche di Performance', 'Ottimizzazione Processi', 'CRM', 'Social Media', 'Microsoft Excel', 'Microsoft Office'],
      },
      {
        group: 'AI & Automazione',
        items: ['Google Gemini AI', 'Claude AI', 'ChatGPT', 'Sviluppo AI-Driven', 'Prompt Engineering', 'WhatsApp Business API', 'Firebase', 'Brevo (Email/SMS)', 'Automazione Workflow'],
      },
      {
        group: 'Piattaforme & Strumenti',
        items: ['Supabase', 'PostgreSQL', 'AWS RDS', 'GitHub', 'Vite', 'Tailwind CSS', 'PWA'],
      },      {
        group: 'Soft Skills',
        items: ['Problem Solving', 'Pensiero Analitico', 'Coordinamento Progetti', 'Attenzione al Dettaglio', 'Gestione delle Risorse', 'Adattabilità', 'Lavoro di Squadra', 'Comunicazione', 'Autonomia'],
      },    ],

    // Contact
    contactLabel: 'Contatti',
    contactTitle: (
      <>Costruiamo qualcosa<br />che scali.</>
    ),
    contactDesc: "Cerco attivamente opportunità lavorative per crescere professionalmente — in particolare ruoli in cui automazione, ingegneria dei dati e eccellenza operativa si incontrano. Se cerchi qualcuno che consegna sistemi pronti per la produzione, parliamone.",
    contactLinkedIn: 'LinkedIn',

    // Footer
    footer: '© 2026 Andrea Fabbri · Ingegnere Gestionale · Realizzato con React + Tailwind CSS',
  },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const lennyMetrics = (lang) => [
  { label: lang === 'it' ? 'Route Operative' : 'Operational Routes', value: '778', icon: Cpu },
  { label: lang === 'it' ? 'Tabelle Database' : 'Database Tables', value: '131+', icon: Database },
  { label: lang === 'it' ? 'Moduli Software' : 'Software Modules', value: '29', icon: Layers },
  { label: lang === 'it' ? 'Partner Ristoranti' : 'Restaurant Partners', value: '47+', icon: Users },
  { label: lang === 'it' ? 'Ore Risparmiate / Anno' : 'Hours Saved / Year', value: '1,760', icon: Clock },
  { label: 'ROI', value: '1,550%', icon: TrendingUp },
]

const lennyModules = (lang) => {
  const it = lang === 'it'
  return [
    {
      icon: Users,
      title: it ? 'Automazione Turni Driver' : 'Driver Shift Automation',
      description: it
        ? 'Raccolta disponibilità self-service, assegnazione automatica, invio massivo WhatsApp e rilevamento conflitti veicoli in tempo reale — elimina 2,5 ore di coordinamento manuale al giorno.'
        : 'Self-service availability collection, auto-assignment, WhatsApp bulk dispatch, and real-time vehicle conflict detection — eliminating 2.5 hrs of manual coordination daily.',
      saving: it ? '€7.800/anno' : 'A$13,400/yr',
    },
    {
      icon: Clock,
      title: it ? 'Tracciamento Ore in Tempo Reale' : 'Real-Time Hours Tracking',
      description: it
        ? 'La busta paga viene calcolata dai dati reali degli ordini, non dai turni dichiarati. Elimina un overpayment del 5–10% su 15 driver tramite regole intelligenti sui turni.'
        : 'Payroll calculated from actual order data, not declared shifts. Eliminates a 5–10% overpayment across 15 drivers through intelligent gap and shift boundary rules.',
      saving: it ? '€8.800/anno' : 'A$15,100/yr',
    },
    {
      icon: Bot,
      title: it ? 'Assistente AI Dati Integrato' : 'Embedded AI Data Assistant',
      description: it
        ? 'Google Gemini con function calling interroga il database live in linguaggio naturale. Il personale non tecnico ottiene risposte immediate — senza SQL, senza aspettare report.'
        : 'Google Gemini with function calling queries the live database in natural language. Non-technical staff get instant answers — no SQL, no waiting for reports.',
      saving: it ? '€5.300/anno' : 'A$9,100/yr',
    },
    {
      icon: DollarSign,
      title: it ? 'Motore di Fatturazione Ristoranti' : 'Restaurant Billing Engine',
      description: it
        ? 'Calcolo automatico delle commissioni per 47+ partner con regole multi-livello, workflow strutturato per l\'approvazione delle penali e rendiconti PDF per ristorante.'
        : 'Automated commission calculations for 47+ partners with multi-tier fee rules, structured penalty approval workflows, and per-restaurant PDF statements.',
      saving: it ? '€2.700/anno' : 'A$4,650/yr',
    },
    {
      icon: BarChart2,
      title: it ? 'Motore Marketing & RFM' : 'Marketing & RFM Engine',
      description: it
        ? 'Campagne email (Brevo) + WhatsApp con segmentazione automatica RFM dei clienti estratta direttamente dal database ordini — niente Mailchimp o liste manuali.'
        : 'Email (Brevo) + WhatsApp campaigns with automatic RFM customer segmentation sourced directly from the order database — no Mailchimp or manual lists required.',
      saving: it ? '€3.000/anno' : 'A$5,160/yr',
    },
    {
      icon: Shield,
      title: it ? 'Layer di Sicurezza Enterprise' : 'Enterprise Security Layer',
      description: it
        ? 'Crittografia credenziali AES-128 (Fernet) at rest, RBAC con 8 ruoli e permessi granulari, protezione CSRF, prevenzione SQL injection, audit trail GDPR e backup automatici multi-strato con retention 90 giorni.'
        : 'AES-128 (Fernet) credential encryption at rest, 8-role RBAC with granular permissions, CSRF protection, SQL injection prevention, GDPR audit trail, and automated multi-layer backups with 90-day retention.',
      saving: it ? 'Conformità' : 'Compliance',
    },
  ]
}

const pryorMetrics = (lang) => {
  const it = lang === 'it'
  return [
    { label: it ? 'Plays IA Giornaliere / AE' : 'Daily AI Plays / AE', value: '5', icon: Bot, color: 'sky' },
    { label: it ? 'Tipi di Segnale Rischio' : 'Risk Signal Types', value: '8', icon: Shield, color: 'sky' },
    { label: it ? 'Feed Dati Live' : 'Live Data Sources', value: '3', icon: Database, color: 'sky' },
    { label: it ? 'Moduli di Prodotto' : 'Product Modules', value: '12', icon: Layers, color: 'sky' },
    { label: it ? 'Cron Job Giornalieri' : 'Daily Cron Jobs', value: '2', icon: Clock, color: 'sky' },
    { label: it ? 'Motore IA' : 'AI Engine', value: 'Gemini', icon: Cpu, color: 'sky' },
  ]
}

const pryorModules = (lang) => {
  const it = lang === 'it'
  return [
    {
      icon: Bot,
      title: "Today's Plays",
      description: it
        ? "Google Gemini legge l'intera pipeline durante la notte e classifica le 5 azioni AE a maggior leva da fare oggi — con ragionamento esplicito e bozze di risposta pre-scritte nel tono di voce dell'Account Executive."
        : "Google Gemini reads the full pipeline overnight and ranks the 5 highest-leverage AE actions for the day — with explainable reasoning and draft replies pre-written in the Account Executive's tone of voice.",
    },
    {
      icon: Shield,
      title: it ? 'Motore Rischio — Inverso dell\'Intent' : 'Risk Engine — Inverse of Intent',
      description: it
        ? 'Mentre gli altri CRM tracciano solo i segnali d\'acquisto, PRYOR rileva anche gli eventi che distruggono i deal in silenzio: abbandono champion (via rilevamento bounce Gmail), rialzi tassi (feed live FRED), cambi regolamentari (Federal Register USA). Severità calcolata automaticamente.'
        : "While other CRMs track only buying signals, PRYOR detects the events that quietly destroy deals: champion departures (via Gmail bounce detection), rate hikes (live FRED feed), regulatory shifts (US Federal Register). Severity scored automatically.",
    },
    {
      icon: Mail,
      title: it ? 'Sequenze con Auto-Uscita' : 'Sequences with Auto-Exit',
      description: it
        ? 'Costruttore di outreach multi-step inviato da un cron Vercel giornaliero. Nel momento in cui il prospect risponde, la sequenza esce in modo pulito — niente più "scusa, ignora l\'ultima email".'
        : "Multi-step outreach builder dispatched by a daily Vercel cron. The moment a prospect replies, the sequence exits cleanly — no more 'sorry, ignore that last email' moments.",
    },
    {
      icon: Users,
      title: 'Network Map',
      description: it
        ? 'Grafo degli stakeholder per ogni account. Rivela i veri decisori, le relazioni tra di loro e le lacune nella copertura che diventano blocker in fase di closing.'
        : 'Stakeholder graph per account. Surfaces the actual decision-makers, the relationships between them, and the coverage gaps that turn into blockers at close.',
    },
    {
      icon: ExternalLink,
      title: it ? 'Client Gmail Nativo' : 'Native Gmail Client',
      description: it
        ? "Esperienza Gmail completa integrata nel CRM: cartelle, compose, allegati, archive — sulla casella OAuth dell'admin, perché l'AE non esca mai dal workflow di vendita."
        : "Full Gmail experience embedded inside the CRM — folders, compose, attachments, archive — running on the admin's OAuth-connected mailbox so AEs never context-switch out of the sales workflow.",
    },
    {
      icon: BarChart2,
      title: it ? 'Pipeline & Analytics Live' : 'Pipeline & Live Analytics',
      description: it
        ? 'Kanban drag-to-stage abbinato a una dashboard KPI in tempo reale: velocity dei deal, tassi di conversione, densità di signal per account. L\'import CSV rende la migrazione da Salesforce banale.'
        : 'Drag-to-stage Kanban paired with a real-time KPI dashboard: deal velocity, conversion rates, signal density per account. CSV import keeps migrating from Salesforce trivial.',
    },
  ]
}

// ─── UI Primitives ───────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-3 sm:mb-4">
      <span className="w-6 sm:w-8 h-px bg-indigo-500" />
      {children}
    </span>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3 sm:mb-4">
      {children}
    </h2>
  )
}

function MetricCard({ label, value, icon: Icon, color = 'indigo' }) {
  const iconColor = color === 'sky' ? 'text-sky-400' : 'text-indigo-400'
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center card-hover">
      <Icon className={`w-4 sm:w-5 h-4 sm:h-5 ${iconColor} mx-auto mb-2 sm:mb-3`} />
      <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{value}</div>
      <div className="text-[10px] sm:text-xs text-slate-400 leading-snug">{label}</div>
    </div>
  )
}

function PryorModuleCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 card-hover">
      <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-sky-500/20 flex items-center justify-center shrink-0 mb-3 sm:mb-4">
        <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-sky-400" />
      </div>
      <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">{title}</h3>
      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function ModuleCard({ icon: Icon, title, description, saving }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 card-hover">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
          <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-400" />
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full">
          {saving}
        </span>
      </div>
      <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">{title}</h3>
      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Bullet({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm text-slate-300">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
      {text}
    </li>
  )
}

function TagBadge({ tag, color = 'indigo' }) {
  const styles = {
    indigo: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    purple: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
    slate: 'text-slate-300 bg-slate-500/10 border-slate-500/20',
    sky: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
  }
  return (
    <span className={`text-xs font-semibold border px-3 py-1 rounded-full ${styles[color] ?? styles.indigo}`}>
      {tag}
    </span>
  )
}

// ─── Media Placeholders ──────────────────────────────────────────────────────

function VideoPlaceholder({ label }) {
  const isGif = label.toLowerCase().includes('.gif')
  return (
    <div className="aspect-video w-full bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-500">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-slate-400">
        {isGif ? 'GIF' : '▶'}
      </div>
      <span className="text-xs font-mono text-center px-4">{label}</span>
    </div>
  )
}

function ImagePlaceholder({ label }) {
  return (
    <div className="w-full bg-white/5 border-2 border-dashed border-white/20 rounded-2xl aspect-video flex flex-col items-center justify-center gap-2 text-slate-500">
      <div className="text-3xl">🖼</div>
      <span className="text-xs font-mono text-center px-4">{label}</span>
    </div>
  )
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Hero({ t }) {
  return (
    <section className="flex flex-col justify-start relative overflow-hidden px-4 sm:px-6 pt-4 pb-12 md:pt-16 md:pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] h-[400px] md:h-[500px] bg-indigo-700/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {t.heroStatus}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 sm:mb-6">
          {t.heroTitle1}
          <br />
          <span className="text-gradient">{t.heroTitle2}</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium mb-3 sm:mb-4">{t.heroSubtitle}</p>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8 sm:mb-10">{t.heroDesc}</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <a
            href="#lenny"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
          >
            {t.heroBtn1} <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex gap-3 sm:gap-4">
            <a
              href="https://github.com/andreafabbri97"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex-1 sm:flex-none text-sm sm:text-base"
            >
              <GitBranch className="w-4 h-4" /> {t.heroBtn2}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex-1 sm:flex-none text-sm sm:text-base"
            >
              <Mail className="w-4 h-4" /> {t.heroBtn3}
            </a>
          </div>
        </div>
      </div>

      <ChevronDown className="absolute bottom-4 sm:bottom-10 inset-x-0 mx-auto w-6 h-6 text-slate-600 animate-bounce" />
    </section>
  )
}

function LennySection({ t, lang }) {
  return (
    <section id="lenny" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel>{t.lennyLabel}</SectionLabel>
          <SectionTitle>{t.lennyTitle}</SectionTitle>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">{t.lennyIntro}</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 mb-10 sm:mb-16">
          {lennyMetrics(lang).map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 mb-10 sm:mb-16 items-center">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{t.lennyOverviewTitle}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 sm:mb-6">{t.lennyOverviewDesc}</p>
            <div className="space-y-2.5">
              {t.lennyFeatures.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <img
            src="images/lenny-platform-screenshot.jpg"
            alt="Lenny Platform dashboard"
            className="w-full rounded-2xl border border-white/10"
          />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8 text-center">{t.lennyModulesTitle}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-12">
          {lennyModules(lang).map((m) => (
            <ModuleCard key={m.title} {...m} />
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-700/20 border border-indigo-500/30 rounded-2xl p-5 sm:p-8 text-center glow">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">{t.lennySavingsLabel}</p>
          <p className="text-3xl sm:text-5xl font-black text-white mb-2 sm:mb-3">{lang === 'it' ? '€37.420' : 'A$64,400'}</p>
          <p className="text-slate-400 text-xs sm:text-sm">{t.lennySavingsFooter}</p>
        </div>
      </div>
    </section>
  )
}

function PryorSection({ t, lang }) {
  return (
    <section id="pryor" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel>{t.pryorLabel}</SectionLabel>
          <div className="flex items-center justify-center flex-wrap gap-3 [&_h2]:mb-0 mb-3 sm:mb-4">
            <SectionTitle>{t.pryorTitle}</SectionTitle>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              {t.pryorBeta}
            </span>
          </div>
          <p className="text-sky-300/90 text-base sm:text-lg font-medium italic mb-4 sm:mb-5">{t.pryorTagline}</p>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">{t.pryorIntro}</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 mb-10 sm:mb-16">
          {pryorMetrics(lang).map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 mb-10 sm:mb-16 items-center">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{t.pryorOverviewTitle}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 sm:mb-6">{t.pryorOverviewDesc}</p>
            <div className="space-y-2.5 mb-6 sm:mb-8">
              {t.pryorFeatures.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <a
              href="https://pryor-eight.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-900 text-sm px-5 py-2.5 rounded-xl font-semibold transition-colors"
            >
              <Globe className="w-4 h-4" /> {t.pryorLiveDemo}
            </a>
          </div>
          <img
            src="images/pryor-screenshot.jpg"
            alt="PRYOR sales CRM landing"
            className="w-full rounded-2xl border border-white/10"
          />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8 text-center">{t.pryorModulesTitle}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {pryorModules(lang).map((m) => (
            <PryorModuleCard key={m.title} {...m} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RestaurantSection({ t }) {
  return (
    <section id="restaurant" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
          <div className="lg:w-5/12">
            <SectionLabel>{t.restLabel}</SectionLabel>
            <SectionTitle>{t.restTitle}</SectionTitle>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{t.restDesc}</p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              {['React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PWA', 'Recharts'].map((tag) => (
                <TagBadge key={tag} tag={tag} color="indigo" />
              ))}
            </div>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {t.restFeatures.map((f) => <Bullet key={f} text={f} />)}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://andreafabbri97.github.io/restaurant-manager/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <Globe className="w-4 h-4" /> {t.restLiveDemo}
              </a>
              <a
                href="https://github.com/andreafabbri97/restaurant-manager"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <GitBranch className="w-4 h-4" /> {t.restSource}
              </a>
            </div>
          </div>

          <div className="lg:w-7/12 w-full">
            <img
              src="images/restaurant-manager-screenshot.jpg"
              alt="Restaurant Manager screenshot"
              className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function SupSection({ t }) {
  return (
    <section id="sup" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-8 sm:gap-12 items-center">
          <div className="lg:w-5/12">
            <SectionLabel>{t.supLabel}</SectionLabel>
            <SectionTitle>
              {t.supTitle1}
              <br />
              {t.supTitle2}
            </SectionTitle>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{t.supDesc}</p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              {['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PWA', 'Vitest'].map((tag) => (
                <TagBadge key={tag} tag={tag} color="purple" />
              ))}
            </div>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {t.supFeatures.map((f) => <Bullet key={f} text={f} />)}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://andreafabbri97.github.io/sup-manager/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <Globe className="w-4 h-4" /> {t.supLiveDemo}
              </a>
              <a
                href="https://github.com/andreafabbri97/sup-manager"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <GitBranch className="w-4 h-4" /> {t.supSource}
              </a>
            </div>
          </div>

          <div className="lg:w-7/12 w-full">
            <img
              src="images/sup-manager-screenshot.jpg"
              alt="SUP Manager screenshot"
              className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function B2WorkSection({ t }) {
  return (
    <section id="b2work" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
          <div className="lg:w-5/12">
            <SectionLabel>{t.b2workLabel}</SectionLabel>
            <div className="flex items-center gap-3 [&_h2]:mb-0">
              <SectionTitle>{t.b2workTitle}</SectionTitle>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
                {t.b2workBeta}
              </span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{t.b2workDesc}</p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
              {['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Shadcn/UI'].map((tag) => (
                <TagBadge key={tag} tag={tag} color="indigo" />
              ))}
            </div>

            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {t.b2workFeatures.map((f) => <Bullet key={f} text={f} />)}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://andreafabbri97.github.io/B2Work/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <Globe className="w-4 h-4" /> {t.b2workLiveDemo}
              </a>
              <a
                href="https://github.com/andreafabbri97/B2Work"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-colors"
              >
                <GitBranch className="w-4 h-4" /> {t.b2workSource}
              </a>
            </div>
          </div>

          <div className="lg:w-7/12 w-full">
            <img
              src="images/B2Work-screenshot.jpg"
              alt="B2Work marketplace screenshot"
              className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection({ t }) {
  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel>{t.expLabel}</SectionLabel>
          <SectionTitle>{t.expTitle}</SectionTitle>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {t.expItems.map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 card-hover"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm sm:text-base leading-snug mb-0.5">{item.title}</h3>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-mono">{item.period}</span>
                  <p className="text-indigo-300 text-xs sm:text-sm font-medium mt-1 mb-0.5">{item.org}</p>
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 mb-3 sm:mb-5">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {item.bullets.map((b) => <Bullet key={b} text={b} />)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection({ t }) {
  const groupColors = ['indigo', 'purple', 'indigo', 'purple']
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel>{t.skillsLabel}</SectionLabel>
          <SectionTitle>{t.skillsTitle}</SectionTitle>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {t.skillGroups.map((sg, i) => (
            <div key={sg.group} className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-widest">{sg.group}</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {sg.items.map((item) => (
                  <TagBadge key={item} tag={item} color={groupColors[i % groupColors.length]} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection({ t }) {
  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <SectionLabel>{t.contactLabel}</SectionLabel>
        <SectionTitle>{t.contactTitle}</SectionTitle>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">{t.contactDesc}</p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <a
            href="mailto:andreafabbri97@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base"
          >
            <Mail className="w-4 h-4" /> andreafabbri97@gmail.com
          </a>
          <div className="flex gap-3 sm:gap-4">
            <a
              href="https://github.com/andreafabbri97"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold transition-colors flex-1 sm:flex-none text-sm sm:text-base"
            >
              <GitBranch className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/andrea-fabbri-9873081a6/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold transition-colors flex-1 sm:flex-none text-sm sm:text-base"
            >
              <ExternalLink className="w-4 h-4" /> {t.contactLinkedIn}
            </a>
            <a
              href="https://wa.me/393334765551"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#19a84d] text-white w-12 h-12 rounded-xl transition-colors shrink-0"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Navbar({ t, lang, setLang }) {
  const anchors = ['#experience', '#skills', '#contact']
  const projectAnchors = ['#lenny', '#pryor', '#restaurant', '#sup', '#b2work']
  const [dropOpen, setDropOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  const closeMobile = () => setMobileOpen(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleBackdropTouch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Delay closing so the backdrop absorbs the full touch→click cycle
    setTimeout(closeMobile, 10)
  }

  return (
    <>
      {/* Backdrop overlay — blocks all interaction with content behind */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity duration-300 ease-in-out ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => { e.stopPropagation(); closeMobile() }}
        onTouchEnd={handleBackdropTouch}
      />
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); closeMobile(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-white font-bold text-sm hover:text-indigo-300 transition-colors cursor-pointer">Andrea Fabbri</a>
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-5">
              <div className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
                <button
                  onClick={() => setDropOpen(o => !o)}
                  className="flex items-center gap-1 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  {t.navProjects}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-44">
                    <div className="bg-[#13131a] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    {t.navProjectItems.map((label, i) => (
                      <a
                        key={projectAnchors[i]}
                        href={projectAnchors[i]}
                        onClick={() => setDropOpen(false)}
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {label}
                      </a>
                    ))}
                    </div>
                  </div>
                )}
              </div>
              {t.nav.map((label, i) => (
                <a
                  key={anchors[i]}
                  href={anchors[i]}
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            {/* Language switcher */}
            <div className="flex items-center gap-1.5 ml-2 sm:ml-3 border-l border-white/10 pl-2 sm:pl-3">
              <button
                onClick={() => setLang('en')}
                title="English"
                className={`w-7 h-5 rounded-sm overflow-hidden transition-opacity ${lang === 'en' ? 'opacity-100 ring-1 ring-white/40' : 'opacity-40 hover:opacity-70'}`}
              >
                <img src="https://flagcdn.com/au.svg" alt="AU" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setLang('it')}
                title="Italiano"
                className={`w-7 h-5 rounded-sm overflow-hidden transition-opacity ${lang === 'it' ? 'opacity-100 ring-1 ring-white/40' : 'opacity-40 hover:opacity-70'}`}
              >
                <img src="https://flagcdn.com/it.svg" alt="IT" className="w-full h-full object-cover" />
              </button>
            </div>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden text-slate-300 hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — absolute so it doesn't reserve layout space while mounted;
            wrapper clips horizontal overflow during slide animation */}
        <div className={`md:hidden absolute top-full left-0 right-0 overflow-x-hidden ${mobileOpen ? '' : 'pointer-events-none'}`}>
          <div
            className={`bg-[#0a0a0f] border-t border-white/5 max-h-[calc(100vh-3.5rem)] overflow-y-auto transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
            aria-hidden={!mobileOpen}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1 px-3">{t.navProjects}</p>
              {t.navProjectItems.map((label, i) => (
                <a
                  key={projectAnchors[i]}
                  href={projectAnchors[i]}
                  onClick={closeMobile}
                  tabIndex={mobileOpen ? 0 : -1}
                  className="block py-3 px-3 text-base text-slate-300 active:text-white active:bg-white/5 rounded-lg transition-colors"
                >
                  {label}
                </a>
              ))}
              <div className="border-t border-white/5 my-2" />
              {t.nav.map((label, i) => (
                <a
                  key={anchors[i]}
                  href={anchors[i]}
                  onClick={closeMobile}
                  tabIndex={mobileOpen ? 0 : -1}
                  className="block py-3 px-3 text-base text-slate-300 active:text-white active:bg-white/5 rounded-lg transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  return (
    <div className="bg-[#0a0a0f] text-slate-300 min-h-screen">
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main className="pt-14 sm:pt-16">
        <Hero t={t} />
        <div id="projects" className="border-t border-white/5 bg-[#0a0a0f]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">{t.navProjects}</h2>
          </div>
        </div>
        <LennySection t={t} lang={lang} />
        <PryorSection t={t} lang={lang} />
        <RestaurantSection t={t} />
        <SupSection t={t} />
        <B2WorkSection t={t} />
        <ExperienceSection t={t} />
        <SkillsSection t={t} />
        <ContactSection t={t} />
      </main>
      <footer className="border-t border-white/5 py-6 sm:py-8 px-4 text-center text-[11px] sm:text-xs text-slate-600">
        {t.footer}
      </footer>
    </div>
  )
}
