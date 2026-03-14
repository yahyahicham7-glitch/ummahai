import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loader2 } from 'lucide-react';

const Home               = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const QuranPage          = lazy(() => import('./pages/QuranPage').then(m => ({ default: m.QuranPage })));
const QiblaPage          = lazy(() => import('./pages/QiblaPage').then(m => ({ default: m.QiblaPage })));
const ZakatPage          = lazy(() => import('./pages/ZakatPage').then(m => ({ default: m.ZakatPage })));
const HajjPage           = lazy(() => import('./pages/HajjPage').then(m => ({ default: m.HajjPage })));
const StorePage          = lazy(() => import('./pages/StorePage').then(m => ({ default: m.StorePage })));
const BlogPage           = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage       = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const RamadanPage        = lazy(() => import('./pages/RamadanPage').then(m => ({ default: m.RamadanPage })));
const HalalMoneyPage     = lazy(() => import('./pages/HalalMoneyPage').then(m => ({ default: m.HalalMoneyPage })));
const PrivacyPage        = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage          = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const AboutPage          = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const PrayerTimesPage    = lazy(() => import('./pages/PrayerTimesPage').then(m => ({ default: m.PrayerTimesPage })));
const DetailedSchedulePage = lazy(() => import('./pages/DetailedSchedulePage').then(m => ({ default: m.DetailedSchedulePage })));
const DailyDuasPage      = lazy(() => import('./pages/DailyDuasPage').then(m => ({ default: m.DailyDuasPage })));
const TasbihPage         = lazy(() => import('./pages/TasbihPage').then(m => ({ default: m.TasbihPage })));
const MoodPage           = lazy(() => import('./pages/MoodPage').then(m => ({ default: m.MoodPage })));
const ScholarAI          = lazy(() => import('./components/ScholarAI').then(m => ({ default: m.ScholarAI })));

const LoadingFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
    <Loader2 style={{ width: 36, height: 36, color: '#D4AF37', animation: 'spin 0.9s linear infinite' }} />
    <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
  </div>
);

const WHITE_PAGES = new Set(['/qibla', '/prayer-times']);

function AppInner() {
  const { pathname } = useLocation();
  const isHome  = pathname === '/';
  const isWhite = WHITE_PAGES.has(pathname) || pathname.startsWith('/prayer-times');
  const bg    = isHome || isWhite ? '#ffffff' : '#060f1e';
  const color = isHome || isWhite ? '#0a2540' : '#ffffff';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: bg, color, transition: 'background 0.3s' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/"                    element={<Home />} />
            <Route path="/quran"               element={<QuranPage />} />
            <Route path="/qibla"               element={<QiblaPage />} />
            <Route path="/zakat"               element={<ZakatPage />} />
            <Route path="/hajj"                element={<HajjPage />} />
            <Route path="/store"               element={<StorePage />} />
            <Route path="/blog"                element={<BlogPage />} />
            <Route path="/blog/:slug"          element={<BlogPostPage />} />
            <Route path="/ramadan"             element={<RamadanPage />} />
            <Route path="/halal-money"         element={<HalalMoneyPage />} />
            <Route path="/privacy"             element={<PrivacyPage />} />
            <Route path="/terms"               element={<TermsPage />} />
            <Route path="/about"               element={<AboutPage />} />
            <Route path="/prayer-times"        element={<PrayerTimesPage />} />
            <Route path="/prayer-times/:city"  element={<PrayerTimesPage />} />
            <Route path="/duas"                element={<DailyDuasPage />} />
            <Route path="/tasbih"              element={<TasbihPage />} />
            <Route path="/mood"                element={<MoodPage />} />
            <Route path="/scholar"             element={
              <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.25rem', background: '#060f1e', minHeight: '100vh' }}>
                <ScholarAI />
              </div>
            } />
            <Route path="*" element={
              <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', background: '#060f1e', padding: '2rem' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: '6rem', color: '#D4AF37', lineHeight: 1 }}>404</div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', fontSize: '1.1rem' }}>
                  This sacred path is not yet revealed.
                </p>
                <a href="/" style={{ background: '#D4AF37', color: '#0a2540', padding: '0.75rem 2rem', borderRadius: 9999, fontWeight: 900, fontFamily: "'DM Sans',sans-serif", textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.75rem', textDecoration: 'none' }}>
                  Return Home
                </a>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppInner />
      </Router>
    </HelmetProvider>
  );
}
