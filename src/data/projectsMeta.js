// What does not change with the language: id (also the page anchor), status, stack,
// links and extra blocks. The words live in projectsEn.js / projectsIt.js.
// tone: live = in production · building = in development · demo = working demo · beta = closed beta
// badge: which status word to show (defaults to the tone)
// hue: the color of the project's sector (OKLCH hue, 0-360). Light and dark themes pick the lightness.

export const groups = [
  {
    id: 'flagship',
    projects: [
      {
        id: 'lenny', hue: 42, tone: 'live',
        tags: ['Python', 'Flask', 'MySQL', 'AWS RDS', 'Google Gemini', 'Claude', 'WhatsApp API', 'Pusher', 'PWA'], extras: 'lenny',
      },
      {
        id: 'pryor', hue: 295, tone: 'beta',
        tags: ['Next.js 16', 'React 19', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'Google Gemini', 'PWA'], extras: 'pryor',
        links: { live: 'https://pryor-eight.vercel.app/' },
      },
    ],
  },
  {
    id: 'clients',
    projects: [
      { id: 'pizzeria', hue: 27, tone: 'building', tags: ['Next.js 16', 'React 19', 'Neon Postgres', 'Drizzle', 'Web Push', 'Leaflet', 'Vitest', 'PWA'] },
      { id: 'chauffeur', hue: 262, tone: 'live', tags: ['Next.js 16', 'React 19', 'Prisma', 'Neon Postgres', 'Tailwind CSS 4', 'Web Push', 'OSRM', 'Valhalla', 'PWA'] },
      { id: 'school', hue: 160, tone: 'live', tags: ['Next.js 16', 'React 19', 'Neon Postgres', 'Drizzle', 'Gemini', 'ExcelJS', 'pdf-lib'] },
      { id: 'excavation', hue: 78, tone: 'building', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'IndexedDB', 'Playwright', 'PWA'] },
      { id: 'accounting', hue: 215, tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Gemini', 'Vitest', 'Playwright', 'PWA'] },
      { id: 'building-supplies', hue: 52, tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'Playwright'] },
      { id: 'supermarket', hue: 130, tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Tailwind CSS 4', 'Web Push', 'Playwright', 'axe-core'] },
      { id: 'supplements', hue: 345, tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Tailwind CSS 4', 'Vercel Blob', 'Playwright'] },
    ],
  },
  {
    id: 'products',
    projects: [
      {
        id: 'restaurant', hue: 60, tone: 'demo',
        tags: ['React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Recharts', 'PWA'],
        links: { live: 'https://andreafabbri97.github.io/restaurant-manager/', source: 'https://github.com/andreafabbri97/restaurant-manager' },
      },
      {
        id: 'sup', hue: 200, tone: 'live', badge: 'use',
        tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PWA'],
        links: { live: 'https://andreafabbri97.github.io/sup-manager/', source: 'https://github.com/andreafabbri97/sup-manager' },
      },
      {
        id: 'b2work', hue: 100, tone: 'building',
        tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui'],
        links: { live: 'https://andreafabbri97.github.io/B2Work/', source: 'https://github.com/andreafabbri97/B2Work' },
      },
    ],
  },
  {
    id: 'personal',
    projects: [
      { id: 'second-brain', hue: 235, tone: 'live', badge: 'daily', tags: ['Claude Code', 'Node.js', 'Python', 'GitHub API', 'Vercel', 'Web Push', 'PWA'] },
      { id: 'lol-coach', hue: 12, tone: 'live', badge: 'daily', tags: ['Riot API', 'Claude Code', 'Vercel', 'PWA'] },
      { id: 'questzip', hue: 320, tone: 'live', badge: 'daily', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'PartyKit', 'Playwright'] },
    ],
  },
]

// Projects with their own public demo or code: no "private project" note under the numbers.
export const isPublic = (meta) => Boolean(meta.links)
