import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Safari Trails Africa | East Africa\'s Premier Safari Company',
  description: 'Safari Trails Africa — East Africa\'s most trusted safari company since 2008. IATA certified, 4.9★ rated, 15+ years of expertise across Kenya, Tanzania, Uganda, Rwanda, Ethiopia & Zanzibar.',
  robots: 'index,follow',
}

const TEAM = [
  { name: 'James Kamau', role: 'Founder & Lead Safari Guide', country: '🇰🇪 Kenya', experience: '20 years', emoji: '👨🏿' },
  { name: 'Amina Hassan', role: 'Operations Director', country: '🇰🇪 Kenya', experience: '15 years', emoji: '👩🏿' },
  { name: 'David Ochieng', role: 'Tanzania Safari Specialist', country: '🇹🇿 Tanzania', experience: '12 years', emoji: '👨🏿' },
  { name: 'Grace Uwase', role: 'Rwanda & Gorilla Expert', country: '🇷🇼 Rwanda', experience: '10 years', emoji: '👩🏿' },
]

const AWARDS = [
  { icon: '🏆', title: 'TripAdvisor Travelers\' Choice', year: '2024' },
  { icon: '⭐', title: 'Eco-Tourism Kenya Certified', year: '2023' },
  { icon: '🛡️', title: 'IATA Accredited Agency', year: 'Since 2012' },
  { icon: '🌿', title: 'Responsible Tourism Award', year: '2023' },
]

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0d2b0d, #1e4a1a)', padding: '80px 24px 64px', textAlign: 'center', color: 'white' }}>
        <nav style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Home</Link>
          <span>›</span><span style={{ color: 'rgba(255,255,255,0.9)' }}>About Us</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, marginBottom: 16 }}>About <span style={{ color: '#ffa500' }}>Safari Trails Africa</span></h1>
        <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
          East Africa's most trusted safari company since 2008. Built on passion, local knowledge, and an unwavering commitment to extraordinary experiences.
        </p>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--muted)', padding: '48px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { num: '15+', label: 'Years of Expertise' },
            { num: '500+', label: 'Happy Clients' },
            { num: '22', label: 'Curated Tours' },
            { num: '6', label: 'Countries Covered' },
            { num: '4.9★', label: 'Average Rating' },
            { num: '100%', label: 'Satisfaction Guarantee' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#ffa500', lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>

        {/* OUR STORY */}
        <section style={{ marginBottom: 72, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--foreground)', marginBottom: 20, borderBottom: '3px solid #ffa500', display: 'inline-block', paddingBottom: 10 }}>Our Story</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted-foreground)', marginBottom: 16 }}>
              Safari Trails Africa was founded in 2008 by James Kamau, a third-generation Kenyan guide with a deep-rooted passion for East Africa's wildlife and cultures. What started as a small Nairobi-based operation has grown into one of the region's most respected safari companies, connecting over 500 travellers with life-changing East Africa experiences each year.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted-foreground)', marginBottom: 16 }}>
              Our philosophy is simple: every safari should be as unique as the person taking it. We refuse to offer one-size-fits-all packages. Every itinerary is crafted around your interests, pace, and budget — whether you're a first-time visitor wanting to check off the Big Five, or a seasoned traveller seeking the most remote wilderness experiences in Africa.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted-foreground)' }}>
              We are proud to be IATA certified, eco-tourism certified, and to give back 2% of every booking to community conservation projects across East Africa.
            </p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #1a3a1a, #2d5a27)', borderRadius: 24, padding: '48px', textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: 80, marginBottom: 16 }}>🌍</div>
            <blockquote style={{ fontSize: 18, fontStyle: 'italic', lineHeight: 1.7, opacity: 0.9, marginBottom: 20 }}>
              "We don't just take you to Africa. We take you into Africa — its sounds, its silences, its wilderness, and its people."
            </blockquote>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#ffa500' }}>— James Kamau, Founder</div>
          </div>
        </section>

        {/* TEAM */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--foreground)', marginBottom: 36, borderBottom: '3px solid #ffa500', display: 'inline-block', paddingBottom: 10 }}>Our Expert Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {TEAM.map(member => (
              <div key={member.name} style={{ background: 'var(--muted)', borderRadius: 20, padding: '28px', textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 64, marginBottom: 14 }}>{member.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--foreground)', marginBottom: 4 }}>{member.name}</h3>
                <div style={{ fontSize: 14, color: '#ffa500', fontWeight: 600, marginBottom: 6 }}>{member.role}</div>
                <div style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>{member.country} · {member.experience} experience</div>
              </div>
            ))}
          </div>
        </section>

        {/* AWARDS */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--foreground)', marginBottom: 32, borderBottom: '3px solid #ffa500', display: 'inline-block', paddingBottom: 10 }}>Certifications & Awards</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {AWARDS.map(award => (
              <div key={award.title} style={{ background: 'var(--muted)', borderRadius: 16, padding: '24px', textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>{award.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--foreground)', marginBottom: 4 }}>{award.title}</div>
                <div style={{ fontSize: 13, color: '#ffa500', fontWeight: 600 }}>{award.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1a3a1a, #2d5a27)', borderRadius: 24, padding: '56px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 16 }}>Ready to Explore East Africa?</h2>
          <p style={{ fontSize: 17, opacity: 0.85, marginBottom: 36, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px' }}>
            Let our team of local experts design your perfect safari. Free consultation, no obligation.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tours" style={{ background: '#ffa500', color: 'white', padding: '16px 44px', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 17 }}>Browse Our Tours</Link>
            <Link href="/contact" style={{ border: '2px solid rgba(255,255,255,0.6)', color: 'white', padding: '16px 44px', borderRadius: 50, textDecoration: 'none', fontWeight: 600, fontSize: 17 }}>Get Free Quote</Link>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr !important}}`}</style>
    </main>
  )
}
