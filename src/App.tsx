import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Loader2 } from 'lucide-react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const QuranPage = lazy(() => import('./pages/QuranPage').then(m => ({ default: m.QuranPage })));
const QiblaPage = lazy(() => import('./pages/QiblaPage').then(m => ({ default: m.QiblaPage })));
const ZakatPage = lazy(() => import('./pages/ZakatPage').then(m => ({ default: m.ZakatPage })));
const HajjPage = lazy(() => import('./pages/HajjPage').then(m => ({ default: m.HajjPage })));
const StorePage = lazy(() => import('./pages/StorePage').then(m => ({ default: m.StorePage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const DetailedSchedulePage = lazy(() => import('./pages/DetailedSchedulePage').then(m => ({ default: m.DetailedSchedulePage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const HalalMoneyPage = lazy(() => import('./pages/HalalMoneyPage').then(m => ({ default: m.HalalMoneyPage })));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage').then(m => ({ default: m.PostDetailPage })));
const ScholarAI = lazy(() => import('./components/ScholarAI').then(m => ({ default: m.ScholarAI })));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="w-12 h-12 text-gold animate-spin" />
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quran" element={<QuranPage />} />
      <Route path="/qibla" element={<QiblaPage />} />
      <Route path="/zakat" element={<ZakatPage />} />
      <Route path="/hajj" element={<HajjPage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<PostDetailPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/halal-money" element={<HalalMoneyPage />} />
      <Route path="/prayer-times/:city" element={<DetailedSchedulePage />} />
      <Route path="/scholar" element={
        <div className="max-w-4xl mx-auto px-4 py-24">
          <ScholarAI />
        </div>
      } />
      
      {/* Multilingual Support */}
      <Route path="/:lang/*" element={<LanguageWrapper />} />

      <Route path="*" element={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
          <h1 className="text-6xl font-display font-bold text-gold">404</h1>
          <p className="text-xl text-cream/60 italic">This sacred path is currently being revealed.</p>
          <a href="/" className="bg-gold text-glamour-blue px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs">Return Home</a>
        </div>
      } />
    </Routes>
  );
}

function LanguageWrapper() {
  // This is a simplified version. In a real app, you'd use the :lang param to set i18n language
  return <AppRoutes />;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-glamour-blue text-cream">
          <Navbar />
          <main className="flex-grow pt-24">
            <Suspense fallback={<LoadingFallback />}>
              <AppRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
