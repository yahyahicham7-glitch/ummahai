import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.join(__dirname, 'dist');
const template  = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const SITE = 'https://www.alummahai.com';

const ROUTES = [
  { url: '/', title: 'Al Ummah AI — Prayer Times Near Me, Qibla, Quran & Islamic Platform', desc: 'Accurate prayer times by GPS for your city. Qibla finder, Holy Quran in 15 languages, Zakat calculator 2026, Ramadan guide and Scholar AI. Free for 1.8 billion Muslims.', keywords: 'prayer times near me, prayer times today, fajr time, islamic prayer times, salah times, qibla direction, quran online, zakat calculator 2026, ramadan 2026' },
  { url: '/quran', title: 'Read Quran Online Free — 15 Translations + Audio | Al Ummah AI', desc: 'Read the complete Holy Quran online with 15 translations, transliteration and audio recitation. Free, no account needed.', keywords: 'quran online, read quran, holy quran, quran translation, quran audio' },
  { url: '/qibla', title: 'Qibla Direction Finder — Real-Time Compass to Mecca | Al Ummah AI', desc: 'Find the exact Qibla direction from your location. Real-time GPS compass pointing toward the Kaaba in Mecca.', keywords: 'qibla direction, qibla finder, qibla compass, direction to mecca' },
  { url: '/zakat', title: 'Zakat Calculator 2026 — Calculate Your Zakat Online | Al Ummah AI', desc: 'Calculate your exact annual Zakat obligation for 2026. Uses current nisab values and gold/silver rates.', keywords: 'zakat calculator, zakat 2026, how much zakat, nisab 2026' },
  { url: '/ramadan', title: 'Ramadan 2026 Guide — Suhoor, Iftar Times & Complete Schedule | Al Ummah AI', desc: 'Complete Ramadan 2026 guide with Suhoor and Iftar times for your city, duas, last 10 nights guide.', keywords: 'ramadan 2026, ramadan times, suhoor time, iftar time, laylat al qadr' },
  { url: '/scholar', title: 'Scholar AI — Ask Any Islamic Question | Al Ummah AI', desc: 'Ask any Islamic question and get answers grounded in Quran and authentic Hadith.', keywords: 'islamic scholar ai, ask islamic questions, quran hadith answers' },
  { url: '/blog', title: 'Islamic Guides & Articles | Al Ummah AI', desc: 'In-depth Islamic guides on prayer times, Zakat, Hajj 2026, Ramadan, halal finance and more.', keywords: 'islamic guides, islamic articles, prayer guide, hajj 2026, halal finance' },
  { url: '/halal-money', title: 'Halal Investments 2026 — Islamic Finance Guide | Al Ummah AI', desc: 'Complete guide to halal investing in 2026. Wahed Invest, Islamic ETFs, sukuk and halal banking.', keywords: 'halal investments, halal finance, wahed invest, islamic etf, sukuk' },
  { url: '/store', title: 'Islamic Store — Prayer Mats, Tasbih, Qurans | Al Ummah AI', desc: 'Shop premium Islamic products: prayer mats, tasbih, Qurans and Ramadan essentials.', keywords: 'islamic store, prayer mats, tasbih, quran book, ramadan essentials' },
  { url: '/about', title: 'About Al Ummah AI — Our Mission', desc: 'Al Ummah AI is a global Islamic platform providing free prayer times, Qibla, Quran and daily guidance for 1.8 billion Muslims.', keywords: 'about al ummah ai, islamic platform' },
  { url: '/privacy', title: 'Privacy Policy | Al Ummah AI', desc: 'Privacy Policy for Al Ummah AI. GDPR and CCPA compliant.', keywords: 'al ummah ai privacy policy' },
  { url: '/terms', title: 'Terms of Service | Al Ummah AI', desc: 'Terms of Service for Al Ummah AI.', keywords: 'al ummah ai terms' },
  { url: '/blog/laylat-al-qadr-last-10-nights-ramadan-guide', title: 'Laylat al-Qadr Guide — Last 10 Nights of Ramadan 2026 | Al Ummah AI', desc: 'Complete guide to Laylat al-Qadr 2026. Signs of the Night of Power and best duas.', keywords: 'laylat al qadr, night of power, last 10 nights ramadan' },
  { url: '/blog/fajr-prayer-guide-never-miss-fajr', title: 'Never Miss Fajr Prayer Again — Complete Guide | Al Ummah AI', desc: 'Proven strategies to wake up for Fajr prayer every single day.', keywords: 'fajr prayer, how to wake up for fajr, never miss fajr' },
  { url: '/blog/zakat-calculator-guide-2026', title: 'Zakat Calculator Guide 2026 | Al Ummah AI', desc: 'Step-by-step Zakat calculator guide for 2026 with current nisab values and gold rates.', keywords: 'zakat calculator 2026, nisab value 2026, how to calculate zakat' },
  { url: '/blog/hajj-packages-2026-complete-guide', title: 'Hajj 2026 Complete Guide — Packages, Rituals & Tips | Al Ummah AI', desc: 'Complete Hajj 2026 guide with rituals day by day, visa requirements and best packages.', keywords: 'hajj 2026, hajj packages 2026, hajj guide, hajj rituals' },
  { url: '/blog/halal-investments-2026-complete-guide', title: 'Best Halal Investments 2026 | Al Ummah AI', desc: 'Complete guide to halal investing in 2026. Wahed Invest, Islamic ETFs and sukuk.', keywords: 'halal investments 2026, wahed invest, islamic etf, halal stocks' },
  { url: '/blog/ramadan-2026-complete-timetable-guide', title: 'Ramadan 2026 Complete Timetable & Guide | Al Ummah AI', desc: 'Full Ramadan 2026 timetable with Suhoor and Iftar times by city.', keywords: 'ramadan 2026 timetable, ramadan calendar 2026, iftar time 2026' },
  { url: '/blog/how-to-find-qibla-direction', title: 'How to Find Qibla Direction — 5 Methods | Al Ummah AI', desc: 'Complete guide to finding the Qibla direction using compass, apps and more.', keywords: 'how to find qibla, qibla direction, qibla compass' },
  { url: '/blog/islamic-finance-beginners-guide', title: 'Islamic Finance Beginners Guide 2026 | Al Ummah AI', desc: 'Beginner guide to Islamic finance: halal banking, riba-free investments and sukuk.', keywords: 'islamic finance, halal banking, riba free investments' },
  { url: '/blog/prayer-times-near-me-how-they-are-calculated', title: 'How Prayer Times Are Calculated | Al Ummah AI', desc: 'Understand how Islamic prayer times are calculated using astronomy and sun angles.', keywords: 'how prayer times are calculated, prayer time calculation, fajr calculation' },
  { url: '/blog/how-to-perform-salah-step-by-step-guide', title: 'How to Perform Salah — Step by Step Guide | Al Ummah AI', desc: 'Complete step-by-step guide to performing Salah correctly with Arabic and translation.', keywords: 'how to pray salah, salah steps, how to perform prayer' },
  { url: '/blog/best-duas-for-anxiety-depression-stress-in-islam', title: 'Best Duas for Anxiety and Stress | Al Ummah AI', desc: 'Powerful Quranic duas and dhikr for anxiety, depression and stress from Quran and Sunnah.', keywords: 'duas for anxiety, duas for stress, islamic remedies anxiety' },
  { url: '/blog/quran-memorization-tips-how-to-memorize-quran', title: 'How to Memorize Quran — 10 Proven Tips | Al Ummah AI', desc: 'Proven tips and strategies for Quran memorization. Daily routines and revision techniques.', keywords: 'how to memorize quran, quran memorization tips, hifz quran' },
  { url: '/prayer-times/london', title: 'Prayer Times London Today — Fajr, Dhuhr, Asr, Maghrib, Isha | Al Ummah AI', desc: 'Accurate Islamic prayer times for London, UK today.', keywords: 'prayer times london, london prayer times, fajr time london' },
  { url: '/prayer-times/dubai', title: 'Prayer Times Dubai Today | Al Ummah AI', desc: 'Accurate Islamic prayer times for Dubai, UAE today.', keywords: 'prayer times dubai, dubai prayer times' },
  { url: '/prayer-times/istanbul', title: 'Prayer Times Istanbul Today | Al Ummah AI', desc: 'Accurate prayer times for Istanbul, Turkey today.', keywords: 'prayer times istanbul, namaz vakitleri istanbul' },
  { url: '/prayer-times/cairo', title: 'Prayer Times Cairo Today | Al Ummah AI', desc: 'Accurate prayer times for Cairo, Egypt today.', keywords: 'prayer times cairo, salah times cairo' },
  { url: '/prayer-times/jakarta', title: 'Prayer Times Jakarta Today | Al Ummah AI', desc: 'Accurate prayer times for Jakarta, Indonesia today.', keywords: 'prayer times jakarta, waktu sholat jakarta' },
  { url: '/prayer-times/kuala-lumpur', title: 'Prayer Times Kuala Lumpur Today | Al Ummah AI', desc: 'Accurate prayer times for Kuala Lumpur, Malaysia today.', keywords: 'prayer times kuala lumpur, waktu solat kl' },
  { url: '/prayer-times/paris', title: 'Prayer Times Paris Today | Al Ummah AI', desc: 'Accurate prayer times for Paris, France today.', keywords: 'prayer times paris, horaires priere paris' },
  { url: '/prayer-times/new-york', title: 'Prayer Times New York Today | Al Ummah AI', desc: 'Accurate prayer times for New York, USA today.', keywords: 'prayer times new york, salah times nyc' },
  { url: '/prayer-times/madrid', title: 'Prayer Times Madrid Today | Al Ummah AI', desc: 'Accurate prayer times for Madrid, Spain today.', keywords: 'prayer times madrid, horarios rezo madrid' },
  { url: '/prayer-times/karachi', title: 'Prayer Times Karachi Today | Al Ummah AI', desc: 'Accurate prayer times for Karachi, Pakistan today.', keywords: 'prayer times karachi, namaz timings karachi' },
];

function escape(str) {
  return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHtml(route) {
  const { url, title, desc, keywords } = route;
  const canonical = SITE + url;
  let html = template;

  const replaceOrAppend = (pattern, replacement) => {
    if (pattern.test(html)) {
      html = html.replace(pattern, replacement);
    }
  };

  replaceOrAppend(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`);
  replaceOrAppend(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(desc)}">`);
  replaceOrAppend(/<meta name="keywords"[^>]*>/, `<meta name="keywords" content="${escape(keywords)}">`);
  replaceOrAppend(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}">`);
  replaceOrAppend(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escape(title)}">`);
  replaceOrAppend(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escape(desc)}">`);
  replaceOrAppend(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}">`);

  html = html.replace('</head>', `  <link rel="alternate" hreflang="en" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${canonical}">
</head>`);

  return html;
}

let count = 0;
for (const route of ROUTES) {
  const routePath = route.url === '/' ? '/index.html' : `${route.url}/index.html`;
  const filePath  = path.join(distDir, routePath);
  const dir       = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, buildHtml(route), 'utf-8');
  count++;
  console.log('prerended: ' + routePath);
}

console.log('Done: ' + count + ' routes prerendered');
