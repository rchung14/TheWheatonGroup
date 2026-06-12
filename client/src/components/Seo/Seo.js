import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.wheaton-group.com';
const SITE_NAME = 'The Wheaton Group, LLC';
// JPEG, not WebP — some link-preview scrapers (e.g. LinkedIn) don't render WebP og:images.
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/og-image.jpg`;

/**
 * Per-route SEO tags. The canonical URL is derived from the current route so
 * every page declares itself (not the homepage) as the canonical version.
 */
const Seo = ({ title, description, image = DEFAULT_IMAGE, noIndex = false }) => {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_URL}${pathname}`;

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
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default Seo;
