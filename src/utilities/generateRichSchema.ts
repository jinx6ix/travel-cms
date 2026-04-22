const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const SITE_NAME = 'Safari Trails Africa'

export function generateOrganizationSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Premier East Africa safari company specializing in wildlife safaris, gorilla trekking, mountain climbing, and beach holidays.',
    telephone: '+254700000000',
    email: 'info@safaritrailsafrica.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
    areaServed: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Ethiopia'],
  })
}

export function generateWebSiteSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/tours?search={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  })
}

export function generateTourSchema(tour: any): string {
  const tourUrl = `${SITE_URL}/tours/${tour.slug}`
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.title,
      description: tour.shortDescription,
      url: tourUrl,
      offers: {
        '@type': 'Offer',
        price: tour.price?.amount,
        priceCurrency: tour.price?.currency || 'USD',
        availability: 'https://schema.org/InStock',
        url: tourUrl,
      },
      provider: { '@type': 'TravelAgency', name: SITE_NAME, url: SITE_URL },
      ...(tour.rating > 0 && tour.reviewCount > 0 ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Number(tour.rating).toFixed(1),
          reviewCount: tour.reviewCount,
          bestRating: '5',
          worstRating: '1',
        }
      } : {}),
    },
  ]
  if (tour.faqs?.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tour.faqs.map((f: any) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }
  return JSON.stringify(schemas)
}
