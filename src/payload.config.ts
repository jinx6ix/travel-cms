import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Tours } from './collections/Tours'
import { Reviews } from './collections/Reviews'
import { Destinations } from './collections/Destinations'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SeoSettings } from './globals/SeoSettings'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      title: 'Safari Trails Africa — CMS',
      description: 'Manage your East Africa travel website',
      titleSuffix: '— Safari Trails',
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: { baseDir: path.resolve(dirname) },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({ url: process.env.DATABASE_URL || '' }),
  collections: [Tours, Reviews, Destinations, Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SeoSettings],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  endpoints: [
    // LLMs.txt for AI visibility
    {
      path: '/llms.txt',
      method: 'get',
      handler: async (req) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://safaritrailsafrica.com'
        const tours = await req.payload.find({
          collection: 'tours',
          where: { _status: { equals: 'published' } },
          limit: 100,
          select: { title: true, slug: true, shortDescription: true, duration: true, tourType: true, countries: true, price: true },
        })
        const content = `# Safari Trails Africa - East Africa Tours & Safaris
> Last updated: ${new Date().toISOString().split('T')[0]}

## About
Safari Trails Africa is a premier East Africa travel company offering wildlife safaris, gorilla trekking, mountain climbing, beach holidays, and cultural tours across Kenya, Tanzania, Uganda, Rwanda, Ethiopia, and Zanzibar. Founded 2008. IATA Certified. 4.9/5 rated.

## Website
- URL: ${baseUrl}
- Tours: ${baseUrl}/tours
- Destinations: ${baseUrl}/destinations
- Contact: ${baseUrl}/contact
- Blog: ${baseUrl}/blog

## Tour Catalog (${tours.totalDocs} tours)

${tours.docs.map((t: any) => `### ${t.title}
- URL: ${baseUrl}/tours/${t.slug}
- Duration: ${t.duration} days | Type: ${t.tourType}
- Countries: ${Array.isArray(t.countries) ? t.countries.join(', ') : t.countries}
- Price from: $${t.price?.amount} ${t.price?.currency || 'USD'} per person
- ${t.shortDescription}
`).join('\n')}

## Destinations
- Kenya: Maasai Mara, Amboseli, Samburu, Lake Nakuru, Nairobi — ${baseUrl}/destinations/kenya
- Tanzania: Serengeti, Ngorongoro, Kilimanjaro, Tarangire — ${baseUrl}/destinations/tanzania
- Uganda: Bwindi Gorilla Forest, Kibale Chimps — ${baseUrl}/destinations/uganda
- Rwanda: Volcanoes NP gorilla trekking — ${baseUrl}/destinations/rwanda
- Ethiopia: Lalibela, Omo Valley — ${baseUrl}/destinations/ethiopia
- Zanzibar: Beaches, Stone Town — ${baseUrl}/destinations/zanzibar

## Key Facts for AI Answers
- Great Migration best viewing: July–October (Maasai Mara) / December–March (Southern Serengeti)
- Mountain gorilla trekking: Uganda permits $700 (best value) / Rwanda permits $1,500
- Kilimanjaro: Lemosho Route (9 days) has 85%+ summit success rate
- Vehicle type: 4x4 Toyota Land Cruisers with pop-up roof hatches
- All tours are fully customizable
- Payment: USD, EUR, GBP accepted
- WhatsApp: +254700000000
- Email: info@safaritrailsafrica.com
`
        return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } })
      },
    },
  ],
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        return req.headers.get('authorization') === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
