export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://safaritrailsafrica.com'
  const now = new Date().toISOString().split('T')[0]

  const sitemaps = [
    { loc: `${SITE_URL}/pages-sitemap.xml`, lastmod: now },
    { loc: `${SITE_URL}/posts-sitemap.xml`, lastmod: now },
    { loc: `${SITE_URL}/tours-sitemap.xml`, lastmod: now },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(s => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
