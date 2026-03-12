import React, { useEffect, useState, useRef } from 'react';
import { PrayerWidget } from '@/src/components/PrayerWidget';
import { SEO } from '@/src/components/SEO';
import { BookOpen, MapPin, ArrowRight, Search, ChevronRight, Shield, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { useTranslation } from 'react-i18next';

/* ── Arabic phrases (always shown in Arabic + translated subtitle) ── */
const PHRASES = [
  { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', en: 'In the name of Allah, the Most Gracious', fr: 'Au nom d\'Allah, le Tout Miséricordieux', es: 'En nombre de Allah, el Misericordioso' },
  { ar: 'اللَّهُ أَكْبَرُ', en: 'Allah is the Greatest', fr: 'Allah est le Plus Grand', es: 'Allah es el Más Grande' },
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', en: 'Glory be to Allah and praise Him', fr: 'Gloire à Allah et louange à Lui', es: 'Gloria a Allah y alabanza a Él' },
  { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ', en: 'There is no god but Allah', fr: 'Il n\'y a de dieu qu\'Allah', es: 'No hay más dios que Allah' },
];

/* ══════════════════════════════════════════════════════════════
   TRANSLATION TABLE — every UI string in 4 languages
══════════════════════════════════════════════════════════════ */
const UI: Record<string, any> = {
  en: {
    heroH1:    'Free Islamic Tools —',
    heroH1b:   'Prayer Times,',
    heroH1c:   'Qibla & Quran',
    heroSub:   'The complete Islamic platform — accurate, intelligent and free for 1.8 billion Muslims worldwide.',
    ctaGps:    'Use my location',
    ctaSearch: 'Search city',
    trust:     ['GPS-accurate prayer times', 'Real-time Qibla direction', 'Quran with audio', 'Scholar verified'],
    stats:     [['1.8B+','Muslims'],['150+','Cities'],['5','Languages'],['100%','Free']],
    ramadanIn: (d:number) => `🌙 Ramadan 2026 — ${d} days remaining →`,
    ramadanPre:(d:number) => `🌙 ${d} days until Ramadan 2026 →`,
    prayerBadge: '✦ Live · GPS Accurate',
    prayerH:   'Prayer Times Near You',
    prayerSub: 'Auto-detected from your GPS. Search any city worldwide.',
    toolsBadge:'✦ Sacred Tools',
    toolsH:    'Everything You Need',
    tools: [
      { emoji:'🕐', label:'Prayer Times',     badge:'Live',  desc:'GPS-accurate Fajr, Dhuhr, Asr, Maghrib & Isha for any city.', link:'/prayer-times' },
      { emoji:'🧭', label:'Qibla Finder',     badge:'GPS',   desc:'Real-time compass direction toward the Holy Kaaba in Mecca.', link:'/qibla' },
      { emoji:'📖', label:'Quran',            badge:'Audio', desc:'Complete Quran with audio recitations, translations and verse search.', link:'/quran' },
      { emoji:'💛', label:'Zakat Calculator', badge:'2026',  desc:'Calculate your annual Zakat based on 2026 Nisab rates.', link:'/zakat' },
    ],
    toolOpen: 'Open',
    secondary: [
      { l:'Hajj Guide', link:'/hajj',   e:'🕋' },
      { l:'Ramadan',    link:'/ramadan',e:'🌙' },
      { l:'Scholar AI', link:'/scholar',e:'✨' },
      { l:'Store',      link:'/store',  e:'🛍️' },
      { l:'Tasbih',     link:'/tasbih', e:'📿' },
    ],
    offerBadge: '✦ What We Offer',
    offerH:    'Your Complete Islamic Companion',
    offerP1:   'Al Ummah AI brings together the essential Islamic tools every Muslim needs — all in one clean, fast and free platform available in 5 languages.',
    offerP2:   'Our prayer times use your exact GPS coordinates to calculate accurate Fajr, Dhuhr, Asr, Maghrib and Isha for any city worldwide.',
    offerP3:   'The Qibla Finder uses your compass to point precisely toward the Kaaba. The Quran includes full audio recitations and translations. Our Zakat Calculator uses 2026 Nisab thresholds.',
    benefits: [
      'GPS prayer times for 150+ countries and any city worldwide',
      'Real-time Qibla compass with live device orientation',
      'Full Quran in Arabic with audio recitations and translations',
      'Zakat calculator updated for 2026 gold & silver Nisab rates',
      'Complete Ramadan 2026 guide with prayer timetable',
      'Daily duas for morning, evening and all occasions',
      'Islamic articles, history and practical life guides',
      'Scholar AI — ask any Islamic question in your language',
    ],
    whyBadge: '✦ Why Al Ummah AI',
    whyH:    'Built for the Global Ummah',
    whySub:  'Unlike generic prayer apps, Al Ummah AI is a full spiritual platform combining modern technology with verified Islamic knowledge.',
    why: [
      { title:'Scholar Verified', desc:'All content reviewed by qualified Islamic scholars for accuracy and authenticity.' },
      { title:'GPS Precision',    desc:'Prayer times from your exact GPS — never miss a prayer.' },
      { title:'5 Languages',      desc:'English, Arabic, French, Spanish and more — for the global Ummah.' },
      { title:'Always Free',      desc:'Every tool on Al Ummah AI is 100% free, forever. No subscription, no login.' },
    ],
    bannerH:   'Start using Al Ummah AI now',
    bannerSub: 'Free forever · No signup required',
    bannerCta: 'Get Started',
    guideBadge: '✦ Daily Guidance',
    guideH:    'Learn & Grow Daily',
    guideSub:  'Ramadan guides, daily duas, Islamic articles and AI-powered scholar.',
    guidance: [
      { emoji:'🌙', label:'Ramadan 2026', href:'/ramadan',  desc:'Full prayer timetable & spiritual guide for Ramadan' },
      { emoji:'🤲', label:'Daily Duas',   href:'/duas',     desc:'Morning, evening and essential Islamic supplications' },
      { emoji:'✍️', label:'Articles',    href:'/blog',      desc:'Islamic knowledge, history and practical life guides' },
      { emoji:'✨', label:'Scholar AI',  href:'/scholar',   desc:'Ask any Islamic question — from Quran & Sunnah' },
    ],
    exploreArrow: '→',
    allArticles: 'All Articles',
    pills: [
      ['Ramadan 2026','/blog/ramadan-2026-prayer-timetable'],
      ['Fajr Time Today','/blog/fajr-time-today'],
      ['Zakat 2026','/blog/calculate-zakat-2026'],
      ['Hajj Packages','/blog/hajj-packages-uk-2026'],
      ['Surah Al-Kahf','/blog/surah-al-kahf-friday'],
      ['How to Pray','/blog/how-to-pray-salah-beginners'],
      ['Islamic History','/blog/islamic-history-golden-age'],
      ['Halal Investing','/blog/best-halal-investment-apps-2026'],
    ],
    scholarH:   'Ask Scholar AI',
    scholarSub: 'Ask any Islamic question — answers grounded in Quran and Sunnah, in your language.',
    scholarCta: 'Ask a Question',
    shopBadge:  '✦ Islamic Store',
    shopH:      'Islamic Essentials',
    shopSub:    'Handpicked products for your spiritual life.',
    shop: [
      { emoji:'🕌', label:'Prayer Mats',        desc:'Premium quality' },
      { emoji:'📿', label:'Tasbih',             desc:'Hand-crafted' },
      { emoji:'📖', label:'Qurans',             desc:'Various editions' },
      { emoji:'🌙', label:'Ramadan Essentials', desc:'Complete sets' },
    ],
    visitShop: 'Visit Shop',
    ctaH:      'Start your spiritual journey',
    ctaGold:   'today',
    ctaSub:    'Prayer times, Quran, Qibla, Zakat — everything you need, free forever.',
    readQuran: 'Read Quran',
    exploreArticles: 'Explore Articles',
    chipLabels: ['Prayer Times','Qibla','Quran Audio'],
    chipSubs:   ['Live · GPS','Real-time','114 Surahs'],
  },

  ar: {
    heroH1:    'أدوات إسلامية مجانية —',
    heroH1b:   'أوقات الصلاة،',
    heroH1c:   'القبلة والقرآن',
    heroSub:   'المنصة الإسلامية المتكاملة — دقيقة وذكية ومجانية لـ 1.8 مليار مسلم حول العالم.',
    ctaGps:    'استخدم موقعي',
    ctaSearch: 'ابحث عن مدينة',
    trust:     ['أوقات صلاة دقيقة بـ GPS', 'اتجاه القبلة الآني', 'القرآن مع الصوت', 'موثّق من العلماء'],
    stats:     [['1.8B+','مسلم'],['150+','مدينة'],['5','لغات'],['100%','مجاني']],
    ramadanIn: (d:number) => `🌙 رمضان 2026 — ${d} يوماً متبقية ←`,
    ramadanPre:(d:number) => `🌙 ${d} يوماً حتى رمضان 2026 ←`,
    prayerBadge: '✦ مباشر · دقيق بـ GPS',
    prayerH:   'أوقات الصلاة بالقرب منك',
    prayerSub: 'يتم تحديده تلقائياً من موقعك. ابحث عن أي مدينة في العالم.',
    toolsBadge:'✦ أدوات مقدسة',
    toolsH:    'كل ما تحتاجه',
    tools: [
      { emoji:'🕐', label:'أوقات الصلاة',     badge:'مباشر', desc:'أوقات الفجر والظهر والعصر والمغرب والعشاء لأي مدينة.', link:'/prayer-times' },
      { emoji:'🧭', label:'اتجاه القبلة',      badge:'GPS',   desc:'بوصلة آنية نحو الكعبة المشرفة في مكة المكرمة.', link:'/qibla' },
      { emoji:'📖', label:'القرآن الكريم',     badge:'صوت',   desc:'القرآن كاملاً مع التلاوة الصوتية والترجمة والبحث.', link:'/quran' },
      { emoji:'💛', label:'حاسبة الزكاة',      badge:'2026',  desc:'احسب زكاتك السنوية بناءً على نصاب 2026.', link:'/zakat' },
    ],
    toolOpen: 'فتح',
    secondary: [
      { l:'دليل الحج',  link:'/hajj',    e:'🕋' },
      { l:'رمضان',      link:'/ramadan', e:'🌙' },
      { l:'عالم الذكاء',link:'/scholar', e:'✨' },
      { l:'المتجر',     link:'/store',   e:'🛍️' },
      { l:'السبحة',     link:'/tasbih',  e:'📿' },
    ],
    offerBadge: '✦ ما نقدمه',
    offerH:    'رفيقك الإسلامي المتكامل',
    offerP1:   'يجمع Al Ummah AI الأدوات الإسلامية الأساسية التي يحتاجها كل مسلم — في منصة واحدة نظيفة وسريعة ومجانية بـ 5 لغات.',
    offerP2:   'تستخدم أوقات الصلاة إحداثيات GPS الدقيقة لحساب أوقات الفجر والظهر والعصر والمغرب والعشاء لأي مدينة.',
    offerP3:   'يستخدم مكتشف القبلة بوصلة جهازك للإشارة نحو الكعبة. القرآن مع تلاوات صوتية كاملة وترجمات وبحث آية بآية.',
    benefits: [
      'أوقات صلاة بـ GPS لأكثر من 150 دولة وأي مدينة في العالم',
      'بوصلة قبلة آنية مع اتجاه الجهاز المباشر',
      'القرآن الكريم كاملاً مع التلاوة الصوتية والترجمات',
      'حاسبة الزكاة محدّثة لنصاب الذهب والفضة لعام 2026',
      'دليل رمضان 2026 الشامل مع جدول الصلاة',
      'أدعية يومية للصباح والمساء وجميع المناسبات',
      'مقالات إسلامية وتاريخ وأدلة حياتية عملية',
      'عالم الذكاء الاصطناعي — اسأل أي سؤال إسلامي بلغتك',
    ],
    whyBadge: '✦ لماذا Al Ummah AI',
    whyH:    'مبنية للأمة الإسلامية العالمية',
    whySub:  'على عكس تطبيقات الصلاة العادية، Al Ummah AI منصة روحية متكاملة تجمع التكنولوجيا الحديثة مع المعرفة الإسلامية الموثّقة.',
    why: [
      { title:'موثّق من العلماء',  desc:'جميع المحتويات مراجعة من قِبَل علماء مؤهلين لضمان الدقة والأصالة.' },
      { title:'دقة GPS',           desc:'أوقات الصلاة من إحداثيات GPS الدقيقة — لا تفوّت صلاة أبداً.' },
      { title:'5 لغات',            desc:'العربية والإنجليزية والفرنسية والإسبانية وأكثر — للأمة العالمية.' },
      { title:'دائماً مجاني',      desc:'كل أداة على Al Ummah AI مجانية 100% للأبد. بدون اشتراك.' },
    ],
    bannerH:   'ابدأ استخدام Al Ummah AI الآن',
    bannerSub: 'مجاني للأبد · لا تسجيل مطلوب',
    bannerCta: 'ابدأ الآن',
    guideBadge: '✦ إرشاد يومي',
    guideH:    'تعلّم وتطوّر كل يوم',
    guideSub:  'أدلة رمضان والأدعية اليومية والمقالات الإسلامية والعالم المدعوم بالذكاء الاصطناعي.',
    guidance: [
      { emoji:'🌙', label:'رمضان 2026',      href:'/ramadan',  desc:'الجدول الكامل لأوقات الصلاة ودليل روحي لرمضان' },
      { emoji:'🤲', label:'الأدعية اليومية', href:'/duas',     desc:'أذكار الصباح والمساء والأدعية الأساسية' },
      { emoji:'✍️', label:'المقالات',        href:'/blog',     desc:'المعرفة الإسلامية والتاريخ والأدلة العملية' },
      { emoji:'✨', label:'عالم الذكاء',    href:'/scholar',   desc:'اسأل أي سؤال إسلامي — من القرآن والسنة' },
    ],
    exploreArrow: '←',
    allArticles: 'جميع المقالات',
    pills: [
      ['رمضان 2026','/blog/ramadan-2026-prayer-timetable'],
      ['وقت الفجر اليوم','/blog/fajr-time-today'],
      ['الزكاة 2026','/blog/calculate-zakat-2026'],
      ['دليل الحج','/blog/hajj-packages-uk-2026'],
      ['سورة الكهف','/blog/surah-al-kahf-friday'],
      ['كيفية الصلاة','/blog/how-to-pray-salah-beginners'],
      ['التاريخ الإسلامي','/blog/islamic-history-golden-age'],
      ['الاستثمار الحلال','/blog/best-halal-investment-apps-2026'],
    ],
    scholarH:   'اسأل عالم الذكاء الاصطناعي',
    scholarSub: 'اسأل أي سؤال إسلامي — إجابات مستندة إلى القرآن والسنة بلغتك.',
    scholarCta: 'اطرح سؤالاً',
    shopBadge:  '✦ المتجر الإسلامي',
    shopH:      'الأساسيات الإسلامية',
    shopSub:    'منتجات مختارة لحياتك الروحية.',
    shop: [
      { emoji:'🕌', label:'سجادات الصلاة',    desc:'جودة فاخرة' },
      { emoji:'📿', label:'سبحة',             desc:'يدوية الصنع' },
      { emoji:'📖', label:'مصاحف',            desc:'طبعات متنوعة' },
      { emoji:'🌙', label:'مستلزمات رمضان',   desc:'طقم كامل' },
    ],
    visitShop: 'زيارة المتجر',
    ctaH:      'ابدأ رحلتك الروحية',
    ctaGold:   'اليوم',
    ctaSub:    'أوقات الصلاة، القرآن، القبلة، الزكاة — كل ما تحتاجه، مجاناً للأبد.',
    readQuran: 'اقرأ القرآن',
    exploreArticles: 'استكشف المقالات',
    chipLabels: ['أوقات الصلاة','القبلة','القرآن الصوتي'],
    chipSubs:   ['مباشر · GPS','آني','114 سورة'],
  },

  fr: {
    heroH1:    'Outils Islamiques Gratuits —',
    heroH1b:   'Heures de Prière,',
    heroH1c:   'Qibla & Coran',
    heroSub:   'La plateforme islamique complète — précise, intelligente et gratuite pour 1,8 milliard de musulmans.',
    ctaGps:    'Utiliser ma position',
    ctaSearch: 'Rechercher une ville',
    trust:     ['Horaires GPS précis', 'Direction Qibla en temps réel', 'Coran avec audio', 'Vérifié par des savants'],
    stats:     [['1,8Mrd','Musulmans'],['150+','Villes'],['5','Langues'],['100%','Gratuit']],
    ramadanIn: (d:number) => `🌙 Ramadan 2026 — ${d} jours restants →`,
    ramadanPre:(d:number) => `🌙 ${d} jours avant le Ramadan 2026 →`,
    prayerBadge: '✦ Live · Précision GPS',
    prayerH:   'Heures de Prière près de vous',
    prayerSub: 'Détecté automatiquement via GPS. Recherchez n\'importe quelle ville.',
    toolsBadge:'✦ Outils Sacrés',
    toolsH:    'Tout ce dont vous avez besoin',
    tools: [
      { emoji:'🕐', label:'Heures de Prière',   badge:'Live',  desc:'Heures précises de Fajr, Dhohr, Asr, Maghrib et Icha pour toute ville.', link:'/prayer-times' },
      { emoji:'🧭', label:'Direction Qibla',     badge:'GPS',   desc:'Boussole en temps réel vers la Sainte Kaaba à La Mecque.', link:'/qibla' },
      { emoji:'📖', label:'Coran',               badge:'Audio', desc:'Coran complet avec récitations audio, traductions et recherche.', link:'/quran' },
      { emoji:'💛', label:'Calculateur Zakat',   badge:'2026',  desc:'Calculez votre Zakat annuelle selon le Nisab 2026.', link:'/zakat' },
    ],
    toolOpen: 'Ouvrir',
    secondary: [
      { l:'Guide Hajj', link:'/hajj',    e:'🕋' },
      { l:'Ramadan',    link:'/ramadan', e:'🌙' },
      { l:'Scholar AI', link:'/scholar', e:'✨' },
      { l:'Boutique',   link:'/store',   e:'🛍️' },
      { l:'Tasbih',     link:'/tasbih',  e:'📿' },
    ],
    offerBadge: '✦ Ce que nous offrons',
    offerH:    'Votre Compagnon Islamique Complet',
    offerP1:   'Al Ummah AI réunit les outils islamiques essentiels en une plateforme propre, rapide et gratuite disponible en 5 langues.',
    offerP2:   'Nos horaires utilisent vos coordonnées GPS exactes pour calculer les heures précises de Fajr, Dhohr, Asr, Maghrib et Icha pour toute ville.',
    offerP3:   'Le Chercheur de Qibla utilise la boussole de votre appareil. Le Coran a des récitations audio complètes et des traductions. Notre calculateur Zakat utilise le Nisab 2026.',
    benefits: [
      'Horaires de prière GPS pour 150+ pays et toute ville dans le monde',
      'Boussole Qibla en temps réel avec orientation de l\'appareil',
      'Coran complet en arabe avec récitations audio et traductions',
      'Calculateur Zakat mis à jour pour le Nisab or et argent 2026',
      'Guide complet du Ramadan 2026 avec calendrier de prière',
      'Douaas quotidiennes pour le matin, le soir et toutes occasions',
      'Articles islamiques, histoire et guides de vie pratiques',
      'Scholar AI — posez toute question islamique dans votre langue',
    ],
    whyBadge: '✦ Pourquoi Al Ummah AI',
    whyH:    'Construit pour la Oumma Mondiale',
    whySub:  'Contrairement aux apps génériques, Al Ummah AI est une plateforme spirituelle complète combinant technologie moderne et savoir islamique vérifié.',
    why: [
      { title:'Vérifié par des savants', desc:'Tout le contenu revu par des savants qualifiés pour garantir précision et authenticité.' },
      { title:'Précision GPS',           desc:'Heures calculées depuis vos coordonnées GPS exactes — ne ratez plus aucune prière.' },
      { title:'5 Langues',              desc:'Anglais, arabe, français, espagnol et plus — pour la Oumma mondiale.' },
      { title:'Toujours Gratuit',       desc:'Chaque outil sur Al Ummah AI est 100% gratuit, pour toujours. Sans inscription.' },
    ],
    bannerH:   'Commencez à utiliser Al Ummah AI maintenant',
    bannerSub: 'Gratuit pour toujours · Aucune inscription requise',
    bannerCta: 'Commencer',
    guideBadge: '✦ Guidance Quotidienne',
    guideH:    'Apprenez & Grandissez Chaque Jour',
    guideSub:  'Guides du Ramadan, douaas quotidiennes, articles islamiques et scholar IA.',
    guidance: [
      { emoji:'🌙', label:'Ramadan 2026',        href:'/ramadan',  desc:'Calendrier de prière complet et guide spirituel du Ramadan' },
      { emoji:'🤲', label:'Douaas Quotidiennes',  href:'/duas',     desc:'Invocations du matin, du soir et essentielles de l\'Islam' },
      { emoji:'✍️', label:'Articles',             href:'/blog',     desc:'Connaissance islamique, histoire et guides pratiques' },
      { emoji:'✨', label:'Scholar AI',           href:'/scholar',  desc:'Posez toute question islamique — du Coran et de la Sunna' },
    ],
    exploreArrow: '→',
    allArticles: 'Tous les Articles',
    pills: [
      ['Ramadan 2026','/blog/ramadan-2026-prayer-timetable'],
      ['Fajr Aujourd\'hui','/blog/fajr-time-today'],
      ['Zakat 2026','/blog/calculate-zakat-2026'],
      ['Guide Hajj','/blog/hajj-packages-uk-2026'],
      ['Sourate Al-Kahf','/blog/surah-al-kahf-friday'],
      ['Comment Prier','/blog/how-to-pray-salah-beginners'],
      ['Histoire Islamique','/blog/islamic-history-golden-age'],
      ['Investissement Halal','/blog/best-halal-investment-apps-2026'],
    ],
    scholarH:   'Demandez à Scholar AI',
    scholarSub: 'Posez toute question islamique — réponses fondées sur le Coran et la Sunna, dans votre langue.',
    scholarCta: 'Poser une Question',
    shopBadge:  '✦ Boutique Islamique',
    shopH:      'Essentiels Islamiques',
    shopSub:    'Produits sélectionnés pour votre vie spirituelle.',
    shop: [
      { emoji:'🕌', label:'Tapis de Prière',    desc:'Qualité premium' },
      { emoji:'📿', label:'Tasbih',             desc:'Artisanal' },
      { emoji:'📖', label:'Corans',             desc:'Diverses éditions' },
      { emoji:'🌙', label:'Essentiels Ramadan', desc:'Ensembles complets' },
    ],
    visitShop: 'Visiter la Boutique',
    ctaH:      'Commencez votre voyage spirituel',
    ctaGold:   'aujourd\'hui',
    ctaSub:    'Heures de prière, Coran, Qibla, Zakat — tout ce dont vous avez besoin, gratuit pour toujours.',
    readQuran: 'Lire le Coran',
    exploreArticles: 'Explorer les Articles',
    chipLabels: ['Heures de Prière','Qibla','Coran Audio'],
    chipSubs:   ['Live · GPS','Temps réel','114 Sourates'],
  },

  es: {
    heroH1:    'Herramientas Islámicas Gratuitas —',
    heroH1b:   'Horarios de Oración,',
    heroH1c:   'Qibla y Corán',
    heroSub:   'La plataforma islámica completa — precisa, inteligente y gratuita para 1.800 millones de musulmanes.',
    ctaGps:    'Usar mi ubicación',
    ctaSearch: 'Buscar ciudad',
    trust:     ['Horarios GPS precisos', 'Dirección Qibla en tiempo real', 'Corán con audio', 'Verificado por eruditos'],
    stats:     [['1.800M+','Musulmanes'],['150+','Ciudades'],['5','Idiomas'],['100%','Gratis']],
    ramadanIn: (d:number) => `🌙 Ramadán 2026 — ${d} días restantes →`,
    ramadanPre:(d:number) => `🌙 ${d} días para el Ramadán 2026 →`,
    prayerBadge: '✦ Live · Precisión GPS',
    prayerH:   'Horarios de Oración cerca de ti',
    prayerSub: 'Detectado automáticamente por GPS. Busca cualquier ciudad del mundo.',
    toolsBadge:'✦ Herramientas Sagradas',
    toolsH:    'Todo lo que necesitas',
    tools: [
      { emoji:'🕐', label:'Horarios de Oración', badge:'Live',  desc:'Horarios precisos de Fajr, Dhuhr, Asr, Maghrib e Isha para cualquier ciudad.', link:'/prayer-times' },
      { emoji:'🧭', label:'Buscador de Qibla',   badge:'GPS',   desc:'Brújula en tiempo real hacia la Kaaba en La Meca.', link:'/qibla' },
      { emoji:'📖', label:'Corán',               badge:'Audio', desc:'Corán completo con recitaciones, traducciones y búsqueda de versículos.', link:'/quran' },
      { emoji:'💛', label:'Calculadora Zakat',   badge:'2026',  desc:'Calcula tu Zakat anual según el Nisab 2026.', link:'/zakat' },
    ],
    toolOpen: 'Abrir',
    secondary: [
      { l:'Guía Hajj', link:'/hajj',    e:'🕋' },
      { l:'Ramadán',   link:'/ramadan', e:'🌙' },
      { l:'Scholar AI',link:'/scholar', e:'✨' },
      { l:'Tienda',    link:'/store',   e:'🛍️' },
      { l:'Tasbih',    link:'/tasbih',  e:'📿' },
    ],
    offerBadge: '✦ Lo que ofrecemos',
    offerH:    'Tu Compañero Islámico Completo',
    offerP1:   'Al Ummah AI reúne las herramientas islámicas esenciales en una plataforma limpia, rápida y gratuita disponible en 5 idiomas.',
    offerP2:   'Nuestros horarios usan tus coordenadas GPS exactas para calcular Fajr, Dhuhr, Asr, Maghrib e Isha para cualquier ciudad.',
    offerP3:   'El Buscador de Qibla usa la brújula de tu dispositivo. El Corán tiene recitaciones audio completas y traducciones. La Calculadora Zakat usa el Nisab 2026.',
    benefits: [
      'Horarios de oración GPS para 150+ países y cualquier ciudad',
      'Brújula Qibla en tiempo real con orientación del dispositivo',
      'Corán completo en árabe con recitaciones audio y traducciones',
      'Calculadora Zakat actualizada para el Nisab de oro y plata 2026',
      'Guía completa del Ramadán 2026 con calendario de oración',
      'Duas diarias para la mañana, tarde y todas las ocasiones',
      'Artículos islámicos, historia y guías de vida práctica',
      'Scholar AI — haz cualquier pregunta islámica en tu idioma',
    ],
    whyBadge: '✦ Por qué Al Ummah AI',
    whyH:    'Construido para la Ummah Global',
    whySub:  'A diferencia de las apps genéricas, Al Ummah AI es una plataforma espiritual completa que combina tecnología moderna con conocimiento islámico verificado.',
    why: [
      { title:'Verificado por Eruditos', desc:'Todo el contenido revisado por eruditos calificados para garantizar precisión y autenticidad.' },
      { title:'Precisión GPS',           desc:'Horarios desde tus coordenadas GPS exactas — nunca pierdas una oración.' },
      { title:'5 Idiomas',              desc:'Inglés, árabe, francés, español y más — para la Ummah global.' },
      { title:'Siempre Gratis',         desc:'Cada herramienta en Al Ummah AI es 100% gratuita, para siempre. Sin registro.' },
    ],
    bannerH:   'Comienza a usar Al Ummah AI ahora',
    bannerSub: 'Gratis para siempre · Sin registro requerido',
    bannerCta: 'Empezar',
    guideBadge: '✦ Guía Diaria',
    guideH:    'Aprende y Crece Cada Día',
    guideSub:  'Guías del Ramadán, duas diarias, artículos islámicos y scholar con IA.',
    guidance: [
      { emoji:'🌙', label:'Ramadán 2026',  href:'/ramadan',  desc:'Calendario de oración completo y guía espiritual del Ramadán' },
      { emoji:'🤲', label:'Duas Diarias',  href:'/duas',     desc:'Súplicas de mañana, tarde y esenciales del Islam' },
      { emoji:'✍️', label:'Artículos',    href:'/blog',      desc:'Conocimiento islámico, historia y guías prácticas' },
      { emoji:'✨', label:'Scholar AI',   href:'/scholar',   desc:'Haz cualquier pregunta islámica — del Corán y la Sunnah' },
    ],
    exploreArrow: '→',
    allArticles: 'Todos los Artículos',
    pills: [
      ['Ramadán 2026','/blog/ramadan-2026-prayer-timetable'],
      ['Fajr Hoy','/blog/fajr-time-today'],
      ['Zakat 2026','/blog/calculate-zakat-2026'],
      ['Guía Hajj','/blog/hajj-packages-uk-2026'],
      ['Sura Al-Kahf','/blog/surah-al-kahf-friday'],
      ['Cómo Rezar','/blog/how-to-pray-salah-beginners'],
      ['Historia Islámica','/blog/islamic-history-golden-age'],
      ['Inversión Halal','/blog/best-halal-investment-apps-2026'],
    ],
    scholarH:   'Pregunta al Scholar AI',
    scholarSub: 'Haz cualquier pregunta islámica — respuestas basadas en el Corán y la Sunnah, en tu idioma.',
    scholarCta: 'Hacer una Pregunta',
    shopBadge:  '✦ Tienda Islámica',
    shopH:      'Esenciales Islámicos',
    shopSub:    'Productos seleccionados para tu vida espiritual.',
    shop: [
      { emoji:'🕌', label:'Alfombras de Oración', desc:'Calidad premium' },
      { emoji:'📿', label:'Tasbih',               desc:'Artesanal' },
      { emoji:'📖', label:'Coranes',              desc:'Varias ediciones' },
      { emoji:'🌙', label:'Esenciales Ramadán',   desc:'Conjuntos completos' },
    ],
    visitShop: 'Visitar Tienda',
    ctaH:      'Comienza tu viaje espiritual',
    ctaGold:   'hoy',
    ctaSub:    'Horarios de oración, Corán, Qibla, Zakat — todo lo que necesitas, gratis para siempre.',
    readQuran: 'Leer Corán',
    exploreArticles: 'Explorar Artículos',
    chipLabels: ['Horarios de Oración','Qibla','Corán Audio'],
    chipSubs:   ['Live · GPS','Tiempo real','114 Suras'],
  },
};

const WHY_ICONS = [<Shield size={20} />, <MapPin size={20} />, <Globe size={20} />, <Zap size={20} />];

/* ── Helpers ─────────────────────────────────────────────── */
function useCountdown(target: string) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const d = Math.ceil((new Date(target).getTime() - Date.now()) / 86400000);
    setDays(d > 0 ? d : 0);
  }, [target]);
  return days;
}

function Reveal({ children, delay = 0, y = 22 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function SBadge({ t, dark = false }: { t: string; dark?: boolean }) {
  return (
    <span style={{ display: 'inline-block', padding: '4px 14px', marginBottom: 14, background: dark ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.09)', border: `1px solid ${dark ? 'rgba(212,175,55,0.24)' : 'rgba(212,175,55,0.22)'}`, borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontSize: '0.59rem', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: dark ? '#D4AF37' : '#b8941e' }}>{t}</span>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export function Home() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0, 2) || 'en') as string;
  const L = UI[lang] || UI.en;
  const isRTL = lang === 'ar';

  const daysToRamadan = useCountdown('2026-02-17');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phraseVis, setPhraseVis] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setPhraseVis(false);
      setTimeout(() => { setPhraseIdx(i => (i + 1) % PHRASES.length); setPhraseVis(true); }, 380);
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const phrase = PHRASES[phraseIdx];
  const phraseSub = lang === 'fr' ? phrase.fr : lang === 'es' ? phrase.es : lang === 'ar' ? phrase.ar : phrase.en;

  const schema = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Al Ummah AI', url: 'https://www.alummahai.com', description: 'Free Islamic platform for accurate prayer times, Qibla, Quran, Zakat and daily Islamic guidance.' };
  const sp = { padding: 'clamp(60px,8vw,96px) clamp(16px,5vw,48px)' };

  return (
    <div style={{ background: '#ffffff', color: '#0a2540', overflowX: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
      <SEO
        title="Prayer Times Near Me Today — Free Islamic Tools | Al Ummah AI"
        description="Accurate GPS prayer times for Fajr, Dhuhr, Asr, Maghrib & Isha. Real-time Qibla finder, full Quran with audio, Zakat calculator and Ramadan 2026 guide. Free for 1.8 billion Muslims."
        keywords="prayer times near me, fajr time today, qibla finder, quran with audio, zakat calculator 2026, ramadan 2026, islamic platform free"
        canonical="https://www.alummahai.com"
        schema={schema}
      />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(165deg,#0a2540 0%,#0d2e4d 52%,#071a2e 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(100px,13vh,150px) clamp(16px,5vw,48px) clamp(64px,9vh,100px)', position: 'relative', overflow: 'hidden' }}>

        {/* Bg grid dots */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.1) 1px, transparent 1px)', backgroundSize: '38px 38px', opacity: 0.55, pointerEvents: 'none' }} />
        {/* Breathing glow */}
        <motion.div animate={{ opacity: [0.6, 1, 0.6], scale: [0.97, 1.02, 0.97] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '48%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(700px,88vw)', height: 'min(700px,88vw)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Rings */}
        {[520, 760].map(s => (<div key={s} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: `min(${s}px,85vw)`, height: `min(${s}px,85vw)`, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.05)', pointerEvents: 'none' }} />))}
        {/* City dots */}
        {[{n:'Makkah',t:'41%',l:'57%'},{n:'London',t:'24%',l:'44%'},{n:'Jakarta',t:'55%',l:'78%'},{n:'Cairo',t:'38%',l:'53%'},{n:'Istanbul',t:'28%',l:'51%'},{n:'Karachi',t:'43%',l:'66%'},{n:'Lagos',t:'50%',l:'46%'}].map((c, i) => (
          <motion.div key={c.n} animate={{ opacity: [0.25, 0.75, 0.25] }} transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }} style={{ position: 'absolute', top: c.t, left: c.l, pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ position: 'relative' }}>
              <motion.div animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }} style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'rgba(212,175,55,0.15)' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,0.6)' }} />
            </div>
            <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', fontSize: '0.44rem', fontFamily: "'DM Sans',sans-serif", fontWeight: 800, color: 'rgba(212,175,55,0.5)', whiteSpace: 'nowrap', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{c.n}</div>
          </motion.div>
        ))}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 740, textAlign: 'center', width: '100%' }}>

          {/* Arabic phrase rotator */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={{ marginBottom: 30, minHeight: 64 }}>
            <div style={{ fontFamily: "'Amiri',serif", fontSize: 'clamp(1.35rem,4.2vw,2.6rem)', color: '#D4AF37', direction: 'rtl', lineHeight: 1.3, opacity: phraseVis ? 1 : 0, transform: phraseVis ? 'translateY(0)' : 'translateY(-6px)', transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)', textShadow: '0 0 36px rgba(212,175,55,0.2)' }}>
              {phrase.ar}
            </div>
            <div style={{ fontSize: '0.66rem', color: 'rgba(212,175,55,0.44)', letterSpacing: '2px', marginTop: 6, fontStyle: 'italic', opacity: phraseVis ? 1 : 0, transition: 'opacity 0.38s ease 0.1s', fontFamily: "'DM Sans',sans-serif", direction: 'ltr' }}>
              {phraseSub}
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.72, ease: [0.16,1,0.3,1] }} style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(2.1rem,6.5vw,4.6rem)', color: '#ffffff', lineHeight: 1.06, letterSpacing: '-0.025em', marginBottom: 18 }}>
            {L.heroH1}{' '}<span style={{ color: '#D4AF37', textShadow: '0 0 26px rgba(212,175,55,0.22)' }}>{L.heroH1b}</span>{' '}{L.heroH1c}
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(0.98rem,2.2vw,1.16rem)', color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '0 auto 38px', lineHeight: 1.8 }}>
            {L.heroSub}
          </motion.p>

          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 44 }}>
            <Link to="/prayer-times" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#D4AF37', color: '#0a2540', padding: '14px 28px', borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', boxShadow: '0 8px 28px rgba(212,175,55,0.34)', transition: 'all 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(212,175,55,0.42)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(212,175,55,0.34)'; }}>
              <MapPin size={16} /> {L.ctaGps}
            </Link>
            <Link to="/prayer-times" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: '#ffffff', padding: '14px 28px', borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', transition: 'all 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.color = '#D4AF37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#ffffff'; }}>
              <Search size={15} /> {L.ctaSearch}
            </Link>
          </motion.div>

          {/* Tool chips */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 44 }}>
            {L.chipLabels.map((label: string, i: number) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 11, padding: '10px 15px', backdropFilter: 'blur(10px)' }}>
                <span style={{ fontSize: '1.15rem' }}>{['🕐','🧭','📖'][i]}</span>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.79rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.58rem', color: 'rgba(212,175,55,0.65)', fontWeight: 700, letterSpacing: '0.1em', marginTop: 1 }}>{L.chipSubs[i]}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }} style={{ display: 'flex', gap: 'clamp(18px,4vw,44px)', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {L.stats.map(([n,l]: string[]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.45rem,3vw,1.85rem)', color: '#D4AF37', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.18em', marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </motion.div>

          {/* Ramadan pill */}
          {(() => {
            const now = Date.now(), start = new Date('2026-02-17').getTime(), end = new Date('2026-03-19').getTime();
            const inRamadan = now >= start && now < end;
            const daysLeft = Math.max(Math.ceil((end - now) / 86400000), 0);
            if (!inRamadan && daysToRamadan === 0) return null;
            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.82 }} style={{ marginTop: 26 }}>
                <Link to="/ramadan" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '8px 18px', borderRadius: 99, border: `1px solid ${inRamadan ? 'rgba(34,197,94,0.35)' : 'rgba(212,175,55,0.24)'}`, background: inRamadan ? 'rgba(34,197,94,0.08)' : 'rgba(212,175,55,0.08)', color: inRamadan ? '#22c55e' : '#D4AF37', fontFamily: "'DM Sans',sans-serif", fontSize: '0.77rem', fontWeight: 700, textDecoration: 'none' }}>
                  {inRamadan
                    ? <><motion.span animate={{ scale:[1,1.5,1], opacity:[0.5,1,0.5] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block', boxShadow:'0 0 8px rgba(34,197,94,0.6)' }} />{L.ramadanIn(daysLeft)}</>
                    : L.ramadanPre(daysToRamadan)
                  }
                </Link>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* ══ TRUST BAR ══════════════════════════════════════════ */}
      <div style={{ background: '#f7f8fa', borderBottom: '1px solid rgba(10,37,64,0.07)', padding: '13px clamp(16px,5vw,48px)', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', maxWidth: 920, margin: '0 auto' }}>
          {['📍','🧭','📖','🛡️'].map((icon, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px clamp(10px,2.5vw,22px)', borderRight: i < 3 ? '1px solid rgba(10,37,64,0.07)' : 'none', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '0.86rem' }}>{icon}</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 'clamp(0.69rem,1.5vw,0.76rem)', color: 'rgba(10,37,64,0.56)' }}>{L.trust[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PRAYER TIMES ═══════════════════════════════════════ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', ...sp }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <SBadge t={L.prayerBadge} />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.85rem,4.5vw,3.1rem)', color: '#0a2540', marginBottom: 11, letterSpacing: '-0.015em', display: 'block' }}>{L.prayerH}</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', maxWidth: 380, margin: '0 auto', lineHeight: 1.8, fontSize: 'clamp(0.88rem,2vw,0.98rem)' }}>{L.prayerSub}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}><PrayerWidget /></Reveal>
      </section>

      {/* ══ FOUR TOOLS ═════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', ...sp }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <SBadge t={L.toolsBadge} dark />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.85rem,4.5vw,3.1rem)', color: '#ffffff', letterSpacing: '-0.015em', display: 'block' }}>{L.toolsH}</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(215px,1fr))', gap: 14, marginBottom: 12 }}>
            {L.tools.map((tool: any, i: number) => (
              <Reveal key={tool.label} delay={i * 0.07}>
                <Link to={tool.link} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '24px 20px', height: '100%', position: 'relative', transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)' }}
                    onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.35)'; t.style.background = 'rgba(255,255,255,0.07)'; t.style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(255,255,255,0.08)'; t.style.background = 'rgba(255,255,255,0.04)'; t.style.transform = 'translateY(0)'; }}>
                    <span style={{ position: 'absolute', top: 15, right: 15, fontSize: '0.52rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#D4AF37', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', padding: '2px 7px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif" }}>{tool.badge}</span>
                    <div style={{ fontSize: '2rem', marginBottom: 14 }}>{tool.emoji}</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1.08rem', color: '#ffffff', marginBottom: 7 }}>{tool.label}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.65 }}>{tool.desc}</p>
                    <div style={{ marginTop: 18, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.66rem', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 3 }}>{L.toolOpen} <ChevronRight size={10} /></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 9 }}>
            {L.secondary.map((item: any) => (
              <Link key={item.l} to={item.link} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 11, padding: '12px 14px', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.81rem', color: 'rgba(255,255,255,0.46)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.28)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.46)'; }}>
                <span style={{ fontSize: '1.05rem' }}>{item.e}</span> {item.l}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OFFER / WHY ════════════════════════════════════════ */}
      <section style={{ background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.06)', ...sp }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 56, alignItems: 'start' }}>
              <div>
                <SBadge t={L.offerBadge} />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', color: '#0a2540', marginBottom: 18, letterSpacing: '-0.015em', lineHeight: 1.15 }}>{L.offerH}</h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.6)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: 20 }}>{L.offerP1}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.6)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: 20 }}>{L.offerP2}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.6)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: 24 }}>{L.offerP3}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {L.benefits.map((item: string) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ color: '#D4AF37', fontSize: '0.8rem', marginTop: 2, flexShrink: 0 }}>✦</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.88rem', color: 'rgba(10,37,64,0.65)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SBadge t={L.whyBadge} />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', color: '#0a2540', marginBottom: 18, letterSpacing: '-0.015em', lineHeight: 1.15 }}>{L.whyH}</h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.6)', lineHeight: 1.85, fontSize: '0.97rem', marginBottom: 28 }}>{L.whySub}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
                  {L.why.map((item: any, i: number) => (
                    <Reveal key={item.title} delay={i * 0.07}>
                      <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)', borderRadius: 14, padding: '18px 16px', transition: 'all 0.24s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(212,175,55,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ color: '#D4AF37', marginBottom: 10 }}>{WHY_ICONS[i]}</div>
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '0.95rem', color: '#0a2540', marginBottom: 6 }}>{item.title}</h3>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(10,37,64,0.5)', lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div style={{ marginTop: 28, padding: '20px 22px', background: 'linear-gradient(120deg,#0a2540 0%,#0d2e4d 100%)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1rem', color: '#ffffff', marginBottom: 4 }}>{L.bannerH}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.42)' }}>{L.bannerSub}</div>
                  </div>
                  <Link to="/prayer-times" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4AF37', color: '#0a2540', padding: '10px 18px', borderRadius: 9, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.72rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {L.bannerCta} <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ GUIDANCE ═══════════════════════════════════════════ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', ...sp }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <SBadge t={L.guideBadge} />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.75rem,4vw,2.9rem)', color: '#0a2540', marginBottom: 7, letterSpacing: '-0.015em', display: 'block' }}>{L.guideH}</h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', lineHeight: 1.78, maxWidth: 360, fontSize: 'clamp(0.87rem,2vw,0.96rem)' }}>{L.guideSub}</p>
            </div>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid rgba(212,175,55,0.32)', color: '#b8941e', padding: '9px 18px', borderRadius: 99, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.71rem', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              {L.allArticles} <ArrowRight size={12} />
            </Link>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(215px,1fr))', gap: 13, marginBottom: 26 }}>
          {L.guidance.map((item: any, i: number) => (
            <Reveal key={item.label} delay={i * 0.07}>
              <Link to={item.href} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.09)', borderRadius: 16, padding: '22px 18px', height: '100%', transition: 'all 0.26s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.35)'; t.style.boxShadow = '0 7px 28px rgba(212,175,55,0.08)'; t.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(10,37,64,0.09)'; t.style.boxShadow = 'none'; t.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: '1.85rem', marginBottom: 12 }}>{item.emoji}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '1rem', color: '#0a2540', marginBottom: 5 }}>{item.label}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.46)', fontSize: '0.82rem', lineHeight: 1.65 }}>{item.desc}</p>
                  <div style={{ marginTop: 15, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.65rem', color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{L.exploreArrow}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
            {L.pills.map(([label, link]: string[]) => (
              <Link key={label} to={link} style={{ padding: '7px 14px', background: 'rgba(10,37,64,0.04)', border: '1px solid rgba(10,37,64,0.09)', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '0.75rem', color: 'rgba(10,37,64,0.56)', textDecoration: 'none', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.36)'; e.currentTarget.style.color = '#b8941e'; e.currentTarget.style.background = 'rgba(212,175,55,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,37,64,0.09)'; e.currentTarget.style.color = 'rgba(10,37,64,0.56)'; e.currentTarget.style.background = 'rgba(10,37,64,0.04)'; }}>
                {label}
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <Link to="/scholar" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(120deg,#0a2540 0%,#0d2e4d 100%)', borderRadius: 18, padding: 'clamp(24px,3.5vw,36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.24s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div>
                <div style={{ fontSize: '1.9rem', marginBottom: 9 }}>✨</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 'clamp(1.15rem,3vw,1.55rem)', color: '#ffffff', marginBottom: 5 }}>{L.scholarH}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.42)', fontSize: '0.88rem', maxWidth: 370, lineHeight: 1.78 }}>{L.scholarSub}</p>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#D4AF37', color: '#0a2540', padding: '12px 22px', borderRadius: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap', boxShadow: '0 5px 20px rgba(212,175,55,0.26)', flexShrink: 0 }}>
                {L.scholarCta} <ArrowRight size={13} />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ══ SHOP ═══════════════════════════════════════════════ */}
      <section style={{ background: '#f7f8fa', borderTop: '1px solid rgba(10,37,64,0.06)', ...sp }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 38, flexWrap: 'wrap', gap: 14 }}>
              <div>
                <SBadge t={L.shopBadge} />
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.75rem,4vw,2.9rem)', color: '#0a2540', marginBottom: 5, letterSpacing: '-0.015em', display: 'block' }}>{L.shopH}</h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.5)', fontSize: 'clamp(0.87rem,2vw,0.96rem)' }}>{L.shopSub}</p>
              </div>
              <Link to="/store" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4AF37', color: '#0a2540', padding: '10px 20px', borderRadius: 99, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.71rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 16px rgba(212,175,55,0.2)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {L.visitShop} <ArrowRight size={12} />
              </Link>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(195px,1fr))', gap: 13 }}>
            {L.shop.map((item: any, i: number) => (
              <Reveal key={item.label} delay={i * 0.06}>
                <Link to="/store" style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{ background: '#ffffff', border: '1px solid rgba(10,37,64,0.08)', borderRadius: 15, padding: '28px 16px', textAlign: 'center', transition: 'all 0.26s' }}
                    onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(212,175,55,0.35)'; t.style.boxShadow = '0 7px 24px rgba(212,175,55,0.08)'; t.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(10,37,64,0.08)'; t.style.boxShadow = 'none'; t.style.transform = 'translateY(0)'; }}>
                    <div style={{ fontSize: '2.4rem', marginBottom: 11 }}>{item.emoji}</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, color: '#0a2540', fontSize: '0.93rem', marginBottom: 4 }}>{item.label}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(10,37,64,0.36)', fontSize: '0.74rem' }}>{item.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg,#0a2540 0%,#071a2e 100%)', ...sp, textAlign: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            <div style={{ fontSize: '2.8rem', marginBottom: 18 }}>🌙</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.9rem,5vw,3.6rem)', color: '#ffffff', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 14 }}>
              {L.ctaH} <span style={{ color: '#D4AF37' }}>{L.ctaGold}</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.44)', fontSize: 'clamp(0.94rem,2.2vw,1.06rem)', maxWidth: 400, margin: '0 auto 36px', lineHeight: 1.8 }}>{L.ctaSub}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/quran" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#D4AF37', color: '#0a2540', padding: '13px 26px', borderRadius: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', boxShadow: '0 7px 26px rgba(212,175,55,0.3)', transition: 'all 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 11px 32px rgba(212,175,55,0.38)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 7px 26px rgba(212,175,55,0.3)'; }}>
                <BookOpen size={15} /> {L.readQuran}
              </Link>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', color: '#ffffff', padding: '13px 26px', borderRadius: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', transition: 'all 0.22s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = '#ffffff'; }}>
                {L.exploreArticles}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
