import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Calendar, User, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdSense } from '@/src/components/AdSense';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
  featured?: boolean;
  trending?: boolean;
}

const CATEGORIES = ['All', 'Ramadan', 'Prayer', 'Finance', 'Quran', 'Hajj', 'Lifestyle', 'History'];

const posts: BlogPost[] = [
  {
    id: 'last-10-nights-ramadan',
    title: 'The Last 10 Nights of Ramadan: Complete Guide to Laylatul Qadr',
    excerpt: 'The most sacred nights in Islam. Learn how to find Laylatul Qadr, perform Itikaf, and maximize your worship during the final stretch of Ramadan 2026.',
    author: 'Al Ummah AI',
    date: '2026-03-09',
    image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80',
    category: 'Ramadan',
    readTime: '8 min',
    featured: true,
    trending: true,
  },
  {
    id: 'ramadan-2026-prayer-timetable',
    title: 'Ramadan 2026 Prayer Timetable: Suhoor & Iftar Times by City',
    excerpt: 'Get accurate Suhoor and Iftar times for every city worldwide during Ramadan 2026. London, Paris, Dubai, New York and 50+ cities covered.',
    author: 'Al Ummah AI',
    date: '2026-03-08',
    image: 'https://images.unsplash.com/photo-1542816052-e1b0b5c1c4b9?w=800&q=80',
    category: 'Ramadan',
    readTime: '5 min',
    trending: true,
  },
  {
    id: 'fajr-time-today',
    title: 'What Time is Fajr Today? Complete Guide to Dawn Prayer',
    excerpt: 'How to find the exact Fajr time for your location, why Fajr is the most rewarded prayer, and tips for waking up consistently for Salat al-Fajr.',
    author: 'Al Ummah AI',
    date: '2026-03-07',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    category: 'Prayer',
    readTime: '5 min',
    trending: true,
  },
  {
    id: 'calculate-zakat-2026',
    title: 'How to Calculate Zakat 2026: Step-by-Step Guide',
    excerpt: 'Everything about Nisab threshold, Zakat on gold, silver, cash, stocks and business inventory. Calculate your exact Zakat obligation for 2026.',
    author: 'Al Ummah AI',
    date: '2026-03-06',
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80',
    category: 'Finance',
    readTime: '6 min',
  },
  {
    id: 'hajj-packages-uk-2026',
    title: 'Hajj 2026 Complete Guide: Everything You Need to Know',
    excerpt: 'Dates, rituals, costs and tips for Hajj 2026. From Ihram to Tawaf, Arafat to Muzdalifah — the complete pilgrim guide.',
    author: 'Al Ummah AI',
    date: '2026-03-05',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    category: 'Hajj',
    readTime: '10 min',
  },
  {
    id: 'best-halal-investment-apps-2026',
    title: 'Best Halal Investment Apps 2026: Grow Your Wealth the Sharia Way',
    excerpt: 'Top Sharia-compliant investment platforms: Wahed Invest, Zoya, Aghaz and more. Compare features, fees and returns for halal portfolios.',
    author: 'Al Ummah AI',
    date: '2026-03-04',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    category: 'Finance',
    readTime: '7 min',
  },
  {
    id: 'surah-al-kahf-friday',
    title: 'Why Muslims Read Surah Al-Kahf Every Friday: Full Guide',
    excerpt: 'The Prophet recommended reading Surah Al-Kahf every Friday. Learn the 4 stories, their lessons, and how this Surah protects from Dajjal.',
    author: 'Al Ummah AI',
    date: '2026-03-03',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    category: 'Quran',
    readTime: '6 min',
  },
  {
    id: 'morning-evening-adhkar',
    title: 'Morning & Evening Adhkar: The Complete Daily Dhikr Guide',
    excerpt: 'The authentic Adhkar for morning and evening from Quran and Sunnah. Protect yourself and start every day with the remembrance of Allah.',
    author: 'Al Ummah AI',
    date: '2026-03-02',
    image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80',
    category: 'Lifestyle',
    readTime: '7 min',
  },
  {
    id: 'islamic-history-golden-age',
    title: 'The Islamic Golden Age: When Muslims Led the World in Science',
    excerpt: 'From algebra to astronomy, medicine to philosophy — how Muslim scholars shaped the modern world between 800-1300 CE.',
    author: 'Al Ummah AI',
    date: '2026-03-01',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    category: 'History',
    readTime: '9 min',
  },
  {
    id: 'how-to-pray-salah-beginners',
    title: 'How to Pray Salah: Complete Step-by-Step Guide for Beginners',
    excerpt: 'Never prayed before? This guide walks you through every step of Islamic prayer with Arabic text, transliteration and meaning.',
    author: 'Al Ummah AI',
    date: '2026-02-28',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
    category: 'Prayer',
    readTime: '8 min',
  },
  {
    id: 'quran-memorization-tips',
    title: '10 Proven Tips to Memorize the Quran Faster',
    excerpt: 'Science-backed techniques combined with traditional Hifz methods. How top huffaz memorize Quran efficiently — even as an adult.',
    author: 'Al Ummah AI',
    date: '2026-02-27',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80',
    category: 'Quran',
    readTime: '7 min',
  },
  {
    id: 'halal-food-guide-europe',
    title: 'Halal Food Guide for Muslims Living in Europe 2026',
    excerpt: 'How to identify halal products, trusted certifications in UK, France, Spain and Germany, and apps that make halal shopping easier.',
    author: 'Al Ummah AI',
    date: '2026-02-26',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    category: 'Lifestyle',
    readTime: '6 min',
  },
  {
    id: 'zakat-al-fitr-2026',
    title: 'Zakat al-Fitr 2026: Amount, Rules and When to Pay',
    excerpt: 'How much is Zakat al-Fitr in 2026? Who must pay it, when is the deadline, and who are the eligible recipients?',
    author: 'Al Ummah AI',
    date: '2026-02-25',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
    category: 'Finance',
    readTime: '5 min',
  },
  {
    id: 'islamic-parenting-guide',
    title: 'Raising Muslim Children in the West: A Practical Guide',
    excerpt: 'How to nurture Islamic identity, values and practice in children growing up in non-Muslim majority countries.',
    author: 'Al Ummah AI',
    date: '2026-02-24',
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    category: 'Lifestyle',
    readTime: '8 min',
  },
  {
    id: 'prophet-muhammad-life',
    title: 'The Life of Prophet Muhammad: A Complete Biography',
    excerpt: 'From his birth in Mecca to the final sermon. The life, character and legacy of the Prophet Muhammad — the most influential person in history.',
    author: 'Al Ummah AI',
    date: '2026-02-23',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80',
    category: 'History',
    readTime: '12 min',
  },
];

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = posts.find(p => p.featured);
  const trending = posts.filter(p => p.trending).slice(0, 3);
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
  const regular = filtered.filter(p => !p.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <SEO
        title="Islamic Blog — Guides, Knowledge & Inspiration"
        description="Expert guides on Ramadan 2026, Fajr prayer times, Zakat calculation, Hajj, Quran memorization, halal finance and Islamic lifestyle. Updated daily."
        keywords="ramadan 2026, laylatul qadr, fajr time, how to calculate zakat, hajj 2026, surah al kahf friday, islamic golden age, halal investment, muslim lifestyle"
        canonical="https://www.alummahai.com/blog"
      />

      {/* Header */}
      <div className="text-center space-y-6 mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-block px-6 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.5em]">
          ✦ Ummah Insights
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-6xl md:text-9xl font-display font-black text-cream tracking-tighter">
          Islamic Blog
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gold/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Guides, wisdom and knowledge for the modern Muslim. Updated daily.
        </motion.p>
      </div>

      {/* Featured Post */}
      {featured && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <Link to={`/blog/${featured.id}`} className="group block glass-card overflow-hidden hover:border-gold transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-72 lg:h-auto overflow-hidden">
                <img src={featured.image} alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-glamour-blue/60 to-transparent" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-gold text-glamour-blue text-[10px] font-black uppercase tracking-widest rounded-full">Featured</span>
                  <span className="px-3 py-1 bg-glamour-blue/80 border border-gold/30 text-gold text-[10px] font-black uppercase tracking-widest rounded-full">{featured.category}</span>
                </div>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-4 text-xs text-gold/40 font-black uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime} read</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-black text-cream group-hover:text-gold transition-colors leading-tight">{featured.title}</h2>
                <p className="text-cream/60 font-light leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center text-gold text-[10px] font-black uppercase tracking-[0.3em] pt-4 border-t border-gold/10">
                  Read Full Article <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Trending + AdSense */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gold">Trending Now</span>
          </div>
          <div className="space-y-4">
            {trending.map((post, i) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="glass-card p-6 flex gap-4 hover:border-gold transition-all group">
                <span className="text-3xl font-display font-black text-gold/20 shrink-0 w-10">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-gold/50 font-black uppercase tracking-widest">{post.category}</span>
                  <h3 className="text-base font-display font-black text-cream group-hover:text-gold transition-colors leading-snug mt-1">{post.title}</h3>
                  <span className="text-xs text-cream/30 flex items-center gap-1 mt-2"><Clock className="w-3 h-3" />{post.readTime} read</span>
                </div>
                <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-xl shrink-0" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <AdSense slot="3002505678" format="rectangle" />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-3 flex-wrap mb-12">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeCategory === cat ? 'bg-gold text-glamour-blue' : 'bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {regular.map((post, index) => (
            <motion.article key={post.id} layout
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card group overflow-hidden flex flex-col h-full hover:border-gold transition-all">
              <div className="relative h-52 overflow-hidden">
                <img src={post.image} alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-glamour-blue/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-glamour-blue/80 backdrop-blur-md border border-gold/30 rounded-full text-gold text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
                {post.trending && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gold/90 text-glamour-blue rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Hot
                    </span>
                  </div>
                )}
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[10px] text-gold/40 font-black uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
                <h2 className="text-xl font-display font-black text-cream group-hover:text-gold transition-colors leading-tight flex-1">{post.title}</h2>
                <p className="text-cream/50 font-light leading-relaxed text-sm">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`}
                  className="flex items-center text-gold text-[10px] font-black uppercase tracking-[0.3em] pt-4 border-t border-gold/10 group/btn">
                  Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <AdSense slot="3002505678" format="horizontal" className="mt-20" />

      <div className="mt-20 glass-card p-16 text-center space-y-6 bg-gradient-to-b from-gold/5 to-transparent border-gold/20 rounded-3xl">
        <div className="text-4xl">📖</div>
        <h3 className="text-4xl font-display font-black text-cream">Never Miss an Article</h3>
        <p className="text-gold/60 max-w-xl mx-auto font-light">New guides on prayer, Quran, halal finance and Islamic lifestyle published weekly.</p>
        <Link to="/" className="inline-flex items-center bg-gold text-glamour-blue px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
          Explore All Tools →
        </Link>
      </div>
    </div>
  );
}
