// What does not change with the language: id (also the page anchor), status, stack,
// screenshot, links and extra blocks. The words live in projectsEn.js / projectsIt.js.
// tone: live = in production · building = in development · demo = working demo · beta = closed beta
// badge: which status word to show (defaults to the tone)

export const groups = [
  {
    id: 'flagship',
    projects: [
      {
        id: 'lenny', tone: 'live',
        tags: ['Python', 'Flask', 'MySQL', 'AWS RDS', 'Google Gemini', 'Claude', 'WhatsApp API', 'Pusher', 'PWA'],
        image: 'images/lenny-platform-screenshot.jpg', extras: 'lenny',
      },
      {
        id: 'pryor', tone: 'beta',
        tags: ['Next.js 16', 'React 19', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'Google Gemini', 'PWA'],
        image: 'images/pryor-screenshot.jpg', extras: 'pryor',
        links: { live: 'https://pryor-eight.vercel.app/' },
      },
    ],
  },
  {
    id: 'clients',
    projects: [
      { id: 'pizzeria', tone: 'building', tags: ['Next.js 16', 'React 19', 'Neon Postgres', 'Drizzle', 'Web Push', 'Leaflet', 'Vitest', 'PWA'] },
      { id: 'chauffeur', tone: 'live', tags: ['Next.js 16', 'React 19', 'Prisma', 'Neon Postgres', 'Tailwind CSS 4', 'Web Push', 'OSRM', 'Valhalla', 'PWA'] },
      { id: 'school', tone: 'live', tags: ['Next.js 16', 'React 19', 'Neon Postgres', 'Drizzle', 'Gemini', 'ExcelJS', 'pdf-lib'] },
      { id: 'excavation', tone: 'building', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'IndexedDB', 'Playwright', 'PWA'] },
      { id: 'accounting', tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Gemini', 'Vitest', 'Playwright', 'PWA'] },
      { id: 'building-supplies', tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'Playwright'] },
      { id: 'supermarket', tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Tailwind CSS 4', 'Web Push', 'Playwright', 'axe-core'] },
      { id: 'supplements', tone: 'demo', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Tailwind CSS 4', 'Vercel Blob', 'Playwright'] },
    ],
  },
  {
    id: 'products',
    projects: [
      {
        id: 'restaurant', tone: 'demo',
        tags: ['React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Recharts', 'PWA'],
        image: 'images/restaurant-manager-screenshot.jpg',
        links: { live: 'https://andreafabbri97.github.io/restaurant-manager/', source: 'https://github.com/andreafabbri97/restaurant-manager' },
      },
      {
        id: 'sup', tone: 'live', badge: 'use',
        tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PWA'],
        image: 'images/sup-manager-screenshot.jpg',
        links: { live: 'https://andreafabbri97.github.io/sup-manager/', source: 'https://github.com/andreafabbri97/sup-manager' },
      },
      {
        id: 'b2work', tone: 'building',
        tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind CSS', 'shadcn/ui'],
        image: 'images/B2Work-screenshot.jpg',
        links: { live: 'https://andreafabbri97.github.io/B2Work/', source: 'https://github.com/andreafabbri97/B2Work' },
      },
    ],
  },
  {
    id: 'personal',
    projects: [
      { id: 'second-brain', tone: 'live', badge: 'daily', tags: ['Claude Code', 'Node.js', 'Python', 'GitHub API', 'Vercel', 'Web Push', 'PWA'] },
      { id: 'lol-coach', tone: 'live', badge: 'daily', tags: ['Riot API', 'Claude Code', 'Vercel', 'PWA'] },
      { id: 'questzip', tone: 'live', badge: 'daily', tags: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'Auth.js', 'PartyKit', 'Playwright'] },
    ],
  },
]

// Projects with their own public demo or code: no "private project" note under the numbers.
export const isPublic = (meta) => Boolean(meta.links)
