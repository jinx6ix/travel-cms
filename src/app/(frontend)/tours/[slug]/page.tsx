import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }
export async function generateStaticParams() { return [] }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const results = await payload.find({ collection: 'tours', where: { slug: { equals: slug } }, depth: 0 })
  const tour = results.docs[0] as any
  if (!tour) return {}
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return {
    title: tour.meta?.title || `${tour.title} | Safari Trails Africa`,
    description: tour.meta?.description || tour.shortDescription,
    robots: tour.indexingConfig?.robotsDirective || 'index,follow',
    alternates: { canonical: tour.indexingConfig?.canonicalUrl || `${SITE_URL}/tours/${tour.slug}` },
    openGraph: { title: tour.meta?.title || tour.title, description: tour.meta?.description || tour.shortDescription },
  }
}

const DIFF_COLORS: Record<string,string> = { easy:'#22c55e', moderate:'#f59e0b', challenging:'#f97316', strenuous:'#ef4444' }

export default async function TourPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const results = await payload.find({ collection: 'tours', where: { slug: { equals: slug } }, depth: 2 })
  if (!results.docs[0]) notFound()
  const tour = results.docs[0] as any
  const reviews = await payload.find({
    collection: 'reviews',
    where: { and: [{ tour: { equals: tour.id } }, { status: { equals: 'approved' } }, { publishedOnFrontend: { equals: true } }] },
    sort: '-createdAt', limit: 12,
  })
  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const tourUrl = `${SITE_URL}/tours/${tour.slug}`
  const breadcrumbs = tour.indexingConfig?.breadcrumbs?.length > 0
    ? tour.indexingConfig.breadcrumbs
    : [{ label: 'Home', url: '/' }, { label: 'Tours', url: '/tours' }, { label: tour.title, url: `/tours/${tour.slug}` }]

  const schemas = [
    { '@context':'https://schema.org','@type':'TouristTrip', name:tour.title, description:tour.shortDescription, url:tourUrl,
      offers:{ '@type':'Offer', price:tour.price?.amount, priceCurrency:tour.price?.currency||'USD', availability:'https://schema.org/InStock', url:tourUrl },
      provider:{ '@type':'TravelAgency', name:'Safari Trails Africa', url:SITE_URL },
      ...(tour.rating>0&&tour.reviewCount>0?{ aggregateRating:{ '@type':'AggregateRating', ratingValue:Number(tour.rating).toFixed(1), reviewCount:tour.reviewCount, bestRating:5, worstRating:1 } }:{}) },
    { '@context':'https://schema.org','@type':'BreadcrumbList',
      itemListElement:breadcrumbs.map((c:any,i:number)=>({ '@type':'ListItem', position:i+1, name:c.label, item:c.url.startsWith('http')?c.url:`${SITE_URL}${c.url}` })) },
    ...(tour.faqs?.length>0?[{ '@context':'https://schema.org','@type':'FAQPage',
      mainEntity:tour.faqs.map((f:any)=>({ '@type':'Question', name:f.question, acceptedAnswer:{ '@type':'Answer', text:f.answer } })) }]:[]),
  ]

  const avgSubRating = (key: string) => {
    const vals = reviews.docs.map((r: any) => r.subRatings?.[key]).filter(Boolean)
    return vals.length > 0 ? (vals.reduce((a: number, b: number) => a + b, 0) / vals.length).toFixed(1) : null
  }

  return (
    <>
      {schemas.map((s,i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <main style={{ background:'var(--background)', color:'var(--foreground)' }}>

        {/* HERO */}
        <div style={{ height:500, position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#0d2b0d,#2d5a27)', display:'flex', alignItems:'flex-end' }}>
          {tour.featuredImage?.url && <img src={tour.featuredImage.url} alt={tour.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 24px 44px', width:'100%' }}>
            <nav style={{ display:'flex', gap:8, alignItems:'center', fontSize:13, color:'rgba(255,255,255,0.7)', marginBottom:14, flexWrap:'wrap' }}>
              {breadcrumbs.map((c:any,i:number) => (
                <span key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  {i<breadcrumbs.length-1 ? <Link href={c.url} style={{ color:'rgba(255,255,255,0.7)', textDecoration:'none' }}>{c.label}</Link> : <span style={{ color:'rgba(255,255,255,0.9)' }}>{c.label}</span>}
                  {i<breadcrumbs.length-1 && <span>›</span>}
                </span>
              ))}
            </nav>
            <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
              {tour.isFeatured && <span style={{ background:'#ffa500', color:'white', padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:800 }}>★ FEATURED</span>}
              {tour.isPopular && <span style={{ background:'rgba(255,255,255,0.2)', color:'white', padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:700, backdropFilter:'blur(4px)' }}>🔥 POPULAR</span>}
            </div>
            <h1 style={{ fontSize:'clamp(1.8rem,4vw,3rem)', fontWeight:800, color:'white', lineHeight:1.15, marginBottom:18, maxWidth:800 }}>{tour.title}</h1>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {[
                { icon:'📅', v:`${tour.duration} Days` },
                { icon:'👥', v:`${tour.groupSize?.min||1}–${tour.groupSize?.max||12} People` },
                { icon:'📍', v:(tour.countries||[]).map((c:string)=>c.charAt(0).toUpperCase()+c.slice(1)).join(', ') },
                ...(tour.bestTime?[{ icon:'🌤️', v:tour.bestTime }]:[]),
                ...(tour.rating>0?[{ icon:'⭐', v:`${tour.rating.toFixed(1)} (${tour.reviewCount} reviews)` }]:[]),
              ].map((s,i) => (
                <span key={i} style={{ fontSize:13, color:'rgba(255,255,255,0.9)', background:'rgba(0,0,0,0.35)', padding:'5px 12px', borderRadius:20, backdropFilter:'blur(4px)', display:'flex', alignItems:'center', gap:5 }}>
                  {s.icon} {s.v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TAB NAV */}
        <div style={{ position:'sticky', top:72, background:'var(--background)', borderBottom:'1px solid var(--border)', zIndex:50 }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'flex', gap:0, overflowX:'auto' }}>
            {[['Overview','overview'],['Itinerary','itinerary'],["What's Included",'whats-included'],['Gallery','gallery'],['Reviews','reviews'],['FAQ','faq']].map(([label,id]) => (
              <a key={id} href={`#${id}`} style={{ padding:'16px 18px', fontSize:14, fontWeight:600, color:'var(--muted-foreground)', textDecoration:'none', whiteSpace:'nowrap', borderBottom:'2px solid transparent', display:'block' }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* LAYOUT */}
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'40px 24px', display:'grid', gridTemplateColumns:'minmax(0,1fr) 360px', gap:40, alignItems:'start' }}>

          {/* LEFT */}
          <div>

            {/* OVERVIEW */}
            <section id="overview" style={{ marginBottom:52 }}>
              <h2 style={{ fontSize:26, fontWeight:800, color:'var(--foreground)', marginBottom:20, borderBottom:'3px solid #ffa500', display:'inline-block', paddingBottom:10 }}>Tour Overview</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:10, marginBottom:24 }}>
                {[
                  { icon:'⏱️', label:'Duration', value:`${tour.duration} days` },
                  { icon:'💰', label:'From', value:`$${(tour.price?.amount||0).toLocaleString()}` },
                  { icon:'👥', label:'Group', value:`${tour.groupSize?.min||1}–${tour.groupSize?.max||12} pax` },
                  { icon:'💪', label:'Difficulty', value:tour.difficulty||'Easy', color:DIFF_COLORS[tour.difficulty] },
                  { icon:'📅', label:'Best Time', value:tour.bestTime||'Year-round' },
                ].map(item => (
                  <div key={item.label} style={{ padding:'14px 12px', borderRadius:12, background:'var(--muted)', border:'1px solid var(--border)', textAlign:'center' }}>
                    <div style={{ fontSize:20, marginBottom:4 }}>{item.icon}</div>
                    <div style={{ fontSize:11, color:'var(--muted-foreground)', textTransform:'uppercase', letterSpacing:0.5, marginBottom:4 }}>{item.label}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:(item as any).color||'var(--foreground)', textTransform:'capitalize' }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize:16, lineHeight:1.8, color:'var(--muted-foreground)', marginBottom:24 }}>{tour.shortDescription}</p>

              {tour.highlights?.length>0 && (
                <div style={{ background:'var(--muted)', borderRadius:16, padding:'24px', border:'1px solid var(--border)' }}>
                  <h3 style={{ fontSize:18, fontWeight:800, color:'var(--foreground)', marginBottom:16 }}>🌟 Tour Highlights</h3>
                  <ul style={{ listStyle:'none', padding:0, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {tour.highlights.map((h:any,i:number) => (
                      <li key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', fontSize:14, color:'var(--foreground)', lineHeight:1.5 }}>
                        <span style={{ color:'#22c55e', fontWeight:800, flexShrink:0 }}>✓</span>{h.highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* ITINERARY */}
            {tour.itinerary?.length>0 && (
              <section id="itinerary" style={{ marginBottom:52 }}>
                <h2 style={{ fontSize:26, fontWeight:800, color:'var(--foreground)', marginBottom:24, borderBottom:'3px solid #ffa500', display:'inline-block', paddingBottom:10 }}>Day-by-Day Itinerary</h2>
                <div style={{ position:'relative' }}>
                  <div style={{ position:'absolute', left:18, top:0, bottom:0, width:2, background:'var(--border)' }} />
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    {tour.itinerary.map((day:any) => (
                      <details key={day.day} style={{ marginLeft:46 }} open={day.day===1}>
                        <div style={{ position:'absolute', left:0, width:38, height:38, borderRadius:'50%', background:'#ffa500', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:'white', border:'3px solid var(--background)' }}>{day.day}</div>
                        <summary style={{ padding:'16px 18px', background:'var(--muted)', borderRadius:12, cursor:'pointer', fontWeight:700, fontSize:15, color:'var(--foreground)', border:'1px solid var(--border)', listStyle:'none', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <span>{day.title}</span>
                          {day.meals?.length>0 && <span style={{ fontSize:12, color:'var(--muted-foreground)', background:'var(--background)', padding:'2px 10px', borderRadius:20, fontWeight:400 }}>🍽️ {day.meals.map((m:string)=>m.charAt(0).toUpperCase()+m.slice(1)).join(' · ')}</span>}
                        </summary>
                        <div style={{ padding:'18px', background:'var(--background)', border:'1px solid var(--border)', borderTop:'none', borderRadius:'0 0 12px 12px' }}>
                          {day.description && <p style={{ fontSize:14, color:'var(--muted-foreground)', lineHeight:1.7, marginBottom:day.accommodation?10:0 }}>{day.description}</p>}
                          {day.accommodation && <div style={{ display:'flex', gap:6, padding:'8px 12px', background:'var(--muted)', borderRadius:8, fontSize:13, color:'var(--foreground)' }}>🏨 <strong>Stay:</strong> {day.accommodation}</div>}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* INCLUSIONS / EXCLUSIONS */}
            {(tour.inclusions?.length>0 || tour.exclusions?.length>0) && (
              <section id="whats-included" style={{ marginBottom:52 }}>
                <h2 style={{ fontSize:26, fontWeight:800, color:'var(--foreground)', marginBottom:24, borderBottom:'3px solid #ffa500', display:'inline-block', paddingBottom:10 }}>What's Included</h2>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                  {tour.inclusions?.length>0 && (
                    <div style={{ background:'#f0fdf4', borderRadius:16, padding:'22px', border:'1px solid #bbf7d0' }}>
                      <h3 style={{ fontSize:16, fontWeight:800, color:'#15803d', marginBottom:14 }}>✅ Included</h3>
                      <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:8 }}>
                        {tour.inclusions.map((inc:any,i:number) => <li key={i} style={{ fontSize:14, color:'#166534', display:'flex', gap:8, lineHeight:1.5 }}><span style={{ color:'#22c55e', fontWeight:800, flexShrink:0 }}>✓</span>{inc.item}</li>)}
                      </ul>
                    </div>
                  )}
                  {tour.exclusions?.length>0 && (
                    <div style={{ background:'#fff7f7', borderRadius:16, padding:'22px', border:'1px solid #fecaca' }}>
                      <h3 style={{ fontSize:16, fontWeight:800, color:'#b91c1c', marginBottom:14 }}>❌ Not Included</h3>
                      <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:8 }}>
                        {tour.exclusions.map((exc:any,i:number) => <li key={i} style={{ fontSize:14, color:'#991b1b', display:'flex', gap:8, lineHeight:1.5 }}><span style={{ color:'#ef4444', fontWeight:800, flexShrink:0 }}>✗</span>{exc.item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* GALLERY */}
            {tour.gallery?.length>0 && (
              <section id="gallery" style={{ marginBottom:52 }}>
                <h2 style={{ fontSize:26, fontWeight:800, color:'var(--foreground)', marginBottom:20, borderBottom:'3px solid #ffa500', display:'inline-block', paddingBottom:10 }}>Photo Gallery</h2>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                  {tour.gallery.map((item:any,i:number) => (
                    <div key={i} style={{ borderRadius:10, overflow:'hidden', aspectRatio:'4/3', background:'var(--muted)' }}>
                      {item.image?.url ? <img src={item.image.url} alt={item.altText||`Gallery ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>📸</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* REVIEWS */}
            <section id="reviews" style={{ marginBottom:52 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24 }}>
                <h2 style={{ fontSize:26, fontWeight:800, color:'var(--foreground)', borderBottom:'3px solid #ffa500', display:'inline-block', paddingBottom:10 }}>Reviews {reviews.totalDocs>0&&`(${reviews.totalDocs})`}</h2>
                {tour.rating>0 && (
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:44, fontWeight:900, color:'var(--foreground)', lineHeight:1 }}>{tour.rating.toFixed(1)}</div>
                    <div style={{ color:'#ffa500', fontSize:20 }}>{'★'.repeat(Math.round(tour.rating))}</div>
                    <div style={{ fontSize:12, color:'var(--muted-foreground)' }}>{tour.reviewCount} verified reviews</div>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              {tour.reviewCount>0 && (
                <div style={{ background:'var(--muted)', borderRadius:16, padding:'22px', marginBottom:24, border:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {[['Guide Quality','guide'],['Accommodation','accommodation'],['Value for Money','valueForMoney'],['Transport','transport'],['Meals & Food','meals']].map(([label,key]) => {
                    const val = avgSubRating(key); return val ? (
                      <div key={key} style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontSize:12, color:'var(--muted-foreground)', minWidth:115 }}>{label}</span>
                        <div style={{ flex:1, height:5, background:'var(--border)', borderRadius:3 }}>
                          <div style={{ height:'100%', width:`${(Number(val)/5)*100}%`, background:'#ffa500', borderRadius:3 }} />
                        </div>
                        <span style={{ fontSize:13, fontWeight:700, color:'var(--foreground)', minWidth:24 }}>{val}</span>
                      </div>
                    ) : null
                  })}
                </div>
              )}

              {reviews.docs.length>0 && (
                <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:36 }}>
                  {reviews.docs.map((review:any) => (
                    <div key={review.id} style={{ padding:'22px', border:'1px solid var(--border)', borderRadius:16, background:'var(--background)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, gap:12 }}>
                        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                          <div style={{ width:46, height:46, borderRadius:'50%', background:'#2d5a27', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:17, flexShrink:0 }}>
                            {review.reviewerName?.[0]?.toUpperCase()||'?'}
                          </div>
                          <div>
                            <div style={{ fontWeight:700, fontSize:15, color:'var(--foreground)', display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                              {review.reviewerName}
                              {review.verifiedPurchase && <span style={{ fontSize:11, color:'#15803d', background:'#f0fdf4', padding:'2px 8px', borderRadius:10, fontWeight:600, border:'1px solid #bbf7d0' }}>✓ Verified</span>}
                            </div>
                            <div style={{ fontSize:12, color:'var(--muted-foreground)', display:'flex', gap:6, flexWrap:'wrap' }}>
                              {review.reviewerCountry && <span>📍 {review.reviewerCountry}</span>}
                              {review.travelType && <span>· {review.travelType.charAt(0).toUpperCase()+review.travelType.slice(1)}</span>}
                              {review.source&&review.source!=='website' && <span>· via {review.source}</span>}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign:'right', flexShrink:0 }}>
                          <div style={{ color:'#ffa500', fontSize:17 }}>{'★'.repeat(Math.min(5,Math.round(review.rating||0)))}</div>
                          <div style={{ fontSize:13, fontWeight:700, color:'var(--foreground)' }}>{review.rating}/5</div>
                        </div>
                      </div>
                      {review.title && <h4 style={{ fontSize:15, fontWeight:700, color:'var(--foreground)', marginBottom:8 }}>"{review.title}"</h4>}
                      <p style={{ fontSize:14, color:'var(--muted-foreground)', lineHeight:1.7 }}>{review.reviewText}</p>
                      {review.responseFromBusiness?.response && (
                        <div style={{ marginTop:14, padding:'14px 16px', background:'var(--muted)', borderRadius:10, borderLeft:'3px solid #2d5a27' }}>
                          <div style={{ fontSize:12, fontWeight:700, color:'#15803d', marginBottom:6 }}>Response from Safari Trails Africa:</div>
                          <p style={{ fontSize:13, color:'var(--muted-foreground)' }}>{review.responseFromBusiness.response}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {reviews.docs.length===0 && (
                <div style={{ padding:'36px', textAlign:'center', background:'var(--muted)', borderRadius:16, border:'1px dashed var(--border)', marginBottom:28 }}>
                  <p style={{ fontSize:36, marginBottom:10 }}>⭐</p>
                  <p style={{ fontWeight:700, color:'var(--foreground)', marginBottom:4 }}>No reviews yet</p>
                  <p style={{ color:'var(--muted-foreground)', fontSize:14 }}>Be the first to review this tour!</p>
                </div>
              )}

              {/* REVIEW FORM */}
              <div style={{ background:'var(--muted)', borderRadius:20, padding:'28px', border:'1px solid var(--border)' }}>
                <h3 style={{ fontSize:22, fontWeight:800, color:'var(--foreground)', marginBottom:8 }}>✍️ Write a Review</h3>
                <p style={{ color:'var(--muted-foreground)', fontSize:14, marginBottom:22 }}>Travelled with us? Share your experience. All reviews are verified before publishing.</p>
                <form action="/api/reviews/submit" method="POST" style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <input type="hidden" name="tourId" value={tour.id} />
                  <input type="hidden" name="tourSlug" value={tour.slug} />
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    <div><label style={{ display:'block', fontSize:13, fontWeight:700, color:'var(--foreground)', marginBottom:5 }}>Your Name *</label>
                      <input name="reviewerName" required placeholder="John Smith" style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--background)', color:'var(--foreground)', fontSize:14, boxSizing:'border-box' }} /></div>
                    <div><label style={{ display:'block', fontSize:13, fontWeight:700, color:'var(--foreground)', marginBottom:5 }}>Country</label>
                      <input name="reviewerCountry" placeholder="United Kingdom" style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--background)', color:'var(--foreground)', fontSize:14, boxSizing:'border-box' }} /></div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    <div><label style={{ display:'block', fontSize:13, fontWeight:700, color:'var(--foreground)', marginBottom:5 }}>Overall Rating *</label>
                      <select name="rating" required style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--background)', color:'var(--foreground)', fontSize:14 }}>
                        <option value="">Select...</option>
                        <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ Very Good (4/5)</option>
                        <option value="3">⭐⭐⭐ Good (3/5)</option>
                        <option value="2">⭐⭐ Fair (2/5)</option>
                        <option value="1">⭐ Poor (1/5)</option>
                      </select></div>
                    <div><label style={{ display:'block', fontSize:13, fontWeight:700, color:'var(--foreground)', marginBottom:5 }}>Travel Type</label>
                      <select name="travelType" style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--background)', color:'var(--foreground)', fontSize:14 }}>
                        <option value="">Select...</option>
                        <option value="solo">Solo</option><option value="couple">Couple</option>
                        <option value="family">Family</option><option value="friends">Friends</option>
                      </select></div>
                  </div>
                  <div><label style={{ display:'block', fontSize:13, fontWeight:700, color:'var(--foreground)', marginBottom:5 }}>Review Title *</label>
                    <input name="title" required placeholder="Summarise your experience..." style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--background)', color:'var(--foreground)', fontSize:14, boxSizing:'border-box' }} /></div>
                  <div><label style={{ display:'block', fontSize:13, fontWeight:700, color:'var(--foreground)', marginBottom:5 }}>Your Review *</label>
                    <textarea name="reviewText" required rows={5} placeholder="Tell us about your experience — guide, accommodation, food, value for money..." style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid var(--border)', background:'var(--background)', color:'var(--foreground)', fontSize:14, resize:'vertical', boxSizing:'border-box' }} /></div>
                  <button type="submit" style={{ padding:'14px 32px', background:'#ffa500', color:'white', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700, fontSize:16, alignSelf:'flex-start' }}>
                    Submit Review →
                  </button>
                  <p style={{ fontSize:12, color:'var(--muted-foreground)' }}>ℹ️ Reviews are moderated and published within 24 hours.</p>
                </form>
              </div>
            </section>

            {/* FAQS */}
            {tour.faqs?.length>0 && (
              <section id="faq" style={{ marginBottom:52 }}>
                <h2 style={{ fontSize:26, fontWeight:800, color:'var(--foreground)', marginBottom:22, borderBottom:'3px solid #ffa500', display:'inline-block', paddingBottom:10 }}>Frequently Asked Questions</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                  {tour.faqs.map((faq:any,i:number) => (
                    <details key={i} style={{ border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }} open={i===0}>
                      <summary style={{ padding:'16px 20px', cursor:'pointer', fontWeight:700, fontSize:15, color:'var(--foreground)', background:'var(--muted)', listStyle:'none', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        {faq.question}<span style={{ fontSize:20, color:'var(--muted-foreground)', flexShrink:0 }}>+</span>
                      </summary>
                      <div style={{ padding:'16px 20px', fontSize:15, color:'var(--muted-foreground)', lineHeight:1.7, background:'var(--background)', borderTop:'1px solid var(--border)' }}>{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* SIDEBAR */}
          <div style={{ position:'sticky', top:130 }}>
            <div style={{ background:'var(--background)', borderRadius:20, boxShadow:'0 4px 40px rgba(0,0,0,0.12)', overflow:'hidden', border:'1px solid var(--border)', marginBottom:14 }}>
              <div style={{ background:'linear-gradient(135deg,#1a3a1a,#2d5a27)', color:'white', padding:'26px' }}>
                <div style={{ fontSize:13, opacity:0.7, marginBottom:2 }}>Starting from</div>
                <div style={{ fontSize:42, fontWeight:900 }}>${(tour.price?.amount||0).toLocaleString()}</div>
                <div style={{ fontSize:13, opacity:0.7 }}>per person · {tour.price?.currency||'USD'}</div>
                {tour.rating>0 && <div style={{ marginTop:12, padding:'8px 14px', background:'rgba(255,255,255,0.12)', borderRadius:10, display:'flex', alignItems:'center', gap:8 }}><span style={{ color:'#ffa500', fontSize:15 }}>{'★'.repeat(Math.round(tour.rating))}</span><span style={{ fontSize:14, fontWeight:700 }}>{tour.rating.toFixed(1)}/5</span><span style={{ fontSize:12, opacity:0.8 }}>({tour.reviewCount} reviews)</span></div>}
              </div>
              <div style={{ padding:'18px' }}>
                {[['⏱️','Duration',`${tour.duration} days`],['👥','Group Size',`${tour.groupSize?.min||1}–${tour.groupSize?.max||12} people`],['📍','Countries',(tour.countries||[]).map((c:string)=>c.charAt(0).toUpperCase()+c.slice(1)).join(', ')],['📅','Best Time',tour.bestTime||'Year-round'],['💪','Difficulty',tour.difficulty||'Easy']].map(([icon,label,value]) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', fontSize:14, paddingBottom:9, marginBottom:9, borderBottom:'1px solid var(--border)' }}>
                    <span style={{ color:'var(--muted-foreground)' }}>{icon} {label}</span>
                    <span style={{ fontWeight:600, color:'var(--foreground)', textTransform:'capitalize', textAlign:'right', maxWidth:'55%' }}>{value}</span>
                  </div>
                ))}
                <a href={`mailto:info@safaritrailsafrica.com?subject=Booking: ${encodeURIComponent(tour.title)}`} style={{ display:'block', textAlign:'center', background:'#ffa500', color:'white', padding:'15px', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:17, marginBottom:9 }}>📧 Book This Tour</a>
                <a href="https://wa.me/254700000000" style={{ display:'block', textAlign:'center', background:'#25d366', color:'white', padding:'13px', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:16, marginBottom:9 }}>💬 WhatsApp Us</a>
                <a href="tel:+254700000000" style={{ display:'block', textAlign:'center', background:'var(--muted)', color:'var(--foreground)', padding:'13px', borderRadius:12, textDecoration:'none', fontWeight:600, fontSize:15, border:'1px solid var(--border)' }}>📞 Call Now</a>
                <p style={{ textAlign:'center', fontSize:12, color:'var(--muted-foreground)', marginTop:10 }}>Free cancellation · No booking fees</p>
              </div>
            </div>
            <div style={{ padding:'16px', background:'var(--muted)', borderRadius:14, border:'1px solid var(--border)', marginBottom:14 }}>
              {['🔒 Secure booking','💳 No hidden fees','🛡️ IATA Certified','📞 24/7 on-trip support','✅ Instant confirmation'].map(t => (
                <div key={t} style={{ fontSize:13, color:'var(--foreground)', padding:'5px 0', borderBottom:'1px solid var(--border)' }}>{t}</div>
              ))}
            </div>
            <div style={{ padding:'18px', background:'var(--muted)', borderRadius:14, border:'1px solid var(--border)', textAlign:'center' }}>
              <div style={{ fontSize:26, marginBottom:6 }}>🤝</div>
              <div style={{ fontWeight:700, color:'var(--foreground)', marginBottom:6, fontSize:15 }}>Need help planning?</div>
              <p style={{ fontSize:13, color:'var(--muted-foreground)', marginBottom:14, lineHeight:1.6 }}>Our experts are available 24/7 to customise your trip.</p>
              <Link href="/contact" style={{ display:'block', textAlign:'center', background:'#1a3a1a', color:'white', padding:'11px', borderRadius:10, textDecoration:'none', fontWeight:600, fontSize:14 }}>Free Consultation</Link>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div style={{ background:'var(--muted)', padding:'52px 24px', borderTop:'1px solid var(--border)' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <h2 style={{ fontSize:26, fontWeight:800, color:'var(--foreground)', marginBottom:24 }}>You May Also Like</h2>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              {(tour.countries||[]).map((c:string) => (
                <Link key={c} href={`/tours?country=${c}`} style={{ padding:'11px 22px', background:'#1a3a1a', color:'white', borderRadius:50, textDecoration:'none', fontWeight:600, fontSize:14 }}>More {c.charAt(0).toUpperCase()+c.slice(1)} Tours →</Link>
              ))}
              <Link href={`/tours?tourType=${tour.tourType}`} style={{ padding:'11px 22px', background:'var(--background)', color:'var(--foreground)', borderRadius:50, textDecoration:'none', fontWeight:600, fontSize:14, border:'1px solid var(--border)' }}>More {(tour.tourType||'').replace(/-/g,' ').replace(/\b\w/g,(c:string)=>c.toUpperCase())} →</Link>
              <Link href="/tours" style={{ padding:'11px 22px', background:'var(--background)', color:'var(--foreground)', borderRadius:50, textDecoration:'none', fontWeight:600, fontSize:14, border:'1px solid var(--border)' }}>All Tours →</Link>
            </div>
          </div>
        </div>

        <style>{`
          @media(max-width:900px){[style*="grid-template-columns: minmax(0,1fr) 360px"]{grid-template-columns:1fr !important}[style*="position: sticky; top: 130px"]{position:static !important}}
          @media(max-width:640px){[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr !important}[style*="grid-template-columns: repeat(3,1fr)"]{grid-template-columns:1fr 1fr !important}}
          details summary::-webkit-details-marker{display:none}
        `}</style>
      </main>
    </>
  )
}
