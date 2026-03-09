import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { Calendar, User, ChevronLeft, Share2, Bookmark } from 'lucide-react';
import { AdSense } from '@/src/components/AdSense';

const postContent: Record<string, { title: string, content: string, date: string, author: string, image: string }> = {
  'fajr-time-today': {
    title: 'What Time is Fajr Today? A Complete Guide to Prayer Timing',
    date: '2024-03-20',
    author: 'Ummah AI Team',
    image: 'https://picsum.photos/seed/fajr/1200/800',
    content: `
      <h2>The Importance of Fajr Prayer</h2>
      <p>Fajr is the first of the five daily prayers in Islam. It takes place at dawn, before sunrise. The Prophet Muhammad (peace be upon him) said: "Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise." (Bukhari)</p>
      
      <h2>How Fajr Time is Calculated</h2>
      <p>Fajr begins at the start of "true dawn" (al-fajr al-sadiq), when light begins to spread horizontally across the horizon. Most modern calculations use an angle of 18 degrees below the horizon, though this can vary by region and school of thought.</p>
      
      <h2>Tips for Waking Up for Fajr</h2>
      <ul>
        <li>Sleep early and with the intention of waking up.</li>
        <li>Use multiple alarms placed away from your bed.</li>
        <li>Ask a friend or family member to wake you up.</li>
        <li>Remember the spiritual rewards of the early morning hours.</li>
      </ul>
    `
  },
  'calculate-zakat-2026': {
    title: 'How to Calculate Zakat 2026: The Ultimate Step-by-Step Guide',
    date: '2024-03-18',
    author: 'Ummah AI Team',
    image: 'https://picsum.photos/seed/zakat/1200/800',
    content: `
      <h2>Understanding Zakat</h2>
      <p>Zakat is one of the Five Pillars of Islam, a mandatory charitable contribution for every adult Muslim who meets the wealth threshold (Nisab).</p>
      
      <h2>Step 1: Determine Your Nisab</h2>
      <p>Nisab is the minimum amount of wealth a Muslim must possess before they are obligated to pay Zakat. It is equivalent to 87.48 grams of gold or 612.36 grams of silver.</p>
      
      <h2>Step 2: Calculate Your Assets</h2>
      <p>Include cash, gold, silver, shares, and business inventory. Subtract your immediate debts and expenses.</p>
      
      <h2>Step 3: Pay 2.5%</h2>
      <p>If your net assets have been above the Nisab for one lunar year (Hawl), you must pay 2.5% of the total value to those in need.</p>
    `
  }
};

export function PostDetailPage() {
  const { id } = useParams();
  const post = id ? postContent[id] : null;

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-display font-bold text-gold">Article Not Found</h1>
        <Link to="/blog" className="text-cream/60 hover:text-gold transition-colors">Return to Blog</Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "author": [{
      "@type": "Organization",
      "name": "Ummah AI",
      "url": "https://www.alummahai.com"
    }]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <SEO 
        title={post.title}
        description={post.content.substring(0, 160).replace(/<[^>]*>/g, '')}
        ogImage={post.image}
        schema={articleSchema}
      />

      <div className="space-y-12">
        <Link to="/blog" className="flex items-center text-gold text-[10px] font-black uppercase tracking-[0.3em] hover:text-cream transition-colors group">
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blog
        </Link>

        <div className="space-y-6">
          <div className="flex items-center space-x-6 text-[10px] text-gold/40 font-black uppercase tracking-widest">
            <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> {post.date}</span>
            <span className="flex items-center"><User className="w-3 h-3 mr-2" /> {post.author}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-cream leading-tight">{post.title}</h1>
        </div>

        <div className="aspect-video rounded-[2rem] overflow-hidden border border-gold/20 shadow-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="flex justify-between items-center py-6 border-y border-gold/10">
          <div className="flex space-x-4">
            <button className="p-3 bg-white/5 rounded-xl text-gold/40 hover:text-gold transition-colors"><Share2 className="w-5 h-5" /></button>
            <button className="p-3 bg-white/5 rounded-xl text-gold/40 hover:text-gold transition-colors"><Bookmark className="w-5 h-5" /></button>
          </div>
          <div className="text-[10px] text-gold/40 font-black uppercase tracking-widest">5 Min Read</div>
        </div>

        <div 
          className="prose prose-invert prose-gold max-w-none text-cream/80 leading-relaxed font-light space-y-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdSense slot="3002509876" format="rectangle" className="max-w-md mx-auto" />
      </div>
    </div>
  );
}
