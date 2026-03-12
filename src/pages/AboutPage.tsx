import React from 'react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Heart, Shield, Globe, Zap, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NAVY = '#0a2540';
const GOLD = '#D4AF37';

const T: Record<string, any> = {
  en: {
    badge: 'Our Story',
    title: 'Built for the Ummah',
    sub: 'Al Ummah AI is a free platform dedicated to empowering the global Muslim community through technology — prayer times, Quran, Qibla, Zakat, and authentic knowledge, all in one place.',
    missionH: 'Our Mission',
    mission: 'To make Islamic knowledge and spiritual tools accessible to every Muslim on Earth, in any language, for free.',
    valuesH: 'Our Values',
    values: [
      { Icon: Heart,    t: 'Community First',       d: 'Built by Muslims, for Muslims. Every feature is designed with your spiritual journey in mind.' },
      { Icon: Shield,   t: 'Authentic Knowledge',   d: 'We source content from Quran, authenticated Hadith and recognized scholarly works only.' },
      { Icon: Globe,    t: 'Global Access',          d: 'Available in English, Arabic, French and Spanish. Supporting Muslims worldwide.' },
      { Icon: Zap,      t: 'Always Free',            d: 'Prayer times, Qibla, Quran, Zakat calculator and Daily Duas — all free, forever.' },
      { Icon: BookOpen, t: 'Accurate & Reliable',   d: 'Prayer times sourced from the Aladhan API. Quran from the most trusted Arabic text.' },
      { Icon: Users,    t: 'Ummah-Driven',           d: 'We listen to feedback from Muslims around the world to improve every feature.' },
    ],
    toolsH: 'Our Tools',
    tools: [
      { href:'/qibla',   e:'🧭', t:'Qibla Finder',        d:'Find the direction of Makkah from anywhere on Earth.' },
      { href:'/quran',   e:'📖', t:'Quran Reader',         d:'Read the Holy Quran in Arabic with translation.' },
      { href:'/zakat',   e:'🌙', t:'Zakat Calculator',     d:'Calculate your exact Zakat obligation.' },
      { href:'/ramadan', e:'☪️', t:'Ramadan Guide',         d:'Suhoor, Iftar times and Ramadan preparation.' },
      { href:'/duas',    e:'🤲', t:'Daily Duas',            d:'Authentic supplications from Quran & Sunnah.' },
      { href:'/hajj',    e:'🕋', t:'Hajj Guide',            d:'Complete guide to Hajj 2026 rituals and dates.' },
    ],
    contactH: 'Get in Touch',
    contactSub: 'Feedback, questions or partnership inquiries — we read every message.',
    contactEmail: 'support@alummahai.com',
    ctaH: 'Start Using Al Ummah AI',
    ctaBtn: 'Prayer Times & Tools',
  },
  ar: {
    badge: 'قصتنا',
    title: 'بُني للأمة',
    sub: 'الأمة AI منصة مجانية مكرسة لتمكين المسلمين حول العالم عبر التكنولوجيا — أوقات الصلاة والقرآن والقبلة والزكاة والمعرفة الأصيلة، كلها في مكان واحد.',
    missionH: 'مهمتنا',
    mission: 'جعل المعرفة الإسلامية والأدوات الروحية متاحة لكل مسلم على وجه الأرض، بأي لغة، مجاناً.',
    valuesH: 'قيمنا',
    values: [
      { Icon: Heart,    t: 'الأمة أولاً',         d: 'بناه مسلمون، للمسلمين. كل ميزة مصممة مع مراعاة رحلتك الروحية.' },
      { Icon: Shield,   t: 'معرفة أصيلة',          d: 'نأخذ المحتوى من القرآن والحديث الصحيح والأعمال العلمية المعترف بها فحسب.' },
      { Icon: Globe,    t: 'وصول عالمي',           d: 'متاح بالإنجليزية والعربية والفرنسية والإسبانية. ندعم المسلمين في كل مكان.' },
      { Icon: Zap,      t: 'مجاناً دائماً',        d: 'أوقات الصلاة والقبلة والقرآن وحاسبة الزكاة والأدعية — كلها مجانية إلى الأبد.' },
      { Icon: BookOpen, t: 'دقيق وموثوق',          d: 'أوقات الصلاة مأخوذة من واجهة Aladhan. القرآن من أصح النصوص العربية.' },
      { Icon: Users,    t: 'مدفوع بالأمة',         d: 'نستمع إلى ملاحظات المسلمين حول العالم لتحسين كل ميزة.' },
    ],
    toolsH: 'أدواتنا',
    tools: [
      { href:'/qibla',   e:'🧭', t:'تحديد القبلة',     d:'ابحث عن اتجاه مكة من أي مكان على الأرض.' },
      { href:'/quran',   e:'📖', t:'قارئ القرآن',       d:'اقرأ القرآن الكريم بالعربية مع الترجمة.' },
      { href:'/zakat',   e:'🌙', t:'حاسبة الزكاة',     d:'احسب التزامك الدقيق بالزكاة.' },
      { href:'/ramadan', e:'☪️', t:'دليل رمضان',        d:'أوقات السحور والإفطار والاستعداد لرمضان.' },
      { href:'/duas',    e:'🤲', t:'الأدعية اليومية',  d:'أدعية أصيلة من القرآن والسنة.' },
      { href:'/hajj',    e:'🕋', t:'دليل الحج',         d:'الدليل الشامل لشعائر الحج 2026 ومواعيده.' },
    ],
    contactH: 'تواصل معنا',
    contactSub: 'ملاحظاتك وأسئلتك واستفسارات الشراكة — نقرأ كل رسالة.',
    contactEmail: 'support@alummahai.com',
    ctaH: 'ابدأ استخدام الأمة AI',
    ctaBtn: 'أوقات الصلاة والأدوات',
  },
  fr: {
    badge: 'Notre Histoire',
    title: 'Construit pour l\'Oumma',
    sub: 'Al Ummah AI est une plateforme gratuite dédiée à autonomiser la communauté musulmane mondiale grâce à la technologie — horaires de prière, Coran, Qibla, Zakat et connaissances authentiques, le tout en un seul endroit.',
    missionH: 'Notre Mission',
    mission: 'Rendre la connaissance islamique et les outils spirituels accessibles à chaque musulman sur Terre, dans n\'importe quelle langue, gratuitement.',
    valuesH: 'Nos Valeurs',
    values: [
      { Icon: Heart,    t: 'La Communauté d\'abord', d: 'Construit par des musulmans, pour des musulmans. Chaque fonctionnalité est conçue pour votre voyage spirituel.' },
      { Icon: Shield,   t: 'Connaissance Authentique', d: 'Nous sourçons le contenu du Coran, des Hadiths authentifiés et des œuvres savantes reconnues.' },
      { Icon: Globe,    t: 'Accès Mondial',           d: 'Disponible en anglais, arabe, français et espagnol. Soutenir les musulmans du monde entier.' },
      { Icon: Zap,      t: 'Toujours Gratuit',        d: 'Horaires de prière, Qibla, Coran, calculateur Zakat et Douas — tous gratuits, pour toujours.' },
      { Icon: BookOpen, t: 'Précis et Fiable',        d: 'Horaires de prière issus de l\'API Aladhan. Coran du texte arabe le plus fiable.' },
      { Icon: Users,    t: 'Porté par l\'Oumma',     d: 'Nous écoutons les retours des musulmans du monde entier pour améliorer chaque fonctionnalité.' },
    ],
    toolsH: 'Nos Outils',
    tools: [
      { href:'/qibla',   e:'🧭', t:'Qibla Finder',          d:'Trouvez la direction de La Mecque depuis n\'importe où sur Terre.' },
      { href:'/quran',   e:'📖', t:'Lecteur du Coran',       d:'Lisez le Saint Coran en arabe avec traduction.' },
      { href:'/zakat',   e:'🌙', t:'Calculateur de Zakat',  d:'Calculez votre obligation exacte de Zakat.' },
      { href:'/ramadan', e:'☪️', t:'Guide du Ramadan',       d:'Horaires Suhoor, Iftar et préparation du Ramadan.' },
      { href:'/duas',    e:'🤲', t:'Douas Quotidiennes',     d:'Supplications authentiques du Coran et de la Sunna.' },
      { href:'/hajj',    e:'🕋', t:'Guide du Hajj',          d:'Guide complet des rituels et dates du Hajj 2026.' },
    ],
    contactH: 'Contactez-nous',
    contactSub: 'Commentaires, questions ou demandes de partenariat — nous lisons chaque message.',
    contactEmail: 'support@alummahai.com',
    ctaH: 'Commencez à utiliser Al Ummah AI',
    ctaBtn: 'Horaires de Prière & Outils',
  },
  es: {
    badge: 'Nuestra Historia',
    title: 'Construido para la Ummah',
    sub: 'Al Ummah AI es una plataforma gratuita dedicada a empoderar a la comunidad musulmana mundial a través de la tecnología — horarios de oración, Corán, Qibla, Zakat y conocimiento auténtico, todo en un solo lugar.',
    missionH: 'Nuestra Misión',
    mission: 'Hacer accesible el conocimiento islámico y las herramientas espirituales a cada musulmán en la Tierra, en cualquier idioma, de forma gratuita.',
    valuesH: 'Nuestros Valores',
    values: [
      { Icon: Heart,    t: 'La Comunidad Primero', d: 'Construido por musulmanes, para musulmanes. Cada función está diseñada pensando en tu viaje espiritual.' },
      { Icon: Shield,   t: 'Conocimiento Auténtico', d: 'Obtenemos contenido solo del Corán, Hadices autenticados y obras académicas reconocidas.' },
      { Icon: Globe,    t: 'Acceso Global',          d: 'Disponible en inglés, árabe, francés y español. Apoyando a los musulmanes en todo el mundo.' },
      { Icon: Zap,      t: 'Siempre Gratis',         d: 'Horarios de oración, Qibla, Corán, calculadora Zakat y Duas — todos gratuitos, para siempre.' },
      { Icon: BookOpen, t: 'Preciso y Confiable',   d: 'Horarios de oración de la API Aladhan. Corán del texto árabe más confiable.' },
      { Icon: Users,    t: 'Impulsado por la Ummah', d: 'Escuchamos los comentarios de musulmanes de todo el mundo para mejorar cada función.' },
    ],
    toolsH: 'Nuestras Herramientas',
    tools: [
      { href:'/qibla',   e:'🧭', t:'Qibla Finder',            d:'Encuentra la dirección de La Meca desde cualquier lugar de la Tierra.' },
      { href:'/quran',   e:'📖', t:'Lector del Corán',         d:'Lee el Santo Corán en árabe con traducción.' },
      { href:'/zakat',   e:'🌙', t:'Calculadora de Zakat',    d:'Calcula tu obligación exacta de Zakat.' },
      { href:'/ramadan', e:'☪️', t:'Guía de Ramadán',          d:'Horarios de Suhoor, Iftar y preparación para Ramadán.' },
      { href:'/duas',    e:'🤲', t:'Duas Diarias',              d:'Súplicas auténticas del Corán y la Sunnah.' },
      { href:'/hajj',    e:'🕋', t:'Guía del Hajj',             d:'Guía completa de rituales y fechas del Hajj 2026.' },
    ],
    contactH: 'Contáctanos',
    contactSub: 'Comentarios, preguntas o consultas de asociación — leemos cada mensaje.',
    contactEmail: 'support@alummahai.com',
    ctaH: 'Empieza a usar Al Ummah AI',
    ctaBtn: 'Horarios de Oración y Herramientas',
  },
};

export function AboutPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight: '100vh', color: '#fff' }}>
      <SEO title={`${L.title} — Al Ummah AI`} description={L.sub} keywords="about al ummah ai, islamic app, free prayer times, muslim tools" canonical="https://www.alummahai.com/about" lang={lang} />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#071a2e 0%,#0a2540 55%,#0d2e4d 100%)', borderBottom: '1px solid rgba(212,175,55,0.12)', padding: 'clamp(90px,12vw,130px) 20px clamp(48px,6vw,64px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.22)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.28em', marginBottom:16 }}>
            ☽ {L.badge}
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2.2rem,7vw,5rem)', color:'#fff', letterSpacing:'-0.03em', marginBottom:14, lineHeight:1 }}>{L.title}</h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'clamp(0.88rem,1.8vw,1rem)', color:'rgba(255,255,255,0.42)', maxWidth:520, margin:'0 auto', lineHeight:1.9 }}>{L.sub}</p>
        </motion.div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'clamp(36px,5vw,60px) 20px' }}>

        {/* Mission */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ background:'linear-gradient(120deg,rgba(212,175,55,0.1),rgba(212,175,55,0.03))', border:'1px solid rgba(212,175,55,0.22)', borderRadius:20, padding:'clamp(24px,4vw,40px)', textAlign:'center', marginBottom:52 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.55rem', fontWeight:900, color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.24em', marginBottom:14 }}>{L.missionH}</div>
          <p style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'clamp(1.1rem,2.8vw,1.6rem)', color:'#fff', lineHeight:1.6, maxWidth:700, margin:'0 auto', fontStyle:'italic' }}>"{L.mission}"</p>
        </motion.div>

        {/* Values */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,2rem)', color:'#fff', marginBottom:20 }}>{L.valuesH}</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:12, marginBottom:52 }}>
          {L.values.map(({ Icon, t, d }: any) => (
            <div key={t} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'20px', display:'flex', gap:14, transition:'all 0.2s' }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.28)'; el.style.background='rgba(212,175,55,0.04)'; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.07)'; el.style.background='rgba(255,255,255,0.03)'; }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                <Icon size={16} style={{ color:GOLD }} />
              </div>
              <div>
                <h3 style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.9rem', color:'#fff', marginBottom:5 }}>{t}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.74rem', color:'rgba(255,255,255,0.4)', lineHeight:1.75 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tools grid */}
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.3rem,3vw,2rem)', color:'#fff', marginBottom:20 }}>{L.toolsH}</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12, marginBottom:52 }}>
          {L.tools.map(({ href, e, t, d }: any) => (
            <Link key={href} to={href} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:14, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'16px 18px', transition:'all 0.2s' }}
              onMouseEnter={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(212,175,55,0.35)'; c.style.background='rgba(212,175,55,0.05)'; }}
              onMouseLeave={el => { const c=el.currentTarget as HTMLElement; c.style.borderColor='rgba(255,255,255,0.07)'; c.style.background='rgba(255,255,255,0.03)'; }}>
              <span style={{ fontSize:'1.4rem', flexShrink:0 }}>{e}</span>
              <div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.86rem', color:GOLD, marginBottom:3 }}>{t}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.7rem', color:'rgba(255,255,255,0.38)', lineHeight:1.6 }}>{d}</div>
              </div>
              <ArrowRight size={13} style={{ color:'rgba(212,175,55,0.4)', marginLeft:'auto', flexShrink:0 }} />
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div style={{ background:'linear-gradient(120deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03))', border:'1px solid rgba(212,175,55,0.18)', borderRadius:20, padding:'clamp(24px,4vw,40px)', textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:12 }}>✉️</div>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.2rem,3vw,1.7rem)', color:'#fff', marginBottom:8 }}>{L.contactH}</h3>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, color:'rgba(255,255,255,0.38)', maxWidth:380, margin:'0 auto 16px', lineHeight:1.8, fontSize:'0.86rem' }}>{L.contactSub}</p>
          <a href={`mailto:${L.contactEmail}`} style={{ display:'inline-block', fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.88rem', color:GOLD, textDecoration:'underline', textUnderlineOffset:4 }}>{L.contactEmail}</a>
          <div style={{ marginTop:22 }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:8, background:GOLD, color:NAVY, padding:'11px 24px', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.72rem', textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.1em', boxShadow:'0 4px 18px rgba(212,175,55,0.3)', transition:'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.transform='scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}>
              {L.ctaBtn} <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
