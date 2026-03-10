import React from 'react';
import { Link } from 'react-router-dom';

const COLS = {
  'Sacred Tools': [
    { label: 'Prayer Times',     href: '/' },
    { label: 'Qibla Finder',     href: '/qibla' },
    { label: 'Quran',            href: '/quran' },
    { label: 'Zakat Calculator', href: '/zakat' },
    { label: 'Hajj Guide',       href: '/hajj' },
  ],
  'Knowledge': [
    { label: 'Islamic Blog',     href: '/blog' },
    { label: 'Ramadan 2026',     href: '/ramadan' },
    { label: 'Scholar AI',       href: '/scholar' },
    { label: 'Daily Duas',       href: '/blog/morning-evening-adhkar' },
    { label: 'How to Pray',      href: '/blog/how-to-pray-salah-beginners' },
  ],
  'Company': [
    { label: 'About Us',         href: '/about' },
    { label: 'Islamic Store',    href: '/store' },
    { label: 'Privacy Policy',   href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Sitemap',          href: '/sitemap.xml' },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: '#071a2e', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 72, paddingBottom: 36 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,5vw,48px)' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#D4AF37', fontSize: '1.05rem' }}>☽</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '0.96rem', color: '#ffffff', letterSpacing: '-0.01em' }}>
                  Al Ummah <span style={{ color: '#D4AF37' }}>AI</span>
                </div>
                <div style={{ fontSize: '0.47rem', fontWeight: 700, color: 'rgba(255,255,255,0.23)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  Islamic Platform
                </div>
              </div>
            </Link>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.83rem', color: 'rgba(255,255,255,0.37)', lineHeight: 1.75, maxWidth: 210, marginBottom: 22 }}>
              Prayer times, Quran, Qibla and daily Islamic guidance — free forever for 1.8 billion Muslims.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: 'https://instagram.com', icon: '📸' },
                { href: 'https://twitter.com',   icon: '🐦' },
                { href: 'https://youtube.com',   icon: '▶️' },
                { href: 'mailto:contact@alummahai.com', icon: '✉️' },
              ].map(({ href, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', textDecoration: 'none', transition: 'border-color 0.18s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {Object.entries(COLS).map(([group, links]) => (
            <div key={group}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.57rem', fontWeight: 800, color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 18 }}>
                {group}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: '0.84rem', color: 'rgba(255,255,255,0.43)', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.43)')}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 500, color: 'rgba(255,255,255,0.2)' }}>
            © 2026 Al Ummah AI · For the Global Ummah
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy','/privacy'],['Terms','/terms'],['About','/about']].map(([l,h]) => (
              <Link key={l} to={h} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
