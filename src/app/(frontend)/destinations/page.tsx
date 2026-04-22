import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'East Africa Destinations | Safari Trails Africa',
  description: 'Explore East Africa\'s most iconic destinations. Kenya\'s Maasai Mara, Tanzania\'s Serengeti, Uganda\'s gorilla forests, Rwanda\'s Volcanoes, Ethiopia\'s ancient civilizations, and Zanzibar\'s beaches.',
  robots: 'index,follow',
}

const DESTINATIONS_DATA = [
  {
    country: 'kenya', name: 'Kenya', flag: '🇰🇪',
    heroEmoji: '🦁', tagline: 'Home of the Great Migration',
    description: 'Kenya is the birthplace of the classic African safari. From the world-famous Maasai Mara to elephant-studded Amboseli with Kilimanjaro views, Kenya delivers iconic wildlife experiences year-round.',
    highlights: ['Maasai Mara Great Migration', 'Amboseli elephants & Kilimanjaro', 'Lake Nakuru flamingos & rhinos', 'Samburu Special Five', 'Diani Beach & coral reefs', 'Nairobi city safari experience'],
    bestTime: 'July – October (dry season & Migration)',
    climate: 'Tropical highland, 15–28°C',
    currency: 'Kenyan Shilling (KES) · USD widely accepted',
    tours: 10, startingPrice: 650,
    color: '#1a3a1a',
  },
  {
    country: 'tanzania', name: 'Tanzania', flag: '🇹🇿',
    heroEmoji: '🌅', tagline: 'Africa\'s Wildlife Paradise',
    description: 'Tanzania holds Africa\'s most iconic landscapes — the Serengeti, Ngorongoro Crater, and Mount Kilimanjaro. The Southern Circuit offers remote wilderness teeming with wildlife away from the crowds.',
    highlights: ['Serengeti wildebeest migration', 'Ngorongoro Crater Big Five', 'Kilimanjaro summit (5,895m)', 'Tarangire elephant herds', 'Ruaha & Selous remote safaris', 'Zanzibar beach extension'],
    bestTime: 'June – October (dry) · Jan–Mar (calving)',
    climate: 'Tropical, 20–30°C',
    currency: 'Tanzanian Shilling (TZS) · USD used widely',
    tours: 6, startingPrice: 2600,
    color: '#2d1a00',
  },
  {
    country: 'uganda', name: 'Uganda', flag: '🇺🇬',
    heroEmoji: '🦍', tagline: 'The Pearl of Africa',
    description: 'Uganda is the most affordable destination for mountain gorilla trekking — permits cost $700 vs $1,500 in Rwanda. Half of the world\'s mountain gorillas live in Uganda\'s ancient forests.',
    highlights: ['Mountain gorilla trekking (best value!)', 'Chimpanzee tracking in Kibale', 'Tree-climbing lions in Queen Elizabeth', 'White water rafting on the Nile', 'Bwindi Impenetrable Forest', 'Murchison Falls National Park'],
    bestTime: 'June – September · December – February',
    climate: 'Equatorial, 15–28°C · Two rainy seasons',
    currency: 'Ugandan Shilling (UGX) · USD accepted',
    tours: 3, startingPrice: 2900,
    color: '#2d1a3a',
  },
  {
    country: 'rwanda', name: 'Rwanda', flag: '🇷🇼',
    heroEmoji: '🦍', tagline: 'Land of a Thousand Hills',
    description: 'Rwanda is the fastest-growing luxury safari destination in Africa. Volcanoes National Park offers perhaps the most emotionally powerful wildlife encounter on Earth — one hour face-to-face with mountain gorillas.',
    highlights: ['Mountain gorilla trekking in Volcanoes NP', 'Golden monkey tracking', 'Nyungwe Forest chimpanzees', 'Lake Kivu island retreat', 'Kigali — cleanest city in Africa', 'Akagera savanna safari'],
    bestTime: 'June – September · December – February',
    climate: 'Highland tropical, 12–27°C',
    currency: 'Rwandan Franc (RWF) · USD accepted',
    tours: 2, startingPrice: 3200,
    color: '#1a2d3a',
  },
  {
    country: 'ethiopia', name: 'Ethiopia', flag: '🇪🇹',
    heroEmoji: '🏛️', tagline: 'Cradle of Mankind',
    description: 'Ethiopia is Africa\'s most culturally rich destination — 11 UNESCO World Heritage Sites, rock-hewn churches carved into mountains, ancient obelisks, and the extraordinary tribal cultures of the Omo Valley.',
    highlights: ['Lalibela rock-hewn churches', 'Gondar castles (Camelot of Africa)', 'Omo Valley tribal cultures', 'Simien Mountains gelada baboons', 'Axum ancient kingdom', 'Danakil Depression volcano'],
    bestTime: 'October – May (dry season)',
    climate: 'Varies by altitude, 8–28°C',
    currency: 'Ethiopian Birr (ETB) · USD for major expenses',
    tours: 1, startingPrice: 3100,
    color: '#3a1a00',
  },
  {
    country: 'zanzibar', name: 'Zanzibar', flag: '🏝️',
    heroEmoji: '🏖️', tagline: 'Spice Island Paradise',
    description: 'Zanzibar is the perfect extension after any East Africa safari. Powder-white beaches, turquoise lagoons, UNESCO Stone Town, spice plantations, and swimming with dolphins make it Africa\'s ultimate beach destination.',
    highlights: ['Nungwi & Kendwa pristine beaches', 'UNESCO Stone Town exploration', 'Dolphin swimming in Kizimkazi', 'Spice plantation tour', 'Snorkelling Mnemba Atoll coral reef', 'Prison Island giant tortoises'],
    bestTime: 'June – October · December – February',
    climate: 'Tropical coastal, 24–32°C year-round',
    currency: 'Tanzanian Shilling (TZS) · USD widely used',
    tours: 1, startingPrice: 1800,
    color: '#00213a',
  },
]

export default async function DestinationsPage() {
  const payload = await getPayload({ config })
  const tours = await payload.find({
    collection: 'tours',
    where: { _status: { equals: 'published' } },
    limit: 0, depth: 0,
  })

  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'ItemList',
      name: 'East Africa Destinations',
      itemListElement: DESTINATIONS_DATA.map((d, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'TouristDestination', name: d.name, description: d.description, url: `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/destinations/${d.country}` },
      })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/` },
        { '@type': 'ListItem', position: 2, name: 'Destinations', item: `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/destinations` },
      ],
    },
  ]

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <main style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

        {/* HERO */}
        <section style={{
          background: 'linear-gradient(160deg, #0d2b0d 0%, #1e4a1a 50%, #2d6b27 100%)',
          padding: '80px 24px 72px', textAlign: 'center', color: 'white',
        }}>
          <nav style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Destinations</span>
          </nav>
          <p style={{ color: '#ffc866', letterSpacing: 4, textTransform: 'uppercase', fontSize: 12, fontWeight: 700, marginBottom: 20 }}>Explore East Africa</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            6 Extraordinary<br />
            <span style={{ color: '#ffa500' }}>Destinations</span>
          </h1>
          <p style={{ fontSize: 18, opacity: 0.85, lineHeight: 1.7, maxWidth: 640, margin: '0 auto 40px' }}>
            From the Serengeti plains to gorilla forests, ancient civilizations to paradise beaches — East Africa is the world's ultimate travel destination.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tours" style={{ background: '#ffa500', color: 'white', padding: '14px 36px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>
              Browse {tours.totalDocs} Tours →
            </Link>
            <Link href="#destinations" style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white', padding: '14px 36px', borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 16 }}>
              Explore Destinations
            </Link>
          </div>
        </section>

        {/* DESTINATION CARDS */}
        <section id="destinations" style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {DESTINATIONS_DATA.map((dest, index) => (
              <div key={dest.country} style={{
                display: 'grid',
                gridTemplateColumns: index % 2 === 0 ? '1fr 420px' : '420px 1fr',
                gap: 0, borderRadius: 24, overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
              }}>
                {/* Visual panel */}
                {index % 2 !== 0 && (
                  <div style={{ background: `linear-gradient(135deg, ${dest.color}, ${dest.color}dd)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: 80, marginBottom: 16 }}>{dest.heroEmoji}</div>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>{dest.flag}</div>
                    <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>{dest.name}</div>
                    <div style={{ fontSize: 15, opacity: 0.8, fontStyle: 'italic', marginBottom: 24 }}>{dest.tagline}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                      <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 18px', borderRadius: 20, fontSize: 14 }}>
                        🗺️ {dest.tours} Tours
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 18px', borderRadius: 20, fontSize: 14 }}>
                        💰 From ${dest.startingPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Content panel */}
                <div style={{ padding: '48px 44px', background: 'var(--background)' }}>
                  {index % 2 === 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                      <span style={{ fontSize: 48 }}>{dest.flag}</span>
                      <div>
                        <h2 style={{ fontSize: 32, fontWeight: 900, color: 'var(--foreground)', lineHeight: 1, marginBottom: 4 }}>{dest.name}</h2>
                        <div style={{ fontSize: 15, color: '#ffa500', fontStyle: 'italic', fontWeight: 600 }}>{dest.tagline}</div>
                      </div>
                    </div>
                  )}

                  <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted-foreground)', marginBottom: 28 }}>{dest.description}</p>

                  <div style={{ marginBottom: 28 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>🌟 Highlights</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {dest.highlights.map((h, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--foreground)', lineHeight: 1.4 }}>
                          <span style={{ color: '#22c55e', fontWeight: 800, flexShrink: 0 }}>✓</span> {h}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
                    {[
                      { icon: '🌤️', label: 'Best Time', value: dest.bestTime },
                      { icon: '🌡️', label: 'Climate', value: dest.climate },
                      { icon: '💱', label: 'Currency', value: dest.currency },
                      { icon: '🗺️', label: 'Tours Available', value: `${dest.tours} packages from $${dest.startingPrice.toLocaleString()}` },
                    ].map(item => (
                      <div key={item.label} style={{ padding: '12px', background: 'var(--muted)', borderRadius: 10, border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{item.icon} {item.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.4 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Link href={`/destinations/${dest.country}`} style={{ padding: '12px 28px', background: '#1a3a1a', color: 'white', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                      Explore {dest.name} →
                    </Link>
                    <Link href={`/tours?country=${dest.country}`} style={{ padding: '12px 24px', background: 'var(--muted)', color: 'var(--foreground)', borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid var(--border)' }}>
                      View {dest.tours} Tours
                    </Link>
                  </div>
                </div>

                {/* Visual panel right side */}
                {index % 2 === 0 && (
                  <div style={{ background: `linear-gradient(135deg, ${dest.color}, ${dest.color}cc)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: 80, marginBottom: 16 }}>{dest.heroEmoji}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                      <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 18px', borderRadius: 20, fontSize: 14 }}>🗺️ {dest.tours} Tours</div>
                      <div style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 18px', borderRadius: 20, fontSize: 14 }}>💰 From ${dest.startingPrice.toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg,#0d2b0d,#2d6b27)', color: 'white', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginBottom: 16 }}>Not Sure Which Destination?</h2>
            <p style={{ fontSize: 17, opacity: 0.85, marginBottom: 36, lineHeight: 1.7 }}>Our safari experts will help you choose the perfect destination based on your interests, budget, and travel dates. Free consultation, no obligation.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ background: '#ffa500', color: 'white', padding: '16px 44px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 17 }}>Get Expert Advice</Link>
              <Link href="/tours" style={{ border: '2px solid rgba(255,255,255,0.6)', color: 'white', padding: '16px 44px', borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 17 }}>Browse All Tours</Link>
            </div>
          </div>
        </section>

        <style>{`@media(max-width:860px){[style*="grid-template-columns: 1fr 420px"],[style*="grid-template-columns: 420px 1fr"]{grid-template-columns:1fr !important}}`}</style>
      </main>
    </>
  )
}
