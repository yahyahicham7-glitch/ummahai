import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home", "quran": "Quran", "qibla": "Qibla", "zakat": "Zakat",
        "store": "Store", "hajj": "Hajj", "scholar": "Scholar AI", "blog": "Blog"
      },
      "hero": { "title": "Elevate Your Spiritual Journey", "subtitle": "The World's Most Advanced Islamic AI Platform", "cta": "Explore Now" },
      "prayer": {
        "title": "Prayer Times", "detailed": "Detailed Schedule", "next": "Next Prayer",
        "detecting": "Detecting...", "calculating": "Calculating Sacred Times", "up_next": "Up Next",
        "search_placeholder": "Search city for prayer times...", "status": "Status", "upcoming": "Upcoming",
        "preparation": "Spiritual Preparation",
        "preparation_desc": "The first thing for which a person will be brought to account on the Day of Resurrection will be his prayer. If it is sound, then he will have succeeded and prospered.",
        "daily_prayers": "Daily Prayers", "accuracy": "Accuracy", "back": "Back", "access_denied": "Location Access Denied"
      },
      "quran": {
        "title": "The Holy Quran", "subtitle": "Sacred Revelations for Mankind",
        "search_placeholder": "Search Surah by name or number...", "back_to_surahs": "Back to Surahs",
        "edition": "Edition", "ayahs": "Ayahs", "previous_surah": "Previous Surah", "next_surah": "Next Surah",
        "read_listen": "Read and listen to the Holy Quran online with premium translations.",
        "online_translation": "quran online, read quran, quran translation"
      },
      "home": {
        "hero_badge": "The Future of Faith", "hero_title": "Elevate Your Spiritual Journey",
        "hero_subtitle": "Experience a premium Islamic ecosystem designed for the modern believer. Accurate, authentic, and beautifully crafted for the global Ummah.",
        "read_quran": "Read Quran", "scholar_ai": "Scholar AI", "why_title": "Why Al Ummah AI?",
        "why_subtitle": "Combining centuries of tradition with tomorrow's technology",
        "trust_1_title": "Authentic Knowledge", "trust_1_desc": "All content is verified by qualified scholars to ensure adherence to Quran and Sunnah.",
        "trust_2_title": "Premium Experience", "trust_2_desc": "Beautiful interface designed to foster focus and spiritual tranquility.",
        "trust_3_title": "Global Community", "trust_3_desc": "Join millions of Muslims worldwide using Al Ummah AI for their daily spiritual needs.",
        "cta_title": "Ready to deepen your faith?", "cta_subtitle": "Download the Al Ummah AI mobile app for the full experience including Adhan notifications, offline Quran, and more."
      },
      "features": {
        "quran_title": "Holy Quran", "quran_desc": "Read and listen to the Holy Quran with premium translations and recitations.",
        "qibla_title": "Qibla Finder", "qibla_desc": "High-precision Qibla direction using advanced geolocation technology.",
        "zakat_title": "Zakat Calculator", "zakat_desc": "Accurate wealth purification tools based on real-time market rates.",
        "duas_title": "Daily Duas", "duas_desc": "Authentic supplications for every moment of your spiritual life."
      },
      "blog": {
        "title": "Islamic Blog", "subtitle": "Guides, wisdom and knowledge for the modern Muslim. Updated daily.",
        "featured": "Featured", "trending": "Trending Now", "read_article": "Read Article",
        "read_full": "Read Full Article", "coming_soon": "Article Coming Soon",
        "back": "Back to Blog", "more_articles": "More Articles", "share": "Share",
        "categories": {
          "all": "All", "ramadan": "Ramadan", "prayer": "Prayer", "finance": "Finance",
          "quran": "Quran", "hajj": "Hajj", "lifestyle": "Lifestyle", "history": "History"
        }
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "home": "الرئيسية", "quran": "القرآن", "qibla": "القبلة", "zakat": "الزكاة",
        "store": "المتجر", "hajj": "الحج", "scholar": "عالم الذكاء الاصطناعي", "blog": "المدونة"
      },
      "hero": { "title": "ارتقِ برحلتك الروحية", "subtitle": "منصة الذكاء الاصطناعي الإسلامية الأكثر تقدماً في العالم", "cta": "استكشف الآن" },
      "prayer": {
        "title": "أوقات الصلاة", "detailed": "الجدول التفصيلي", "next": "الصلاة القادمة",
        "detecting": "جاري التحديد...", "calculating": "جاري حساب الأوقات المقدسة", "up_next": "الصلاة القادمة",
        "search_placeholder": "ابحث عن مدينة لأوقات الصلاة...", "status": "الحالة", "upcoming": "قادمة",
        "preparation": "الاستعداد الروحي",
        "preparation_desc": "إن أول ما يحاسب به العبد يوم القيامة من عمله صلاته، فإن صلحت فقد أفلح وأنجح.",
        "daily_prayers": "صلوات يومية", "accuracy": "دقة", "back": "رجوع", "access_denied": "تم رفض الوصول إلى الموقع"
      },
      "quran": {
        "title": "القرآن الكريم", "subtitle": "وحي مقدس للبشرية",
        "search_placeholder": "ابحث عن سورة بالاسم أو الرقم...", "back_to_surahs": "العودة إلى السور",
        "edition": "الطبعة", "ayahs": "آيات", "previous_surah": "السورة السابقة", "next_surah": "السورة التالية",
        "read_listen": "اقرأ واستمع إلى القرآن الكريم عبر الإنترنت بترجمات متميزة.",
        "online_translation": "القرآن عبر الإنترنت، قراءة القرآن، ترجمة القرآن"
      },
      "home": {
        "hero_badge": "مستقبل الإيمان", "hero_title": "ارتقِ برحلتك الروحية",
        "hero_subtitle": "جرب نظاماً إسلامياً متميزاً مصمماً للمؤمن المعاصر. دقيق وأصيل ومصمم بجمال للأمة العالمية.",
        "read_quran": "اقرأ القرآن", "scholar_ai": "عالم الذكاء الاصطناعي", "why_title": "لماذا Al Ummah AI؟",
        "why_subtitle": "الجمع بين قرون من التقاليد وتكنولوجيا الغد",
        "trust_1_title": "معرفة أصيلة", "trust_1_desc": "يتم التحقق من جميع المحتويات من قبل علماء مؤهلين لضمان الالتزام بالقرآن والسنة.",
        "trust_2_title": "تجربة متميزة", "trust_2_desc": "واجهة جميلة مصممة لتعزيز التركيز والهدوء الروحي.",
        "trust_3_title": "مجتمع عالمي", "trust_3_desc": "انضم إلى ملايين المسلمين في جميع أنحاء العالم الذين يستخدمون Al Ummah AI لاحتياجاتهم الروحية اليومية.",
        "cta_title": "هل أنت مستعد لتعميق إيمانك؟", "cta_subtitle": "قم بتنزيل تطبيق Al Ummah AI للهاتف المحمول للحصول على التجربة الكاملة بما في ذلك إشعارات الأذان والقرآن بدون اتصال بالإنترنت والمزيد."
      },
      "features": {
        "quran_title": "القرآن الكريم", "quran_desc": "اقرأ واستمع إلى القرآن الكريم بترجمات وتلاوات متميزة.",
        "qibla_title": "مكتشف القبلة", "qibla_desc": "اتجاه القبلة عالي الدقة باستخدام تقنية تحديد الموقع الجغرافي المتقدمة.",
        "zakat_title": "حاسبة الزكاة", "zakat_desc": "أدوات دقيقة لتطهير الثروة بناءً على أسعار السوق في الوقت الفعلي.",
        "duas_title": "أدعية يومية", "duas_desc": "أدعية أصيلة لكل لحظة من حياتك الروحية."
      },
      "blog": {
        "title": "المدونة الإسلامية", "subtitle": "أدلة وحكمة ومعرفة للمسلم المعاصر. يُحدَّث يومياً.",
        "featured": "مميز", "trending": "الأكثر رواجاً", "read_article": "اقرأ المقال",
        "read_full": "اقرأ المقال كاملاً", "coming_soon": "المقال قادم قريباً",
        "back": "العودة إلى المدونة", "more_articles": "مقالات أخرى", "share": "مشاركة",
        "categories": {
          "all": "الكل", "ramadan": "رمضان", "prayer": "الصلاة", "finance": "المال",
          "quran": "القرآن", "hajj": "الحج", "lifestyle": "نمط الحياة", "history": "التاريخ"
        }
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "home": "Accueil", "quran": "Coran", "qibla": "Qibla", "zakat": "Zakat",
        "store": "Boutique", "hajj": "Hajj", "scholar": "Scholar AI", "blog": "Blog"
      },
      "hero": { "title": "Élevez Votre Voyage Spirituel", "subtitle": "La plateforme IA islamique la plus avancée au monde", "cta": "Explorer" },
      "prayer": {
        "title": "Heures de Prière", "detailed": "Calendrier Détaillé", "next": "Prochaine Prière",
        "detecting": "Détection...", "calculating": "Calcul des Heures Sacrées", "up_next": "À Suivre",
        "search_placeholder": "Rechercher une ville...", "status": "Statut", "upcoming": "À venir",
        "preparation": "Préparation Spirituelle",
        "preparation_desc": "La première chose pour laquelle une personne sera tenue de rendre compte le Jour de la Résurrection sera sa prière. Si elle est saine, alors elle aura réussi et prospéré.",
        "daily_prayers": "Prières Quotidiennes", "accuracy": "Précision", "back": "Retour", "access_denied": "Accès à la localisation refusé"
      },
      "quran": {
        "title": "Le Saint Coran", "subtitle": "Révélations Sacrées pour l'Humanité",
        "search_placeholder": "Rechercher une sourate...", "back_to_surahs": "Retour aux Sourates",
        "edition": "Édition", "ayahs": "Versets", "previous_surah": "Sourate Précédente", "next_surah": "Sourate Suivante",
        "read_listen": "Lisez et écoutez le Saint Coran en ligne avec des traductions de qualité.",
        "online_translation": "coran en ligne, lire coran, traduction coran"
      },
      "home": {
        "hero_badge": "L'avenir de la foi", "hero_title": "Élevez votre voyage spirituel",
        "hero_subtitle": "Découvrez un écosystème islamique premium conçu pour le croyant moderne. Précis, authentique et magnifiquement conçu pour la Oumma mondiale.",
        "read_quran": "Lire le Coran", "scholar_ai": "Scholar AI", "why_title": "Pourquoi Al Ummah AI ?",
        "why_subtitle": "Allier des siècles de tradition à la technologie de demain",
        "trust_1_title": "Savoir authentique", "trust_1_desc": "Tout le contenu est vérifié par des savants qualifiés pour garantir le respect du Coran et de la Sunna.",
        "trust_2_title": "Expérience Premium", "trust_2_desc": "Interface magnifique conçue pour favoriser la concentration et la tranquillité spirituelle.",
        "trust_3_title": "Communauté mondiale", "trust_3_desc": "Rejoignez des millions de musulmans à travers le monde qui utilisent Al Ummah AI pour leurs besoins spirituels quotidiens.",
        "cta_title": "Prêt à approfondir votre foi ?", "cta_subtitle": "Téléchargez l'application mobile Al Ummah AI pour une expérience complète incluant les notifications d'Adhan, le Coran hors ligne, et plus encore."
      },
      "features": {
        "quran_title": "Saint Coran", "quran_desc": "Lisez et écoutez le Saint Coran avec des traductions et des récitations de qualité.",
        "qibla_title": "Chercheur de Qibla", "qibla_desc": "Direction de la Qibla de haute précision utilisant une technologie de géolocalisation avancée.",
        "zakat_title": "Calculateur de Zakat", "zakat_desc": "Outils précis de purification de la richesse basés sur les taux du marché en temps réel.",
        "duas_title": "Douas quotidiennes", "duas_desc": "Supplications authentiques pour chaque moment de votre vie spirituelle."
      },
      "blog": {
        "title": "Blog Islamique", "subtitle": "Guides, sagesse et connaissance pour le musulman moderne. Mis à jour quotidiennement.",
        "featured": "À la Une", "trending": "Tendance", "read_article": "Lire l'Article",
        "read_full": "Lire l'Article Complet", "coming_soon": "Article Bientôt Disponible",
        "back": "Retour au Blog", "more_articles": "Plus d'Articles", "share": "Partager",
        "categories": {
          "all": "Tout", "ramadan": "Ramadan", "prayer": "Prière", "finance": "Finance",
          "quran": "Coran", "hajj": "Hajj", "lifestyle": "Mode de Vie", "history": "Histoire"
        }
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "home": "Inicio", "quran": "Corán", "qibla": "Qibla", "zakat": "Zakat",
        "store": "Tienda", "hajj": "Hajj", "scholar": "Scholar AI", "blog": "Blog"
      },
      "hero": { "title": "Eleva Tu Viaje Espiritual", "subtitle": "La plataforma de IA islámica más avanzada del mundo", "cta": "Explorar" },
      "prayer": {
        "title": "Horarios de Oración", "detailed": "Horario Detallado", "next": "Próxima Oración",
        "detecting": "Detectando...", "calculating": "Calculando Tiempos Sagrados", "up_next": "Siguiente",
        "search_placeholder": "Buscar ciudad...", "status": "Estado", "upcoming": "Próximo",
        "preparation": "Preparación Espiritual",
        "preparation_desc": "Lo primero por lo que una persona rendirá cuentas el Día de la Resurrección será su oración. Si es correcta, habrá triunfado y prosperado.",
        "daily_prayers": "Oraciones Diarias", "accuracy": "Precisión", "back": "Volver", "access_denied": "Acceso a la ubicación denegado"
      },
      "quran": {
        "title": "El Santo Corán", "subtitle": "Revelaciones Sagradas para la Humanidad",
        "search_placeholder": "Buscar Sura por nombre o número...", "back_to_surahs": "Volver a las Suras",
        "edition": "Edición", "ayahs": "Aleyas", "previous_surah": "Sura Anterior", "next_surah": "Sura Siguiente",
        "read_listen": "Lea y escuche el Santo Corán en línea con traducciones de primera calidad.",
        "online_translation": "corán en línea, leer corán, traducción corán"
      },
      "home": {
        "hero_badge": "El futuro de la fe", "hero_title": "Eleva tu viaje espiritual",
        "hero_subtitle": "Experimente un ecosistema islámico premium diseñado para el creyente moderno. Preciso, auténtico y bellamente diseñado para la Ummah global.",
        "read_quran": "Leer Corán", "scholar_ai": "Scholar AI", "why_title": "¿Por qué Al Ummah AI?",
        "why_subtitle": "Combinando siglos de tradición con la tecnología del mañana",
        "trust_1_title": "Conocimiento auténtico", "trust_1_desc": "Todo el contenido está verificado por eruditos calificados para garantizar la adherencia al Corán y la Sunnah.",
        "trust_2_title": "Experiencia Premium", "trust_2_desc": "Interfaz hermosa diseñada para fomentar el enfoque y la tranquilidad espiritual.",
        "trust_3_title": "Comunidad Global", "trust_3_desc": "Únase a millones de musulmanes en todo el mundo que utilizan Al Ummah AI para sus necesidades espirituales diarias.",
        "cta_title": "¿Listo para profundizar tu fe?", "cta_subtitle": "Descargue la aplicación móvil Al Ummah AI para disfrutar de la experiencia completa, que incluye notificaciones de Adhan, Corán sin conexión y más."
      },
      "features": {
        "quran_title": "Santo Corán", "quran_desc": "Lea y escuche el Santo Corán con traducciones y recitaciones de primera calidad.",
        "qibla_title": "Buscador de Qibla", "qibla_desc": "Dirección de la Qibla de alta precisión mediante tecnología avanzada de geolocalización.",
        "zakat_title": "Calculadora de Zakat", "zakat_desc": "Herramientas precisas de purificación de la riqueza basadas en las tasas de mercado en tiempo real.",
        "duas_title": "Duas diarias", "duas_desc": "Súplicas auténticas para cada momento de su vida espiritual."
      },
      "blog": {
        "title": "Blog Islámico", "subtitle": "Guías, sabiduría y conocimiento para el musulmán moderno. Actualizado diariamente.",
        "featured": "Destacado", "trending": "Tendencia Ahora", "read_article": "Leer Artículo",
        "read_full": "Leer Artículo Completo", "coming_soon": "Artículo Próximamente",
        "back": "Volver al Blog", "more_articles": "Más Artículos", "share": "Compartir",
        "categories": {
          "all": "Todo", "ramadan": "Ramadán", "prayer": "Oración", "finance": "Finanzas",
          "quran": "Corán", "hajj": "Hajj", "lifestyle": "Estilo de Vida", "history": "Historia"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
