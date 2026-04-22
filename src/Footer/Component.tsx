import Link from 'next/link'
import React from 'react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

const FOOTER_TOURS = [
  { label: 'Maasai Mara Safari', href: '/tours/7-day-maasai-mara-great-migration-safari' },
  { label: 'Gorilla Trekking Rwanda', href: '/tours/8-day-gorilla-trekking-rwanda-golden-monkey' },
  { label: 'Kilimanjaro Climb', href: '/tours/9-day-kilimanjaro-climb-lemosho-route' },
  { label: 'Serengeti Safari', href: '/tours/6-day-serengeti-ngorongoro-crater-safari' },
  { label: 'Zanzibar Beach', href: '/tours/7-day-zanzibar-beach-spice-island-holiday' },
  { label: 'Uganda Gorilla Safari', href: '/tours/10-day-uganda-gorilla-chimpanzee-safari' },
]

const FOOTER_DESTINATIONS = [
  { label: 'Kenya', href: '/destinations/kenya' },
  { label: 'Tanzania', href: '/destinations/tanzania' },
  { label: 'Uganda', href: '/destinations/uganda' },
  { label: 'Rwanda', href: '/destinations/rwanda' },
  { label: 'Ethiopia', href: '/destinations/ethiopia' },
  { label: 'Zanzibar', href: '/destinations/zanzibar' },
]

const FOOTER_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap-index.xml' },
]

export async function Footer() {
  return (
    <footer style={{ background: 'var(--background)', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      {/* Main footer */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
        {/* Brand */}
        <div>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 28 }}>🌍</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--foreground)', lineHeight: 1 }}>Safari Trails</div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: '#ffa500', fontWeight: 700 }}>AFRICA</div>
            </div>
          </Link>
          <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 24 }}>
            East Africa's premier safari company. Extraordinary wildlife experiences, gorilla trekking, and beach holidays since 2008.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { icon: '🇰🇪', label: 'Nairobi HQ' },
              { icon: '📞', label: '+254 700 000 000' },
              { icon: '✉️', label: 'info@safaritrailsafrica.com' },
            ].map(c => (
              <div key={c.label} style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>{c.icon} {c.label}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(s => (
              <a key={s} href={`https://${s.toLowerCase()}.com/safaritrailsafrica`} target="_blank" rel="noopener" style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, textDecoration: 'none' }}>
                {s === 'Facebook' ? '📘' : s === 'Instagram' ? '📷' : s === 'Twitter' ? '🐦' : '▶️'}
              </a>
            ))}
          </div>
        </div>

        {/* Popular Tours */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#ffa500', marginBottom: 20 }}>Popular Tours</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FOOTER_TOURS.map(t => (
              <li key={t.href}>
                <Link href={t.href} style={{ fontSize: 14, color: 'var(--muted-foreground)', textDecoration: 'none' }}>→ {t.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#ffa500', marginBottom: 20 }}>Destinations</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FOOTER_DESTINATIONS.map(d => (
              <li key={d.href}>
                <Link href={d.href} style={{ fontSize: 14, color: 'var(--muted-foreground)', textDecoration: 'none' }}>→ {d.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#ffa500', marginBottom: 20 }}>Company</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FOOTER_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={{ fontSize: 14, color: 'var(--muted-foreground)', textDecoration: 'none' }}>→ {l.label}</Link>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#ffa500', marginBottom: 12 }}>Theme</h3>
            <ThemeSelector />
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '24px', display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        {['🏆 15+ Years Experience', '⭐ 4.9/5 Rated', '🛡️ IATA Certified', '🔒 Secure Booking', '♻️ Eco-Certified'].map(b => (
          <span key={b} style={{ fontSize: 13, color: 'var(--muted-foreground)', fontWeight: 500 }}>{b}</span>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
          © {new Date().getFullYear()} Safari Trails Africa. All rights reserved.
          Registered in Kenya · IATA Accredited · Member of KATA
        </p>
      </div>
    </footer>
  )
}
