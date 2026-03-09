import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object | object[];
  type?: 'website' | 'article' | 'product';
  publishedAt?: string;
  modifiedAt?: string;
  noindex?: boolean;
}

const SITE_NAME = "Al Ummah AI";
const SITE_URL = "https://www.alummahai.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_KEYWORDS = "prayer times, quran online, qibla finder, zakat calculator, islamic scholar ai, muslim app, salat times, fajr time, dhuhr, asr, maghrib, isha, ramadan 2026, hajj 2026, أوقات الصلاة, heures de prière, horarios de oración";

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  schema,
  type = 'website',
  publishedAt,
  modifiedAt,
  noindex = false,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
  const image = ogImage || DEFAULT_OG_IMAGE;

  // Build hreflang URLs
  const path = typeof window !== 'undefined'
    ? window.location.pathname.replace(/^\/(ar|es|fr|id|tr|ur)/, '')
    : '/';
  const langs = [
    { lang: 'en',       href: `${SITE_URL}${path}` },
    { lang: 'ar',       href: `${SITE_URL}/ar${path}` },
    { lang: 'fr',       href: `${SITE_URL}/fr${path}` },
    { lang: 'es',       href: `${SITE_URL}/es${path}` },
    { lang: 'id',       href: `${SITE_URL}/id${path}` },
    { lang: 'tr',       href: `${SITE_URL}/tr${path}` },
    { lang: 'ur',       href: `${SITE_URL}/ur${path}` },
    { lang: 'x-default', href: `${SITE_URL}${path}` },
  ];

  // Always inject BreadcrumbList for non-home pages
  const isBlog = typeof window !== 'undefined' && window.location.pathname.startsWith('/blog');
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      ...(isBlog ? [
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
        ...(typeof window !== 'undefined' && window.location.pathname !== '/blog'
          ? [{ "@type": "ListItem", "position": 3, "name": title, "item": canonicalUrl }]
          : []
        ),
      ] : [
        { "@type": "ListItem", "position": 2, "name": title, "item": canonicalUrl },
      ]),
    ],
  };

  const schemas = [
    breadcrumbSchema,
    ...(Array.isArray(schema) ? schema : schema ? [schema] : []),
  ];

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-snippet:-1,max-image-preview:large"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang */}
      {langs.map(l => (
        <link key={l.lang} rel="alternate" hrefLang={l.lang} href={l.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:type"        content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"   content={title} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {modifiedAt  && <meta property="article:modified_time"  content={modifiedAt} />}

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@AlUmmahAI" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Structured Data */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
