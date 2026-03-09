import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '@/src/components/SEO';
import { Calendar, User, ArrowRight, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
}

const posts: BlogPost[] = [
  {
    id: 'fajr-time-today',
    title: 'What Time is Fajr Today? A Complete Guide to Prayer Timing',
    excerpt: 'Understanding the importance of Fajr prayer and how to accurately determine the start of dawn for your daily Salah.',
    author: 'Ummah AI Team',
    date: '2024-03-20',
    image: 'https://picsum.photos/seed/fajr/800/600',
    category: 'Knowledge'
  },
  {
    id: 'calculate-zakat-2026',
    title: 'How to Calculate Zakat 2026: The Ultimate Step-by-Step Guide',
    excerpt: 'Everything you need to know about Nisab, Zakat on gold, silver, cash, and investments for the year 2026.',
    author: 'Ummah AI Team',
    date: '2024-03-18',
    image: 'https://picsum.photos/seed/zakat/800/600',
    category: 'Finance'
  },
  {
    id: 'hajj-packages-uk-2026',
    title: 'Hajj Packages from UK 2026 — Complete Guide for Pilgrims',
    excerpt: 'Planning your sacred journey? Compare Hajj 2026 packages, requirements, and tips for a successful pilgrimage from the United Kingdom.',
    author: 'Ummah AI Team',
    date: '2024-03-15',
    image: 'https://picsum.photos/seed/hajj/800/600',
    category: 'Travel'
  },
  {
    id: 'best-halal-investment-apps-2026',
    title: 'Best Halal Investment Apps 2026: Grow Your Wealth Ethically',
    excerpt: 'Discover the top Sharia-compliant investment platforms like Wahed and Zoya to build a halal portfolio in 2026.',
    author: 'Ummah AI Team',
    date: '2024-03-12',
    image: 'https://picsum.photos/seed/invest/800/600',
    category: 'Finance'
  },
  {
    id: 'ramadan-2026-prayer-timetable',
    title: 'Ramadan 2026 Prayer Timetable by City: Prepare for the Holy Month',
    excerpt: 'Get your local Ramadan 2026 calendar with accurate Suhoor and Iftar times for cities worldwide.',
    author: 'Ummah AI Team',
    date: '2024-03-10',
    image: 'https://picsum.photos/seed/ramadan/800/600',
    category: 'Events'
  }
];

export function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <SEO 
        title="Islamic Blog & Knowledge Base" 
        description="Expert guides on Fajr times, Zakat calculation, Hajj 2026, and Halal investing. Stay informed with Ummah AI."
        keywords="fajr time today, calculate zakat 2026, hajj packages uk 2026, halal investment apps, ramadan 2026 timetable"
      />

      <div className="space-y-20">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] font-black uppercase tracking-[0.5em]"
          >
            Ummah Insights
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-display font-black text-cream tracking-tighter">Islamic Blog</h1>
          <p className="text-gold/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover expert guides, spiritual wisdom, and practical knowledge for the modern Muslim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group overflow-hidden flex flex-col h-full hover:border-gold transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1 bg-glamour-blue/80 backdrop-blur-md border border-gold/30 rounded-full text-gold text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-10 space-y-6 flex-1 flex flex-col">
                <div className="flex items-center space-x-6 text-[10px] text-gold/40 font-black uppercase tracking-widest">
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> {post.date}</span>
                  <span className="flex items-center"><User className="w-3 h-3 mr-2" /> {post.author}</span>
                </div>

                <h2 className="text-2xl font-display font-black text-cream group-hover:text-gold transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-cream/60 font-light leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <Link to={`/blog/${post.id}`} className="flex items-center text-gold text-[10px] font-black uppercase tracking-[0.3em] group/btn pt-6 border-t border-gold/10">
                  Read Full Article <ArrowRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <AdSense slot="3002505678" format="rectangle" className="max-w-md mx-auto" />

        <div className="glass-card p-16 text-center space-y-8 bg-gradient-to-b from-gold/5 to-transparent border-gold/20">
          <MessageSquare className="w-16 h-16 text-gold mx-auto" />
          <h3 className="text-4xl font-display font-black text-cream">Share Your Story</h3>
          <p className="text-gold/60 max-w-xl mx-auto font-light">
            Has Islam changed your life? We'd love to hear your journey. Share your story with the global Ummah and inspire others.
          </p>
          <button className="px-12 py-5 bg-gold text-glamour-blue font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-cream hover:scale-105 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)]">
            Submit Your Story
          </button>
        </div>
      </div>
    </div>
  );
}
