import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Analytics } from "@vercel/analytics/react";

// pages
import HomePage from './pages/HomePage/HomePage';
import './styles/global.css';

// Every route except "/" is code-split. Only HomePage needs to be in the
// main bundle: it's the one route real users' first navigation (and every
// Lighthouse run) hydrates, so it must be synchronously available. Splitting
// the rest out trims what the browser has to parse/eval before that first
// hydration commit - Lighthouse's mobile CPU throttling (4x) amplifies that
// cost directly into LCP "render delay" for the homepage's H1, even though
// the prerendered markup is already painted on screen.
//
// scripts/prerender.js still needs full, non-lazy HTML for every one of
// these routes (SEO), so it renders this same tree with
// ReactDOMServer.renderToPipeableString + Suspense's onAllReady, which
// resolves every lazy() import before writing the file - see that script for
// details.
const AboutUs = React.lazy(() => import('./pages/AboutUs/AboutUs'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const Employers = React.lazy(() => import('./pages/Employers/Employers'));
const Careers = React.lazy(() => import('./pages/Careers/Careers'));
const JobPage = React.lazy(() => import('./pages/JobPage/JobPage'));
const Privacy = React.lazy(() => import('./pages/Legal/Privacy'));
const Terms = React.lazy(() => import('./pages/Legal/Terms'));
const Accessibility = React.lazy(() => import('./pages/Legal/Accessibility'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

// Vercel Analytics has no visible output (always renders null) and only
// exists to fire a beacon + load a tracking script. Mounting it up front
// adds an extra effect flush and network request to the initial hydration
// commit for zero visual benefit, so defer it until after the page has
// finished loading.
const DeferredAnalytics = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.readyState === 'complete') {
      setReady(true);
      return;
    }
    const onLoad = () => setReady(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return ready ? <Analytics /> : null;
};

// Router-agnostic app shell. The client wraps this in <BrowserRouter> (below);
// the build-time prerenderer (scripts/prerender.js) wraps it in <StaticRouter>.
// Keeping it free of a Router lets both render the exact same tree.
export const AppRoutes = () => (
  <>
    <header>
      <Navbar />
    </header>
    <ScrollToTop />
    <ErrorBoundary>
      {/* fallback={null}: every route below is prerendered (JobPage aside),
          so on a direct/full page load the browser already has real markup
          painted before this Suspense boundary is even evaluated - a null
          fallback never actually shows. It only matters for in-app
          navigation, where a brief blank beat until the chunk loads is fine. */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          {/* Legacy URLs - keep old inbound links working (also 301'd in vercel.json) */}
          <Route path="/aboutus" element={<Navigate to="/about" replace />} />
          <Route path="/contactus" element={<Navigate to="/contact" replace />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:jobId" element={<JobPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
    <footer>
      <Footer />
    </footer>
  </>
);

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <DeferredAnalytics />
    </Router>
  );
};

export default App;