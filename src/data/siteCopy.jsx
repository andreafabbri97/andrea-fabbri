import { Briefcase, GraduationCap } from 'lucide-react'

// Testi del sito fuori dai progetti: barra, apertura, esperienza, competenze, contatti.
// I progetti stanno in projectsEn.js / projectsIt.js.

export const siteCopy = {
  en: {
    ui: {
      work: 'Work',
      sections: 'Sections',
      language: 'Language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      theme: { now: 'Theme', auto: 'automatic', light: 'light', dark: 'dark', switchTo: 'switch to' },
      whatsapp: 'WhatsApp',
    },
    // Navbar
    nav: ['Experience', 'Skills', 'Contact'],
    navProjects: 'Projects',

    // Hero
    heroStatus: 'Freelance · available for new projects',
    heroTitle1: 'Andrea',
    heroTitle2: 'Fabbri',
    heroSubtitle: 'Freelance management engineer and AI automation specialist',
    heroDesc: (
      <>
        I engineer business-critical platforms that replace manual operations with
        intelligent automation. I build the software around your business like a tailor-made
        suit, designing every feature for your specific operations.
        My flagship product delivers{' '}
        <span className="text-inchiostro font-semibold">US$42,000+ (A$60,000+) in annual savings</span>{' '}
        and a <span className="text-inchiostro font-semibold">1,550% ROI</span> to a
        live food-delivery operation.
      </>
    ),
    heroBtn1: 'See the flagship project',
    heroBtn2: 'GitHub',
    heroBtn3: 'Contact',

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
          'Sole architect of Lenny Platform — a 990+ route ERP used daily in a live food-delivery operation, built through AI-assisted engineering',

          'Architected and delivered 29 software modules, eliminating all manual back-office processes',
          'Quantified US$42,100/yr (A$60,500) in operational savings with a documented 1,550% ROI',
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
    contactDesc: "I work as a freelancer: I design and build software around your business, from studying how your team works to a system in use every day, invoiced, with a direct relationship and no middlemen. Based in San Marino, I work remotely with clients anywhere and I'm happy to travel. If something in your business is still done by hand, or your software does not fit the way you work, let's talk.",
    contactLinkedIn: 'LinkedIn',

    // Footer
    footer: '© 2026 Andrea Fabbri, freelance management engineer based in San Marino, working worldwide. Built with React and Tailwind CSS.',
  },

  it: {
    ui: {
      work: 'Lavori',
      sections: 'Sezioni',
      language: 'Lingua',
      openMenu: 'Apri il menu',
      closeMenu: 'Chiudi il menu',
      theme: { now: 'Tema', auto: 'automatico', light: 'chiaro', dark: 'scuro', switchTo: 'passa a' },
      whatsapp: 'WhatsApp',
    },
    // Navbar
    nav: ['Esperienza', 'Competenze', 'Contatti'],
    navProjects: 'Progetti',

    // Hero
    heroStatus: 'Freelance · disponibile per nuovi progetti',
    heroTitle1: 'Andrea',
    heroTitle2: 'Fabbri',
    heroSubtitle: 'Ingegnere gestionale freelance, specialista in IA e automazione',
    heroDesc: (
      <>
        Sviluppo piattaforme mission-critical che sostituiscono processi manuali con
        automazione intelligente. Costruisco il software attorno alla tua azienda come un
        abito su misura, progettando ogni funzionalità per le tue specifiche esigenze operative.
        Il mio prodotto di punta genera{' '}
        <span className="text-inchiostro font-semibold">€37.000+ di risparmi annui</span>{' '}
        e un <span className="text-inchiostro font-semibold">ROI del 1.550%</span> per
        un'operazione di food delivery attiva.
      </>
    ),
    heroBtn1: 'Vedi il progetto di punta',
    heroBtn2: 'GitHub',
    heroBtn3: 'Contatti',

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
          'Unico architetto della Lenny Platform — ERP con 990+ route usato quotidianamente in una operazione food delivery attiva, costruito attraverso ingegneria AI-assistita',

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
    contactDesc: "Lavoro in proprio, da freelance: progetto e realizzo il software attorno alla tua azienda, dallo studio di come lavorate fino al sistema in uso ogni giorno, con fattura e un rapporto diretto, senza intermediari. Vivo a San Marino, lavoro da remoto con clienti in tutto il mondo e mi sposto volentieri. Se nella tua azienda qualcosa si fa ancora a mano, o il tuo software non segue il modo in cui lavorate, parliamone.",
    contactLinkedIn: 'LinkedIn',

    // Footer
    footer: '© 2026 Andrea Fabbri, ingegnere gestionale freelance con base a San Marino, al lavoro in tutto il mondo. Realizzato con React e Tailwind CSS.',
  },
}
