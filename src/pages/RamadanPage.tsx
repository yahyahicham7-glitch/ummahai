import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Moon, Star, Clock, Heart, Sun, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAVY = '#0a2540';
const GOLD = '#D4AF37';

const T = {
  en: {
    badge: 'Holy Month · 2026',
    title: 'Ramadan 2026',
    sub: 'Ramadan 2026 begins around February 17. Prepare your spiritual journey with accurate prayer times, Suhoor & Iftar schedules, and our complete guide.',
    start: 'Start Date',   startV: '~Feb 17, 2026', startS: 'Moon sighting dependent',
    qadr: "Laylat al-Qadr", qadrV: '27th Night',   qadrS: '~Mar 14, 2026',
    duration: 'Duration',  durV: '29–30 Days',      durS: 'Full lunar month',
    eid: 'Eid al-Fitr',    eidV: '~Mar 18, 2026',  eidS: 'End of Ramadan',
    timesH: 'Get Your Local Suhoor & Iftar Times',
    timesSub: 'Enter your city to get accurate times for every day of Ramadan 2026.',
    timesCta: 'Get Prayer Times',
    guidesH: 'Ramadan Guides',
    guides: [
      { title: 'The Last 10 Nights of Ramadan', desc: 'Complete guide to Laylatul Qadr, Itikaf and maximizing the blessed nights.', slug: 'last-10-nights-ramadan' },
      { title: 'How to Make the Most of Ramadan', desc: 'Practical spiritual tips to transform this Ramadan into your best one yet.', slug: 'ramadan-tips' },
      { title: 'Zakat al-Fitr 2026', desc: 'Learn how much Zakat al-Fitr to pay, when and to whom in 2026.', slug: 'zakat-al-fitr-2026' },
      { title: 'Fasting Rules & Etiquette', desc: 'Everything you need to know about valid fasting in Islam.', slug: 'ramadan-fasting-rules' },
      { title: 'Taraweeh Prayer Guide', desc: 'How to pray Taraweeh, how many rakats, and best practices.', slug: 'taraweeh-prayer-guide' },
      { title: "Dua for Suhoor & Iftar", desc: 'Authentic supplications for breaking fast and before dawn meal.', slug: 'ramadan-duas' },
    ],
    tips: [
      { icon: Moon,     t: 'Set Intentions',    d: 'Renew your niyyah each night before Suhoor. A sincere intention multiplies every act of worship.' },
      { icon: BookOpen, t: 'Complete the Quran', d: 'Aim to finish the Quran in 30 days — one Juz per day. Use our Quran reader with translations.' },
      { icon: Sun,      t: 'Suhoor & Hydration', d: 'Eat a nourishing pre-dawn meal and drink plenty of water to sustain your fast.' },
      { icon: Star,     t: "Seek Laylat al-Qadr", d: "Intensify worship in the last 10 nights, especially on odd nights. It is better than 1,000 months." },
      { icon: Heart,    t: 'Give Generously',    d: 'Charity in Ramadan is multiplied. Give Zakat, Sadaqah and help those in need.' },
      { icon: Clock,    t: 'Pray Taraweeh',      d: 'Night prayers after Isha are a Sunnah of Ramadan. Even 2 rakats at home count.' },
    ],
    tipsH: 'Tips for a Blessed Ramadan',
    countdown: 'days until Ramadan 2026',
  },
  ar: {
    badge: 'الشهر الفضيل · 2026',
    title: 'رمضان 2026',
    sub: 'يبدأ رمضان 2026 حوالي 17 فبراير. استعد لرحلتك الروحية مع أوقات السحور والإفطار الدقيقة ودليلنا الشامل.',
    start: 'تاريخ البدء',   startV: '~17 فبراير 2026',    startS: 'يعتمد على رؤية الهلال',
    qadr: "ليلة القدر",     qadrV: 'الليلة السابعة والعشرون', qadrS: '~14 مارس 2026',
    duration: 'المدة',      durV: '29-30 يومًا',           durS: 'شهر قمري كامل',
    eid: 'عيد الفطر',       eidV: '~18 مارس 2026',         eidS: 'نهاية رمضان',
    timesH: 'أوقات السحور والإفطار لمدينتك',
    timesSub: 'أدخل مدينتك للحصول على أوقات دقيقة لكل يوم من رمضان 2026.',
    timesCta: 'أوقات الصلاة',
    guidesH: 'أدلة رمضان',
    guides: [
      { title: 'العشر الأواخر من رمضان', desc: 'الدليل الكامل لليلة القدر والاعتكاف والاستفادة القصوى من الليالي المباركة.', slug: 'last-10-nights-ramadan' },
      { title: 'كيف تستثمر رمضان', desc: 'نصائح روحية عملية لتحويل هذا الرمضان إلى الأفضل في حياتك.', slug: 'ramadan-tips' },
      { title: 'زكاة الفطر 2026', desc: 'تعرف على مقدار زكاة الفطر ووقتها ومن يستحقها في 2026.', slug: 'zakat-al-fitr-2026' },
      { title: 'أحكام الصيام وآدابه', desc: 'كل ما تحتاج معرفته حول صحة الصيام في الإسلام.', slug: 'ramadan-fasting-rules' },
      { title: 'دليل صلاة التراويح', desc: 'كيفية أداء التراويح وعدد الركعات وأفضل الممارسات.', slug: 'taraweeh-prayer-guide' },
      { title: 'دعاء السحور والإفطار', desc: 'الأدعية الأصيلة عند الإفطار وقبل وجبة السحور.', slug: 'ramadan-duas' },
    ],
    tips: [
      { icon: Moon,     t: 'جدّد النية',          d: 'جدد نيتك كل ليلة قبل السحور. النية الصادقة تضاعف كل عبادة.' },
      { icon: BookOpen, t: 'ختم القرآن',           d: 'اهدف لختم القرآن في 30 يوماً — جزء يومياً. استخدم قارئ القرآن مع الترجمة.' },
      { icon: Sun,      t: 'السحور والترطيب',      d: 'تناول وجبة سحور مغذية واشرب الماء بكثرة لتتحمل الصيام.' },
      { icon: Star,     t: 'اطلب ليلة القدر',      d: 'كثّف العبادة في العشر الأواخر، خاصة الليالي الفردية. هي خير من ألف شهر.' },
      { icon: Heart,    t: 'تصدق بسخاء',           d: 'الصدقة في رمضان تضاعف. أدّ الزكاة والصدقة وأعن المحتاجين.' },
      { icon: Clock,    t: 'صل التراويح',           d: 'صلاة الليل بعد العشاء سنة رمضان. حتى ركعتان في المنزل لهما أجر.' },
    ],
    tipsH: 'نصائح لرمضان مبارك',
    countdown: 'يوم حتى رمضان 2026',
  },
  fr: {
    badge: 'Mois Sacré · 2026',
    title: 'Ramadan 2026',
    sub: 'Le Ramadan 2026 commence vers le 17 février. Préparez votre voyage spirituel avec des horaires précis pour le Suhoor, l\'Iftar et notre guide complet.',
    start: 'Date de début', startV: '~17 fév. 2026',    startS: 'Dépend du croissant lunaire',
    qadr: 'Laylat al-Qadr', qadrV: '27e nuit',           qadrS: '~14 mars 2026',
    duration: 'Durée',      durV: '29–30 jours',         durS: 'Mois lunaire complet',
    eid: 'Aïd al-Fitr',     eidV: '~18 mars 2026',      eidS: 'Fin du Ramadan',
    timesH: 'Vos horaires Suhoor & Iftar locaux',
    timesSub: 'Entrez votre ville pour obtenir des horaires précis pour chaque jour du Ramadan 2026.',
    timesCta: 'Horaires de Prière',
    guidesH: 'Guides du Ramadan',
    guides: [
      { title: 'Les 10 Dernières Nuits du Ramadan', desc: 'Guide complet pour Laylatul Qadr, Itikaf et maximiser les nuits bénies.', slug: 'last-10-nights-ramadan' },
      { title: 'Profiter au Maximum du Ramadan', desc: 'Conseils spirituels pratiques pour faire de ce Ramadan le meilleur.', slug: 'ramadan-tips' },
      { title: 'Zakat al-Fitr 2026', desc: 'Apprenez combien payer, quand et à qui en 2026.', slug: 'zakat-al-fitr-2026' },
      { title: 'Règles du Jeûne', desc: 'Tout ce que vous devez savoir sur le jeûne valide en Islam.', slug: 'ramadan-fasting-rules' },
      { title: 'Guide de la Prière Taraweeh', desc: 'Comment prier Taraweeh, combien de rakats et meilleures pratiques.', slug: 'taraweeh-prayer-guide' },
      { title: 'Dou\'a pour Suhoor & Iftar', desc: 'Supplications authentiques pour rompre le jeûne et avant le repas du matin.', slug: 'ramadan-duas' },
    ],
    tips: [
      { icon: Moon,     t: 'Renouveler l\'Intention', d: 'Renouvelez votre niyyah chaque nuit avant le Suhoor. Une intention sincère multiplie chaque acte d\'adoration.' },
      { icon: BookOpen, t: 'Compléter le Coran',      d: 'Visez à finir le Coran en 30 jours — un Juz par jour. Utilisez notre lecteur Coran.' },
      { icon: Sun,      t: 'Suhoor & Hydratation',   d: 'Prenez un repas nourrissant avant l\'aube et buvez beaucoup d\'eau.' },
      { icon: Star,     t: 'Chercher Laylat al-Qadr', d: 'Intensifiez l\'adoration lors des 10 dernières nuits, surtout les nuits impaires.' },
      { icon: Heart,    t: 'Donner Généreusement',   d: 'La charité en Ramadan est multipliée. Donnez la Zakat et aidez ceux dans le besoin.' },
      { icon: Clock,    t: 'Prier Taraweeh',         d: 'La prière nocturne après Isha est une Sunna du Ramadan. Même 2 rakats comptent.' },
    ],
    tipsH: 'Conseils pour un Ramadan Béni',
    countdown: 'jours avant le Ramadan 2026',
  },
  es: {
    badge: 'Mes Sagrado · 2026',
    title: 'Ramadán 2026',
    sub: 'El Ramadán 2026 comienza alrededor del 17 de febrero. Prepara tu viaje espiritual con horarios precisos de Suhoor, Iftar y nuestra guía completa.',
    start: 'Fecha de inicio', startV: '~17 feb. 2026',   startS: 'Depende del avistamiento lunar',
    qadr: 'Laylat al-Qadr',   qadrV: 'Noche 27',          qadrS: '~14 mar. 2026',
    duration: 'Duración',     durV: '29–30 días',          durS: 'Mes lunar completo',
    eid: 'Eid al-Fitr',       eidV: '~18 mar. 2026',      eidS: 'Fin del Ramadán',
    timesH: 'Horarios Suhoor & Iftar para tu ciudad',
    timesSub: 'Ingresa tu ciudad para obtener horarios precisos para cada día del Ramadán 2026.',
    timesCta: 'Horarios de Oración',
    guidesH: 'Guías del Ramadán',
    guides: [
      { title: 'Las Últimas 10 Noches del Ramadán', desc: 'Guía completa para Laylatul Qadr, Itikaf y aprovechar al máximo las noches benditas.', slug: 'last-10-nights-ramadan' },
      { title: 'Cómo Aprovechar el Ramadán', desc: 'Consejos espirituales prácticos para convertir este Ramadán en el mejor.', slug: 'ramadan-tips' },
      { title: 'Zakat al-Fitr 2026', desc: 'Aprende cuánto pagar, cuándo y a quién en 2026.', slug: 'zakat-al-fitr-2026' },
      { title: 'Reglas del Ayuno', desc: 'Todo lo que necesitas saber sobre el ayuno válido en el Islam.', slug: 'ramadan-fasting-rules' },
      { title: 'Guía de la Oración Taraweeh', desc: 'Cómo rezar Taraweeh, cuántas rakats y mejores prácticas.', slug: 'taraweeh-prayer-guide' },
      { title: 'Dua para Suhoor e Iftar', desc: 'Súplicas auténticas para romper el ayuno y antes del Suhoor.', slug: 'ramadan-duas' },
    ],
    tips: [
      { icon: Moon,     t: 'Renovar la Intención',   d: 'Renueva tu niyyah cada noche antes del Suhoor. Una intención sincera multiplica cada acto de adoración.' },
      { icon: BookOpen, t: 'Completar el Corán',     d: 'Intenta terminar el Corán en 30 días — un Yuz por día. Usa nuestro lector de Corán.' },
      { icon: Sun,      t: 'Suhoor e Hidratación',   d: 'Toma una comida nutritiva antes del amanecer y bebe mucha agua.' },
      { icon: Star,     t: 'Buscar Laylat al-Qadr',  d: 'Intensifica la adoración en las últimas 10 noches, especialmente las noches impares.' },
      { icon: Heart,    t: 'Dar Generosamente',      d: 'La caridad en Ramadán se multiplica. Da Zakat, Sadaqah y ayuda a los necesitados.' },
      { icon: Clock,    t: 'Rezar Taraweeh',         d: 'La oración nocturna después de Isha es Sunna del Ramadán. Incluso 2 rakats en casa cuentan.' },
    ],
    tipsH: 'Consejos para un Ramadán Bendito',
    countdown: 'días hasta el Ramadán 2026',
  },
};

export function RamadanPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0, 2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';
  const [days, setDays] = useState(0);

  useEffect(() => {
    const d = Math.ceil((new Date('2026-02-17').getTime() - Date.now()) / 86_400_000);
    setDays(d > 0 ? d : 0);
  }, []);

  const schema = {
    '@context': 'https://schema.org', '@type': 'Event', name: 'Ramadan 2026',
    startDate: '2026-02-17', endDate: '2026-03-18',
    description: 'Ramadan 2026 guide with prayer times, Suhoor and Iftar schedules.',
    organizer: { '@type': 'Organization', name: 'Al Ummah AI', url: 'https://www.alummahai.com' },
  };

  const STATS = [
    { Icon: Moon,  title: L.start,    value: L.startV, sub: L.startS },
    { Icon: Star,  title: L.qadr,     value: L.qadrV,  sub: L.qadrS  },
    { Icon: Clock, title: L.duration, value: L.durV,   sub: L.durS   },
    { Icon: Heart, title: L.eid,      value: L.eidV,   sub: L.eidS   },
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight: '100vh', color: '#ffffff' }}>
      <SEO title={`${L.title} — Suhoor, Iftar & Prayer Times`} description={L.sub} keywords="ramadan 2026, suhoor iftar times, laylat al qadr, ramadan guide" canonical="https://www.alummahai.com/ramadan" schema={schema} lang={lang} />

      {/* ── Hero with crescent moon visual ── */}
      <div style={{
        background: 'linear-gradient(160deg,#071a2e 0%,#0a2540 50%,#0d2e4d 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.12)',
        padding: 'clamp(80px,12vw,130px) 20px clamp(50px,7vw,80px)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Stars background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.07) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,55,0.06),transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Countdown badge */}
          {days > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 99, padding: '6px 16px', marginBottom: 20 }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.2rem', color: GOLD }}>{days}</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', fontWeight: 700, color: 'rgba(212,175,55,0.7)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{L.countdown}</span>
            </motion.div>
          )}
          <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 900, color: 'rgba(212,175,55,0.7)', textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: 18, display: 'block' }}>
            🌙 {L.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.5rem,8vw,6rem)', color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1 }}>
            {L.title}
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(0.88rem,2vw,1.05rem)', color: 'rgba(255,255,255,0.42)', maxWidth: 520, margin: '0 auto', lineHeight: 1.85 }}>
            {L.sub}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,5vw,60px) 20px' }}>

        {/* ── Stats grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 48 }}>
          {STATS.map(({ Icon, title, value, sub }) => (
            <motion.div key={title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: 16, padding: '22px 18px', textAlign: 'center', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.14)')}>
              <Icon size={24} style={{ color: GOLD, margin: '0 auto 12px' }} />
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 900, color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 6 }}>{title}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.15rem', color: '#ffffff', marginBottom: 4 }}>{value}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Suhoor / Iftar CTA ── */}
        <div style={{ background: 'linear-gradient(120deg,rgba(212,175,55,0.1),rgba(212,175,55,0.05))', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 20, padding: 'clamp(24px,4vw,40px) 24px', textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2rem)', color: '#ffffff', marginBottom: 10 }}>{L.timesH}</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.4)', maxWidth: 400, margin: '0 auto 22px', lineHeight: 1.8, fontSize: '0.88rem' }}>{L.timesSub}</p>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: GOLD, color: NAVY, padding: '12px 24px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.72rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 18px rgba(212,175,55,0.3)', transition: 'transform 0.18s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            🌙 {L.timesCta}
          </Link>
        </div>

        {/* ── Tips ── */}
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2rem)', color: '#ffffff', marginBottom: 20 }}>{L.tipsH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 48 }}>
          {L.tips.map(({ icon: Icon, t, d }) => (
            <div key={t} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 18px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.28)'; e.currentTarget.style.background = 'rgba(212,175,55,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
              <Icon size={18} style={{ color: GOLD, marginBottom: 10 }} />
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.88rem', color: '#ffffff', marginBottom: 6 }}>{t}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.76rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.72 }}>{d}</p>
            </div>
          ))}
        </div>

        {/* ── Guides ── */}
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2rem)', color: '#ffffff', marginBottom: 20 }}>{L.guidesH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
          {L.guides.map(item => (
            <Link key={item.slug} to={`/blog/${item.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 18px', height: '100%', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.background = 'rgba(212,175,55,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '0.95rem', color: '#ffffff', marginBottom: 8, lineHeight: 1.35 }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 14 }}>{item.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', fontWeight: 800, color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Read <ChevronRight size={10} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
