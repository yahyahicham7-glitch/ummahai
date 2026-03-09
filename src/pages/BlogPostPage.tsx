import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { AdSense } from '@/src/components/AdSense';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  modified: string;
  image: string;
  category: string;
  readTime: string;
  keywords: string;
  content: React.ReactNode;
}

const posts: Record<string, Post> = {
  'last-10-nights-ramadan': {
    id: 'last-10-nights-ramadan',
    title: 'The Last 10 Nights of Ramadan: Complete Guide to Laylatul Qadr',
    excerpt: 'The last 10 nights of Ramadan are the most sacred days of the Islamic year. Learn how to maximize your worship, find Laylatul Qadr and transform your life.',
    author: 'Al Ummah AI Team',
    date: '2026-03-09',
    modified: '2026-03-09',
    image: 'https://picsum.photos/seed/laylatul/1200/600',
    category: 'Ramadan',
    readTime: '8 min read',
    keywords: 'last 10 nights of ramadan, laylatul qadr, night of power, ramadan 2026, itikaf, odd nights ramadan',
    content: (
      <div className="space-y-8 text-cream/80 font-serif leading-relaxed text-lg">
        <p>The last 10 nights of Ramadan represent the most spiritually charged period in the Islamic calendar. Among these blessed nights lies <strong className="text-gold">Laylatul Qadr</strong> — the Night of Power — described in the Quran as better than a thousand months of worship.</p>

        <h2 className="text-3xl font-display font-black text-cream mt-12">Why Are the Last 10 Nights So Special?</h2>
        <p>The Prophet Muhammad ﷺ used to exert himself in worship during the last ten nights more than at any other time. He would wake his family, tighten his waistcloth, and dedicate himself entirely to Allah. These nights contain Laylatul Qadr — one of the most important nights in Islamic history, when the first verses of the Quran were revealed to the Prophet ﷺ.</p>

        <div className="bg-gold/10 border border-gold/30 rounded-2xl p-8 my-8">
          <p className="text-gold font-arabic text-2xl text-right leading-loose">إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ</p>
          <p className="text-cream/60 italic mt-2">"Indeed, We revealed it (the Quran) during the Night of Decree." — Surah Al-Qadr, 97:1</p>
        </div>

        <h2 className="text-3xl font-display font-black text-cream mt-12">When Are the Last 10 Nights in Ramadan 2026?</h2>
        <p>The last 10 nights of Ramadan 2026 are expected to begin on the evening of <strong className="text-gold">February 26, 2026</strong> (the 21st night of Ramadan). The odd nights — 21st, 23rd, 25th, 27th, and 29th — are when Laylatul Qadr is most likely to occur, with the 27th night being traditionally considered the most probable.</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8">
          {['21st', '23rd', '25th', '27th', '29th'].map((night, i) => (
            <div key={i} className={`glass-card p-4 text-center ${i === 3 ? 'border-gold' : ''}`}>
              <div className="text-2xl font-display font-black text-gold">{night}</div>
              <div className="text-xs text-cream/50 mt-1">Night</div>
              {i === 3 && <div className="text-[10px] text-gold mt-2 uppercase tracking-widest">Most Likely</div>}
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-display font-black text-cream mt-12">5 Essential Acts of Worship for the Last 10 Nights</h2>

        <div className="space-y-6">
          {[
            { num: '01', title: 'Qiyam al-Layl (Night Prayer)', desc: 'Stand in prayer during the night, especially the last third. Pray Tahajjud, recite long portions of Quran, and make heartfelt dua. Even if you can only pray 2 extra rakats, do not miss this opportunity.' },
            { num: '02', title: 'Recite the Special Dua', desc: 'The Prophet ﷺ taught Aisha (RA) this dua for Laylatul Qadr: "Allahumma innaka afuwwun tuhibbul afwa fa\'fu anni" — O Allah, You are forgiving and love forgiveness, so forgive me.' },
            { num: '03', title: 'Itikaf (Seclusion in the Mosque)', desc: 'The Prophet ﷺ observed Itikaf every Ramadan in the last 10 nights. Secluding yourself in the masjid to focus entirely on worship is a powerful Sunnah to revive.' },
            { num: '04', title: 'Increase Quran Recitation', desc: 'Set a goal to complete at least one full recitation of the Quran during these nights. Focus on understanding the meanings, not just reciting quickly.' },
            { num: '05', title: 'Give Sadaqah (Charity)', desc: 'Charity given on Laylatul Qadr is equivalent to charity given for over 83 years. Donate to causes you care about every night of the last 10, to ensure you don\'t miss the blessed night.' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 flex gap-6 items-start hover:border-gold transition-all">
              <span className="text-4xl font-display font-black text-gold/30 shrink-0">{item.num}</span>
              <div>
                <h3 className="text-xl font-display font-black text-cream mb-2">{item.title}</h3>
                <p className="text-cream/60 font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-display font-black text-cream mt-12">Signs of Laylatul Qadr</h2>
        <p>Scholars mention several signs associated with Laylatul Qadr:</p>
        <ul className="space-y-3 list-none">
          {[
            'The night feels peaceful and serene, with a sense of spiritual calm',
            'The sun rises the following morning without rays (a dim, white disc)',
            'The temperature is mild — neither too hot nor too cold',
            'You feel an unusual sense of khushu (humility) during prayer',
            'Duas feel answered and the heart feels open',
          ].map((sign, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <span>{sign}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-3xl font-display font-black text-cream mt-12">A Night-by-Night Schedule for the Last 10 Nights</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Night</th>
                <th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Focus</th>
                <th className="text-left py-3 text-gold font-black uppercase tracking-widest text-[10px]">Recommended Acts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {[
                { night: '21st', focus: 'Tawbah (Repentance)', acts: 'Istighfar, Tahajjud, Charity' },
                { night: '22nd', focus: 'Gratitude', acts: 'Extra Nawafil, Quran, Family Dua' },
                { night: '23rd', focus: 'Quran', acts: 'Full Juz recitation, Reflection' },
                { night: '24th', focus: 'Dua for Ummah', acts: 'Collective dua, Sadaqah' },
                { night: '25th', focus: 'Self-improvement', acts: 'Muhasabah, Quran, Zikr' },
                { night: '26th', focus: 'Family & Parents', acts: 'Dua for family, Silatul Rahim' },
                { night: '27th ⭐', focus: 'LAYLATUL QADR', acts: 'All night worship, Special Dua, Max Charity' },
                { night: '28th', focus: 'Continuation', acts: 'Do not stop — keep momentum' },
                { night: '29th', focus: 'Last chance', acts: 'Full night prayer, Quran completion' },
                { night: '30th', focus: 'Eid preparation', acts: 'Zakat al-Fitr, Takbir, Gratitude' },
              ].map((row, i) => (
                <tr key={i} className={row.night.includes('27') ? 'bg-gold/5' : ''}>
                  <td className={`py-3 font-black ${row.night.includes('27') ? 'text-gold' : 'text-cream'}`}>{row.night}</td>
                  <td className="py-3 text-cream/70">{row.focus}</td>
                  <td className="py-3 text-cream/50 text-sm">{row.acts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-glamour-blue-light border border-gold/20 rounded-3xl p-10 mt-12 text-center space-y-4">
          <h3 className="text-2xl font-display font-black text-cream">Get Accurate Prayer Times for Ramadan 2026</h3>
          <p className="text-cream/60">Use Al Ummah AI to get precise Suhoor, Iftar and Tahajjud times for your city during the last 10 nights.</p>
          <Link to="/" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
            Check Prayer Times →
          </Link>
        </div>
      </div>
    ),
  },
  'fajr-time-today': {
    id: 'fajr-time-today',
    title: 'What Time is Fajr Today? A Complete Guide to Prayer Timing',
    excerpt: 'Understanding the importance of Fajr prayer and how to accurately determine the start of dawn for your daily Salah.',
    author: 'Al Ummah AI Team',
    date: '2026-03-09',
    modified: '2026-03-09',
    image: 'https://picsum.photos/seed/fajr/1200/600',
    category: 'Prayer',
    readTime: '5 min read',
    keywords: 'fajr time today, fajr prayer time, what time is fajr, dawn prayer, salat al fajr',
    content: (
      <div className="space-y-8 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Fajr is the first of the five daily prayers in Islam, performed at dawn before sunrise. Knowing the exact Fajr time for your location is essential for fulfilling this obligation on time.</p>
        <h2 className="text-3xl font-display font-black text-cream mt-12">When Does Fajr Start?</h2>
        <p>Fajr time begins at <strong className="text-gold">true dawn (Fajr al-Sadiq)</strong> — when a horizontal white light appears on the eastern horizon. It ends at sunrise. The window typically lasts between 60–90 minutes depending on your location and time of year.</p>
        <div className="bg-gold/10 border border-gold/30 rounded-2xl p-8 my-8 text-center">
          <p className="text-cream/60 text-sm mb-4">Use Al Ummah AI to get today's Fajr time for your exact location</p>
          <Link to="/" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
            Get My Fajr Time →
          </Link>
        </div>
        <h2 className="text-3xl font-display font-black text-cream mt-12">The Importance of Fajr Prayer</h2>
        <p>The Prophet ﷺ said: "Whoever prays Fajr is under the protection of Allah." Fajr is considered the most rewarded prayer because of the difficulty of waking at dawn, and because the angels of night and day both witness this prayer.</p>
      </div>
    ),
  },
  'calculate-zakat-2026': {
    id: 'calculate-zakat-2026',
    title: 'How to Calculate Zakat 2026: The Ultimate Step-by-Step Guide',
    excerpt: 'Everything you need to know about Nisab, Zakat on gold, silver, cash, and investments for the year 2026.',
    author: 'Al Ummah AI Team',
    date: '2026-03-09',
    modified: '2026-03-09',
    image: 'https://picsum.photos/seed/zakat/1200/600',
    category: 'Finance',
    readTime: '6 min read',
    keywords: 'how to calculate zakat, zakat 2026, nisab 2026, zakat on gold, zakat calculator',
    content: (
      <div className="space-y-8 text-cream/80 font-serif leading-relaxed text-lg">
        <p>Zakat is the third pillar of Islam — a mandatory annual purification of wealth given to those in need. Calculating Zakat correctly ensures your obligation is fulfilled and your wealth is blessed.</p>
        <h2 className="text-3xl font-display font-black text-cream mt-12">What is Nisab in 2026?</h2>
        <p>The Nisab is the minimum amount of wealth a Muslim must have before Zakat becomes obligatory. It is equivalent to <strong className="text-gold">87.48g of gold or 612.36g of silver</strong>. Use the current market price to determine your Nisab threshold.</p>
        <div className="bg-gold/10 border border-gold/30 rounded-2xl p-8 my-8 text-center">
          <p className="text-cream/60 text-sm mb-4">Calculate your exact Zakat amount instantly</p>
          <Link to="/zakat" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
            Use Zakat Calculator →
          </Link>
        </div>
        <h2 className="text-3xl font-display font-black text-cream mt-12">Zakat Rate</h2>
        <p>Zakat is <strong className="text-gold">2.5%</strong> of your total zakatable wealth that has been in your possession for one full lunar year (Hawl). This includes cash, gold, silver, investments, and business inventory above the Nisab threshold.</p>
      </div>
    ),
  },
};

// Fallback for posts not yet written
function FallbackPost({ slug }: { slug: string }) {
  return (
    <div className="text-center py-24 space-y-6">
      <div className="text-6xl">📖</div>
      <h2 className="text-3xl font-display font-black text-cream">Article Coming Soon</h2>
      <p className="text-cream/50">This article is being written by our scholars. Check back soon.</p>
      <Link to="/blog" className="inline-flex items-center bg-gold text-glamour-blue px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
        ← Back to Blog
      </Link>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24">
        <SEO title="Article" description="Islamic knowledge article on Al Ummah AI." />
        <FallbackPost slug={slug || ''} />
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://www.alummahai.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Al Ummah AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.alummahai.com/icons/icon-192.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.modified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.alummahai.com/blog/${post.id}`
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords}
        canonical={`https://www.alummahai.com/blog/${post.id}`}
        ogImage={post.image}
        schema={articleSchema}
        type="article"
        publishedAt={post.date}
        modifiedAt={post.modified}
      />

      {/* Back */}
      <Link to="/blog" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold text-xs font-black uppercase tracking-widest mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 mb-12"
      >
        <div className="flex items-center gap-4">
          <span className="px-4 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-[10px] font-black uppercase tracking-widest">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-cream/30 text-xs"><Clock className="w-3 h-3" /> {post.readTime}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-black text-cream leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-cream/60 font-light leading-relaxed">{post.excerpt}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gold/10">
          <div className="flex items-center gap-4 text-xs text-cream/40">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
          </div>
          <button
            onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
            className="flex items-center gap-2 text-gold/50 hover:text-gold text-xs transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </motion.div>

      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden mb-16 h-64 md:h-96">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>

      {/* AdSense top */}
      <AdSense slot="3002505678" format="rectangle" className="mb-12" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {post.content}
      </motion.div>

      {/* AdSense bottom */}
      <AdSense slot="3002505678" format="rectangle" className="mt-16" />

      {/* Related posts */}
      <div className="mt-20 pt-12 border-t border-gold/10">
        <h3 className="text-2xl font-display font-black text-cream mb-8">More from the Blog</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(posts).filter(p => p.id !== post.id).slice(0, 2).map(related => (
            <Link key={related.id} to={`/blog/${related.id}`} className="glass-card p-6 hover:border-gold transition-all group">
              <span className="text-[10px] text-gold/50 font-black uppercase tracking-widest">{related.category}</span>
              <h4 className="text-lg font-display font-black text-cream mt-2 group-hover:text-gold transition-colors leading-snug">{related.title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
