import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Moon, Star, Clock, Heart, Sun, BookOpen, ChevronRight, Flame, Droplets, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAVY = '#0a2540';
const GOLD = '#D4AF37';

/* ── Real blog slugs that exist ── */
const GUIDE_SLUGS = [
  'last-10-nights-ramadan',
  'zakat-al-fitr-2026',
  'morning-evening-adhkar',
  'calculate-zakat-2026',
  'ramadan-2026-prayer-timetable',
  'how-to-pray-salah-beginners',
];

const T: Record<string, any> = {
  en: {
    badge: 'Holy Month · In Progress 🌙',
    title: 'Ramadan 2026',
    sub: 'Ramadan 2026 is here — Feb 17 to Mar 18. Make the most of every day with accurate prayer times, Suhoor & Iftar schedules, and spiritual guides.',
    phase: "We're in Ramadan now. Every prayer counts.",
    start: 'Start Date',    startV: 'Feb 17, 2026',    startS: 'Confirmed',
    qadr:  "Laylat al-Qadr",qadrV:  '27th Night',       qadrS:  '~Mar 14, 2026',
    duration:'Duration',    durV:   '29–30 Days',        durS:   'Full lunar month',
    eid:   'Eid al-Fitr',   eidV:   '~Mar 18, 2026',    eidS:   'End of Ramadan',
    timesH:   'Get Suhoor & Iftar Times',
    timesSub: 'Enter your city for accurate times every day of Ramadan.',
    timesCta: 'Get Prayer Times',
    tipsH: 'Make the Most of Ramadan',
    guidesH: 'Essential Guides',
    guides: [
      { title: 'The Last 10 Nights of Ramadan', desc: 'Laylatul Qadr, Itikaf and how to maximize the blessed nights.', slug: 'last-10-nights-ramadan' },
      { title: 'Zakat al-Fitr 2026', desc: 'How much to pay, when, and to whom.', slug: 'zakat-al-fitr-2026' },
      { title: 'Morning & Evening Adhkar', desc: 'Essential daily supplications every Muslim should know.', slug: 'morning-evening-adhkar' },
      { title: 'Ramadan Prayer Timetable 2026', desc: 'Full monthly prayer schedule — download or bookmark.', slug: 'ramadan-2026-prayer-timetable' },
      { title: 'Calculate Your Zakat 2026', desc: 'Step-by-step Zakat calculation for this year.', slug: 'calculate-zakat-2026' },
      { title: 'How to Pray Salah', desc: 'Complete beginner guide to all 5 daily prayers.', slug: 'how-to-pray-salah-beginners' },
    ],
    tips: [
      { Icon: Moon,      t: 'Renew Your Niyyah',     d: 'Set a sincere intention every night before Suhoor. A pure niyyah multiplies every act of worship.' },
      { Icon: BookOpen,  t: 'Complete the Quran',    d: 'One Juz per day. Use our full Quran reader with translations in your language.' },
      { Icon: Sun,       t: 'Suhoor & Hydration',    d: 'A nourishing pre-dawn meal is Sunnah. Drink plenty of water to sustain your fast.' },
      { Icon: Star,      t: 'Seek Laylat al-Qadr',   d: 'Intensify worship on the last 10 odd nights — better than 1,000 months of worship.' },
      { Icon: HandHeart, t: 'Give Generously',        d: 'Charity in Ramadan is multiplied. Pay your Zakat and help those in need.' },
      { Icon: Clock,     t: 'Pray Taraweeh',         d: 'Night prayers after Isha are a Sunnah. Even 2 rakats at home earn great reward.' },
    ],
    daysLeft: 'days left in Ramadan',
    inProgress: 'In Progress',
    eidCountdown: 'days until Eid al-Fitr',
  },
  ar: {
    badge: 'شهر رمضان المبارك · جارٍ الآن 🌙',
    title: 'رمضان 2026',
    sub: 'رمضان 2026 بيننا الآن — من 17 فبراير إلى 18 مارس. استثمر كل يوم بأوقات الصلاة وأدلة روحية شاملة.',
    phase: 'نحن في رمضان الآن. كل صلاة تُحتسب.',
    start: 'تاريخ البدء',   startV: '17 فبراير 2026',  startS: 'مؤكد',
    qadr:  'ليلة القدر',    qadrV:  'الليلة السابعة والعشرون', qadrS: '~14 مارس 2026',
    duration: 'المدة',      durV:   '29-30 يومًا',       durS:   'شهر قمري كامل',
    eid:   'عيد الفطر',     eidV:   '~18 مارس 2026',    eidS:   'نهاية رمضان',
    timesH:   'أوقات السحور والإفطار',
    timesSub: 'أدخل مدينتك للحصول على أوقات دقيقة كل يوم من رمضان.',
    timesCta: 'أوقات الصلاة',
    tipsH: 'استثمر رمضان',
    guidesH: 'أدلة أساسية',
    guides: [
      { title: 'العشر الأواخر من رمضان', desc: 'ليلة القدر والاعتكاف وكيف تستثمر الليالي المباركة.', slug: 'last-10-nights-ramadan' },
      { title: 'زكاة الفطر 2026', desc: 'مقدارها ووقت إخراجها ومن يستحقها.', slug: 'zakat-al-fitr-2026' },
      { title: 'أذكار الصباح والمساء', desc: 'الأذكار الأساسية التي ينبغي لكل مسلم معرفتها.', slug: 'morning-evening-adhkar' },
      { title: 'أوقات صلوات رمضان 2026', desc: 'الجدول الكامل لأوقات الصلاة طوال الشهر.', slug: 'ramadan-2026-prayer-timetable' },
      { title: 'احسب زكاتك 2026', desc: 'خطوات عملية لحساب الزكاة لهذا العام.', slug: 'calculate-zakat-2026' },
      { title: 'كيفية أداء الصلاة', desc: 'دليل شامل للصلوات الخمس للمبتدئين.', slug: 'how-to-pray-salah-beginners' },
    ],
    tips: [
      { Icon: Moon,      t: 'جدّد نيتك',          d: 'ضع نية صادقة كل ليلة قبل السحور. النية الصادقة تضاعف كل عبادة.' },
      { Icon: BookOpen,  t: 'اختم القرآن',         d: 'جزء واحد يوميًا. استخدم قارئ القرآن الكامل مع الترجمة بلغتك.' },
      { Icon: Sun,       t: 'السحور والترطيب',     d: 'السحور سنة نبوية. اشرب الماء بكثرة لتتحمل يوم الصيام.' },
      { Icon: Star,      t: 'اطلب ليلة القدر',    d: 'كثّف العبادة في الليالي الفردية من العشر الأواخر — خير من ألف شهر.' },
      { Icon: HandHeart, t: 'تصدق بسخاء',          d: 'الصدقة في رمضان مضاعفة. أدّ زكاتك وأعن المحتاجين.' },
      { Icon: Clock,     t: 'صل التراويح',         d: 'صلاة الليل بعد العشاء سنة. حتى ركعتان في البيت لهما أجر عظيم.' },
    ],
    daysLeft: 'أيام متبقية من رمضان',
    inProgress: 'جارٍ الآن',
    eidCountdown: 'يوم حتى عيد الفطر',
  },
  fr: {
    badge: 'Mois Sacré · En Cours 🌙',
    title: 'Ramadan 2026',
    sub: 'Le Ramadan 2026 est là — du 17 fév au 18 mars. Profitez de chaque jour avec des horaires précis et des guides spirituels.',
    phase: 'Nous sommes en Ramadan. Chaque prière compte.',
    start: 'Date de début',  startV: '17 fév. 2026',     startS: 'Confirmé',
    qadr:  'Laylat al-Qadr', qadrV:  '27e nuit',          qadrS:  '~14 mars 2026',
    duration:'Durée',        durV:   '29–30 jours',        durS:   'Mois lunaire complet',
    eid:   'Aïd al-Fitr',    eidV:   '~18 mars 2026',     eidS:   'Fin du Ramadan',
    timesH:   'Horaires Suhoor & Iftar',
    timesSub: 'Entrez votre ville pour des horaires précis chaque jour du Ramadan.',
    timesCta: 'Horaires de Prière',
    tipsH: 'Profiter au Maximum du Ramadan',
    guidesH: 'Guides Essentiels',
    guides: [
      { title: 'Les 10 Dernières Nuits', desc: 'Laylatul Qadr, Itikaf et comment maximiser les nuits bénies.', slug: 'last-10-nights-ramadan' },
      { title: 'Zakat al-Fitr 2026', desc: 'Combien payer, quand et à qui.', slug: 'zakat-al-fitr-2026' },
      { title: 'Adhkar du Matin & du Soir', desc: 'Les supplications essentielles que tout musulman devrait connaître.', slug: 'morning-evening-adhkar' },
      { title: 'Calendrier de Prière Ramadan', desc: 'Calendrier complet des prières pour tout le mois.', slug: 'ramadan-2026-prayer-timetable' },
      { title: 'Calculez Votre Zakat 2026', desc: 'Calcul étape par étape de votre Zakat cette année.', slug: 'calculate-zakat-2026' },
      { title: 'Comment Faire la Salah', desc: 'Guide complet pour débutants sur les 5 prières quotidiennes.', slug: 'how-to-pray-salah-beginners' },
    ],
    tips: [
      { Icon: Moon,      t: 'Renouvelez l\'Intention', d: 'Une intention sincère chaque nuit avant le Suhoor multiplie chaque acte d\'adoration.' },
      { Icon: BookOpen,  t: 'Terminez le Coran',       d: 'Un Juz par jour. Utilisez notre lecteur Coran complet avec traduction dans votre langue.' },
      { Icon: Sun,       t: 'Suhoor & Hydratation',   d: 'Le repas du Suhoor est une Sunna. Buvez beaucoup d\'eau pour tenir le jeûne.' },
      { Icon: Star,      t: 'Cherchez Laylat al-Qadr', d: 'Intensifiez l\'adoration lors des nuits impaires des 10 dernières nuits.' },
      { Icon: HandHeart, t: 'Donnez Généreusement',   d: 'La charité est multipliée en Ramadan. Payez votre Zakat et aidez les nécessiteux.' },
      { Icon: Clock,     t: 'Priez Taraweeh',         d: 'La prière nocturne après Isha est une Sunna. Même 2 rakats à domicile ont une grande récompense.' },
    ],
    daysLeft: 'jours restants en Ramadan',
    inProgress: 'En cours',
    eidCountdown: 'jours jusqu\'à l\'Aïd al-Fitr',
  },
  es: {
    badge: 'Mes Sagrado · En Curso 🌙',
    title: 'Ramadán 2026',
    sub: 'El Ramadán 2026 está aquí — del 17 feb al 18 mar. Aprovecha cada día con horarios precisos y guías espirituales.',
    phase: 'Estamos en Ramadán. Cada oración cuenta.',
    start: 'Fecha inicio',   startV: '17 feb. 2026',     startS: 'Confirmado',
    qadr:  'Laylat al-Qadr', qadrV:  'Noche 27',          qadrS:  '~14 mar. 2026',
    duration:'Duración',     durV:   '29–30 días',         durS:   'Mes lunar completo',
    eid:   'Eid al-Fitr',    eidV:   '~18 mar. 2026',     eidS:   'Fin del Ramadán',
    timesH:   'Horarios Suhoor & Iftar',
    timesSub: 'Introduce tu ciudad para horarios precisos cada día del Ramadán.',
    timesCta: 'Horarios de Oración',
    tipsH: 'Aprovecha el Ramadán al Máximo',
    guidesH: 'Guías Esenciales',
    guides: [
      { title: 'Las Últimas 10 Noches', desc: 'Laylatul Qadr, Itikaf y cómo aprovechar las noches benditas.', slug: 'last-10-nights-ramadan' },
      { title: 'Zakat al-Fitr 2026', desc: 'Cuánto pagar, cuándo y a quién.', slug: 'zakat-al-fitr-2026' },
      { title: 'Adhkar de Mañana y Tarde', desc: 'Las súplicas esenciales que todo musulmán debería conocer.', slug: 'morning-evening-adhkar' },
      { title: 'Calendario de Oración Ramadán', desc: 'Horario completo de oraciones para todo el mes.', slug: 'ramadan-2026-prayer-timetable' },
      { title: 'Calcula tu Zakat 2026', desc: 'Cálculo paso a paso de tu Zakat este año.', slug: 'calculate-zakat-2026' },
      { title: 'Cómo Rezar la Salah', desc: 'Guía completa para principiantes sobre las 5 oraciones diarias.', slug: 'how-to-pray-salah-beginners' },
    ],
    tips: [
      { Icon: Moon,      t: 'Renueva la Intención',   d: 'Una intención sincera cada noche antes del Suhoor multiplica cada acto de adoración.' },
      { Icon: BookOpen,  t: 'Completa el Corán',      d: 'Un Yuz por día. Usa nuestro lector completo del Corán con traducción en tu idioma.' },
      { Icon: Sun,       t: 'Suhoor e Hidratación',   d: 'El Suhoor es Sunnah. Bebe mucha agua para mantener el ayuno durante el día.' },
      { Icon: Star,      t: 'Busca Laylat al-Qadr',  d: 'Intensifica la adoración en las noches impares de las últimas 10 noches.' },
      { Icon: HandHeart, t: 'Da Generosamente',       d: 'La caridad se multiplica en Ramadán. Paga tu Zakat y ayuda a los necesitados.' },
      { Icon: Clock,     t: 'Reza Taraweeh',         d: 'La oración nocturna tras Isha es Sunna. Incluso 2 rakats en casa tienen gran recompensa.' },
    ],
    daysLeft: 'días restantes en Ramadán',
    inProgress: 'En curso',
    eidCountdown: 'días hasta el Eid al-Fitr',
  },
};

export function RamadanPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0, 2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';

  /* Days remaining in Ramadan (ends Mar 18 2026) */
  const [daysLeft, setDaysLeft] = useState(0);
  const [eidDays,  setEidDays]  = useState(0);
  const [progress, setProgress] = useState(0); // 0–100%

  useEffect(() => {
    const now    = Date.now();
    const start  = new Date('2026-02-17').getTime();
    const end    = new Date('2026-03-19').getTime(); // day after eid
    const total  = end - start;
    const elapsed= Math.max(now - start, 0);
    const pct    = Math.min((elapsed / total) * 100, 100);
    const left   = Math.max(Math.ceil((end - now) / 86_400_000), 0);
    const toEid  = Math.max(Math.ceil((new Date('2026-03-18').getTime() - now) / 86_400_000), 0);
    setProgress(pct);
    setDaysLeft(left);
    setEidDays(toEid);
  }, []);

  const schema = {
    '@context': 'https://schema.org', '@type': 'Event', name: 'Ramadan 2026',
    startDate: '2026-02-17', endDate: '2026-03-18',
    description: 'Ramadan 2026 complete guide — prayer times, Suhoor, Iftar and spiritual tips.',
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
      <SEO
        title={`${L.title} — Suhoor, Iftar & Prayer Times`}
        description={L.sub}
        keywords="ramadan 2026, suhoor iftar, laylat al qadr, ramadan guide"
        canonical="https://www.alummahai.com/ramadan"
        schema={schema}
        lang={lang}
      />

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(160deg,#071a2e 0%,#0a2540 55%,#0d2e4d 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.12)',
        padding: 'clamp(80px,12vw,120px) 20px clamp(44px,6vw,64px)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,175,55,0.07),transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* In-progress banner */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 99, padding: '6px 16px', marginBottom: 18 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 0 3px rgba(34,197,94,0.25)' }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.65rem', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {L.inProgress}
            </span>
            {eidDays > 0 && (
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', color: 'rgba(34,197,94,0.7)' }}>
                · {eidDays} {L.eidCountdown}
              </span>
            )}
          </motion.div>

          <div style={{ display: 'block', padding: '3px 14px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 900, color: 'rgba(212,175,55,0.7)', textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: 16, display: 'inline-block' }}>
            {L.badge}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.5rem,8vw,5.5rem)', color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1 }}>
            {L.title}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(0.86rem,2vw,1rem)', color: 'rgba(255,255,255,0.42)', maxWidth: 520, margin: '0 auto 22px', lineHeight: 1.85 }}>
            {L.sub}
          </motion.p>

          {/* Progress bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ maxWidth: 340, margin: '0 auto', textAlign: isRTL ? 'right' : 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', fontWeight: 700, color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Ramadan Progress
              </span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '0.82rem', color: GOLD }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                style={{ height: '100%', background: `linear-gradient(90deg,${GOLD},#F1D279)`, borderRadius: 99 }} />
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,5vw,60px) 20px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 48 }}>
          {STATS.map(({ Icon, title, value, sub }) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: 16, padding: '20px 16px', textAlign: 'center', transition: 'border-color 0.2s', cursor: 'default' }}
              whileHover={{ borderColor: 'rgba(212,175,55,0.4)', scale: 1.02 }}>
              <Icon size={22} style={{ color: GOLD, margin: '0 auto 10px' }} />
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.5rem', fontWeight: 900, color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 5 }}>{title}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.1rem', color: '#ffffff', marginBottom: 3 }}>{value}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)' }}>{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Prayer Times CTA */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(120deg,rgba(212,175,55,0.1),rgba(212,175,55,0.04))', border: '1px solid rgba(212,175,55,0.22)', borderRadius: 20, padding: 'clamp(22px,4vw,36px)', textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.2rem,3vw,1.8rem)', color: '#ffffff', marginBottom: 8 }}>{L.timesH}</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.38)', maxWidth: 380, margin: '0 auto 20px', lineHeight: 1.8, fontSize: '0.86rem' }}>{L.timesSub}</p>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: GOLD, color: NAVY, padding: '11px 24px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.72rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 18px rgba(212,175,55,0.3)', transition: 'transform 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            🌙 {L.timesCta}
          </Link>
        </motion.div>

        {/* Tips */}
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2rem)', color: '#ffffff', marginBottom: 18 }}>{L.tipsH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 12, marginBottom: 48 }}>
          {L.tips.map(({ Icon, t, d }: any, i: number) => (
            <motion.div key={t}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 16px', transition: 'all 0.2s' }}
              whileHover={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: 'rgba(212,175,55,0.04)' }}>
              <Icon size={17} style={{ color: GOLD, marginBottom: 10 }} />
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.86rem', color: '#ffffff', marginBottom: 5 }}>{t}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}>{d}</p>
            </motion.div>
          ))}
        </div>

        {/* Guides — real slugs, open on click */}
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3.5vw,2rem)', color: '#ffffff', marginBottom: 18 }}>{L.guidesH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12 }}>
          {L.guides.map((item: any, i: number) => (
            <motion.div key={item.slug}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}>
              <Link to={`/blog/${item.slug}`} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 16px', height: '100%', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(212,175,55,0.35)'; el.style.background = 'rgba(212,175,55,0.04)'; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.03)'; el.style.transform = 'translateY(0)'; }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '0.93rem', color: '#ffffff', marginBottom: 8, lineHeight: 1.35 }}>{item.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.73rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.72, marginBottom: 12 }}>{item.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', fontWeight: 800, color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    Read <ChevronRight size={10} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
