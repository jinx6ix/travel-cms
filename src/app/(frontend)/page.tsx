import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Safari Trails Africa | East Africa Safari Tours & Holidays',
  description:
    "Book East Africa's best safari tours. Kenya, Tanzania, Uganda, Rwanda & Ethiopia. Great Migration safaris, gorilla trekking, Kilimanjaro climbing, Zanzibar beach holidays. Expert guides, 4.9★ rated.",
  openGraph: {
    title: "Safari Trails Africa – East Africa's Premier Safari Company",
    description:
      'Wildlife safaris, gorilla trekking, mountain climbing & beach holidays across East Africa.',
  },
}

const TOUR_CATEGORIES = [
  { type: 'wildlife-safari', emoji: '🦁', label: 'Wildlife Safari' },
  { type: 'gorilla-trekking', emoji: '🦍', label: 'Gorilla Trekking' },
  { type: 'mountain-trekking', emoji: '🏔️', label: 'Mountain Trekking' },
  { type: 'beach-island', emoji: '🏖️', label: 'Beach & Island' },
  { type: 'luxury-safari', emoji: '✨', label: 'Luxury Safari' },
  { type: 'family-safari', emoji: '👨‍👩‍👧', label: 'Family Safari' },
  { type: 'honeymoon', emoji: '💑', label: 'Honeymoon' },
  { type: 'cultural-heritage', emoji: '🏛️', label: 'Cultural' },
  { type: 'hot-air-balloon', emoji: '🎈', label: 'Balloon Safari' },
  { type: 'adventure', emoji: '🏄', label: 'Adventure' },
  { type: 'birding', emoji: '🦜', label: 'Birding' },
  { type: 'budget-safari', emoji: '💰', label: 'Budget Safari' },
]

const FEATURED_TOURS = [
  { title: '7-Day Maasai Mara Great Migration Safari', slug: '7-day-maasai-mara-great-migration-safari', emoji: '🦁', type: 'Wildlife Safari', days: 7, price: 3200, country: 'Kenya', featured: true },
  { title: '8-Day Gorilla Trekking Rwanda & Golden Monkey', slug: '8-day-gorilla-trekking-rwanda-golden-monkey', emoji: '🦍', type: 'Gorilla Trekking', days: 8, price: 4800, country: 'Rwanda', featured: true },
  { title: '9-Day Kilimanjaro Climb – Lemosho Route', slug: '9-day-kilimanjaro-climb-lemosho-route', emoji: '🏔️', type: 'Mountain Trekking', days: 9, price: 2800, country: 'Tanzania', featured: true },
  { title: '6-Day Serengeti & Ngorongoro Crater Safari', slug: '6-day-serengeti-ngorongoro-crater-safari', emoji: '🌅', type: 'Wildlife Safari', days: 6, price: 2600, country: 'Tanzania', featured: true },
  { title: '12-Day Kenya & Tanzania Grand Safari', slug: '12-day-kenya-tanzania-grand-safari', emoji: '🗺️', type: 'Wildlife Safari', days: 12, price: 5500, country: 'Kenya + Tanzania', featured: true },
  { title: '7-Day Zanzibar Beach & Spice Island Holiday', slug: '7-day-zanzibar-beach-spice-island-holiday', emoji: '🏖️', type: 'Beach & Island', days: 7, price: 1800, country: 'Zanzibar', featured: false },
]

export default function HomePage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://safaritrailsafrica.com#organization',
    name: 'Safari Trails Africa',
    url: 'https://safaritrailsafrica.com',
    description: 'Premier East Africa safari company specializing in wildlife safaris, gorilla trekking, mountain climbing, and beach holidays.',
    telephone: '+254700000000',
    email: 'info@safaritrailsafrica.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
    areaServed: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Ethiopia'],
  }

  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Safari Trails Africa',
    url: 'https://safaritrailsafrica.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://safaritrailsafrica.com/tours?search={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />

      <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a' }}>

        {/* ── HERO ── */}
        <section style={{
          minHeight: '92vh',
          background: 'linear-gradient(160deg, #0d2b0d 0%, #1e4a1a 45%, #2d6b27 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '80px 24px', textAlign: 'center', color: 'white',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -120, right: -120, width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,165,0,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,165,0,0.05)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: 860, zIndex: 1 }}>
            <p style={{ color: '#ffc866', letterSpacing: 5, textTransform: 'uppercase', fontSize: 12, marginBottom: 24, fontWeight: 600 }}>
              East Africa's Premier Safari Company
            </p>
            <h1 style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: 28, letterSpacing: -1 }}>
              Where the Wild<br />
              <span style={{ color: '#ffa500' }}>Things Are</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', opacity: 0.85, lineHeight: 1.8, maxWidth: 620, margin: '0 auto 44px' }}>
              Extraordinary East Africa safaris crafted for the curious traveller.
              Witness the Great Migration, trek with mountain gorillas, climb Kilimanjaro.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tours" style={{
                background: '#ffa500', color: 'white', padding: '16px 40px',
                borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 17,
              }}>
                Explore All 22 Tours →
              </Link>
              <Link href="/tours?tourType=gorilla-trekking" style={{
                border: '2px solid rgba(255,255,255,0.5)', color: 'white', padding: '16px 40px',
                borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 17,
              }}>
                Gorilla Trekking
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 72, flexWrap: 'wrap' }}>
              {[
                { num: '22+', label: 'Expert tours' },
                { num: '6', label: 'Countries' },
                { num: '4.9★', label: 'Avg rating' },
                { num: '15yr', label: 'Experience' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#ffa500' }}>{stat.num}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOUR TYPE CATEGORIES ── */}
        <section style={{ padding: '72px 24px', background: '#fafaf7' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#1a2e1a', marginBottom: 12 }}>
                Find Your Perfect Safari
              </h2>
              <p style={{ color: '#666', fontSize: 17 }}>Choose your adventure type across East Africa</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
              {TOUR_CATEGORIES.map(cat => (
                <Link key={cat.type} href={`/tours?tourType=${cat.type}`} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '24px 12px', background: 'white', borderRadius: 14, textDecoration: 'none',
                  border: '1px solid #e8e0d4', gap: 10, textAlign: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}>
                  <span style={{ fontSize: 34 }}>{cat.emoji}</span>
                  <span style={{ fontSize: 13, color: '#333', fontWeight: 600, lineHeight: 1.3 }}>{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED TOURS ── */}
        <section style={{ padding: '80px 24px', background: 'white' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ color: '#ffa500', letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Hand-picked for you</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#1a2e1a' }}>Featured Safari Tours</h2>
              </div>
              <Link href="/tours" style={{ color: '#2d5a27', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
                View all 22 tours →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {FEATURED_TOURS.map(tour => (
                <article key={tour.slug} style={{
                  background: 'white', borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.08)', border: '1px solid #f0ebe3', position: 'relative',
                }}>
                  <div style={{
                    height: 220, background: 'linear-gradient(135deg, #1e4a1a, #2d6b27)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 80, position: 'relative',
                  }}>
                    <span>{tour.emoji}</span>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                    {tour.featured && (
                      <div style={{ position: 'absolute', top: 14, left: 14, background: '#ffa500', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>FEATURED</div>
                    )}
                    <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                      {tour.days} Days
                    </div>
                    <div style={{ position: 'absolute', bottom: 14, left: 14, fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      📍 {tour.country}
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ background: '#f0f7f0', color: '#2d5a27', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                        {tour.type}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a2e1a', lineHeight: 1.3, marginBottom: 20 }}>
                      <Link href={`/tours/${tour.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {tour.title}
                      </Link>
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f0ebe3' }}>
                      <div>
                        <span style={{ fontSize: 11, color: '#999' }}>From </span>
                        <span style={{ fontSize: 24, fontWeight: 900, color: '#1a3a1a' }}>${tour.price.toLocaleString()}</span>
                        <span style={{ fontSize: 11, color: '#999' }}>/pp</span>
                      </div>
                      <Link href={`/tours/${tour.slug}`} style={{
                        background: '#1a3a1a', color: 'white', padding: '10px 22px',
                        borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14,
                      }}>
                        View Tour
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link href="/tours" style={{
                display: 'inline-block', border: '2px solid #1a3a1a', color: '#1a3a1a',
                padding: '14px 44px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 16,
              }}>
                Browse All 22 Tours →
              </Link>
            </div>
          </div>
        </section>

        {/* ── DESTINATIONS ── */}
        <section style={{ padding: '80px 24px', background: '#1a3a1a', color: 'white' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: 12 }}>Our East Africa Destinations</h2>
              <p style={{ opacity: 0.75, fontSize: 16 }}>6 countries, infinite adventures</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
              {[
                { flag: '🇰🇪', name: 'Kenya', desc: 'Maasai Mara · Amboseli', country: 'kenya' },
                { flag: '🇹🇿', name: 'Tanzania', desc: 'Serengeti · Kilimanjaro', country: 'tanzania' },
                { flag: '🇺🇬', name: 'Uganda', desc: 'Gorillas · Chimps', country: 'uganda' },
                { flag: '🇷🇼', name: 'Rwanda', desc: 'Gorillas · Volcanoes', country: 'rwanda' },
                { flag: '🇪🇹', name: 'Ethiopia', desc: 'Lalibela · Omo Valley', country: 'ethiopia' },
                { flag: '🏝️', name: 'Zanzibar', desc: 'Beach · Stone Town', country: 'zanzibar' },
              ].map(dest => (
                <Link key={dest.name} href={`/tours?country=${dest.country}`} style={{
                  display: 'block', padding: '28px 20px', borderRadius: 14, textDecoration: 'none',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                  textAlign: 'center', color: 'white',
                }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>{dest.flag}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{dest.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.65 }}>{dest.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST SIGNALS ── */}
        <section style={{ padding: '80px 24px', background: '#fafaf7' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#1a2e1a', marginBottom: 12 }}>
              Why Safari Trails Africa?
            </h2>
            <p style={{ color: '#666', fontSize: 17, marginBottom: 56 }}>East Africa's most trusted safari specialists</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40 }}>
              {[
                { icon: '🏆', title: '15+ Years', desc: 'Safari expertise' },
                { icon: '⭐', title: '4.9 / 5', desc: '500+ guest reviews' },
                { icon: '🦁', title: '22 Tours', desc: '6 East African countries' },
                { icon: '🛡️', title: 'IATA Certified', desc: 'Licensed & insured' },
                { icon: '📞', title: '24/7 Support', desc: 'On-trip assistance' },
                { icon: '♻️', title: 'Eco-certified', desc: 'Responsible tourism' },
              ].map(item => (
                <div key={item.title}>
                  <div style={{ fontSize: 48, marginBottom: 14 }}>{item.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1a2e1a', marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: '#888', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          padding: '100px 24px', textAlign: 'center',
          background: 'linear-gradient(135deg, #0d2b0d, #2d6b27)', color: 'white',
        }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 20, lineHeight: 1.15 }}>
              Ready for Your<br />East Africa Adventure?
            </h2>
            <p style={{ fontSize: 17, opacity: 0.8, marginBottom: 44, lineHeight: 1.7 }}>
              Talk to our safari experts and start planning your dream holiday.
              Free consultation, no obligation, no booking fees.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tours" style={{
                background: '#ffa500', color: 'white', padding: '16px 44px',
                borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 17,
              }}>
                Browse All Tours
              </Link>
              <Link href="/contact" style={{
                border: '2px solid rgba(255,255,255,0.6)', color: 'white', padding: '16px 44px',
                borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 17,
              }}>
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
