import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const QuranPage = lazy(() => import('./pages/QuranPage').then(m => ({ default: m.QuranPage })));
const QiblaPage = lazy(() => import('./pages/QiblaPage').then(m => ({ default: m.QiblaPage })));
const ZakatPage = lazy(() => import('./pages/ZakatPage').then(m => ({ default: m.ZakatPage })));
const HajjPage = lazy(() => import('./pages/HajjPage').then(m => ({ default: m.HajjPage })));
const StorePage = lazy(() => import('./pages/StorePage').then(m => ({ default: m.StorePage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const RamadanPage = lazy(() => import('./pages/RamadanPage').then(m => ({ default: m.RamadanPage })));
const DetailedSchedulePage = lazy(() => import('./pages/DetailedSchedulePage').then(m => ({ default: m.DetailedSchedulePage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const HalalMoneyPage = lazy(() => import('./pages/HalalMoneyPage').then(m => ({ default: m.HalalMoneyPage })));
const ScholarAI = lazy(() => import('./components/ScholarAI').then(m => ({ default: m.ScholarAI })));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <Loader2 className="w-10 h-10 text-gold animate-spin" />
    <p className="text-gold/40 font-mono text-xs tracking-widest uppercase">Loading...</p>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen" style={{background:"#ffffff",color:"#0a2540"}}>
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quran" element={<QuranPage />} />
                <Route path="/qibla" element={<QiblaPage />} />
                <Route path="/zakat" element={<ZakatPage />} />
                <Route path="/hajj" element={<HajjPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/ramadan" element={<RamadanPage />} />
                <Route path="/halal-money" element={<HalalMoneyPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/prayer-times/:city" element={<DetailedSchedulePage />} />
                <Route path="/scholar" element={
                  <div className="max-w-4xl mx-auto px-4 py-16"><ScholarAI /></div>
                } />
                <Route path="*" element={
                  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                    <h1 className="text-6xl font-display font-black text-gold">404</h1>
                    <p className="text-xl text-cream/50 italic font-serif">This sacred path is not yet revealed.</p>
                    <a href="/" className="bg-gold text-glamour-blue px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">Return Home</a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
