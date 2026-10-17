// What does not change with the language: id (also the page anchor), status, stack
// and extra blocks. No live demos and no source code: the programs sit behind a login and the
// repositories are private (Andrea, 17/10/2026). No link to PRYOR's presentation page either (Andrea, 17/10/2026). The words live in projectsEn.js / projectsIt.js.
// tone: live = in production · building = in development · demo = working demo · beta = closed beta
// badge: which status word to show (defaults to the tone)
// hue: the color of the project's sector (OKLCH hue, 0-360). Light and dark themes pick the lightness.

export const groups = [
  {
    id: 'flagship',
    projects: [
      {
        id: 'platform', hue: 42, tone: 'live',
        tags: ['Python', 'Flask', 'MySQL', 'AWS RDS', 'Google Gemini', 'Claude', 'WhatsApp API', 'Pusher', 'PWA'], extras: 'platform',
      },
      {
        id: 'pryor', hue: 295, tone: 'beta',
        tags: ['Next.js 16', 'React 19', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'Google Gemini', 'PWA'], extras: 'pryor',
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
      },
      {
        id: 'sup', hue: 200, tone: 'live', badge: 'use',
        tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PWA'],
      },
      {
        id: 'b2work', hue: 100, tone: 'building',
        tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui'],
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
