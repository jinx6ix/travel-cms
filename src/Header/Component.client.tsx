'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

const NAV_LINKS = [
  { label: 'Tours', href: '/tours' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const HeaderClient: React.FC<{ data: any }> = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled || !isHome
          ? 'var(--background)'
          : 'transparent',
        borderBottom: scrolled || !isHome ? '1px solid var(--border)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🌍</span>
          <div>
            <div style={{
              fontSize: 20, fontWeight: 800, lineHeight: 1,
              color: scrolled || !isHome ? 'var(--foreground)' : 'white',
              transition: 'color 0.3s',
            }}>
              Safari Trails
            </div>
            <div style={{
              fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', lineHeight: 1,
              color: scrolled || !isHome ? '#ffa500' : 'rgba(255,200,100,0.9)',
              fontWeight: 600, transition: 'color 0.3s',
            }}>
              Africa
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '8px 16px', borderRadius: 8, textDecoration: 'none',
                fontSize: 15, fontWeight: 500, transition: 'all 0.2s',
                color: pathname.startsWith(link.href)
                  ? '#ffa500'
                  : scrolled || !isHome
                    ? 'var(--foreground)'
                    : 'rgba(255,255,255,0.9)',
                background: pathname.startsWith(link.href) ? 'rgba(255,165,0,0.1)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ThemeSelector />
          <Link href="/contact" style={{
            padding: '9px 20px', background: '#ffa500', color: 'white',
            borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 14,
            whiteSpace: 'nowrap',
          }}>
            Book Now
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, color: scrolled || !isHome ? 'var(--foreground)' : 'white',
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            <div style={{ width: 24, height: 2, background: 'currentColor', marginBottom: 5, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ width: 24, height: 2, background: 'currentColor', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <div style={{ width: 24, height: 2, background: 'currentColor', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--background)', borderTop: '1px solid var(--border)',
          padding: '16px 24px 24px',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'block', padding: '12px 0', color: 'var(--foreground)',
                textDecoration: 'none', fontSize: 16, fontWeight: 500,
                borderBottom: '1px solid var(--border)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" style={{ display: 'block', marginTop: 16, padding: '12px 24px', background: '#ffa500', color: 'white', borderRadius: 50, textDecoration: 'none', fontWeight: 700, textAlign: 'center' }}>
            Book Now
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
