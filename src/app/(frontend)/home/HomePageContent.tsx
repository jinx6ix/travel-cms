import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utilities/generateRichSchema'

export const metadata: Metadata = {
  title: 'Safari Trails Africa | East Africa Safari Tours & Holidays',
  description: 'Book East Africa\'s best safari tours. Kenya, Tanzania, Uganda, Rwanda & Ethiopia. Great Migration safaris, gorilla trekking, Kilimanjaro climbing, Zanzibar beach holidays. Expert guides, 4.9★ rated.',
  openGraph: {
    title: 'Safari Trails Africa – East Africa\'s Premier Safari Company',
    description: 'Wildlife safaris, gorilla trekking, mountain climbing & beach holidays across East Africa.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const TOUR_TYPE_LABELS: Record<string, string> = {
  'wildlife-safari': '🦁 Wildlife Safari',
  'mountain-trekking': '🏔️ Mountain Trekking',
  'beach-island': '🏖️ Beach & Island',
  'cultural-heritage': '🏛️ Cultural',
  'gorilla-trekking': '🦍 Gorilla Trekking',
  'hot-air-balloon': '🎈 Balloon Safari',
  'birding': '🦜 Birding',
  'adventure': '🏄 Adventure',
  'honeymoon': '💑 Honeymoon',
  'family-safari': '👨‍👩‍👧 Family',
  'luxury-safari': '✨ Luxury',
  'budget-safari': '💰 Budget',
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Featured tours
  const featuredTours = await payload.find({
    collection: 'tours',
    where: { and: [{ _status: { equals: 'published' } }, { isFeatured: { equals: true } }] },
    sort: '-publishedAt',
    limit: 6,
    depth: 1,
  })

  // Popular tours (fallback if featured < 6)
  const popularTours = await payload.find({
    collection: 'tours',
    where: { and: [{ _status: { equals: 'published' } }, { isPopular: { equals: true } }] },
    sort: '-rating',
    limit: 6,
    depth: 1,
  })

  // Featured reviews
  const featuredReviews = await payload.find({
    collection: 'reviews',
    where: {
      and: [
        { status: { equals: 'approved' } },
        { publishedOnFrontend: { equals: true } },
        { featured: { equals: true } },
      ],
    },
    sort: '-createdAt',
    limit: 6,
  })

  const orgSchema = generateOrganizationSchema()
  const siteSchema = generateWebSiteSchema()
  const toursToShow = featuredTours.docs.length >= 3 ? featuredTours.docs : popularTours.docs

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteSchema }} />

      <main style={{ fontFamily: 'Georgia, serif' }}>

        {/* ── HERO ── */}
        <section style={{
          minHeight: '90vh',
          background: 'linear-gradient(160deg, #0d2b0d 0%, #1e4a1a 40%, #2d6b27 70%, #1e4a1a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '80px 24px', textAlign: 'center', color: 'white',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,165,0,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,165,0,0.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,140,0,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: 860, zIndex: 1 }}>
            <p style={{ color: '#ffc866', letterSpacing: 5, textTransform: 'uppercase', fontSize: 12, fontFamily: 'Arial, sans-serif', marginBottom: 20 }}>
              East Africa's Premier Safari Company
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 28, letterSpacing: -1 }}>
              Where the Wild<br />
              <span style={{ color: '#ffa500' }}>Things Are</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', opacity: 0.85, lineHeight: 1.8, maxWidth: 640, margin: '0 auto 40px', fontFamily: 'Arial, sans-serif' }}>
              Extraordinary East Africa safaris crafted for the curious traveller.
              Witness the Great Migration, trek with mountain gorillas, climb Kilimanjaro
              — unforgettable adventures, flawlessly guided.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tours" style={{
                background: '#ffa500', color: 'white', padding: '16px 36px',
                borderRadius: 50, textDecoration: 'none', fontWeight: 700,
                fontSize: 16, fontFamily: 'Arial, sans-serif', letterSpacing: 0.5,
              }}>
                Explore All Tours →
              </Link>
              <a href="#featured" style={{
                border: '2px solid rgba(255,255,255,0.5)', color: 'white', padding: '16px 36px',
                borderRadius: 50, textDecoration: 'none', fontWeight: 600,
                fontSize: 16, fontFamily: 'Arial, sans-serif',
              }}>
                View Featured
              </a>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 72, flexWrap: 'wrap' }}>
              {[
                { num: '22+', label: 'Expert-curated tours' },
                { num: '6', label: 'East Africa countries' },
                { num: '4.9★', label: 'Average rating' },
                { num: '15yr', label: 'Of safari expertise' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#ffa500' }}>{stat.num}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, fontFamily: 'Arial, sans-serif', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOUR TYPE CATEGORIES ── */}
        <section style={{ padding: '64px 24px', background: '#fafaf7' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1a2e1a', marginBottom: 12 }}>Find Your Perfect Safari</h2>
              <p style={{ color: '#666', fontSize: 17, fontFamily: 'Arial, sans-serif' }}>Choose your adventure type across East Africa</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
              {Object.entries(TOUR_TYPE_LABELS).map(([type, label]) => (
                <Link key={type} href={`/tours?tourType=${type}`} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '24px 12px', background: 'white', borderRadius: 12, textDecoration: 'none',
                  border: '1px solid #e8e0d4', gap: 8, textAlign: 'center',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}>
                  <span style={{ fontSize: 32 }}>{label.split(' ')[0]}</span>
                  <span style={{ fontSize: 13, color: '#444', fontFamily: 'Arial, sans-serif', fontWeight: 500, lineHeight: 1.3 }}>
                    {label.replace(/^[^\s]+\s/, '')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED TOURS ── */}
        <section id="featured" style={{ padding: '80px 24px', background: 'white' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ color: '#ffa500', letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, fontFamily: 'Arial, sans-serif', marginBottom: 8 }}>Hand-picked for you</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#1a2e1a' }}>Featured Safari Tours</h2>
              </div>
              <Link href="/tours" style={{ color: '#2d5a27', fontFamily: 'Arial, sans-serif', fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
                View all {(featuredTours.totalDocs + popularTours.totalDocs)} tours →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {toursToShow.map((tour: any) => (
                <article key={tour.id} style={{
                  background: 'white', borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.08)', border: '1px solid #f0ebe3',
                  position: 'relative',
                }}>
                  {/* Image area */}
                  <div style={{
                    height: 230, background: 'linear-gradient(135deg, #1e4a1a, #2d6b27)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 72, position: 'relative',
                  }}>
                    {tour.featuredImage?.url ? (
                      <img src={tour.featuredImage.url} alt={tour.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                    ) : (
                      <span>{['🦁', '🦍', '🏔️', '🏖️', '🎈', '🦜'][Math.abs(tour.title.length) % 6]}</span>
                    )}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                    }} />
                    {/* Duration badge */}
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      background: 'rgba(0,0,0,0.65)', color: 'white',
                      padding: '5px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, fontFamily: 'Arial, sans-serif',
                    }}>
                      {tour.duration} Days
                    </div>
                    {/* Featured badge */}
                    {tour.isFeatured && (
                      <div style={{
                        position: 'absolute', top: 16, left: 16,
                        background: '#ffa500', color: 'white',
                        padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800, fontFamily: 'Arial, sans-serif', letterSpacing: 1,
                      }}>FEATURED</div>
                    )}
                    {/* Tour type at bottom */}
                    <div style={{
                      position: 'absolute', bottom: 16, left: 16, fontSize: 12,
                      color: 'rgba(255,255,255,0.9)', fontFamily: 'Arial, sans-serif',
                    }}>
                      {TOUR_TYPE_LABELS[tour.tourType]}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a2e1a', lineHeight: 1.3, marginBottom: 10 }}>
                      <Link href={`/tours/${tour.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {tour.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: 14, color: '#777', lineHeight: 1.6, marginBottom: 16, fontFamily: 'Arial, sans-serif' }}>
                      {tour.shortDescription?.slice(0, 110)}...
                    </p>

                    {/* Countries */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                      {(tour.countries || []).map((c: string) => (
                        <span key={c} style={{ background: '#f0f7f0', color: '#2d5a27', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </span>
                      ))}
                    </div>

                    {/* Rating */}
                    {tour.rating > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                        <span style={{ color: '#ffa500' }}>{'★'.repeat(Math.round(tour.rating))}</span>
                        <span style={{ fontWeight: 700, fontSize: 14, fontFamily: 'Arial, sans-serif' }}>{tour.rating.toFixed(1)}</span>
                        <span style={{ color: '#999', fontSize: 13, fontFamily: 'Arial, sans-serif' }}>({tour.reviewCount})</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f0ebe3' }}>
                      <div style={{ fontFamily: 'Arial, sans-serif' }}>
                        <span style={{ fontSize: 11, color: '#999' }}>From </span>
                        <span style={{ fontSize: 24, fontWeight: 900, color: '#1a3a1a' }}>${tour.price?.amount?.toLocaleString()}</span>
                        <span style={{ fontSize: 11, color: '#999' }}>/pp</span>
                      </div>
                      <Link href={`/tours/${tour.slug}`} style={{
                        background: '#1a3a1a', color: 'white', padding: '10px 22px',
                        borderRadius: 8, textDecoration: 'none', fontWeight: 700,
                        fontSize: 14, fontFamily: 'Arial, sans-serif',
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
                padding: '14px 40px', borderRadius: 50, textDecoration: 'none',
                fontWeight: 700, fontSize: 15, fontFamily: 'Arial, sans-serif',
              }}>
                Browse All 22 Tours →
              </Link>
            </div>
          </div>
        </section>

        {/* ── DESTINATIONS STRIP ── */}
        <section style={{ padding: '80px 24px', background: '#1a3a1a', color: 'white' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: 12 }}>Our East Africa Destinations</h2>
              <p style={{ opacity: 0.75, fontFamily: 'Arial, sans-serif', fontSize: 16 }}>6 countries, infinite adventures</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
              {[
                { flag: '🇰🇪', name: 'Kenya', desc: 'Maasai Mara, Amboseli', country: 'kenya' },
                { flag: '🇹🇿', name: 'Tanzania', desc: 'Serengeti, Kilimanjaro', country: 'tanzania' },
                { flag: '🇺🇬', name: 'Uganda', desc: 'Gorillas, Chimpanzees', country: 'uganda' },
                { flag: '🇷🇼', name: 'Rwanda', desc: 'Gorillas, Volcanoes', country: 'rwanda' },
                { flag: '🇪🇹', name: 'Ethiopia', desc: 'Lalibela, Omo Valley', country: 'ethiopia' },
                { flag: '🏝️', name: 'Zanzibar', desc: 'Beach, Stone Town', country: 'zanzibar' },
              ].map(dest => (
                <Link key={dest.name} href={`/tours?country=${dest.country}`} style={{
                  display: 'block', padding: '28px 20px', borderRadius: 14, textDecoration: 'none',
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center', color: 'white', transition: 'background 0.2s',
                }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>{dest.flag}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{dest.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.65, fontFamily: 'Arial, sans-serif' }}>{dest.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        {featuredReviews.docs.length > 0 && (
          <section style={{ padding: '80px 24px', background: '#fafaf7' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <p style={{ color: '#ffa500', letterSpacing: 3, textTransform: 'uppercase', fontSize: 12, fontFamily: 'Arial, sans-serif', marginBottom: 8 }}>Real travellers, real stories</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#1a2e1a' }}>What Our Guests Say</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                {featuredReviews.docs.map((review: any) => (
                  <div key={review.id} style={{
                    background: 'white', padding: '28px', borderRadius: 16,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #f0ebe3',
                  }}>
                    <div style={{ color: '#ffa500', fontSize: 22, marginBottom: 12 }}>
                      {'★'.repeat(Math.round(review.rating))}
                    </div>
                    {review.title && (
                      <p style={{ fontWeight: 700, fontSize: 16, color: '#1a2e1a', marginBottom: 12 }}>"{review.title}"</p>
                    )}
                    <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 20, fontFamily: 'Arial, sans-serif' }}>
                      {review.reviewText?.slice(0, 200)}...
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%', background: '#2d5a27',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 700, fontSize: 16, flexShrink: 0,
                      }}>
                        {review.reviewerName?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#1a2e1a' }}>
                          {review.reviewerName}
                          {review.verifiedPurchase && <span style={{ marginLeft: 6, fontSize: 11, color: '#2d5a27', background: '#f0f7f0', padding: '1px 6px', borderRadius: 8 }}>✓ Verified</span>}
                        </div>
                        <div style={{ fontSize: 12, color: '#888', fontFamily: 'Arial, sans-serif' }}>
                          {review.reviewerCountry} {review.travelType ? `· ${review.travelType}` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── TRUST SIGNALS ── */}
        <section style={{ padding: '80px 24px', background: 'white' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#1a2e1a', marginBottom: 12 }}>Why Safari Trails Africa?</h2>
              <p style={{ fontFamily: 'Arial, sans-serif', color: '#666', fontSize: 17 }}>East Africa's most trusted safari specialists since 2008</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, textAlign: 'center' }}>
              {[
                { icon: '🏆', title: '15+ Years', desc: 'Safari expertise & local knowledge' },
                { icon: '⭐', title: '4.9 / 5', desc: 'Average rating from 500+ guests' },
                { icon: '🦁', title: '22 Tours', desc: 'Across 6 East African countries' },
                { icon: '🛡️', title: 'IATA Certified', desc: 'Licensed & fully insured operator' },
                { icon: '📞', title: '24/7 Support', desc: 'Emergency assistance on every trip' },
                { icon: '♻️', title: 'Eco-certified', desc: 'Responsible, sustainable tourism' },
              ].map(item => (
                <div key={item.title}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{item.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1a2e1a', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: '#888', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          padding: '100px 24px', textAlign: 'center',
          background: 'linear-gradient(135deg, #0d2b0d, #2d6b27)',
          color: 'white',
        }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 20, lineHeight: 1.15 }}>
              Ready for Your<br />East Africa Adventure?
            </h2>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 17, opacity: 0.8, marginBottom: 40, lineHeight: 1.7 }}>
              Talk to our safari experts and start planning your dream holiday.
              Free consultation, no obligation, no booking fees.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tours" style={{
                background: '#ffa500', color: 'white', padding: '16px 40px',
                borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 17, fontFamily: 'Arial, sans-serif',
              }}>
                Browse All Tours
              </Link>
              <a href="/contact" style={{
                border: '2px solid rgba(255,255,255,0.6)', color: 'white', padding: '16px 40px',
                borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 17, fontFamily: 'Arial, sans-serif',
              }}>
                Get Free Quote
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
