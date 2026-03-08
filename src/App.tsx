import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { QuranPage } from './pages/QuranPage';
import { QiblaPage } from './pages/QiblaPage';
import { ZakatPage } from './pages/ZakatPage';
import { HajjPage } from './pages/HajjPage';
import { StorePage } from './pages/StorePage';
import { BlogPage } from './pages/BlogPage';
import { DetailedSchedulePage } from './pages/DetailedSchedulePage';
import { ScholarAI } from './components/ScholarAI';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-glamour-blue text-cream">
          <Navbar />
          <main className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quran" element={<QuranPage />} />
              <Route path="/qibla" element={<QiblaPage />} />
              <Route path="/zakat" element={<ZakatPage />} />
              <Route path="/hajj" element={<HajjPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/prayer-times/:city" element={<DetailedSchedulePage />} />
              <Route path="/scholar" element={
                <div className="max-w-4xl mx-auto px-4 py-24">
                  <ScholarAI />
                </div>
              } />
              <Route path="*" element={
                <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                  <h1 className="text-6xl font-display font-bold text-gold">404</h1>
                  <p className="text-xl text-cream/60 italic">This sacred path is currently being revealed.</p>
                  <a href="/" className="bg-gold text-glamour-blue px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs">Return Home</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
