export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://safaritrailsafrica.com'

  const content = `# Safari Trails Africa - robots.txt
# https://safaritrailsafrica.com

User-agent: *
Allow: /
Disallow: /admin/
Allow: /api/llms.txt
Allow: /api/llms-full.txt

# AI Crawlers - allow LLMs.txt for visibility
User-agent: GPTBot
Allow: /api/llms.txt
Allow: /api/llms-full.txt
Allow: /tours/
Allow: /destinations/
Allow: /blog/

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Googlebot
Crawl-delay: 1
Allow: /

User-agent: Bingbot
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap-index.xml
Sitemap: ${SITE_URL}/tours-sitemap.xml
Sitemap: ${SITE_URL}/pages-sitemap.xml
Sitemap: ${SITE_URL}/posts-sitemap.xml
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
