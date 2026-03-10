mport fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.join(__dirname, 'dist');
const template  = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// ─── SEO DATA PER ROUTE ────────────────────────────────────────────────────
const SITE = 'https://www.alummahai.com';
const ROUTES = [
  {
    url: '/',
    title: 'Al Ummah AI — Prayer Times Near Me, Qibla, Quran & Islamic Platform',
    desc:  'Accurate prayer times by GPS for your city. Qibla finder, Holy Quran in 15 languages, Zakat calculator 2026, Ramadan guide and Scholar AI. Free for 1.8 billion Muslims.',
    keywords: 'prayer times near me, prayer times today, fajr time, islamic prayer times, salah times, namaz time, qibla direction, quran online, zakat calculator 2026, ramadan 2026, أوقات الصلاة, waktu sholat',
  },
  {
    url: '/quran',
    title: 'Read Quran Online Free — 15 Translations + Audio | Al Ummah AI',
    desc:  'Read the complete Holy Quran online with 15 translations, transliteration and audio recitation. Free, no account needed.',
    keywords: 'quran online, read quran, holy quran, quran translation, quran audio, quran in english, القرآن الكريم',
  },
  {
    url: '/qibla',
    title: 'Qibla Direction Finder — Real-Time Compass to Mecca | Al Ummah AI',
    desc:  'Find the exact Qibla direction from your location. Real-time GPS compass pointing toward the Kaaba in Mecca. Free Qibla finder for 190+ countries.',
    keywords: 'qibla direction, qibla finder, qibla compass, direction to mecca, find qibla, اتجاه القبلة',
  },
  {
    url: '/zakat',
    title: 'Zakat Calculator 2026 — Calculate Your Zakat Online | Al Ummah AI',
    desc:  'Calculate your exact annual Zakat obligation for 2026. Uses current nisab values and gold/silver rates. Free Islamic Zakat calculator.',
    keywords: 'zakat calculator, zakat 2026, how much zakat, nisab 2026, calculate zakat, حساب الزكاة',
  },
  {
    url: '/ramadan',
    title: 'Ramadan 2026 Guide — Suhoor, Iftar Times & Complete Schedule | Al Ummah AI',
    desc:  'Complete Ramadan 2026 guide with Suhoor and Iftar times for your city, duas, last 10 nights guide, and Laylat al-Qadr schedule.',
    keywords: 'ramadan 2026, ramadan times, suhoor time, iftar time, ramadan schedule, laylat al qadr, رمضان 2026',
  },
  {
    url: '/scholar',
    title: 'Scholar AI — Ask Any Islamic Question | Al Ummah AI',
    desc:  'Ask any Islamic question and get answers grounded in Quran and authentic Hadith. Free AI Islamic scholar powered by advanced AI.',
    keywords: 'islamic scholar ai, ask islamic questions, islamic fatwa, quran hadith answers',
  },
  {
    url: '/blog',
    title: 'Islamic Guides & Articles — Prayer, Finance, Hajj | Al Ummah AI',
    desc:  'In-depth Islamic guides on prayer times, Zakat, Hajj 2026, Ramadan, halal finance, Quran memorization and more.',
    keywords: 'islamic guides, islamic articles, prayer guide, hajj 2026, halal finance, ramadan guide',
  },
  {
    url: '/halal-money',
    title: 'Halal Investments 2026 — Islamic Finance Guide | Al Ummah AI',
    desc:  'Complete guide to halal investing in 2026. Wahed Invest, Islamic ETFs, sukuk, halal banking and Zakat on investments explained.',
    keywords: 'halal investments, halal finance, wahed invest, islamic etf, sukuk, halal banking 2026',
  },
  {
    url: '/store',
    title: 'Islamic Store — Prayer Mats, Tasbih, Qurans | Al Ummah AI',
    desc:  'Shop premium Islamic products: prayer mats, tasbih, Qurans and Ramadan essentials. Curated halal products for your spiritual journey.',
    keywords: 'islamic store, prayer mats, tasbih, quran book, ramadan essentials, islamic gifts',
  },
  {
    url: '/about',
    title: 'About Al Ummah AI — Our Mission | Al Ummah AI',
    desc:  'Al Ummah AI is a global Islamic platform providing free prayer times, Qibla, Quran and daily Islamic guidance for 1.8 billion Muslims worldwide.',
    keywords: 'about al ummah ai, islamic platform mission',
  },
  {
    url: '/privacy',
    title: 'Privacy Policy | Al Ummah AI',
    desc:  'Privacy Policy for Al Ummah AI. GDPR and CCPA compliant. We protect your data and never sell it to third parties.',
    keywords: 'al ummah ai privacy policy',
  },
  {
    url: '/terms',
    title: 'Terms of Service | Al Ummah AI',
    desc:  'Terms of Service for Al Ummah AI. Read our terms of use for prayer times, Quran, Qibla and all Islamic tools.',
    keywords: 'al ummah ai terms of service',
  },
  // Blog posts
  {
    url: '/blog/laylat-al-qadr-last-10-nights-ramadan-guide',
    title: 'Laylat al-Qadr Guide — Last 10 Nights of Ramadan 2026 | Al Ummah AI',
    desc:  'Complete guide to Laylat al-Qadr 2026. Signs of the Night of Power, best duas, and how to maximize the last 10 nights of Ramadan.',
    keywords: 'laylat al qadr, night of power, last 10 nights ramadan, laylat al qadr 2026',
  },
  {
    url: '/blog/fajr-prayer-guide-never-miss-fajr',
    title: 'Never Miss Fajr Prayer Again — Complete Guide | Al Ummah AI',
    desc:  'Proven strategies to wake up for Fajr prayer every single day. Tips, duas and alarm strategies for consistent Fajr.',
    keywords: 'fajr prayer, how to wake up for fajr, never miss fajr, fajr time',
  },
  {
    url: '/blog/zakat-calculator-guide-2026',
    title: 'Zakat Calculator Guide 2026 — Nisab, Gold & Silver Rates | Al Ummah AI',
    desc:  'Step-by-step Zakat calculator guide for 2026 with current nisab values, gold rates and examples for different asset types.',
    keywords: 'zakat calculator 2026, nisab value 2026, how to calculate zakat, zakat on gold',
  },
  {
    url: '/blog/hajj-packages-2026-complete-guide',
    title: 'Hajj 2026 Complete Guide — Packages, Rituals & Tips | Al Ummah AI',
    desc:  'Complete Hajj 2026 guide with rituals day by day, visa requirements, best packages and packing list.',
    keywords: 'hajj 2026, hajj packages 2026, hajj guide, hajj rituals, hajj visa',
  },
  {
    url: '/blog/halal-investments-2026-complete-guide',
    title: 'Best Halal Investments 2026 — Complete Islamic Finance Guide | Al Ummah AI',
    desc:  'Complete guide to halal investing in 2026. Wahed Invest, Islamic ETFs, sukuk and how to grow wealth the halal way.',
    keywords: 'halal investments 2026, wahed invest, islamic etf, halal stocks, sharia compliant investing',
  },
  {
    url: '/blog/ramadan-2026-complete-timetable-guide',
    title: 'Ramadan 2026 Complete Timetable & Guide | Al Ummah AI',
    desc:  'Full Ramadan 2026 timetable with Suhoor and Iftar times by city, plus complete guide for ibadah and Laylat al-Qadr.',
    keywords: 'ramadan 2026 timetable, ramadan calendar 2026, iftar time 2026, suhoor time 2026',
  },
  {
    url: '/blog/how-to-find-qibla-direction',
    title: 'How to Find Qibla Direction — 5 Methods | Al Ummah AI',
    desc:  'Complete guide to finding the Qibla direction: compass, smartphone apps, sun position, Google Maps and star navigation.',
    keywords: 'how to find qibla, qibla direction, qibla compass, find direction to mecca',
  },
  {
    url: '/blog/islamic-finance-beginners-guide',
    title: 'Islamic Finance Beginners Guide 2026 | Al Ummah AI',
    desc:  'Beginner\'s guide to Islamic finance: halal banking, riba-free investments, sukuk, takaful and how to manage money the Islamic way.',
    keywords: 'islamic finance, halal banking, riba free investments, islamic money guide',
  },
  {
    url: '/blog/prayer-times-near-me-how-they-are-calculated',
    title: 'How Prayer Times Are Calculated — Complete Guide | Al Ummah AI',
    desc:  'Understand how Islamic prayer times are calculated using astronomy, sun angles, and different calculation methods (ISNA, MWL, Egypt).',
    keywords: 'how prayer times are calculated, prayer time calculation, fajr calculation, isna prayer times',
  },
  {
    url: '/blog/how-to-perform-salah-step-by-step-guide',
    title: 'How to Perform Salah — Step by Step Guide | Al Ummah AI',
    desc:  'Complete step-by-step guide to performing Salah (Islamic prayer) correctly with Arabic words, transliteration and English translation.',
    keywords: 'how to pray salah, salah steps, how to perform prayer, salah guide for beginners',
  },
  {
    url: '/blog/best-duas-for-anxiety-depression-stress-in-islam',
    title: 'Best Duas for Anxiety and Stress — Islamic Remedies | Al Ummah AI',
    desc:  'Powerful Quranic duas and dhikr for anxiety, depression and stress. Evidence-based Islamic remedies from Quran and Sunnah.',
    keywords: 'duas for anxiety, duas for stress, islamic remedies anxiety, quran for depression',
  },
  {
    url: '/blog/quran-memorization-tips-how-to-memorize-quran',
    title: 'How to Memorize Quran — 10 Proven Tips | Al Ummah AI',
    desc:  'Proven tips and strategies for Quran memorization (Hifz). Daily routines, revision techniques and advice from hafiz scholars.',
    keywords: 'how to memorize quran, quran memorization tips, hifz quran, become hafiz',
  },
  // City prayer time pages
  { url: '/prayer-times/london',       title: 'Prayer Times London Today — Fajr, Dhuhr, Asr, Maghrib, Isha | Al Ummah AI', desc: 'Accurate Islamic prayer times for London, UK today. Fajr, Dhuhr, Asr, Maghrib and Isha times updated daily.', keywords: 'prayer times london, london prayer times, salah times london, fajr time london' },
  { url: '/prayer-times/dubai',        title: 'Prayer Times Dubai Today | Al Ummah AI', desc: 'Accurate prayer times for Dubai, UAE today. Fajr, Dhuhr, Asr, Maghrib and Isha.', keywords: 'prayer times dubai, dubai prayer times, salah times dubai' },
  { url: '/prayer-times/istanbul',     title: 'Prayer Times Istanbul Today | Al Ummah AI', desc: 'Accurate prayer times for Istanbul, Turkey today.', keywords: 'prayer times istanbul, istanbul prayer times, namaz vakitleri istanbul' },
  { url: '/prayer-times/cairo',        title: 'Prayer Times Cairo Today | Al Ummah AI', desc: 'Accurate prayer times for Cairo, Egypt today.', keywords: 'prayer times cairo, cairo prayer times, أوقات الصلاة القاهرة' },
  { url: '/prayer-times/jakarta',      title: 'Prayer Times Jakarta Today | Al Ummah AI', desc: 'Accurate prayer times for Jakarta, Indonesia today.', keywords: 'prayer times jakarta, jakarta prayer times, waktu sholat jakarta' },
  { url: '/prayer-times/kuala-lumpur', title: 'Prayer Times Kuala Lumpur Today | Al Ummah AI', desc: 'Accurate prayer times for Kuala Lumpur, Malaysia today.', keywords: 'prayer times kuala lumpur, kl prayer times, waktu solat kl' },
  { url: '/prayer-times/paris',        title: 'Prayer Times Paris Today | Al Ummah AI', desc: 'Accurate prayer times for Paris, France today.', keywords: 'prayer times paris, horaires priere paris, salah paris' },
  { url: '/prayer-times/new-york',     title: 'Prayer Times New York Today | Al Ummah AI', desc: 'Accurate prayer times for New York, USA today.', keywords: 'prayer times new york, new york prayer times, salah times nyc' },
  { url: '/prayer-times/madrid',       title: 'Prayer Times Madrid Today | Al Ummah AI', desc: 'Accurate prayer times for Madrid, Spain today.', keywords: 'prayer times madrid, horarios rezo madrid, salah madrid' },
  { url: '/prayer-times/karachi',      title: 'Prayer Times Karachi Today | Al Ummah AI', desc: 'Accurate prayer times for Karachi, Pakistan today.', keywords: 'prayer times karachi, karachi prayer times, namaz timings karachi' },
];

// ─── BUILD HTML PER ROUTE ─────────────────────────────────────────────────────
function buildHtml(route) {
  const { url, title, desc, keywords } = route;
  const canonical = `${SITE}${url}`;

  return template
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${title}</title>`
    )
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${desc}">`
    )
    .replace(
      /<meta name="keywords"[^>]*>/,
      `<meta name="keywords" content="${keywords}">`
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${canonical}">`
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${title}">`
    )
    .replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${desc}">`
    )
    .replace(
      /<meta property="og:url"[^>]*>/,
      `<meta property="og:url" content="${canonical}">`
    )
    // Add hreflang for multilingual SEO
    .replace(
      '</head>',
      `  <link rel="alternate" hreflang="en" href="${canonical}">
  <link rel="alternate" hreflang="ar" href="${SITE}/ar${url}">
  <link rel="alternate" hreflang="fr" href="${SITE}/fr${url}">
  <link rel="alternate" hreflang="es" href="${SITE}/es${url}">
  <link rel="alternate" hreflang="x-default" href="${canonical}">
</head>`
    );
}

// ─── WRITE FILES ──────────────────────────────────────────────────────────────
let count = 0;
for (const route of ROUTES) {
  const routePath = route.url === '/' ? '/index.html' : `${route.url}/index.html`;
  const filePath  = path.join(distDir, routePath);
  const dir       = path.dirname(filePath);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const html = buildHtml(route);
  fs.writeFileSync(filePath, html, 'utf-8');
  count++;
  console.log(`✅ ${routePath}`);
}

console.log(`\n🎉 Prerendered ${count} routes`);
