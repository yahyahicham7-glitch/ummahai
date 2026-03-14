import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GOLD = '#D4AF37';

const ALL_TOOLS = [
  { id:'prayer', emoji:'🕐', link:'/prayer-times', en:'Prayer Times', ar:'أوقات الصلاة', fr:'Heures de Prière', es:'Horarios de Oración' },
  { id:'qibla', emoji:'🧭', link:'/qibla', en:'Qibla Finder', ar:'اتجاه القبلة', fr:'Direction Qibla', es:'Dirección Qibla' },
  { id:'quran', emoji:'📖', link:'/quran', en:'Read Quran', ar:'القرآن الكريم', fr:'Lire le Coran', es:'Leer Corán' },
  { id:'zakat', emoji:'💰', link:'/zakat', en:'Zakat Calculator', ar:'حاسبة الزكاة', fr:'Calculateur Zakat', es:'Calculadora Zakat' },
  { id:'duas', emoji:'🤲', link:'/duas', en:'Daily Duas', ar:'الأدعية اليومية', fr:'Douaas Quotidiennes', es:'Duas Diarias' },
  { id:'mood', emoji:'💛', link:'/mood', en:'Mood Guide', ar:'دليل المشاعر', fr:'Guide Émotionnel', es:'Guía Emocional' },
  { id:'ramadan', emoji:'🌙', link:'/ramadan', en:'Ramadan Guide', ar:'دليل رمضان', fr:'Guide Ramadan', es:'Guía Ramadán' },
  { id:'tasbih', emoji:'📿', link:'/tasbih', en:'Tasbih Counter', ar:'السبحة الرقمية', fr:'Tasbih en Ligne', es:'Tasbih Digital' },
  { id:'hajj', emoji:'🕋', link:'/hajj', en:'Hajj Guide', ar:'دليل الحج', fr:'Guide Hajj', es:'Guía Hajj' },
  { id:'scholar', emoji:'✨', link:'/scholar', en:'Scholar AI', ar:'عالم الذكاء', fr:'Scholar AI', es:'Scholar AI' },
  { id:'blog', emoji:'📝', link:'/blog', en:'Islamic Blog', ar:'المدونة', fr:'Blog Islamique', es:'Blog Islámico' },
];

const TITLE: Record<string,string> = {
  en: 'Explore More Tools',
  ar: 'استكشف المزيد',
  fr: 'Découvrir Plus',
  es: 'Explorar Más',
};

interface Props {
  exclude?: string[];
  max?: number;
}

export function RelatedTools({ exclude = [], max = 5 }: Props) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as string;
  const tools = ALL_TOOLS.filter(t => !exclude.includes(t.id)).slice(0, max);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px 60px' }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', fontWeight: 900, color: 'rgba(212,175,55,0.4)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 16, textAlign: 'center' }}>
        {TITLE[lang] || TITLE.en}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {tools.map(t => (
          <Link key={t.id} to={t.link} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 12,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,175,55,0.12)',
            textDecoration: 'none', transition: 'all 0.2s',
            fontFamily: "'DM Sans',sans-serif", fontSize: '0.8rem', fontWeight: 600,
            color: 'rgba(255,255,255,0.6)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = GOLD; e.currentTarget.style.background = 'rgba(212,175,55,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
          >
            <span style={{ fontSize: '1.1rem' }}>{t.emoji}</span>
            {(t as any)[lang] || t.en}
          </Link>
        ))}
      </div>
    </div>
  );
}
