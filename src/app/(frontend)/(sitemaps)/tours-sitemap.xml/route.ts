import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import config from '@payload-config'

const getToursSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://safaritrailsafrica.com'

    const tours = await payload.find({
      collection: 'tours',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 200,
      select: { slug: true, updatedAt: true, indexingConfig: true },
    })

    return tours.docs
      .filter(tour => Boolean(tour?.slug))
      .map(tour => {
        const config = (tour as any).indexingConfig || {}
        return {
          loc: `${SITE_URL}/tours/${tour.slug}`,
          lastmod: tour.updatedAt,
          changefreq: config.sitemapChangefreq || 'weekly',
          priority: config.sitemapPriority || '0.8',
        }
      })
  },
  ['tours-sitemap'],
  { tags: ['tours-sitemap'] },
)

export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://safaritrailsafrica.com'
  const tourEntries = await getToursSitemap()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
${tourEntries
  .map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${typeof entry.lastmod === 'string' ? entry.lastmod.split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
