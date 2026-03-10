import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loader2 } from 'lucide-react';

// Home has its own footer built-in — other pages use shared Footer
const Home        = lazy(() => import('./pages/Home'));
const QuranPage   = lazy(() => import('./pages/QuranPage').then(m => ({ default: m.QuranPage })));
const QiblaPage   = lazy(() => import('./pages/QiblaPage').then(m => ({ default: m.QiblaPage })));
const ZakatPage   = lazy(() => import('./pages/ZakatPage').then(m => ({ default: m.ZakatPage })));
const HajjPage    = lazy(() => import('./pages/HajjPage').then(m => ({ default: m.HajjPage })));
const StorePage   = lazy(() => import('./pages/StorePage').then(m => ({ default: m.StorePage })));
const BlogPage    = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage= lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const RamadanPage = lazy(() => import('./pages/RamadanPage').then(m => ({ default: m.RamadanPage })));
const DetailedSchedulePage = lazy(() => import('./pages/DetailedSchedulePage').then(m => ({ default: m.DetailedSchedulePage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage   = lazy(() => import('./pages/TermsPage'));
const AboutPage   = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const HalalMoneyPage = lazy(() => import('./pages/HalalMoneyPage').then(m => ({ default: m.HalalMoneyPage })));
const ScholarAI   = lazy(() => import('./components/ScholarAI').then(m => ({ default: m.ScholarAI })));

const Spinner = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#D4AF37' }} />
    <p className="text-[9px] font-black tracking-widest uppercase" style={{ color: 'rgba(212,175,55,0.4)' }}>Loading…</p>
  </div>
);

// Pages that use shared Navbar + Footer (not Home)
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#060f1e', color: '#ffffff' }}>
      <Navbar />
      <main className="flex-grow pt-[60px]">
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Home has its own Navbar + Footer */}
          <Route path="/" element={
            <div style={{ background: '#060f1e' }}>
              <Navbar />
              <Suspense fallback={<Spinner />}><Home /></Suspense>
            </div>
          } />

          {/* All other pages use PageLayout */}
          <Route path="/quran"           element={<PageLayout><QuranPage /></PageLayout>} />
          <Route path="/qibla"           element={<PageLayout><QiblaPage /></PageLayout>} />
          <Route path="/zakat"           element={<PageLayout><ZakatPage /></PageLayout>} />
          <Route path="/hajj"            element={<PageLayout><HajjPage /></PageLayout>} />
          <Route path="/store"           element={<PageLayout><StorePage /></PageLayout>} />
          <Route path="/blog"            element={<PageLayout><BlogPage /></PageLayout>} />
          <Route path="/blog/:slug"      element={<PageLayout><BlogPostPage /></PageLayout>} />
          <Route path="/ramadan"         element={<PageLayout><RamadanPage /></PageLayout>} />
          <Route path="/halal-money"     element={<PageLayout><HalalMoneyPage /></PageLayout>} />
          <Route path="/privacy"         element={<PageLayout><PrivacyPage /></PageLayout>} />
          <Route path="/terms"           element={<PageLayout><TermsPage /></PageLayout>} />
          <Route path="/about"           element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="/prayer-times/:city" element={<PageLayout><DetailedSchedulePage /></PageLayout>} />
          <Route path="/scholar"         element={<PageLayout><div className="max-w-4xl mx-auto px-4 py-16"><ScholarAI /></div></PageLayout>} />

          {/* 404 */}
          <Route path="*" element={
            <PageLayout>
              <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-5">
                <h1 className="text-6xl font-black" style={{ color: '#D4AF37' }}>404</h1>
                <p className="text-xl italic" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Cormorant Garamond, serif' }}>
                  This sacred path is not yet revealed.
                </p>
                <a href="/" className="px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F1D279)', color: '#060f1e' }}>
                  Return Home
                </a>
              </div>
            </PageLayout>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
