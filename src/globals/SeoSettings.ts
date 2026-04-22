import type { GlobalConfig } from 'payload'

export const SeoSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: '🔍 SEO & Indexing Settings',
  admin: {
    group: 'SEO & Indexing',
    description: 'Global SEO configuration — controls how search engines index your entire site.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🌐 Site Identity',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'Safari Trails Africa',
              admin: { description: 'Your site name used in all title tags: "Page Title | Safari Trails Africa"' },
            },
            {
              name: 'siteTagline',
              type: 'text',
              defaultValue: 'East Africa\'s Premier Safari Company',
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              defaultValue: 'Book East Africa\'s best safari tours. Kenya, Tanzania, Uganda, Rwanda & Ethiopia. Great Migration safaris, gorilla trekking, Kilimanjaro climbing and Zanzibar beach holidays.',
              admin: { description: 'Default meta description used when individual pages don\'t have one set. 150–160 characters ideal.' },
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default Social Share Image',
              admin: { description: 'Used when pages don\'t have their own OG image. 1200×630px recommended.' },
            },
            {
              name: 'googleSiteVerification',
              type: 'text',
              label: 'Google Search Console Verification Code',
              admin: { description: 'e.g. "abc123" from the meta tag: <meta name="google-site-verification" content="abc123">' },
            },
            {
              name: 'bingSiteVerification',
              type: 'text',
              label: 'Bing/Microsoft Verification Code',
            },
          ],
        },
        {
          label: '🤖 Robots & Crawling',
          fields: [
            {
              name: 'globalRobotsDirective',
              type: 'select',
              defaultValue: 'index,follow',
              label: 'Default Robots Directive',
              options: [
                { label: 'Index, Follow (recommended for all public pages)', value: 'index,follow' },
                { label: 'Noindex, Follow', value: 'noindex,follow' },
                { label: 'Noindex, Nofollow', value: 'noindex,nofollow' },
              ],
              admin: { description: 'Global default. Individual pages can override this.' },
            },
            {
              name: 'additionalRobotsRules',
              type: 'array',
              label: 'Custom robots.txt Rules',
              admin: { description: 'Add custom disallow/allow rules for specific user agents.' },
              fields: [
                {
                  name: 'userAgent',
                  type: 'text',
                  defaultValue: '*',
                  admin: { description: 'e.g. *, Googlebot, GPTBot' },
                },
                {
                  name: 'directive',
                  type: 'select',
                  options: [
                    { label: 'Disallow', value: 'Disallow' },
                    { label: 'Allow', value: 'Allow' },
                    { label: 'Crawl-delay', value: 'Crawl-delay' },
                  ],
                },
                {
                  name: 'path',
                  type: 'text',
                  admin: { description: 'e.g. /admin/ or /api/' },
                },
              ],
            },
          ],
        },
        {
          label: '📊 Structured Data',
          fields: [
            {
              name: 'businessSchema',
              type: 'group',
              label: 'Business / Organization Schema',
              fields: [
                { name: 'legalName', type: 'text', defaultValue: 'Safari Trails Africa Ltd' },
                { name: 'foundingYear', type: 'number', defaultValue: 2008 },
                { name: 'phone', type: 'text', defaultValue: '+254700000000' },
                { name: 'email', type: 'text', defaultValue: 'info@safaritrailsafrica.com' },
                { name: 'streetAddress', type: 'text', defaultValue: 'Westlands Business Park' },
                { name: 'city', type: 'text', defaultValue: 'Nairobi' },
                { name: 'country', type: 'text', defaultValue: 'KE' },
                { name: 'postalCode', type: 'text', defaultValue: '00100' },
                { name: 'latitude', type: 'number', defaultValue: -1.2921 },
                { name: 'longitude', type: 'number', defaultValue: 36.8219 },
                {
                  name: 'socialProfiles',
                  type: 'array',
                  label: 'Social Media Profiles (for sameAs schema)',
                  fields: [{ name: 'url', type: 'text', label: 'Profile URL' }],
                },
              ],
            },
          ],
        },
        {
          label: '🗺️ Sitemap',
          fields: [
            {
              name: 'sitemapEnabled',
              type: 'checkbox',
              defaultValue: true,
              label: 'Enable XML Sitemap',
            },
            {
              name: 'defaultChangefreq',
              type: 'select',
              defaultValue: 'weekly',
              label: 'Default Change Frequency',
              options: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly'].map(v => ({ label: v.charAt(0).toUpperCase() + v.slice(1), value: v })),
            },
            {
              name: 'pagesDefaultPriority',
              type: 'select',
              defaultValue: '0.7',
              label: 'Pages Default Priority',
              options: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5'].map(v => ({ label: v, value: v })),
            },
            {
              name: 'toursDefaultPriority',
              type: 'select',
              defaultValue: '0.9',
              label: 'Tours Default Priority',
              options: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5'].map(v => ({ label: v, value: v })),
            },
            {
              name: 'postsDefaultPriority',
              type: 'select',
              defaultValue: '0.7',
              label: 'Blog Posts Default Priority',
              options: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5'].map(v => ({ label: v, value: v })),
            },
          ],
        },
        {
          label: '🤖 AI Visibility (LLMs)',
          fields: [
            {
              name: 'llmsEnabled',
              type: 'checkbox',
              defaultValue: true,
              label: 'Enable LLMs.txt endpoint (/api/llms.txt)',
              admin: { description: 'Makes your site visible to AI assistants like ChatGPT, Perplexity, Claude, and Gemini.' },
            },
            {
              name: 'llmsDescription',
              type: 'textarea',
              label: 'Business Description for AI',
              defaultValue: 'Safari Trails Africa is a premier East Africa travel company offering luxury and budget safaris, gorilla trekking, mountain climbing, beach holidays, and cultural tours across Kenya, Tanzania, Uganda, Rwanda, Ethiopia, and Zanzibar.',
              admin: { description: 'This description will be used in the LLMs.txt file that AI crawlers read.' },
            },
            {
              name: 'llmsKeyFacts',
              type: 'array',
              label: 'Key Facts for AI (shown in LLMs.txt)',
              fields: [{ name: 'fact', type: 'text' }],
              defaultValue: [
                { fact: 'Exclusively East Africa specialists — Kenya, Tanzania, Uganda, Rwanda, Ethiopia, Zanzibar' },
                { fact: 'All safaris are fully customizable with private guiding available' },
                { fact: 'Vehicles: 4x4 Land Cruisers with pop-up roofs' },
                { fact: 'Best time for Great Migration: July–October in Maasai Mara' },
                { fact: 'Uganda gorilla permits: $700 USD (best value vs Rwanda $1,500)' },
              ],
            },
          ],
        },
        {
          label: '📱 Social & Analytics',
          fields: [
            { name: 'googleAnalyticsId', type: 'text', label: 'Google Analytics 4 Measurement ID', admin: { description: 'e.g. G-XXXXXXXXXX' } },
            { name: 'googleTagManagerId', type: 'text', label: 'Google Tag Manager ID', admin: { description: 'e.g. GTM-XXXXXXX' } },
            { name: 'facebookPixelId', type: 'text', label: 'Facebook/Meta Pixel ID' },
            { name: 'twitterHandle', type: 'text', defaultValue: '@safaritrails_ea', label: 'Twitter/X Handle' },
            { name: 'facebookAppId', type: 'text', label: 'Facebook App ID (for OG tags)' },
          ],
        },
      ],
    },
  ],
}
