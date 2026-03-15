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
  lang?: string; // 'en'|'ar'|'fr'|'es'
}

const SITE      = 'Al Ummah AI';
const SITE_URL  = 'https://www.alummahai.com';
const OG_IMAGE  = `${SITE_URL}/og-image.jpg`;

/* Brand suffix per language — makes title tags consistent in every language */
const BRAND_SUFFIX: Record<string, string> = {
  en: 'Al Ummah AI',
  ar: 'Al Ummah AI — منصة إسلامية مجانية',
  fr: 'Al Ummah AI — Plateforme Islamique',
  es: 'Al Ummah AI — Plataforma Islámica',
  id: 'Al Ummah AI',
};

const DEFAULT_KW = 'al ummah ai, prayer times, fajr time, qibla finder, quran, zakat calculator, ramadan 2026, أوقات الصلاة, heures de prière, horarios de oración';

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
  lang = 'en',
}: SEOProps) {

  const brandSuffix  = BRAND_SUFFIX[lang] || BRAND_SUFFIX.en;
  /* Format: "Page Title | Al Ummah AI" */
  const fullTitle    = title.includes('Al Ummah AI') ? title : `${title} | ${brandSuffix}`;
  const fullKeywords = keywords ? `${keywords}, ${DEFAULT_KW}` : DEFAULT_KW;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
  const image        = ogImage || OG_IMAGE;

  /* hreflang links */
  const path = typeof window !== 'undefined'
    ? window.location.pathname.replace(/^\/(ar|es|fr|id)/, '')
    : '/';

  const HREFLANGS = [
    { lang: 'en',        href: `${SITE_URL}${path}` },
    { lang: 'ar',        href: `${SITE_URL}${path}` },
    { lang: 'fr',        href: `${SITE_URL}${path}` },
    { lang: 'es',        href: `${SITE_URL}${path}` },
    { lang: 'x-default', href: `${SITE_URL}${path}` },
  ];

  /* Breadcrumb schema — auto-built */
  const isBlog = typeof window !== 'undefined' && window.location.pathname.startsWith('/blog');
  const isPost = isBlog && typeof window !== 'undefined' && window.location.pathname !== '/blog';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: SITE_URL },
      ...(isBlog ? [
        { '@type': 'ListItem', position: 2, name: 'Blog',  item: `${SITE_URL}/blog` },
        ...(isPost ? [{ '@type': 'ListItem', position: 3, name: title, item: canonicalUrl }] : []),
      ] : [
        { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl },
      ]),
    ],
  };

  /* Organization — injected on every page for consistent brand signals */
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Al Ummah AI',
    alternateName: 'AlUmmahAI',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 512, height: 512,
    },
    description: 'Free Islamic platform: GPS prayer times, Qibla finder, Quran, Zakat calculator and Scholar AI for 1.8 billion Muslims.',
    sameAs: [SITE_URL],
  };

  /* Article schema — only for blog posts */
  const articleSchema = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url: canonicalUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: { '@type': 'Organization', name: 'Al Ummah AI', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Al Ummah AI',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  } : null;

  const schemas = [
    breadcrumb,
    orgSchema,
    ...(articleSchema ? [articleSchema] : []),
    ...(Array.isArray(schema) ? schema : schema ? [schema] : []),
  ];

  return (
    <Helmet>
      {/* ── Primary ── */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description"  content={description} />
      <meta name="keywords"     content={fullKeywords} />
      <meta name="author"       content={SITE} />
      <meta name="robots"       content={noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large'} />
      <link rel="canonical"     href={canonicalUrl} />

      {/* ── hreflang ── */}
      {HREFLANGS.map(l => <link key={l.lang} rel="alternate" hrefLang={l.lang} href={l.href} />)}

      {/* ── Open Graph ── */}
      <meta property="og:site_name"    content={SITE} />
      <meta property="og:type"         content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url"          content={canonicalUrl} />
      <meta property="og:title"        content={fullTitle} />
      <meta property="og:description"  content={description} />
      <meta property="og:image"        content={image} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"    content={`${SITE} — ${title}`} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {modifiedAt  && <meta property="article:modified_time"  content={modifiedAt} />}

      {/* ── Twitter ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@AlUmmahAI" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* ── Structured Data ── */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
