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
// so crawlers and the first paint get real content. We mount with createRoot
// rather than hydrateRoot: the prerender captures a client render, which lacks
// the SSR text-node boundary markers hydrateRoot needs, so hydration would bail
// to client rendering anyway. createRoot mounts the identical tree synchronously
// over the prerendered DOM — no flash, no hydration warnings, full interactivity.
ReactDOM.createRoot(container).render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
