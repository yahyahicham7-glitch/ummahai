import React from 'react';
import { ShieldCheck, Star, Hotel, MapPin, Clock, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NAVY  = '#0a2540';
const NAVY2 = '#0d2e4d';
const GOLD  = '#D4AF37';

const T: Record<string, any> = {
  en: {
    badge: 'Pilgrimage Guide · 2026',
    title: 'Hajj Guide 2026',
    sub: 'Everything you need to know about Hajj 2026 — rituals, dates, preparation and spiritual guidance for the Fifth Pillar of Islam.',
    datesH: 'Hajj 2026 Dates',
    ihram: 'Ihram', ihramV: '~June 4, 2026', ihramS: 'Day of Tarwiyah (8 Dhul Hijjah)',
    arafat: 'Day of Arafat', arafatV: '~June 5, 2026', arafatS: 'The pillar of Hajj (9 Dhul Hijjah)',
    eid: 'Eid al-Adha', eidV: '~June 6, 2026', eidS: 'Sacrifice & stoning (10 Dhul Hijjah)',
    end: 'Hajj Ends', endV: '~June 10, 2026', endS: '13 Dhul Hijjah',
    ritualsH: 'The Rituals of Hajj',
    rituals: [
      { n: '1. Ihram', d: 'Enter the sacred state of Ihram at the Miqat — wearing white garments and declaring Talbiyah. All worldly distinctions dissolve.' },
      { n: '2. Tawaf al-Qudum', d: 'Upon arriving at Al-Masjid Al-Haram, perform 7 counter-clockwise circuits around the Kaaba as a greeting.' },
      { n: '3. Sa\'i', d: 'Walk 7 times between the hills of Safa and Marwah, commemorating Hajar\'s search for water for her son Ismail.' },
      { n: '4. Day of Arafat', d: 'The heart of Hajj. Stand at the plain of Arafat from noon to sunset in supplication. Without Arafat, there is no Hajj.' },
      { n: '5. Muzdalifah', d: 'Spend the night under the open sky at Muzdalifah after leaving Arafat. Collect pebbles for the stoning ritual.' },
      { n: '6. Rami al-Jamarat', d: 'Stone the three pillars in Mina representing the devil, following the example of Ibrahim (AS).' },
      { n: '7. Qurbani (Sacrifice)', d: 'Sacrifice an animal on Eid al-Adha, commemorating Ibrahim\'s willingness to sacrifice his son for Allah.' },
      { n: '8. Halq / Taqsir', d: 'Shave or cut hair to exit partial Ihram. This marks a major milestone of the Hajj journey.' },
      { n: '9. Tawaf al-Ifadah', d: 'Return to the Kaaba and perform another Tawaf — this is a pillar (rukn) of Hajj.' },
      { n: '10. Farewell Tawaf', d: 'Before leaving Makkah, perform a final Tawaf al-Wada as your farewell to the Sacred House.' },
    ],
    prepH: 'Preparing for Hajj',
    prep: [
      { Icon: ShieldCheck, t: 'Spiritual Preparation', d: 'Seek forgiveness from Allah and from people you may have wronged. Make tawbah and strengthen your ibadah months before departure.' },
      { Icon: Hotel,       t: 'Book Early',            d: 'Hajj quotas fill up fast. Register with an approved travel operator early. National quotas apply by country.' },
      { Icon: Clock,       t: 'Learn the Rituals',     d: 'Study each Hajj ritual in detail from authentic sources before going. Ignorance of rituals leads to missed obligations.' },
      { Icon: Users,       t: 'Travel with a Group',   d: 'Hajj is a communal act of worship. Traveling with a learned group or verified tour operator reduces mistakes.' },
      { Icon: MapPin,      t: 'Physical Fitness',      d: 'Hajj involves significant walking — sometimes 20km+ per day. Start physical preparation months in advance.' },
      { Icon: Star,        t: 'Mabrur Hajj',           d: '"An accepted Hajj has no reward except Paradise." Focus on sincerity, patience and avoiding sin throughout.' },
    ],
    duaH: "Prophet's Dua for Hajj",
    dua: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
    duaTrans: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am.',
    ctaH: 'Ready for Hajj 2026?',
    ctaSub: 'Get accurate prayer times during Hajj and find Qibla direction from anywhere.',
    ctaBtn: 'Prayer Times & Qibla',
  },
  ar: {
    badge: 'دليل الحج · 2026',
    title: 'دليل الحج 2026',
    sub: 'كل ما تحتاج معرفته عن حج 2026 — الشعائر والتواريخ والتحضير والتوجيه الروحي لأداء الركن الخامس من أركان الإسلام.',
    datesH: 'مواعيد الحج 2026',
    ihram: 'الإحرام', ihramV: '~4 يونيو 2026', ihramS: 'يوم التروية (8 ذو الحجة)',
    arafat: 'يوم عرفة', arafatV: '~5 يونيو 2026', arafatS: 'ركن الحج الأعظم (9 ذو الحجة)',
    eid: 'عيد الأضحى', eidV: '~6 يونيو 2026', eidS: 'الذبح والرمي (10 ذو الحجة)',
    end: 'نهاية الحج', endV: '~10 يونيو 2026', endS: '13 ذو الحجة',
    ritualsH: 'شعائر الحج',
    rituals: [
      { n: '١. الإحرام', d: 'ادخل حالة الإحرام عند الميقات — البس الثياب البيضاء وأعلن التلبية. تذوب الفوارق الدنيوية كلها.' },
      { n: '٢. طواف القدوم', d: 'عند وصولك للمسجد الحرام، أدّ 7 أشواط حول الكعبة المشرفة عكس عقارب الساعة تحية للبيت.' },
      { n: '٣. السعي', d: 'اسعَ 7 أشواط بين الصفا والمروة تأسياً بهاجر رضي الله عنها في بحثها عن الماء لطفلها إسماعيل.' },
      { n: '٤. يوم عرفة', d: 'قلب الحج. قف في سهل عرفات من الظهر حتى المغرب داعياً. قال النبي ﷺ: «الحج عرفة».' },
      { n: '٥. مزدلفة', d: 'بيّت ليلتك تحت السماء المفتوحة بمزدلفة بعد الدفع من عرفات. اجمع الحصيات للرمي.' },
      { n: '٦. رمي الجمرات', d: 'ارمِ الجمرات الثلاث بمنى اقتداءً بإبراهيم عليه السلام في طرد الشيطان.' },
      { n: '٧. الأضحية', d: 'اذبح الأضحية في عيد الأضحى تخليداً لذكرى استعداد إبراهيم لتضحية ابنه.' },
      { n: '٨. الحلق أو التقصير', d: 'احلق رأسك أو قصّره للتحلل الجزئي من الإحرام. إنه محطة مهمة في رحلة الحج.' },
      { n: '٩. طواف الإفاضة', d: 'عُد للكعبة وأدّ طواف الإفاضة — وهو ركن من أركان الحج لا يصح بدونه.' },
      { n: '١٠. طواف الوداع', d: 'قبل مغادرة مكة، أدّ طواف الوداع وداعاً للبيت الحرام.' },
    ],
    prepH: 'التحضير للحج',
    prep: [
      { Icon: ShieldCheck, t: 'الاستعداد الروحي',   d: 'استغفر الله ومن أسأت إليهم. تُب إلى الله وقوّ عبادتك قبل السفر بأشهر.' },
      { Icon: Hotel,       t: 'احجز مبكراً',         d: 'حصص الحج تمتلئ سريعاً. سجّل مع وكالة سفر معتمدة مبكراً. تسري الحصص الوطنية لكل دولة.' },
      { Icon: Clock,       t: 'تعلم الشعائر',        d: 'ادرس كل شعيرة من شعائر الحج بالتفصيل من مصادر أصيلة. الجهل بالأحكام يؤدي إلى ترك واجبات.' },
      { Icon: Users,       t: 'سافر مع مجموعة',      d: 'الحج عبادة جماعية. السفر مع مجموعة أو وكالة موثوقة يقلل من الأخطاء.' },
      { Icon: MapPin,      t: 'اللياقة البدنية',     d: 'الحج يتطلب مشياً كثيراً — أحياناً 20 كلم يومياً. ابدأ التحضير البدني قبل أشهر.' },
      { Icon: Star,        t: 'حج مبرور',             d: '«الحج المبرور ليس له جزاء إلا الجنة». ركّز على الإخلاص والصبر وتجنب الذنوب.' },
    ],
    duaH: 'تلبية النبي ﷺ',
    dua: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
    duaTrans: 'لبيك اللهم لبيك، لبيك لا شريك لك لبيك.',
    ctaH: 'مستعد للحج 2026؟',
    ctaSub: 'احصل على أوقات صلاة دقيقة خلال الحج واعرف اتجاه القبلة من أي مكان.',
    ctaBtn: 'أوقات الصلاة والقبلة',
  },
  fr: {
    badge: 'Guide du Pèlerinage · 2026',
    title: 'Guide du Hajj 2026',
    sub: 'Tout ce que vous devez savoir sur le Hajj 2026 — rituels, dates, préparation et guidance spirituelle pour le Cinquième Pilier de l\'Islam.',
    datesH: 'Dates du Hajj 2026',
    ihram: 'Ihram', ihramV: '~4 juin 2026', ihramS: 'Jour de Tarwiyah (8 Dhul Hijjah)',
    arafat: 'Jour d\'Arafat', arafatV: '~5 juin 2026', arafatS: 'Le pilier du Hajj (9 Dhul Hijjah)',
    eid: 'Aïd al-Adha', eidV: '~6 juin 2026', eidS: 'Sacrifice & lapidation (10 Dhul Hijjah)',
    end: 'Fin du Hajj', endV: '~10 juin 2026', endS: '13 Dhul Hijjah',
    ritualsH: 'Les Rituels du Hajj',
    rituals: [
      { n: '1. Ihram', d: 'Entrez dans l\'état sacré d\'Ihram au Miqat — portez des vêtements blancs et déclarez la Talbiyah. Toutes les distinctions mondaines disparaissent.' },
      { n: '2. Tawaf al-Qudum', d: 'À votre arrivée, effectuez 7 circumambulations autour de la Kaaba dans le sens inverse des aiguilles d\'une montre.' },
      { n: '3. Sa\'i', d: 'Parcourez 7 fois entre les collines de Safa et Marwah, commémorant la recherche d\'eau de Hajar pour son fils Ismail.' },
      { n: '4. Jour d\'Arafat', d: 'Le cœur du Hajj. Restez debout dans la plaine d\'Arafat de midi au coucher du soleil en supplication. Sans Arafat, il n\'y a pas de Hajj.' },
      { n: '5. Muzdalifah', d: 'Passez la nuit à la belle étoile à Muzdalifah après avoir quitté Arafat. Ramassez des cailloux pour le rite de lapidation.' },
      { n: '6. Rami al-Jamarat', d: 'Lapidez les trois piliers à Mina représentant le diable, suivant l\'exemple d\'Ibrahim (AS).' },
      { n: '7. Qurbani (Sacrifice)', d: 'Sacrifiez un animal lors de l\'Aïd al-Adha, commémorant la volonté d\'Ibrahim de sacrifier son fils pour Allah.' },
      { n: '8. Halq / Taqsir', d: 'Rasez ou coupez les cheveux pour sortir partiellement de l\'Ihram. Cela marque une étape majeure du Hajj.' },
      { n: '9. Tawaf al-Ifadah', d: 'Revenez à la Kaaba et effectuez un autre Tawaf — c\'est un pilier (rukn) du Hajj.' },
      { n: '10. Tawaf d\'Adieu', d: 'Avant de quitter La Mecque, effectuez un dernier Tawaf al-Wada en guise d\'adieu à la Maison Sacrée.' },
    ],
    prepH: 'Se Préparer pour le Hajj',
    prep: [
      { Icon: ShieldCheck, t: 'Préparation Spirituelle', d: 'Demandez pardon à Allah et aux personnes que vous avez pu blesser. Faites tawbah et renforcez votre ibadah.' },
      { Icon: Hotel,       t: 'Réservez Tôt',            d: 'Les quotas Hajj se remplissent vite. Inscrivez-vous tôt auprès d\'un opérateur agréé. Des quotas nationaux s\'appliquent.' },
      { Icon: Clock,       t: 'Apprenez les Rituels',    d: 'Étudiez chaque rituel du Hajj en détail avant de partir. L\'ignorance des rituels entraîne des obligations manquées.' },
      { Icon: Users,       t: 'Voyagez en Groupe',       d: 'Le Hajj est un acte d\'adoration communautaire. Voyager avec un groupe réduit les erreurs.' },
      { Icon: MapPin,      t: 'Forme Physique',          d: 'Le Hajj implique beaucoup de marche — parfois 20 km+ par jour. Commencez la préparation physique des mois à l\'avance.' },
      { Icon: Star,        t: 'Hajj Mabrur',             d: '"Un Hajj accepté n\'a d\'autre récompense que le Paradis." Concentrez-vous sur la sincérité et la patience.' },
    ],
    duaH: 'Talbiyah du Prophète ﷺ',
    dua: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
    duaTrans: 'Me voici, ô Allah, me voici. Me voici, Tu n\'as pas d\'associé, me voici.',
    ctaH: 'Prêt pour le Hajj 2026 ?',
    ctaSub: 'Obtenez des horaires de prière précis pendant le Hajj et trouvez la direction de la Qibla.',
    ctaBtn: 'Horaires de Prière & Qibla',
  },
  es: {
    badge: 'Guía del Peregrinaje · 2026',
    title: 'Guía del Hajj 2026',
    sub: 'Todo lo que necesitas saber sobre el Hajj 2026 — rituales, fechas, preparación y guía espiritual para el Quinto Pilar del Islam.',
    datesH: 'Fechas del Hajj 2026',
    ihram: 'Ihram', ihramV: '~4 jun. 2026', ihramS: 'Día de Tarwiyah (8 Dhul Hijjah)',
    arafat: 'Día de Arafat', arafatV: '~5 jun. 2026', arafatS: 'El pilar del Hajj (9 Dhul Hijjah)',
    eid: 'Eid al-Adha', eidV: '~6 jun. 2026', eidS: 'Sacrificio y lapidación (10 Dhul Hijjah)',
    end: 'Fin del Hajj', endV: '~10 jun. 2026', endS: '13 Dhul Hijjah',
    ritualsH: 'Los Rituales del Hajj',
    rituals: [
      { n: '1. Ihram', d: 'Entra en el estado sagrado de Ihram en el Miqat — viste ropas blancas y declara la Talbiyah. Todas las distinciones mundanas desaparecen.' },
      { n: '2. Tawaf al-Qudum', d: 'Al llegar a la Mezquita Sagrada, realiza 7 circunvalaciones alrededor de la Kaaba en sentido antihorario como saludo.' },
      { n: '3. Sa\'i', d: 'Camina 7 veces entre las colinas de Safa y Marwah, conmemorando la búsqueda de agua de Hajar para su hijo Ismail.' },
      { n: '4. Día de Arafat', d: 'El corazón del Hajj. Permanece en la llanura de Arafat desde el mediodía hasta la puesta del sol en súplica. Sin Arafat no hay Hajj.' },
      { n: '5. Muzdalifah', d: 'Pasa la noche al aire libre en Muzdalifah tras salir de Arafat. Recoge piedras para el rito de lapidación.' },
      { n: '6. Rami al-Jamarat', d: 'Lapida los tres pilares en Mina que representan al diablo, siguiendo el ejemplo de Ibrahim (AS).' },
      { n: '7. Qurbani (Sacrificio)', d: 'Sacrifica un animal en Eid al-Adha, conmemorando la disposición de Ibrahim a sacrificar a su hijo por Allah.' },
      { n: '8. Halq / Taqsir', d: 'Aféitate o córtate el cabello para salir parcialmente del Ihram. Marca un hito importante del Hajj.' },
      { n: '9. Tawaf al-Ifadah', d: 'Regresa a la Kaaba y realiza otro Tawaf — es un pilar (rukn) del Hajj.' },
      { n: '10. Tawaf de Despedida', d: 'Antes de salir de La Meca, realiza el Tawaf al-Wada final como despedida a la Casa Sagrada.' },
    ],
    prepH: 'Preparándose para el Hajj',
    prep: [
      { Icon: ShieldCheck, t: 'Preparación Espiritual',  d: 'Busca perdón de Allah y de quienes hayas podido ofender. Haz tawbah y fortalece tu ibadah meses antes.' },
      { Icon: Hotel,       t: 'Reserva Pronto',          d: 'Las cuotas del Hajj se llenan rápido. Regístrate pronto con un operador aprobado. Se aplican cuotas nacionales.' },
      { Icon: Clock,       t: 'Aprende los Rituales',    d: 'Estudia cada ritual del Hajj en detalle antes de ir. La ignorancia lleva a obligaciones omitidas.' },
      { Icon: Users,       t: 'Viaja en Grupo',          d: 'El Hajj es un acto comunitario de adoración. Viajar con un grupo reduce errores.' },
      { Icon: MapPin,      t: 'Forma Física',            d: 'El Hajj implica mucho caminar — a veces 20 km+ diarios. Empieza la preparación física meses antes.' },
      { Icon: Star,        t: 'Hajj Mabrur',             d: '"El Hajj aceptado no tiene más recompensa que el Paraíso." Enfócate en la sinceridad y la paciencia.' },
    ],
    duaH: 'Talbiyah del Profeta ﷺ',
    dua: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
    duaTrans: 'Aquí estoy, oh Allah, aquí estoy. Aquí estoy, no tienes asociado, aquí estoy.',
    ctaH: '¿Listo para el Hajj 2026?',
    ctaSub: 'Obtén horarios de oración precisos durante el Hajj y encuentra la dirección de la Qibla.',
    ctaBtn: 'Horarios de Oración y Qibla',
  },
};

export function HajjPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as keyof typeof T;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';

  const schema = {
    '@context': 'https://schema.org', '@type': 'TouristTrip',
    name: 'Hajj 2026 Guide', description: L.sub,
    touristType: ['Muslim', 'Pilgrim'],
  };

  const STATS = [
    { Icon: Clock,   title: L.ihram,  value: L.ihramV,  sub: L.ihramS  },
    { Icon: Star,    title: L.arafat, value: L.arafatV, sub: L.arafatS },
    { Icon: Hotel,   title: L.eid,    value: L.eidV,    sub: L.eidS    },
    { Icon: MapPin,  title: L.end,    value: L.endV,    sub: L.endS    },
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: NAVY, minHeight: '100vh', color: '#fff' }}>
      <SEO title={L.title} description={L.sub} keywords="hajj 2026, hajj guide, pilgrimage mecca, umrah, arafat" canonical="https://www.alummahai.com/hajj" schema={schema} lang={lang} />

      {/* ── Hero with Makkah photo ── */}
      <div style={{ position: 'relative', minHeight: 'clamp(320px,48vh,500px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=80&auto=format&fit=crop" alt="Al-Masjid Al-Haram Makkah" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(10,37,64,0.4) 0%,rgba(10,37,64,0.92) 100%)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1, width: '100%', padding: 'clamp(90px,12vh,130px) 20px clamp(40px,5vw,64px)', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.52rem', fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: 16, backdropFilter: 'blur(8px)' }}>
            🕋 {L.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2rem,6vw,4rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: 12, textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>{L.title}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.86rem,1.8vw,1rem)', maxWidth: 540, margin: '0 auto', lineHeight: 1.85, textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>{L.sub}</p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(36px,5vw,60px) 20px' }}>

        {/* Dates */}
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3vw,2rem)', color: '#fff', marginBottom: 20 }}>{L.datesH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 52 }}>
          {STATS.map(({ Icon, title, value, sub }) => (
            <motion.div key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: 16, padding: '20px 16px', textAlign: 'center', transition: 'border-color 0.2s' }}
              whileHover={{ borderColor: 'rgba(212,175,55,0.4)', scale: 1.02 }}>
              <Icon size={22} style={{ color: GOLD, margin: '0 auto 10px' }} />
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.5rem', fontWeight: 900, color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', letterSpacing: '0.22em', marginBottom: 5 }}>{title}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '1.05rem', color: '#fff', marginBottom: 3 }}>{value}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)' }}>{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Talbiyah card */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(120deg,rgba(212,175,55,0.1),rgba(212,175,55,0.04))', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 20, padding: 'clamp(22px,4vw,36px)', textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.55rem', fontWeight: 900, color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', letterSpacing: '0.24em', marginBottom: 16 }}>{L.duaH}</div>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(1.3rem,3.5vw,2rem)', color: GOLD, direction: 'rtl', lineHeight: 1.7, marginBottom: 12, textShadow: '0 0 30px rgba(212,175,55,0.25)' }}>{L.dua}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.84rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>{L.duaTrans}</div>
        </motion.div>

        {/* Rituals */}
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3vw,2rem)', color: '#fff', marginBottom: 20 }}>{L.ritualsH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12, marginBottom: 52 }}>
          {L.rituals.map((r: any, i: number) => (
            <motion.div key={r.n} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 18px', transition: 'all 0.2s' }}
              whileHover={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: 'rgba(212,175,55,0.04)' }}>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.88rem', color: GOLD, marginBottom: 8 }}>{r.n}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.76rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.75 }}>{r.d}</p>
            </motion.div>
          ))}
        </div>

        {/* Preparation */}
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.3rem,3vw,2rem)', color: '#fff', marginBottom: 20 }}>{L.prepH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12, marginBottom: 52 }}>
          {L.prep.map(({ Icon, t, d }: any) => (
            <div key={t} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 18px', display: 'flex', gap: 14, transition: 'all 0.2s' }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.28)'; el.style.background='rgba(212,175,55,0.04)'; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.07)'; el.style.background='rgba(255,255,255,0.03)'; }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <Icon size={16} style={{ color: GOLD }} />
              </div>
              <div>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.88rem', color: '#fff', marginBottom: 5 }}>{t}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(120deg,rgba(212,175,55,0.08),rgba(212,175,55,0.03))', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 20, padding: 'clamp(24px,4vw,40px)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>🕋</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.2rem,3vw,1.7rem)', color: '#fff', marginBottom: 8 }}>{L.ctaH}</h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.38)', maxWidth: 380, margin: '0 auto 20px', lineHeight: 1.8, fontSize: '0.86rem' }}>{L.ctaSub}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: GOLD, color: NAVY, padding: '11px 24px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.72rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 18px rgba(212,175,55,0.3)', transition: 'transform 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.transform='scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}>
              {L.ctaBtn} <ArrowRight size={13} />
            </Link>
            <Link to="/qibla" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', padding: '11px 24px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.72rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.15s' }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(212,175,55,0.4)'; el.style.color=GOLD; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.14)'; el.style.color='#fff'; }}>
              Qibla Finder <ChevronRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
