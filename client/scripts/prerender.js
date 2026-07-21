/**
 * Post-build prerender step (server-side rendering, no browser).
 *
 * The Wheaton Group site is a Create React App SPA, so `react-scripts build`
 * emits a single shell (build/index.html) whose <body> is an empty
 * <div id="root">. Crawlers that don't run JS therefore see no <h1> and the
 * generic homepage <title> on every route.
 *
 * This script renders each STATIC route with ReactDOMServer + StaticRouter and
 * injects the resulting markup + react-helmet-async head tags into the built
 * HTML shell, so the initial response carries the correct <title>,
 * <meta name="description">, canonical, OG tags and <h1> - before any JS runs.
 * It's pure Node (no headless Chrome), so it runs identically locally and in
 * the Vercel build container.
 *
 * Dynamic, backend-driven job pages (/careers/:jobId) are intentionally NOT
 * prerendered - they change constantly, keep their client-rendered JSON-LD, and
 * continue to work via the SPA fallback to index.html.
 *
 * Every route other than "/" is React.lazy() in src/App.js (see that file),
 * so rendering here can't use the synchronous renderToString: a lazy
 * component that isn't already resolved makes it throw. Instead this uses
 * the Node streaming API (renderToPipeableStream) and waits for onAllReady,
 * which only fires once every Suspense boundary - including lazy imports -
 * has resolved, giving the same complete, non-streamed HTML as before.
 * babel-plugin-dynamic-import-node rewrites the lazy() factories' import()
 * calls to route through require() so they go through this same
 * babel-register transform instead of Node's native (JSX-incompatible) ESM
 * loader.
 */
require('@babel/register')({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: ['dynamic-import-node'],
  extensions: ['.js', '.jsx'],
  ignore: [/node_modules/],
  cache: false,
});

// The app source imports CSS (and could import images); stub those out so the
// modules load in Node without a webpack loader.
['.css', '.scss', '.sass', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif'].forEach((ext) => {
  require.extensions[ext] = () => {};
});

const fs = require('fs');
const path = require('path');
const { Writable } = require('stream');
const React = require('react');
const { renderToPipeableStream } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const { HelmetProvider } = require('react-helmet-async');
const { AppRoutes } = require('../src/App');

const BUILD_DIR = path.join(__dirname, '..', 'build');

// Static routes with deterministic, backend-independent markup → output file.
const ROUTES = [
  { route: '/', out: 'index.html' },
  { route: '/about', out: 'about/index.html' },
  { route: '/services', out: 'services/index.html' },
  { route: '/employers', out: 'employers/index.html' },
  { route: '/careers', out: 'careers/index.html' },
  { route: '/contact', out: 'contact/index.html' },
  { route: '/privacy', out: 'privacy/index.html' },
  { route: '/terms', out: 'terms/index.html' },
  { route: '/accessibility', out: 'accessibility/index.html' },
  { route: '/404', out: '404.html' },
];

// Inline the main CSS bundle (~5KB) into <head>. The stylesheet <link> is
// render-blocking, so inlining removes a full round trip from the critical
// path on every route (directly improves FCP/LCP on throttled mobile).
const TEMPLATE = fs
  .readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8')
  .replace(
    /<link href="(\/static\/css\/[^"]+\.css)" rel="stylesheet">/,
    (match, cssHref) => {
      const css = fs.readFileSync(path.join(BUILD_DIR, cssHref), 'utf8');
      return `<style>${css}</style>`;
    }
  );

function renderRoute(route) {
  return new Promise((resolve, reject) => {
    const helmetContext = {};
    let body = '';
    const collector = new Writable({
      write(chunk, encoding, callback) {
        body += chunk.toString();
        callback();
      },
    });

    const { pipe } = renderToPipeableStream(
      React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          StaticRouter,
          { location: route },
          React.createElement(AppRoutes)
        )
      ),
      {
        onAllReady() {
          collector.on('finish', () => resolve({ body, helmet: helmetContext.helmet }));
          pipe(collector);
        },
        onError(error) {
          reject(error);
        },
      }
    );
  });
}

async function buildHtml(route) {
  const { body, helmet } = await renderRoute(route);

  // Per-route head tags from react-helmet-async (title/description/canonical/
  // OG/JSON-LD structured data).
  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');

  let html = TEMPLATE
    // Drop the template's hardcoded <title> so helmet's per-route one is the only one.
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    // Inject helmet head tags just before </head>.
    .replace('</head>', `    ${headTags}\n  </head>`)
    // Inject the rendered app into #root.
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  return html;
}

async function main() {
  console.log('Prerendering static routes (SSR)…');
  let ok = 0;
  for (const { route, out } of ROUTES) {
    const html = await buildHtml(route);
    const outPath = path.join(BUILD_DIR, out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
    const title = (html.match(/<title[^>]*>(.*?)<\/title>/s) || [])[1] || '(no title)';
    console.log(`  ✓ ${route.padEnd(12)} → ${out.padEnd(22)} | ${title}`);
    ok++;
  }
  console.log(`Prerender complete (${ok}/${ROUTES.length} routes).`);
}

main().catch((error) => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
