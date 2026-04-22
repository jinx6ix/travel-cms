import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us & Book Your Safari | Safari Trails Africa',
  description: 'Contact Safari Trails Africa to book your East Africa safari. Get a free quote, customise your itinerary, or speak to our expert guides. WhatsApp, email, or call us 24/7.',
  robots: 'index,follow',
}

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Safari Trails Africa',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/contact`,
    mainEntity: {
      '@type': 'TravelAgency',
      name: 'Safari Trails Africa',
      telephone: '+254700000000',
      email: 'info@safaritrailsafrica.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0d2b0d, #1e4a1a)', color: 'white', padding: '80px 24px 64px', textAlign: 'center' }}>
          <nav style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Contact</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
            Plan Your Dream<br /><span style={{ color: '#ffa500' }}>East Africa Safari</span>
          </h1>
          <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            Our safari experts are ready to craft your perfect East Africa adventure. Free consultation, no obligation, no booking fees.
          </p>
        </section>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'start' }}>

            {/* ENQUIRY FORM */}
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--foreground)', marginBottom: 8, borderBottom: '3px solid #ffa500', display: 'inline-block', paddingBottom: 10 }}>Send Us an Enquiry</h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
                Fill out the form below and one of our safari specialists will respond within 2 hours during business hours (8am–6pm EAT).
              </p>

              <form action="mailto:info@safaritrailsafrica.com" method="POST" encType="text/plain" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Full Name *</label>
                    <input name="name" required placeholder="John Smith" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Email Address *</label>
                    <input name="email" type="email" required placeholder="john@example.com" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15, boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Phone / WhatsApp</label>
                    <input name="phone" placeholder="+1 555 000 0000" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Your Country</label>
                    <input name="country" placeholder="United States" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15, boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Interested Destination</label>
                    <select name="destination" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15 }}>
                      <option value="">Select destination...</option>
                      <option value="kenya">🇰🇪 Kenya</option>
                      <option value="tanzania">🇹🇿 Tanzania</option>
                      <option value="uganda">🇺🇬 Uganda</option>
                      <option value="rwanda">🇷🇼 Rwanda</option>
                      <option value="ethiopia">🇪🇹 Ethiopia</option>
                      <option value="zanzibar">🏝️ Zanzibar</option>
                      <option value="multi">🌍 Multi-Country</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Tour Type</label>
                    <select name="tourType" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15 }}>
                      <option value="">Select type...</option>
                      <option value="wildlife-safari">🦁 Wildlife Safari</option>
                      <option value="gorilla-trekking">🦍 Gorilla Trekking</option>
                      <option value="mountain-trekking">🏔️ Mountain Trekking</option>
                      <option value="beach-island">🏖️ Beach & Island</option>
                      <option value="honeymoon">💑 Honeymoon</option>
                      <option value="family">👨‍👩‍👧 Family Safari</option>
                      <option value="luxury">✨ Luxury Safari</option>
                      <option value="budget">💰 Budget Safari</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Travel Date</label>
                    <input name="travelDate" type="month" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Duration</label>
                    <select name="duration" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15 }}>
                      <option value="">Select...</option>
                      <option value="1-4">1–4 days</option>
                      <option value="5-7">5–7 days</option>
                      <option value="8-10">8–10 days</option>
                      <option value="11-14">11–14 days</option>
                      <option value="15+">15+ days</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Group Size</label>
                    <select name="groupSize" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15 }}>
                      <option value="">Select...</option>
                      <option value="1">Solo (1 person)</option>
                      <option value="2">Couple (2 people)</option>
                      <option value="3-4">Small group (3–4)</option>
                      <option value="5-8">Group (5–8)</option>
                      <option value="9+">Large group (9+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Budget per Person (USD)</label>
                  <select name="budget" style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15 }}>
                    <option value="">Select budget range...</option>
                    <option value="under-1500">Under $1,500 (Budget)</option>
                    <option value="1500-3000">$1,500 – $3,000 (Mid-range)</option>
                    <option value="3000-5000">$3,000 – $5,000 (Premium)</option>
                    <option value="5000+">$5,000+ (Luxury)</option>
                    <option value="flexible">Flexible / Not sure</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>Your Message / Special Requirements</label>
                  <textarea name="message" rows={5} placeholder="Tell us about your ideal safari — any specific animals you want to see, accommodation preferences, dietary requirements, mobility considerations, or anything else that will help us plan the perfect trip for you..."
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', fontSize: 15, resize: 'vertical', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" style={{ padding: '16px 40px', background: '#ffa500', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 17, alignSelf: 'flex-start' }}>
                  Send Enquiry →
                </button>
                <p style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
                  🔒 Your details are 100% secure. We respond within 2 hours during business hours.
                </p>
              </form>
            </div>

            {/* CONTACT INFO SIDEBAR */}
            <div style={{ position: 'sticky', top: 100 }}>
              {/* Direct contact */}
              <div style={{ background: 'var(--muted)', borderRadius: 20, padding: '28px', border: '1px solid var(--border)', marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--foreground)', marginBottom: 22, borderBottom: '2px solid #ffa500', paddingBottom: 10 }}>Contact Us Directly</h3>
                {[
                  { icon: '📞', label: 'Phone', value: '+254 700 000 000', href: 'tel:+254700000000', color: '#1a3a1a' },
                  { icon: '💬', label: 'WhatsApp', value: '+254 700 000 000', href: 'https://wa.me/254700000000', color: '#25d366' },
                  { icon: '✉️', label: 'Email', value: 'info@safaritrailsafrica.com', href: 'mailto:info@safaritrailsafrica.com', color: '#ffa500' },
                ].map(c => (
                  <a key={c.label} href={c.href} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px', borderRadius: 12, background: 'var(--background)', border: '1px solid var(--border)', marginBottom: 10, textDecoration: 'none' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>{c.value}</div>
                    </div>
                  </a>
                ))}

                <div style={{ marginTop: 20, padding: '16px', background: 'var(--background)', borderRadius: 12, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--foreground)', marginBottom: 8 }}>🕐 Office Hours (EAT)</div>
                  <div style={{ fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                    Monday – Friday: 8:00 AM – 6:00 PM<br />
                    Saturday: 9:00 AM – 2:00 PM<br />
                    <strong style={{ color: 'var(--foreground)' }}>On-trip support: 24/7</strong>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div style={{ background: 'var(--muted)', borderRadius: 20, padding: '24px', border: '1px solid var(--border)', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--foreground)', marginBottom: 14 }}>📍 Our Office</h3>
                <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                  Westlands Business Park<br />
                  Waiyaki Way, Westlands<br />
                  Nairobi, Kenya
                </p>
              </div>

              {/* Why us */}
              <div style={{ background: 'linear-gradient(135deg, #1a3a1a, #2d5a27)', borderRadius: 20, padding: '24px', color: 'white' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Why Book With Us?</h3>
                {['✅ Free itinerary customisation', '✅ Best price guarantee', '✅ Instant booking confirmation', '✅ Flexible cancellation policy', '✅ 24/7 on-trip emergency support', '✅ IATA certified & fully bonded'].map(item => (
                  <div key={item} style={{ fontSize: 13, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.15)', opacity: 0.9 }}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`@media(max-width:860px){[style*="grid-template-columns: 1fr 420px"]{grid-template-columns:1fr !important}[style*="position: sticky; top: 100px"]{position:static !important}[style*="grid-template-columns: 1fr 1fr 1fr"],[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr !important}}`}</style>
      </main>
    </>
  )
}
