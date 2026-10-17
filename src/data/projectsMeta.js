import {
  Pizza, Car, CalendarClock, HardHat, Calculator, Warehouse, ShoppingCart, Dumbbell,
  Brain, Swords, ScrollText,
} from 'lucide-react'

// What does not change with the language: id (also the page anchor), icon, status and stack.
// tone: live = in production / in daily use · building = in development · demo = working demo

export const clientMeta = [
  { id: 'pizzeria', icon: Pizza, tone: 'building', tags: ['Next.js 16', 'React 19', 'Neon Postgres', 'Drizzle', 'Web Push', 'Leaflet', 'Vitest', 'PWA'] },
  { id: 'chauffeur', icon: Car, tone: 'live', tags: ['Next.js 16', 'React 19', 'Prisma', 'Neon Postgres', 'Tailwind CSS 4', 'Web Push', 'OSRM · Valhalla', 'PWA'] },
  { id: 'school', icon: CalendarClock, tone: 'live', tags: ['Next.js 16', 'React 19', 'Neon Postgres', 'Drizzle', 'Gemini', 'ExcelJS', 'pdf-lib'] },
  { id: 'excavation', icon: HardHat, tone: 'building', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'IndexedDB', 'Playwright', 'PWA'] },
  { id: 'accounting', icon: Calculator, tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Gemini', 'Vitest', 'Playwright', 'PWA'] },
  { id: 'building-supplies', icon: Warehouse, tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'Playwright'] },
  { id: 'supermarket', icon: ShoppingCart, tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Tailwind CSS 4', 'Web Push', 'Playwright', 'axe-core'] },
  { id: 'supplements', icon: Dumbbell, tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Tailwind CSS 4', 'Vercel Blob', 'Playwright'] },
]

export const personalMeta = [
  { id: 'second-brain', icon: Brain, tone: 'live', tags: ['Claude Code', 'Node.js', 'Python', 'GitHub API', 'Vercel', 'Web Push', 'PWA'] },
  { id: 'lol-coach', icon: Swords, tone: 'live', tags: ['Riot API', 'Claude Code', 'Vercel', 'PWA'] },
  { id: 'questzip', icon: ScrollText, tone: 'live', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'PartyKit', 'Playwright'] },
]
