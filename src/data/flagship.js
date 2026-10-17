import { BarChart2, Bot, Briefcase, Clock, Cpu, Database, DollarSign, ExternalLink, Layers, Mail, Shield, TrendingUp, Users, Zap } from 'lucide-react'

// Moduli e numeri dei due prodotti di punta, la piattaforma di food delivery e PRYOR (testi già nelle due lingue).

export const platformMetrics = (lang) => [
  { label: lang === 'it' ? 'Route Operative' : 'Operational Routes', value: '990+', icon: Cpu },
  { label: lang === 'it' ? 'Tabelle Database' : 'Database Tables', value: '150+', icon: Database },
  { label: lang === 'it' ? 'Moduli Software' : 'Software Modules', value: '35+', icon: Layers },
  { label: lang === 'it' ? 'Partner Ristoranti' : 'Restaurant Partners', value: '47+', icon: Users },
  { label: lang === 'it' ? 'Cron Job 24/7' : '24/7 Cron Jobs', value: '12', icon: Clock },
  { label: 'ROI', value: '1,550%', icon: TrendingUp },
  { label: lang === 'it' ? 'Costo AI (Gemini)' : 'AI Cost (Gemini)', value: lang === 'it' ? '€0' : '$0', icon: Bot },
]

export const platformModules = (lang) => {
  const it = lang === 'it'
  return [
    {
      icon: Users,
      title: it ? 'Automazione Turni Driver' : 'Driver Shift Automation',
      description: it
        ? 'Raccolta disponibilità self-service, assegnazione automatica, invio massivo WhatsApp e rilevamento conflitti veicoli in tempo reale — elimina 2,5 ore di coordinamento manuale al giorno.'
        : 'Self-service availability collection, auto-assignment, WhatsApp bulk dispatch, and real-time vehicle conflict detection — eliminating 2.5 hrs of manual coordination daily.',
      saving: it ? '€7.800/anno' : 'US$8,800/yr (A$12,600)',
    },
    {
      icon: Clock,
      title: it ? 'Tracciamento Ore in Tempo Reale' : 'Real-Time Hours Tracking',
      description: it
        ? 'La busta paga viene calcolata dai dati reali degli ordini, non dai turni dichiarati. Elimina un overpayment del 5–10% su 15 driver tramite regole intelligenti sui turni.'
        : 'Payroll calculated from actual order data, not declared shifts. Eliminates a 5–10% overpayment across 15 drivers through intelligent gap and shift boundary rules.',
      saving: it ? '€8.800/anno' : 'US$9,900/yr (A$14,200)',
    },
    {
      icon: Bot,
      title: it ? 'Chat AI sui Dati' : 'AI Data Chat',
      description: it
        ? 'Chat conversazionale che, via function calling, interroga il database live in linguaggio naturale: Google Gemini come motore primario (costo 0) e Claude come opzione premium. Il personale non tecnico ottiene risposte immediate — senza SQL, senza aspettare report.'
        : 'A conversational chat that queries the live database in natural language via function calling: Google Gemini as the primary engine (zero cost) and Claude as a premium option. Non-technical staff get instant answers — no SQL, no waiting for reports.',
      saving: it ? '€5.300/anno' : 'US$6,000/yr (A$8,600)',
    },
    {
      icon: DollarSign,
      title: it ? 'Motore di Fatturazione Ristoranti' : 'Restaurant Billing Engine',
      description: it
        ? 'Calcolo automatico delle commissioni per 47+ partner con regole multi-livello, workflow strutturato per l\'approvazione delle penali e rendiconti PDF per ristorante.'
        : 'Automated commission calculations for 47+ partners with multi-tier fee rules, structured penalty approval workflows, and per-restaurant PDF statements.',
      saving: it ? '€2.700/anno' : 'US$3,000/yr (A$4,400)',
    },
    {
      icon: BarChart2,
      title: it ? 'Motore Marketing & RFM' : 'Marketing & RFM Engine',
      description: it
        ? 'Campagne email (Brevo) + WhatsApp con segmentazione automatica RFM dei clienti estratta direttamente dal database ordini — niente Mailchimp o liste manuali.'
        : 'Email (Brevo) + WhatsApp campaigns with automatic RFM customer segmentation sourced directly from the order database — no Mailchimp or manual lists required.',
      saving: it ? '€3.000/anno' : 'US$3,400/yr (A$4,900)',
    },
    {
      icon: Shield,
      title: it ? 'Layer di Sicurezza Enterprise' : 'Enterprise Security Layer',
      description: it
        ? 'Crittografia credenziali AES-128 (Fernet) at rest, RBAC con 8 ruoli e permessi granulari, protezione CSRF, prevenzione SQL injection, audit trail GDPR e backup automatici multi-strato con retention 90 giorni.'
        : 'AES-128 (Fernet) credential encryption at rest, 8-role RBAC with granular permissions, CSRF protection, SQL injection prevention, GDPR audit trail, and automated multi-layer backups with 90-day retention.',
      saving: it ? 'Conformità' : 'Compliance',
    },
    {
      icon: Cpu,
      title: it ? 'Marketing AI Copilot' : 'Marketing AI Copilot',
      description: it
        ? 'Genera contenuti multicanale (Instagram, Facebook, email, WhatsApp, ads) da 9 playbook tematici con brand-voice few-shot sui post storici dell\'azienda. Guardrail deterministici bloccano claim falsi; il routing sceglie Gemini (gratis) o Claude (premium a budget). Le campagne Meta e Google Ads nascono sempre in pausa, con approvazione umana.'
        : 'Generates multichannel content (Instagram, Facebook, email, WhatsApp, ads) from 9 themed playbooks with few-shot brand voice trained on the company\'s historical posts. Deterministic guardrails block false claims; a router picks Gemini (free) or Claude (premium, budget-capped). Meta & Google Ads campaigns are always created paused, with human approval.',
      saving: it ? 'AI-Native' : 'AI-Native',
    },
    {
      icon: Briefcase,
      title: it ? 'Lettura Fatture AI + Scadenzario' : 'AI Invoice Reading + Payables',
      description: it
        ? 'Gemini Vision legge le fatture ricevute a costo zero (tier gratuito, con fallback automatico a OCR Tesseract quando la quota giornaliera è esaurita): estrae fornitore, date, scadenza, tipologia documento e mesi di riferimento. Sincronizzazione bidirezionale con lo scadenzario — l\'upload auto-spunta i pagamenti 🤖 e, quando le scadenze risultano saldate, la fattura si marca automaticamente come pagata.'
        : 'Gemini Vision reads received invoices at zero cost (free tier, with automatic fallback to Tesseract OCR when the daily quota runs out): it extracts supplier, dates, due date, document type, and reference months. Two-way sync with the payables ledger — an upload auto-checks the matching payments 🤖 and, once they\'re settled, the invoice is auto-marked as paid.',
      saving: it ? 'Costo 0' : 'Zero cost',
    },
    {
      icon: Mail,
      title: it ? 'Client Email Integrato' : 'Integrated Email Client',
      description: it
        ? 'Webmail IMAP/SMTP completa dentro il gestionale, distinta dal marketing: account multipli con auto-detect del provider, badge non letti real-time, allegati, firme e bozze. Invio via relay HTTP su Plesk (bypass del blocco SMTP) e sanificazione HTML anti-XSS/anti-tracking in entrata.'
        : 'A full IMAP/SMTP webmail inside the ERP, separate from marketing: multiple accounts with provider auto-detect, real-time unread badges, attachments, signatures, and drafts. Outbound via an HTTP relay on Plesk (bypassing the SMTP block) with anti-XSS/anti-tracking HTML sanitization on inbound mail.',
      saving: it ? 'Nuovo' : 'New',
    },
    {
      icon: ExternalLink,
      title: it ? 'Aree Driver & Ristorante (PWA)' : 'Driver & Restaurant Areas (PWA)',
      description: it
        ? 'Due portali self-service mobile-first ora in produzione e distribuiti ai collaboratori esterni con credenziali dedicate (inviate via WhatsApp). I driver vedono turni, ore, incassi e ferie; i ristoranti partner conteggi, ordini, menu e upload fatture con multi-sede. Sostituiscono i fogli Google.'
        : 'Two mobile-first self-service portals now in production and rolled out to external collaborators with dedicated credentials (sent over WhatsApp). Drivers see shifts, hours, takings, and leave; partner restaurants get statements, orders, menus, and invoice upload with multi-location support. They replace the old Google Sheets.',
      saving: 'PWA',
    },
    {
      icon: Zap,
      title: it ? 'Conferma Ordine WhatsApp + Offerta Giornale' : 'WhatsApp Order Confirmation + Newspaper Offer',
      description: it
        ? 'Automazione WhatsApp post-ordine a doppia modalità: un cron intercetta i nuovi ordini e invia automaticamente al cliente la conferma dell\'ordine (numero, indirizzo, fascia di consegna). Opzionalmente, nello stesso messaggio, propone in regalo il PDF del giornale del giorno di un\'edicola partner — consegnato se il cliente risponde "SÌ". Con circuit breaker sul volume, blacklist dei numeri interni e idempotenza per ordine.'
        : 'A dual-mode post-order WhatsApp automation: a cron intercepts new orders and automatically sends the customer their order confirmation (number, address, delivery window). Optionally, the same message offers a free PDF of the day\'s newspaper from a partner newsstand — delivered if the customer replies "YES". Includes a daily-volume circuit breaker, internal-number blacklist, and per-order idempotency.',
      saving: it ? 'Nuovo' : 'New',
    },
  ]
}

export const pryorMetrics = (lang) => {
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

export const pryorModules = (lang) => {
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
