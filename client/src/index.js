import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Prerendered routes (see scripts/prerender.js) ship full markup inside #root
// so crawlers and the first paint get real content. Hydrate that markup rather
// than re-mounting with createRoot: createRoot discards the prerendered DOM
// and inserts brand-new nodes when the bundle executes, and those new nodes
// re-register as LCP candidates, pushing LCP from first paint (~0.6s) out to
// JS execution time (~2.4s on throttled mobile). hydrateRoot adopts the
// existing DOM, so the original paint stands. Non-prerendered URLs (e.g.
// /careers/:jobId, served the SPA-fallback shell) mismatch and recover via a
// client render, which is equivalent to what createRoot did anyway.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  // Dev server and any empty shell: nothing to hydrate.
  ReactDOM.createRoot(container).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
