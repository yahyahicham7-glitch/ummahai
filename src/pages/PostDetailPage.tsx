import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';
import { Calendar, User, ChevronLeft, Share2, Bookmark } from 'lucide-react';
import { AdSense } from '@/src/components/AdSense';

const NAVY = '#060f1e';
const GOLD = '#D4AF37';

const postContent: Record<string, { title: string; content: string; date: string; author: string; image: string }> = {
  'fajr-time-today': {
    title: 'What Time is Fajr Today? A Complete Guide to Prayer Timing',
    date: '2026-03-07',
    author: 'Al Ummah AI',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    content: `
      <h2>The Importance of Fajr Prayer</h2>
      <p>Fajr is the first of the five daily prayers in Islam. It takes place at dawn, before sunrise. The Prophet ﷺ said: "Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise." (Bukhari)</p>
      <h2>How Fajr Time is Calculated</h2>
      <p>Fajr begins at the start of true dawn (al-fajr al-sadiq), when light begins to spread horizontally across the horizon. Most modern calculations use 18° below the horizon, though this varies by school of thought.</p>
      <h2>Tips for Waking Up for Fajr</h2>
      <ul><li>Sleep early with the intention of waking.</li><li>Use multiple alarms placed across the room.</li><li>Drink water before sleeping to wake naturally.</li><li>Remember the immense spiritual reward of the early morning hours.</li></ul>
    `,
  },
  'calculate-zakat-2026': {
    title: 'How to Calculate Zakat 2026: Step-by-Step Guide',
    date: '2026-03-06',
    author: 'Al Ummah AI',
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200&q=80',
    content: `
      <h2>What is Zakat?</h2>
      <p>Zakat is one of the Five Pillars of Islam — a mandatory charitable contribution for every adult Muslim who meets the Nisab threshold.</p>
      <h2>Step 1: Determine Your Nisab</h2>
      <p>Nisab is equivalent to 87.48g of gold or 612.36g of silver. Check current gold prices to find your threshold.</p>
      <h2>Step 2: Calculate Your Zakatable Assets</h2>
      <p>Include cash, gold, silver, shares, and business inventory. Subtract immediate debts and liabilities.</p>
      <h2>Step 3: Pay 2.5%</h2>
      <p>If your net assets have been above Nisab for one full lunar year (Hawl), you owe 2.5% of the total value.</p>
    `,
  },
};

const CONTENT_STYLE = `
  .post-content h2 { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 800; color: #ffffff; margin: 1.8rem 0 0.8rem; }
  .post-content p  { font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.65); line-height: 1.85; margin-bottom: 1rem; font-weight: 300; }
  .post-content ul { padding-left: 1.4rem; }
  .post-content li { font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 0.4rem; font-weight: 300; }
`;

export function PostDetailPage() {
  const { id } = useParams();
  const post = id ? postContent[id] : null;

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: NAVY }}>
        <style>{CONTENT_STYLE}</style>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: '2rem', color: GOLD }}>Article Not Found</h1>
        <Link to="/blog" style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Return to Blog</Link>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: [post.image],
    datePublished: post.date,
    author: [{ '@type': 'Organization', name: 'Al Ummah AI', url: 'https://www.alummahai.com' }],
  };

  return (
    <div style={{ background: NAVY, minHeight: '100vh', color: '#fff' }}>
      <style>{CONTENT_STYLE}</style>
      <SEO
        title={post.title}
        description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
        ogImage={post.image}
        schema={articleSchema}
      />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(80px,10vh,100px) clamp(16px,5vw,32px) 60px' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: GOLD, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontWeight: 900, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 36 }}>
          <ChevronLeft style={{ width: 14, height: 14 }} /> Back to Blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', gap: 20, fontSize: '0.6rem', color: 'rgba(212,175,55,0.5)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 16, fontFamily: "'DM Sans',sans-serif" }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar style={{ width: 11, height: 11 }} /> {post.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><User style={{ width: 11, height: 11 }} /> {post.author}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 'clamp(1.8rem,5vw,3rem)', color: '#ffffff', lineHeight: 1.15, marginBottom: 28, letterSpacing: '-0.02em' }}>{post.title}</h1>
        </motion.div>

        <div style={{ aspectRatio: '16/9', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.15)', marginBottom: 28 }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid rgba(212,175,55,0.08)', borderBottom: '1px solid rgba(212,175,55,0.08)', marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(212,175,55,0.4)', cursor: 'pointer' }}><Share2 style={{ width: 16, height: 16 }} /></button>
            <button style={{ padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(212,175,55,0.4)', cursor: 'pointer' }}><Bookmark style={{ width: 16, height: 16 }} /></button>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.6rem', color: 'rgba(212,175,55,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>5 min read</span>
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdSense slot="3002509876" format="rectangle" className="max-w-md mx-auto" />
      </div>
    </div>
  );
}
