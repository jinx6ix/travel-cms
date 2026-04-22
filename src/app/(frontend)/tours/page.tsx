import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'East Africa Safari Tours & Holiday Packages | Safari Trails Africa',
  description:
    'Browse 22 expert-curated East Africa safari tours. Gorilla trekking Rwanda & Uganda, Great Migration Kenya, Kilimanjaro climbing, Zanzibar beach holidays. Book your dream African adventure today.',
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
  'family-safari': '👨‍👩‍👧 Family Safari',
  'luxury-safari': '✨ Luxury Safari',
  'budget-safari': '💰 Budget Safari',
}

const DIFF_COLORS: Record<string, string> = {
  easy: '#22c55e', moderate: '#f59e0b', challenging: '#f97316', strenuous: '#ef4444',
}

const TOUR_EMOJIS: Record<string, string> = {
  'wildlife-safari': '🦁', 'mountain-trekking': '🏔️', 'beach-island': '🏖️',
  'cultural-heritage': '🏛️', 'gorilla-trekking': '🦍', 'hot-air-balloon': '🎈',
  'birding': '🦜', 'adventure': '🏄', 'honeymoon': '💑', 'family-safari': '👨‍👩‍👧',
  'luxury-safari': '✨', 'budget-safari': '💰',
}

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ tourType?: string; country?: string; duration?: string; search?: string }>
}) {
  const params = await searchParams
  const payload = await getPayload({ config })

  const whereClause: Record<string, unknown> = { _status: { equals: 'published' } }
  if (params.tourType) whereClause.tourType = { equals: params.tourType }
  if (params.country) whereClause.countries = { contains: params.country }
  if (params.duration) {
    const [min, max] = params.duration.split('-').map(Number)
    if (min) whereClause['duration'] = { greater_than_equal: min, ...(max ? { less_than_equal: max } : {}) }
  }
  if (params.search) whereClause['title'] = { like: params.search }

  const tours = await payload.find({
    collection: 'tours',
    where: whereClause,
    sort: '-isFeatured,-isPopular,-publishedAt',
    limit: 60,
    depth: 1,
  })

  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3a1a 0%, #2d5a27 100%)',
        color: 'white', padding: '80px 24px 60px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ color: '#ffc866', letterSpacing: 4, textTransform: 'uppercase', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
            East Africa's Premier Safari Company
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            East Africa Safari Tours
          </h1>
          <p style={{ fontSize: 17, opacity: 0.85, lineHeight: 1.7, marginBottom: 32 }}>
            {tours.totalDocs > 0 ? `${tours.totalDocs} expert-curated tours` : '22 expert-curated tours'} across Kenya, Tanzania, Uganda, Rwanda & Ethiopia.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['🦁 Safari', '🦍 Gorillas', '🏔️ Kilimanjaro', '🏖️ Zanzibar', '✨ Luxury', '💰 Budget'].map(tag => (
              <span key={tag} style={{ background: 'rgba(255,165,0,0.15)', border: '1px solid rgba(255,165,0,0.4)', padding: '5px 14px', borderRadius: 20, fontSize: 13, color: '#ffd166' }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ background: '#f8f4ef', padding: '20px 24px', borderBottom: '1px solid #e8e0d4', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <form method="GET" action="/tours" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', width: '100%' }}>
            <input name="search" defaultValue={params.search || ''} placeholder="Search tours..." style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: 'white', fontSize: 14, minWidth: 160 }} />
            <select name="tourType" defaultValue={params.tourType || ''} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: 'white', fontSize: 14 }}>
              <option value="">All Tour Types</option>
              {Object.entries(TOUR_TYPE_LABELS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
            </select>
            <select name="country" defaultValue={params.country || ''} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: 'white', fontSize: 14 }}>
              <option value="">All Countries</option>
              {[['kenya','🇰🇪 Kenya'],['tanzania','🇹🇿 Tanzania'],['uganda','🇺🇬 Uganda'],['rwanda','🇷🇼 Rwanda'],['ethiopia','🇪🇹 Ethiopia'],['zanzibar','🏝️ Zanzibar']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <select name="duration" defaultValue={params.duration || ''} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: 'white', fontSize: 14 }}>
              <option value="">Any Duration</option>
              <option value="1-4">1–4 Days</option>
              <option value="5-7">5–7 Days</option>
              <option value="8-10">8–10 Days</option>
              <option value="11-30">11+ Days</option>
            </select>
            <button type="submit" style={{ padding: '8px 22px', background: '#1a3a1a', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Filter</button>
            {(params.tourType || params.country || params.duration || params.search) && (
              <Link href="/tours" style={{ color: '#888', fontSize: 13, textDecoration: 'none' }}>Clear ×</Link>
            )}
          </form>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>
          Showing <strong>{tours.totalDocs}</strong> {tours.totalDocs === 1 ? 'tour' : 'tours'}
        </p>

        {tours.totalDocs === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: 56 }}>🔍</p>
            <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No tours found</p>
            <p style={{ color: '#888', marginBottom: 24 }}>Try adjusting your filters or browse all tours.</p>
            <Link href="/tours" style={{ background: '#1a3a1a', color: 'white', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
              View All Tours
            </Link>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 28 }}>
          {tours.docs.map((tour: any) => (
            <article key={tour.id} style={{
              background: 'white', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 2px 20px rgba(0,0,0,0.08)', border: '1px solid #f0ebe3', position: 'relative',
            }}>
              <div style={{ height: 220, background: 'linear-gradient(135deg, #1e4a1a, #2d6b27)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative' }}>
                {tour.featuredImage?.url
                  ? <img src={tour.featuredImage.url} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  : <span>{TOUR_EMOJIS[tour.tourType] || '🌍'}</span>
                }
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }} />
                {tour.isFeatured && <div style={{ position: 'absolute', top: 12, left: 12, background: '#ffa500', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>FEATURED</div>}
                {tour.isPopular && <div style={{ position: 'absolute', top: 12, left: tour.isFeatured ? 84 : 12, background: '#1a3a1a', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>POPULAR</div>}
                <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.65)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{tour.duration} Days</div>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={{ background: '#f0f7f0', color: '#2d5a27', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                    {TOUR_TYPE_LABELS[tour.tourType] || tour.tourType}
                  </span>
                  {tour.difficulty && (
                    <span style={{ background: `${DIFF_COLORS[tour.difficulty] || '#888'}18`, color: DIFF_COLORS[tour.difficulty] || '#888', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
                      {tour.difficulty}
                    </span>
                  )}
                </div>

                <h2 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, marginBottom: 10, color: '#1a2e1a' }}>
                  <Link href={`/tours/${tour.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{tour.title}</Link>
                </h2>

                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.6, marginBottom: 14 }}>
                  {(tour.shortDescription || '').slice(0, 110)}{tour.shortDescription?.length > 110 ? '…' : ''}
                </p>

                {(tour.countries || []).length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {(tour.countries || []).map((c: string) => (
                      <span key={c} style={{ background: '#f5f5f5', color: '#555', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </span>
                    ))}
                  </div>
                )}

                {tour.rating > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                    <span style={{ color: '#ffa500' }}>{'★'.repeat(Math.round(tour.rating))}</span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{tour.rating.toFixed(1)}</span>
                    <span style={{ color: '#999', fontSize: 13 }}>({tour.reviewCount} reviews)</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #f0ebe3' }}>
                  <div>
                    <span style={{ fontSize: 11, color: '#999' }}>From </span>
                    <span style={{ fontSize: 22, fontWeight: 900, color: '#1a3a1a' }}>${(tour.price?.amount || 0).toLocaleString()}</span>
                    <span style={{ fontSize: 11, color: '#999' }}>/pp</span>
                  </div>
                  <Link href={`/tours/${tour.slug}`} style={{ background: '#1a3a1a', color: 'white', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                    View Tour
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: '#1a3a1a', color: 'white', padding: '56px 24px', marginTop: 60 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, textAlign: 'center' }}>
          {[
            { icon: '🏆', t: '15+ Years', d: 'Safari expertise' },
            { icon: '⭐', t: '4.9/5 Rating', d: '500+ guest reviews' },
            { icon: '🛡️', t: 'IATA Certified', d: 'Licensed & bonded' },
            { icon: '📞', t: '24/7 Support', d: 'On-trip assistance' },
            { icon: '💳', t: 'No Hidden Fees', d: 'Transparent pricing' },
          ].map(item => (
            <div key={item.t}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{item.t}</div>
              <div style={{ opacity: 0.65, fontSize: 13 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
