import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
}

export function SEO({ title, description, keywords, canonical, ogImage, schema }: SEOProps) {
  const siteName = "Ummah AI";
  const fullTitle = `${title} | ${siteName}`;
  const defaultKeywords = "prayer times, quran online, qibla finder, zakat calculator, islamic scholar ai, muslim app, salat times";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Multilingual SEO */}
      <link rel="alternate" hrefLang="en" href={`${window.location.origin}${window.location.pathname.replace(/^\/(ar|es|fr|id)/, '')}`} />
      <link rel="alternate" hrefLang="ar" href={`${window.location.origin}/ar${window.location.pathname.replace(/^\/(ar|es|fr|id)/, '')}`} />
      <link rel="alternate" hrefLang="fr" href={`${window.location.origin}/fr${window.location.pathname.replace(/^\/(ar|es|fr|id)/, '')}`} />
      <link rel="alternate" hrefLang="es" href={`${window.location.origin}/es${window.location.pathname.replace(/^\/(ar|es|fr|id)/, '')}`} />
      <link rel="alternate" hrefLang="id" href={`${window.location.origin}/id${window.location.pathname.replace(/^\/(ar|es|fr|id)/, '')}`} />
      <link rel="alternate" hrefLang="x-default" href={`${window.location.origin}${window.location.pathname.replace(/^\/(ar|es|fr|id)/, '')}`} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {/* AdSense Placeholder (if user adds client ID later) */}
      {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script> */}
    </Helmet>
  );
}
