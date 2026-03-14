import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const T: Record<string, any> = {
  en: {
    tagline: 'Prayer times, Quran, Qibla and daily Islamic guidance — free forever for 1.8 billion Muslims.',
    cols: {
      'Sacred Tools': [
        { label: 'Prayer Times',     href: '/prayer-times' },
        { label: 'Qibla Finder',     href: '/qibla' },
        { label: 'Quran',            href: '/quran' },
        { label: 'Zakat Calculator', href: '/zakat' },
        { label: 'Tasbih Counter',   href: '/tasbih' },
        { label: 'Hajj Guide',       href: '/hajj' },
      ],
      'Knowledge': [
        { label: 'Islamic Blog',       href: '/blog' },
        { label: 'Ramadan 2026',       href: '/ramadan' },
        { label: 'Scholar AI',         href: '/scholar' },
        { label: 'Daily Duas',         href: '/duas' },
        { label: 'Mood Guide',         href: '/mood' },
        { label: 'How to Pray',        href: '/blog/how-to-pray-salah-beginners' },
      ],
      'Company': [
        { label: 'About Us',           href: '/about' },
        { label: 'Islamic Store',      href: '/store' },
        { label: 'Privacy Policy',     href: '/privacy' },
        { label: 'Terms of Service',   href: '/terms' },
        { label: 'Sitemap',            href: '/sitemap.xml' },
      ],
    },
    copy: '© 2026 Al Ummah AI · For the Global Ummah',
    privacy: 'Privacy', terms: 'Terms', about: 'About',
  },
  ar: {
    tagline: 'أوقات الصلاة والقرآن والقبلة والإرشاد الإسلامي اليومي — مجاني للأبد لـ 1.8 مليار مسلم.',
    cols: {
      'الأدوات المقدسة': [
        { label: 'أوقات الصلاة',     href: '/prayer-times' },
        { label: 'اتجاه القبلة',     href: '/qibla' },
        { label: 'القرآن الكريم',    href: '/quran' },
        { label: 'حاسبة الزكاة',    href: '/zakat' },
        { label: 'السبحة الإلكترونية', href: '/tasbih' },
        { label: 'دليل الحج',       href: '/hajj' },
      ],
      'المعرفة': [
        { label: 'المدونة الإسلامية', href: '/blog' },
        { label: 'رمضان 2026',       href: '/ramadan' },
        { label: 'عالم الذكاء',     href: '/scholar' },
        { label: 'الأدعية اليومية', href: '/duas' },
        { label: 'دليل المشاعر',     href: '/mood' },
        { label: 'كيفية الصلاة',    href: '/blog/how-to-pray-salah-beginners' },
      ],
      'الشركة': [
        { label: 'من نحن',          href: '/about' },
        { label: 'المتجر الإسلامي', href: '/store' },
        { label: 'سياسة الخصوصية', href: '/privacy' },
        { label: 'شروط الخدمة',    href: '/terms' },
        { label: 'خريطة الموقع',   href: '/sitemap.xml' },
      ],
    },
    copy: '© 2026 Al Ummah AI · للأمة الإسلامية العالمية',
    privacy: 'الخصوصية', terms: 'الشروط', about: 'من نحن',
  },
  fr: {
    tagline: 'Horaires de prière, Coran, Qibla et guidance islamique quotidienne — gratuit pour toujours pour 1,8 milliard de musulmans.',
    cols: {
      'Outils Sacrés': [
        { label: 'Heures de Prière',    href: '/prayer-times' },
        { label: 'Direction Qibla',     href: '/qibla' },
        { label: 'Coran',              href: '/quran' },
        { label: 'Calculateur Zakat',   href: '/zakat' },
        { label: 'Tasbih en Ligne',     href: '/tasbih' },
        { label: 'Guide Hajj',          href: '/hajj' },
      ],
      'Connaissance': [
        { label: 'Blog Islamique',      href: '/blog' },
        { label: 'Ramadan 2026',        href: '/ramadan' },
        { label: 'Scholar AI',          href: '/scholar' },
        { label: 'Douaas Quotidiennes', href: '/duas' },
        { label: 'Guide Émotionnel',   href: '/mood' },
        { label: 'Comment Prier',       href: '/blog/how-to-pray-salah-beginners' },
      ],
      'Entreprise': [
        { label: 'À Propos',            href: '/about' },
        { label: 'Boutique Islamique',  href: '/store' },
        { label: 'Politique de Conf.', href: '/privacy' },
        { label: 'Conditions',         href: '/terms' },
        { label: 'Plan du Site',        href: '/sitemap.xml' },
      ],
    },
    copy: '© 2026 Al Ummah AI · Pour la Oumma Mondiale',
    privacy: 'Confidentialité', terms: 'Conditions', about: 'À Propos',
  },
  es: {
    tagline: 'Horarios de oración, Corán, Qibla y guía islámica diaria — gratis para siempre para 1.800 millones de musulmanes.',
    cols: {
      'Herramientas Sagradas': [
        { label: 'Horarios de Oración', href: '/prayer-times' },
        { label: 'Buscador de Qibla',   href: '/qibla' },
        { label: 'Corán',               href: '/quran' },
        { label: 'Calculadora Zakat',   href: '/zakat' },
        { label: 'Tasbih Online',       href: '/tasbih' },
        { label: 'Guía Hajj',           href: '/hajj' },
      ],
      'Conocimiento': [
        { label: 'Blog Islámico',       href: '/blog' },
        { label: 'Ramadán 2026',        href: '/ramadan' },
        { label: 'Scholar AI',          href: '/scholar' },
        { label: 'Duas Diarias',        href: '/duas' },
        { label: 'Guía Emocional',     href: '/mood' },
        { label: 'Cómo Rezar',          href: '/blog/how-to-pray-salah-beginners' },
      ],
      'Empresa': [
        { label: 'Sobre Nosotros',      href: '/about' },
        { label: 'Tienda Islámica',     href: '/store' },
        { label: 'Política de Privacidad', href: '/privacy' },
        { label: 'Términos de Servicio',href: '/terms' },
        { label: 'Mapa del Sitio',      href: '/sitemap.xml' },
      ],
    },
    copy: '© 2026 Al Ummah AI · Para la Ummah Global',
    privacy: 'Privacidad', terms: 'Términos', about: 'Sobre Nosotros',
  },
};

export function Footer() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0, 2) || 'en') as string;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';
  const cols = L.cols;

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#071a2e', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 72, paddingBottom: 36 }}>
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
              {L.tagline}
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
          {Object.entries(cols).map(([group, links]: [string, any[]]) => (
            <div key={group}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.57rem', fontWeight: 800, color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 18 }}>
                {group}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {links.map(({ label, href }: { label: string; href: string }) => (
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
            {L.copy}
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[[L.privacy,'/privacy'],[L.terms,'/terms'],[L.about,'/about']].map(([label,href]) => (
              <Link key={String(label)} to={String(href)} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
