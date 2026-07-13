import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.wheaton-group.com';
const SITE_NAME = 'The Wheaton Group, LLC';
// PNG, not WebP - some link-preview scrapers (e.g. LinkedIn) don't render WebP og:images.
const DEFAULT_IMAGE = `${SITE_URL}/og-card.png`;

/**
 * Per-route SEO tags. The canonical URL is derived from the current route so
 * every page declares itself (not the homepage) as the canonical version.
 * `jsonLd` accepts one schema object or an array of them, rendered as
 * application/ld+json (prerendered into the static HTML for crawlers).
 */
const Seo = ({ title, description, image = DEFAULT_IMAGE, noIndex = false, jsonLd }) => {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_URL}${pathname}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
