import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Calendar, Clock, TrendingUp, ArrowRight, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAVY  = '#0a2540';
const NAVY2 = '#0d2e4d';
const GOLD  = '#D4AF37';

/* ── UI translations ────────────────────────────────────────── */
const T: Record<string, any> = {
  en: { badge:'Ummah Insights', title:'Islamic Blog', sub:'Guides, wisdom and knowledge for the modern Muslim. Updated weekly.', featured:'Featured', trending:'Trending Now', readArticle:'Read Article', hot:'Hot', never:'Never Miss an Article', neverSub:'New guides on prayer, Quran, halal finance and Islamic lifestyle published weekly.', explore:'Explore All Tools →', read:'read', cats:{ All:'All', Ramadan:'Ramadan', Prayer:'Prayer', Finance:'Finance', Quran:'Quran', Hajj:'Hajj', Lifestyle:'Lifestyle', History:'History' }, instaCta:'Follow on Instagram', instaHandle:'@alummahai' },
  ar: { badge:'رؤى الأمة', title:'المدونة الإسلامية', sub:'أدلة وحكمة ومعرفة للمسلم المعاصر. يُحدَّث أسبوعياً.', featured:'مميز', trending:'الأكثر رواجاً', readArticle:'اقرأ المقال', hot:'رائج', never:'لا تفوّت أي مقال', neverSub:'أدلة جديدة عن الصلاة والقرآن والمال الحلال وأسلوب الحياة الإسلامي تُنشر أسبوعياً.', explore:'استكشف جميع الأدوات ←', read:'قراءة', cats:{ All:'الكل', Ramadan:'رمضان', Prayer:'الصلاة', Finance:'المالية', Quran:'القرآن', Hajj:'الحج', Lifestyle:'أسلوب الحياة', History:'التاريخ' }, instaCta:'تابعنا على إنستغرام', instaHandle:'@alummahai' },
  fr: { badge:'Perspectives de l\'Oumma', title:'Blog Islamique', sub:'Guides, sagesse et connaissance pour le musulman moderne. Mis à jour chaque semaine.', featured:'À la Une', trending:'Tendance', readArticle:'Lire l\'Article', hot:'Populaire', never:'Ne Manquez Aucun Article', neverSub:'Nouveaux guides sur la prière, le Coran, la finance halal et le mode de vie islamique publiés chaque semaine.', explore:'Explorer Tous les Outils →', read:'min', cats:{ All:'Tout', Ramadan:'Ramadan', Prayer:'Prière', Finance:'Finance', Quran:'Coran', Hajj:'Hajj', Lifestyle:'Mode de vie', History:'Histoire' }, instaCta:'Suivre sur Instagram', instaHandle:'@alummahai' },
  es: { badge:'Perspectivas de la Ummah', title:'Blog Islámico', sub:'Guías, sabiduría y conocimiento para el musulmán moderno. Actualizado semanalmente.', featured:'Destacado', trending:'Tendencia', readArticle:'Leer Artículo', hot:'Popular', never:'No Te Pierdas Ningún Artículo', neverSub:'Nuevas guías sobre oración, Corán, finanzas halal y estilo de vida islámico publicadas semanalmente.', explore:'Explorar Todas las Herramientas →', read:'lectura', cats:{ All:'Todo', Ramadan:'Ramadán', Prayer:'Oración', Finance:'Finanzas', Quran:'Corán', Hajj:'Hajj', Lifestyle:'Estilo de Vida', History:'Historia' }, instaCta:'Seguir en Instagram', instaHandle:'@alummahai' },
};

/* ── Article data with 4-language titles + excerpts ────────── */
interface Post {
  id: string;
  titles: Record<string, string>;
  excerpts: Record<string, string>;
  date: string; image: string; category: string; readTime: string;
  featured?: boolean; trending?: boolean;
}

const POSTS: Post[] = [
  {
    id: 'last-10-nights-ramadan',
    titles: {
      en: 'The Last 10 Nights of Ramadan: Complete Guide to Laylatul Qadr',
      ar: 'العشر الأواخر من رمضان: الدليل الشامل لليلة القدر',
      fr: 'Les 10 Dernières Nuits du Ramadan: Guide Complet de Laylatul Qadr',
      es: 'Las Últimas 10 Noches de Ramadán: Guía Completa de Laylatul Qadr',
    },
    excerpts: {
      en: 'The most sacred nights in Islam. Learn how to find Laylatul Qadr, perform Itikaf, and maximise your worship in the final stretch of Ramadan 2026.',
      ar: 'أقدس الليالي في الإسلام. تعلم كيف تجد ليلة القدر وتؤدي الاعتكاف وتعظّم عبادتك في الأيام الأخيرة من رمضان 2026.',
      fr: 'Les nuits les plus sacrées de l\'Islam. Découvrez comment trouver Laylatul Qadr, pratiquer l\'Itikaf et maximiser votre adoration dans la dernière partie du Ramadan 2026.',
      es: 'Las noches más sagradas del Islam. Aprende cómo encontrar Laylatul Qadr, realizar el Itikaf y maximizar tu adoración en el tramo final de Ramadán 2026.',
    },
    date: 'Mar 9, 2026', image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80', category: 'Ramadan', readTime: '8', featured: true, trending: true,
  },
  {
    id: 'ramadan-2026-prayer-timetable',
    titles: {
      en: 'Ramadan 2026 Prayer Timetable: Suhoor & Iftar Times by City',
      ar: 'جدول صلاة رمضان 2026: أوقات السحور والإفطار حسب المدينة',
      fr: 'Calendrier de Prière du Ramadan 2026: Heures de Suhoor et Iftar par Ville',
      es: 'Calendario de Oración de Ramadán 2026: Horarios de Suhoor e Iftar por Ciudad',
    },
    excerpts: {
      en: 'Accurate Suhoor and Iftar times for every city worldwide during Ramadan 2026. London, Paris, Dubai, New York and 50+ cities covered.',
      ar: 'أوقات السحور والإفطار الدقيقة لكل مدينة في العالم خلال رمضان 2026. تغطية لندن وباريس ودبي ونيويورك وأكثر من 50 مدينة.',
      fr: 'Horaires précis de Suhoor et Iftar pour chaque ville du monde pendant le Ramadan 2026. Londres, Paris, Dubai, New York et plus de 50 villes couvertes.',
      es: 'Horarios precisos de Suhoor e Iftar para cada ciudad del mundo durante Ramadán 2026. Londres, París, Dubai, Nueva York y más de 50 ciudades cubiertas.',
    },
    date: 'Mar 8, 2026', image: 'https://images.unsplash.com/photo-1542816052-e1b0b5c1c4b9?w=800&q=80', category: 'Ramadan', readTime: '5', trending: true,
  },
  {
    id: 'fajr-time-today',
    titles: {
      en: 'What Time is Fajr Today? Complete Guide to Dawn Prayer',
      ar: 'ما وقت صلاة الفجر اليوم؟ الدليل الشامل لصلاة الفجر',
      fr: 'À Quelle Heure est le Fajr Aujourd\'hui ? Guide Complet de la Prière de l\'Aube',
      es: '¿A Qué Hora es Fajr Hoy? Guía Completa de la Oración del Amanecer',
    },
    excerpts: {
      en: 'How to find the exact Fajr time for your location, why Fajr is the most rewarded prayer, and tips for waking up consistently for Salah.',
      ar: 'كيف تجد وقت الفجر الدقيق لموقعك، ولماذا الفجر هي الصلاة الأكثر ثواباً، ونصائح للاستيقاظ المنتظم للصلاة.',
      fr: 'Comment trouver l\'heure exacte du Fajr pour votre localisation, pourquoi le Fajr est la prière la plus récompensée, et des conseils pour se lever régulièrement pour la Salah.',
      es: 'Cómo encontrar la hora exacta de Fajr para tu ubicación, por qué Fajr es la oración más recompensada y consejos para levantarte regularmente para la Salah.',
    },
    date: 'Mar 7, 2026', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'Prayer', readTime: '5', trending: true,
  },
  {
    id: 'calculate-zakat-2026',
    titles: {
      en: 'How to Calculate Zakat 2026: Step-by-Step Guide',
      ar: 'كيفية حساب الزكاة 2026: دليل خطوة بخطوة',
      fr: 'Comment Calculer la Zakat 2026 : Guide Étape par Étape',
      es: 'Cómo Calcular el Zakat 2026: Guía Paso a Paso',
    },
    excerpts: {
      en: 'Nisab threshold, Zakat on gold, silver, cash, stocks and business inventory. Calculate your exact obligation for 2026 with our free calculator.',
      ar: 'نصاب الزكاة، زكاة الذهب والفضة والنقد والأسهم والمخزون التجاري. احسب التزامك الدقيق لعام 2026 بآلتنا الحاسبة المجانية.',
      fr: 'Seuil de Nisab, Zakat sur l\'or, l\'argent, les espèces, les actions et les stocks commerciaux. Calculez votre obligation exacte pour 2026 avec notre calculateur gratuit.',
      es: 'Umbral de Nisab, Zakat sobre oro, plata, efectivo, acciones e inventario comercial. Calcula tu obligación exacta para 2026 con nuestra calculadora gratuita.',
    },
    date: 'Mar 6, 2026', image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80', category: 'Finance', readTime: '6',
  },
  {
    id: 'hajj-packages-uk-2026',
    titles: {
      en: 'Hajj 2026 Complete Guide: Dates, Rituals & What to Expect',
      ar: 'الدليل الشامل للحج 2026: التواريخ والمناسك وما يمكن توقعه',
      fr: 'Guide Complet du Hajj 2026 : Dates, Rituels et Ce qu\'il Faut Savoir',
      es: 'Guía Completa del Hajj 2026: Fechas, Rituales y Qué Esperar',
    },
    excerpts: {
      en: 'Dates, rituals, costs and tips for Hajj 2026. From Ihram to Tawaf, Arafat to Muzdalifah — the complete pilgrim guide for first-timers.',
      ar: 'تواريخ ومناسك وتكاليف ونصائح للحج 2026. من الإحرام إلى الطواف ومن عرفات إلى المزدلفة — الدليل الشامل للحاج لأول مرة.',
      fr: 'Dates, rituels, coûts et conseils pour le Hajj 2026. De l\'Ihram au Tawaf, d\'Arafat à Muzdalifah — le guide complet du pèlerin pour les novices.',
      es: 'Fechas, rituales, costos y consejos para el Hajj 2026. Desde el Ihram hasta el Tawaf, de Arafat a Muzdalifah — la guía completa del peregrino para principiantes.',
    },
    date: 'Mar 5, 2026', image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80', category: 'Hajj', readTime: '10',
  },
  {
    id: 'best-halal-investment-apps-2026',
    titles: {
      en: 'Best Halal Investment Apps 2026: Grow Your Wealth the Sharia Way',
      ar: 'أفضل تطبيقات الاستثمار الحلال 2026: نمّ ثروتك بالطريق الشرعي',
      fr: 'Meilleures Applications d\'Investissement Halal 2026 : Développez Votre Patrimoine Selon la Charia',
      es: 'Las Mejores Apps de Inversión Halal 2026: Haz Crecer Tu Riqueza de Forma Sharia',
    },
    excerpts: {
      en: 'Top Sharia-compliant investment platforms compared: Wahed Invest, Zoya, Aghaz. Features, fees and halal portfolio performance rated.',
      ar: 'مقارنة لأفضل منصات الاستثمار المتوافقة مع الشريعة: Wahed Invest وZoya وAghaz. تقييم الميزات والرسوم وأداء المحفظة الحلال.',
      fr: 'Comparaison des meilleures plateformes d\'investissement conformes à la charia: Wahed Invest, Zoya, Aghaz. Fonctionnalités, frais et performance des portefeuilles halal évalués.',
      es: 'Comparación de las mejores plataformas de inversión conformes a la sharia: Wahed Invest, Zoya, Aghaz. Características, tarifas y rendimiento de cartera halal evaluados.',
    },
    date: 'Mar 4, 2026', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', category: 'Finance', readTime: '7',
  },
  {
    id: 'surah-al-kahf-friday',
    titles: {
      en: 'Why Muslims Read Surah Al-Kahf Every Friday: Full Guide',
      ar: 'لماذا يقرأ المسلمون سورة الكهف كل جمعة: الدليل الكامل',
      fr: 'Pourquoi les Musulmans Lisent la Sourate Al-Kahf Chaque Vendredi : Guide Complet',
      es: 'Por Qué los Musulmanes Leen la Surah Al-Kahf Cada Viernes: Guía Completa',
    },
    excerpts: {
      en: 'The Prophet ﷺ recommended reading Surah Al-Kahf every Friday. Learn the 4 stories, their lessons and its spiritual protection from Dajjal.',
      ar: 'أوصى النبي ﷺ بقراءة سورة الكهف كل جمعة. تعلم القصص الأربع ودروسها وحمايتها الروحية من الدجال.',
      fr: 'Le Prophète ﷺ recommandait la lecture de la Sourate Al-Kahf chaque vendredi. Apprenez les 4 histoires, leurs leçons et sa protection spirituelle contre le Dajjal.',
      es: 'El Profeta ﷺ recomendaba leer la Surah Al-Kahf cada viernes. Aprende las 4 historias, sus lecciones y su protección espiritual contra el Dajjal.',
    },
    date: 'Mar 3, 2026', image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80', category: 'Quran', readTime: '6',
  },
  {
    id: 'morning-evening-adhkar',
    titles: {
      en: 'Morning & Evening Adhkar: The Complete Daily Dhikr Guide',
      ar: 'أذكار الصباح والمساء: الدليل الشامل للذكر اليومي',
      fr: 'Adhkar du Matin & du Soir : Le Guide Complet du Dhikr Quotidien',
      es: 'Adhkar de Mañana y Tarde: La Guía Completa del Dhikr Diario',
    },
    excerpts: {
      en: 'Authentic Adhkar for morning and evening from Quran and Sunnah. Protect yourself and start every day with remembrance of Allah.',
      ar: 'أذكار صباح ومساء أصيلة من القرآن والسنة. احمِ نفسك وابدأ كل يوم بذكر الله.',
      fr: 'Adhkar authentiques du matin et du soir, tirés du Coran et de la Sunna. Protégez-vous et commencez chaque journée avec le souvenir d\'Allah.',
      es: 'Adhkar auténticos de mañana y tarde del Corán y la Sunnah. Protégete y comienza cada día con el recuerdo de Allah.',
    },
    date: 'Mar 2, 2026', image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80', category: 'Lifestyle', readTime: '7',
  },
  {
    id: 'islamic-history-golden-age',
    titles: {
      en: 'The Islamic Golden Age: When Muslims Led the World in Science',
      ar: 'العصر الذهبي الإسلامي: حين قاد المسلمون العالم في العلم',
      fr: 'L\'Âge d\'Or Islamique : Quand les Musulmans Menaient le Monde en Sciences',
      es: 'La Edad de Oro Islámica: Cuando los Musulmanes Lideraron el Mundo en Ciencias',
    },
    excerpts: {
      en: 'From algebra to astronomy, medicine to philosophy — how Muslim scholars shaped the modern world between 800–1300 CE.',
      ar: 'من الجبر إلى الفلك، ومن الطب إلى الفلسفة — كيف شكّل العلماء المسلمون العالم الحديث بين القرنين الثامن والرابع عشر.',
      fr: 'De l\'algèbre à l\'astronomie, de la médecine à la philosophie — comment les savants musulmans ont façonné le monde moderne entre 800 et 1300 EC.',
      es: 'Del álgebra a la astronomía, de la medicina a la filosofía — cómo los eruditos musulmanes dieron forma al mundo moderno entre el 800 y el 1300 EC.',
    },
    date: 'Mar 1, 2026', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', category: 'History', readTime: '9',
  },
  {
    id: 'how-to-pray-salah-beginners',
    titles: {
      en: 'How to Pray Salah: Complete Step-by-Step Guide for Beginners',
      ar: 'كيفية أداء الصلاة: الدليل الشامل خطوة بخطوة للمبتدئين',
      fr: 'Comment Prier la Salah : Guide Complet Étape par Étape pour Débutants',
      es: 'Cómo Rezar la Salah: Guía Completa Paso a Paso para Principiantes',
    },
    excerpts: {
      en: 'Never prayed before? This guide walks you through every step of Islamic prayer with Arabic text, transliteration and meaning.',
      ar: 'لم تُصلِّ من قبل؟ يرشدك هذا الدليل في كل خطوة من خطوات الصلاة الإسلامية بالنص العربي والتحريف والمعنى.',
      fr: 'Vous n\'avez jamais prié ? Ce guide vous accompagne à travers chaque étape de la prière islamique avec le texte arabe, la translittération et la signification.',
      es: '¿Nunca has rezado antes? Esta guía te lleva a través de cada paso de la oración islámica con texto árabe, transliteración y significado.',
    },
    date: 'Feb 28, 2026', image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80', category: 'Prayer', readTime: '8',
  },
  {
    id: 'quran-memorization-tips',
    titles: {
      en: '10 Proven Tips to Memorise the Quran Faster',
      ar: '10 نصائح مثبتة لحفظ القرآن بشكل أسرع',
      fr: '10 Conseils Éprouvés pour Mémoriser le Coran Plus Vite',
      es: '10 Consejos Probados para Memorizar el Corán Más Rápido',
    },
    excerpts: {
      en: 'Science-backed techniques combined with traditional Hifz methods. How top Huffaz memorise Quran efficiently — even as an adult.',
      ar: 'تقنيات مدعومة علمياً مدمجة مع أساليب الحفظ التقليدية. كيف يحفظ كبار الحفاظ القرآن بكفاءة — حتى في مرحلة البالغين.',
      fr: 'Techniques soutenues par la science combinées avec les méthodes traditionnelles de Hifz. Comment les meilleurs Huffaz mémorisent le Coran efficacement — même en tant qu\'adulte.',
      es: 'Técnicas respaldadas por la ciencia combinadas con métodos tradicionales de Hifz. Cómo los mejores Huffaz memorizan el Corán eficientemente — incluso de adultos.',
    },
    date: 'Feb 27, 2026', image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80', category: 'Quran', readTime: '7',
  },
  {
    id: 'halal-food-guide-europe',
    titles: {
      en: 'Halal Food Guide for Muslims Living in Europe 2026',
      ar: 'دليل الطعام الحلال للمسلمين في أوروبا 2026',
      fr: 'Guide de la Nourriture Halal pour les Musulmans Vivant en Europe 2026',
      es: 'Guía de Alimentación Halal para Musulmanes que Viven en Europa 2026',
    },
    excerpts: {
      en: 'How to identify halal products, trusted certifications in UK, France, Spain and Germany, and apps that make halal shopping easier.',
      ar: 'كيفية التعرف على المنتجات الحلال، والشهادات الموثوقة في المملكة المتحدة وفرنسا وإسبانيا وألمانيا، والتطبيقات التي تُيسّر التسوق الحلال.',
      fr: 'Comment identifier les produits halal, les certifications fiables au Royaume-Uni, en France, en Espagne et en Allemagne, et les applications pour faciliter vos achats.',
      es: 'Cómo identificar productos halal, certificaciones de confianza en Reino Unido, Francia, España y Alemania, y apps que facilitan las compras halal.',
    },
    date: 'Feb 26, 2026', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', category: 'Lifestyle', readTime: '6',
  },
  {
    id: 'zakat-al-fitr-2026',
    titles: {
      en: 'Zakat al-Fitr 2026: Amount, Rules and When to Pay',
      ar: 'زكاة الفطر 2026: المقدار والأحكام وموعد الأداء',
      fr: 'Zakat al-Fitr 2026 : Montant, Règles et Délai de Paiement',
      es: 'Zakat al-Fitr 2026: Cantidad, Reglas y Cuándo Pagar',
    },
    excerpts: {
      en: 'How much is Zakat al-Fitr in 2026? Who must pay it, when is the deadline, and who are the eligible recipients according to Islamic law.',
      ar: 'كم تبلغ زكاة الفطر في 2026؟ من يجب عليه أداؤها، وما الموعد النهائي، ومن هم المستحقون وفق الشريعة الإسلامية.',
      fr: 'Quel est le montant de la Zakat al-Fitr en 2026 ? Qui doit la payer, quel est le délai, et qui sont les bénéficiaires éligibles selon la loi islamique.',
      es: '¿Cuánto es el Zakat al-Fitr en 2026? Quién debe pagarlo, cuándo es la fecha límite y quiénes son los beneficiarios elegibles según la ley islámica.',
    },
    date: 'Feb 25, 2026', image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80', category: 'Finance', readTime: '5',
  },
  {
    id: 'islamic-parenting-guide',
    titles: {
      en: 'Raising Muslim Children in the West: A Practical Guide',
      ar: 'تربية الأطفال المسلمين في الغرب: دليل عملي',
      fr: 'Élever des Enfants Musulmans en Occident : Un Guide Pratique',
      es: 'Criar Hijos Musulmanes en Occidente: Una Guía Práctica',
    },
    excerpts: {
      en: 'How to nurture Islamic identity, values and practice in children growing up in non-Muslim majority countries — practical tips for Muslim parents.',
      ar: 'كيفية تنمية الهوية الإسلامية والقيم والممارسة لدى الأطفال الذين ينشؤون في الدول غير الإسلامية — نصائح عملية للآباء المسلمين.',
      fr: 'Comment cultiver l\'identité islamique, les valeurs et la pratique chez les enfants grandissant dans des pays à majorité non-musulmane — conseils pratiques pour les parents.',
      es: 'Cómo cultivar la identidad islámica, los valores y la práctica en niños que crecen en países de mayoría no musulmana — consejos prácticos para padres.',
    },
    date: 'Feb 24, 2026', image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80', category: 'Lifestyle', readTime: '8',
  },
  {
    id: 'prophet-muhammad-life',
    titles: {
      en: 'The Life of Prophet Muhammad ﷺ: A Complete Biography',
      ar: 'سيرة النبي محمد ﷺ: سيرة ذاتية كاملة',
      fr: 'La Vie du Prophète Muhammad ﷺ : Une Biographie Complète',
      es: 'La Vida del Profeta Muhammad ﷺ: Una Biografía Completa',
    },
    excerpts: {
      en: 'From his birth in Mecca to the final sermon. The life, character and legacy of the Prophet ﷺ — the most influential person in history.',
      ar: 'من مولده في مكة إلى خطبة الوداع. حياة النبي ﷺ وشخصيته وإرثه — أكثر شخصية تأثيراً في التاريخ.',
      fr: 'De sa naissance à La Mecque au dernier sermon. La vie, le caractère et l\'héritage du Prophète ﷺ — la personne la plus influente de l\'histoire.',
      es: 'Desde su nacimiento en La Meca hasta el sermón final. La vida, el carácter y el legado del Profeta ﷺ — la persona más influyente de la historia.',
    },
    date: 'Feb 23, 2026', image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80', category: 'History', readTime: '12',
  },
];

function useLikes() {
  const [likes, setLikes] = useState<Record<string, number>>(() =>
    Object.fromEntries(POSTS.map(p => [p.id, Math.floor(Math.random() * 180) + 20]))
  );
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); setLikes(l => ({ ...l, [id]: l[id] - 1 })); }
      else               { next.add(id);    setLikes(l => ({ ...l, [id]: l[id] + 1 })); }
      return next;
    });
  };
  return { likes, liked, toggle };
}

const CAT_KEYS = ['All','Ramadan','Prayer','Finance','Quran','Hajj','Lifestyle','History'];

function PostCard({ post, L, lang, likes, liked, onLike }: { post: Post; L: any; lang: string; likes: number; liked: boolean; onLike: () => void }) {
  const [hov, setHov] = useState(false);
  const title   = post.titles[lang]   || post.titles.en;
  const excerpt = post.excerpts[lang] || post.excerpts.en;
  return (
    <motion.article layout initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.96 }}
      style={{ background: hov ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.04)', border:`1px solid ${hov ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.08)'}`, borderRadius:18, overflow:'hidden', display:'flex', flexDirection:'column', transition:'all 0.22s', cursor:'default' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <Link to={`/blog/${post.id}`} style={{ display:'block', position:'relative', height:200, overflow:'hidden', flexShrink:0 }}>
        <img src={post.image} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transform:hov?'scale(1.06)':'scale(1)', transition:'transform 0.6s ease' }} loading="lazy" />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(10,37,64,0.75) 0%,transparent 60%)' }} />
        <div style={{ position:'absolute', top:12, left:12, display:'flex', gap:6 }}>
          <span style={{ padding:'3px 10px', background:'rgba(10,37,64,0.8)', backdropFilter:'blur(8px)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.5rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.18em' }}>
            {(L.cats as any)[post.category] || post.category}
          </span>
          {post.trending && (
            <span style={{ padding:'3px 10px', background:GOLD, borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.5rem', fontWeight:900, color:NAVY, textTransform:'uppercase', letterSpacing:'0.18em', display:'flex', alignItems:'center', gap:4 }}>
              <TrendingUp size={9} /> {L.hot}
            </span>
          )}
        </div>
      </Link>
      <div style={{ padding:'20px 20px 16px', flex:1, display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, fontFamily:"'DM Sans',sans-serif", fontSize:'0.56rem', fontWeight:700, color:'rgba(255,255,255,0.28)', textTransform:'uppercase', letterSpacing:'0.16em' }}>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><Calendar size={10}/> {post.date}</span>
          <span style={{ display:'flex', alignItems:'center', gap:4 }}><Clock size={10}/> {post.readTime} min {L.read}</span>
        </div>
        <Link to={`/blog/${post.id}`} style={{ textDecoration:'none' }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(0.92rem,1.8vw,1.05rem)', color:'#fff', lineHeight:1.4, transition:'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color=GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color='#fff')}>
            {title}
          </h2>
        </Link>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.76rem', color:'rgba(255,255,255,0.42)', lineHeight:1.75, flex:1 }}>{excerpt}</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          <Link to={`/blog/${post.id}`} style={{ display:'flex', alignItems:'center', gap:5, fontFamily:"'DM Sans',sans-serif", fontSize:'0.64rem', fontWeight:800, color:GOLD, textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.12em', transition:'gap 0.2s' }}
            onMouseEnter={e => ((e.currentTarget.style.gap)='8px')}
            onMouseLeave={e => ((e.currentTarget.style.gap)='5px')}>
            {L.readArticle} <ArrowRight size={11}/>
          </Link>
          <button onClick={onLike} style={{ display:'flex', alignItems:'center', gap:5, background:'transparent', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'0.66rem', fontWeight:700, color: liked ? '#f87171' : 'rgba(255,255,255,0.3)', transition:'all 0.18s', padding:'4px 8px', borderRadius:8 }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background='rgba(248,113,113,0.1)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background='transparent')}>
            <Heart size={13} fill={liked?'#f87171':'none'} stroke={liked?'#f87171':'currentColor'}/> {likes}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function BlogPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.slice(0,2) || 'en') as string;
  const L = T[lang] || T.en;
  const isRTL = lang === 'ar';
  const { likes, liked, toggle } = useLikes();
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? POSTS : POSTS.filter(p => p.category === activeCat);
  const featured = POSTS.find(p => p.featured);
  const trending = POSTS.filter(p => p.trending).slice(0, 3);

  const seoDesc = lang === 'ar' ? 'مدونة إسلامية بالعربية والإنجليزية والفرنسية والإسبانية. أدلة أسبوعية عن الصلاة والقرآن والزكاة والحج والمال الحلال.' :
    lang === 'fr' ? 'Blog islamique en arabe, anglais, français et espagnol. Guides hebdomadaires sur la prière, le Coran, la Zakat, le Hajj et la finance halal.' :
    lang === 'es' ? 'Blog islámico en árabe, inglés, francés y español. Guías semanales sobre oración, Corán, Zakat, Hajj y finanzas halal.' :
    'Islamic blog with prayer guides, Quran tips, Zakat calculator guides, Hajj 2026, halal finance and Muslim lifestyle content in English, Arabic, French and Spanish.';

  return (
    <div dir={isRTL?'rtl':'ltr'} style={{ background:NAVY, minHeight:'100vh', color:'#fff' }}>
      <SEO title={`${L.title} — Islamic Guides, Prayer Times, Quran & Zakat | Al Ummah AI`} description={seoDesc} keywords="islamic blog, prayer times guide, quran tips, zakat 2026, hajj guide 2026, halal finance, muslim lifestyle, ramadan 2026" canonical="https://www.alummahai.com/blog" lang={lang} />

      {/* Hero */}
      <div style={{ background:`linear-gradient(160deg,#071a2e 0%,${NAVY} 55%,${NAVY2} 100%)`, borderBottom:'1px solid rgba(212,175,55,0.12)', padding:'clamp(80px,12vw,120px) 20px clamp(36px,5vw,52px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(212,175,55,0.06) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
            style={{ display:'inline-block', padding:'4px 14px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.22)', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.24em', marginBottom:16 }}>
            📖 {L.badge}
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
            style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2.2rem,7vw,5rem)', color:'#fff', letterSpacing:'-0.03em', marginBottom:12, lineHeight:1 }}>{L.title}</motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.18 }}
            style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'clamp(0.84rem,1.8vw,0.98rem)', color:'rgba(255,255,255,0.4)', maxWidth:440, margin:'0 auto', lineHeight:1.85 }}>{L.sub}</motion.p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(28px,4vw,48px) 20px' }}>

        {/* Featured */}
        {featured && (
          <div style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:'rgba(212,175,55,0.5)', textTransform:'uppercase', letterSpacing:'0.26em', marginBottom:14 }}>⭐ {L.featured}</div>
            <Link to={`/blog/${featured.id}`} style={{ textDecoration:'none', display:'block' }}>
              <motion.div whileHover={{ scale:1.004 }} style={{ position:'relative', borderRadius:20, overflow:'hidden', height:'clamp(240px,35vw,400px)', border:'1px solid rgba(212,175,55,0.2)' }}>
                <img src={featured.image} alt={featured.titles[lang]||featured.titles.en} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform='scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')} loading="lazy" />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(10,37,64,0.9) 0%,rgba(10,37,64,0.2) 60%,transparent 100%)' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'clamp(20px,4vw,36px)' }}>
                  <span style={{ padding:'4px 12px', background:GOLD, borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.52rem', fontWeight:900, color:NAVY, textTransform:'uppercase', letterSpacing:'0.18em', display:'inline-block', marginBottom:12 }}>
                    {(L.cats as any)[featured.category] || featured.category}
                  </span>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.2rem,3.5vw,2rem)', color:'#fff', lineHeight:1.3, maxWidth:680 }}>
                    {featured.titles[lang] || featured.titles.en}
                  </h2>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.8rem', color:'rgba(255,255,255,0.55)', lineHeight:1.75, maxWidth:580, marginTop:8 }}>
                    {featured.excerpts[lang] || featured.excerpts.en}
                  </p>
                </div>
              </motion.div>
            </Link>
          </div>
        )}

        {/* Trending bar */}
        <div style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.18)', borderRadius:14, padding:'14px 20px', display:'flex', alignItems:'center', gap:12, marginBottom:36, flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:"'DM Sans',sans-serif", fontSize:'0.54rem', fontWeight:900, color:GOLD, textTransform:'uppercase', letterSpacing:'0.2em', whiteSpace:'nowrap', flexShrink:0 }}>
            <TrendingUp size={13}/> {L.trending}
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', flex:1 }}>
            {trending.map(p => (
              <Link key={p.id} to={`/blog/${p.id}`} style={{ textDecoration:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'0.72rem', fontWeight:600, color:'rgba(255,255,255,0.65)', transition:'color 0.15s', whiteSpace:'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.color=GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,0.65)')}>
                {(p.titles[lang] || p.titles.en).substring(0,55)}{(p.titles[lang] || p.titles.en).length > 55 ? '…' : ''}
              </Link>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28 }}>
          {CAT_KEYS.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding:'7px 16px', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontSize:'0.6rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.14em', cursor:'pointer', border:'none', transition:'all 0.16s', background: activeCat===cat ? GOLD : 'rgba(212,175,55,0.09)', color: activeCat===cat ? NAVY : GOLD, boxShadow: activeCat===cat ? '0 4px 14px rgba(212,175,55,0.3)' : 'none' }}>
              {(L.cats as any)[cat] || cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(clamp(240px,28vw,340px),1fr))', gap:18, marginBottom:52 }}>
          <AnimatePresence>
            {filtered.map(post => (
              <PostCard key={post.id} post={post} L={L} lang={lang} likes={likes[post.id]} liked={liked.has(post.id)} onLike={() => toggle(post.id)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ background:'linear-gradient(120deg,rgba(212,175,55,0.1),rgba(212,175,55,0.04))', border:'1px solid rgba(212,175,55,0.22)', borderRadius:22, padding:'clamp(24px,4vw,44px)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <div style={{ fontSize:'2.8rem', flexShrink:0 }}>📸</div>
            <div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(1.1rem,3vw,1.6rem)', color:'#fff', marginBottom:6 }}>{L.never}</h3>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:'0.8rem', color:'rgba(255,255,255,0.42)', lineHeight:1.7, maxWidth:460 }}>{L.neverSub}</p>
            </div>
          </div>
          <a href="https://www.instagram.com/alummahai" target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:10, background:GOLD, color:NAVY, padding:'12px 24px', borderRadius:99, fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:'0.72rem', textDecoration:'none', textTransform:'uppercase', letterSpacing:'0.1em', boxShadow:'0 4px 18px rgba(212,175,55,0.3)', flexShrink:0, transition:'transform 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.transform='scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}>
            <BookOpen size={14}/> {L.instaCta} {L.instaHandle}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
