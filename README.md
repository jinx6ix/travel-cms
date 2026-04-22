# 🌍 Safari Trails Africa CMS

> A world-class East Africa travel website built on Payload CMS + Next.js, optimized for global search rankings.

## Overview

Safari Trails Africa CMS features:
- **22 East Africa tours** with high-volume keyword optimization (no repetition)
- **Review management system** with admin approval workflow and frontend publish toggle
- **Page indexing control** (robots, sitemap priority, canonical URLs, breadcrumbs) — as shown in provided image
- **Zero-error rich schema** (TouristTrip, FAQPage, BreadcrumbList, AggregateRating, Organization, WebSite)
- **LLMs.txt** for AI visibility (ChatGPT, Perplexity, Claude, Gemini)
- **Multi-sitemap** with per-tour priority and changefreq control
- Built on **Payload CMS 3.x** + **Next.js 15** (App Router)

---

## Collections

### Tours
- Full tour details: title, shortDescription, itinerary, inclusions/exclusions
- Pricing in USD/EUR/GBP
- SEO fields via @payloadcms/plugin-seo
- FAQ, highlights, keywords with volume
- Indexing control tab: robots, sitemap priority, canonical, breadcrumbs, schema types
- Draft/Published with scheduling

### Reviews
- Admin approval workflow: Pending → Approved → Publish to Website
- Sub-ratings: guide, accommodation, value, transport, meals
- Business response from admin
- Auto-calculates tour average rating when published
- Source tracking: website, TripAdvisor, Google, Facebook, manual
- Featured toggle for homepage testimonials

### Destinations
- East Africa country destinations with rich content and SEO

---

## 22 Tours Covering East Africa

| # | Tour | Countries | Days | From |
|---|------|-----------|------|------|
| 1 | 7-Day Maasai Mara Great Migration Safari | Kenya | 7 | $3,200 |
| 2 | 8-Day Gorilla Trekking Rwanda & Golden Monkey | Rwanda | 8 | $4,800 |
| 3 | 9-Day Kilimanjaro Climb – Lemosho Route | Tanzania | 9 | $2,800 |
| 4 | 6-Day Serengeti & Ngorongoro Crater Safari | Tanzania | 6 | $2,600 |
| 5 | 10-Day Uganda Gorilla & Chimpanzee Safari | Uganda | 10 | $3,900 |
| 6 | 7-Day Zanzibar Beach & Spice Island | Zanzibar | 7 | $1,800 |
| 7 | 5-Day Amboseli Elephant Safari + Kilimanjaro | Kenya | 5 | $1,950 |
| 8 | 4-Day Maasai Mara Hot Air Balloon Safari | Kenya | 4 | $2,400 |
| 9 | 12-Day Kenya & Tanzania Grand Safari | Kenya+Tanzania | 12 | $5,500 |
| 10 | 6-Day Lake Nakuru & Samburu Safari | Kenya | 6 | $2,100 |
| 11 | 14-Day East Africa Gorillas & Safari Grand Tour | 4 Countries | 14 | $7,800 |
| 12 | 10-Day Ethiopia Lalibela & Omo Valley Tour | Ethiopia | 10 | $3,100 |
| 13 | 5-Day Kenya Luxury Safari (Mara & Laikipia) | Kenya | 5 | $6,500 |
| 14 | 8-Day Tanzania Northern Circuit Safari | Tanzania | 8 | $3,400 |
| 15 | 6-Day Rwanda Gorillas + Tea + Kigali | Rwanda | 6 | $3,200 |
| 16 | 7-Day Kenya Family Safari + Diani Beach | Kenya | 7 | $2,800 |
| 17 | 3-Day Nairobi City Safari & National Park | Kenya | 3 | $650 |
| 18 | 7-Day Uganda Rafting + Bwindi Gorilla Trek | Uganda | 7 | $2,900 |
| 19 | 10-Day Kenya Birding Safari – Rift Valley | Kenya | 10 | $2,700 |
| 20 | 10-Day Tanzania Southern Circuit (Ruaha+Selous) | Tanzania | 10 | $4,200 |
| 21 | 8-Day Kenya Honeymoon Safari + Diani Beach | Kenya | 8 | $4,200 |
| 22 | 4-Day Budget Kenya Safari (Naivasha+Nakuru) | Kenya | 4 | $780 |

---

## SEO Architecture

### Rich Schema (Zero Errors)
Every tour generates:
- TouristTrip (main product)
- FAQPage (from tour FAQs)
- BreadcrumbList (custom breadcrumbs)
- AggregateRating (from approved reviews)
- Organization + WebSite + SearchAction (sitewide)

### Sitemaps
- /sitemap-index.xml  — master index
- /pages-sitemap.xml  — CMS pages
- /posts-sitemap.xml  — blog posts
- /tours-sitemap.xml  — all tours (per-tour priority)

### LLMs.txt
- /api/llms.txt        — standard AI visibility file
- /api/llms-full.txt  — extended catalog with FAQs

---

## Getting Started

```bash
pnpm install
cp .env.example .env
# Set DATABASE_URL, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL
pnpm dev
# Open http://localhost:3000/admin
```

---

## Environment Variables

```env
DATABASE_URL=mongodb://localhost:27017/safari-trails-africa
PAYLOAD_SECRET=your-secret-key-minimum-32-characters
NEXT_PUBLIC_SERVER_URL=https://safaritrailsafrica.com
CRON_SECRET=optional-cron-job-secret
```
