import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Analytics } from "@vercel/analytics/react";

// pages
import HomePage from './pages/HomePage/HomePage';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import Employers from './pages/Employers/Employers';
import Careers from './pages/Careers/Careers';
import JobPage from './pages/JobPage/JobPage';
import NotFound from './pages/NotFound/NotFound';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <ScrollToTop />
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        {/* Legacy URLs — keep old inbound links working */}
        <Route path="/aboutus" element={<Navigate to="/about" replace />} />
        <Route path="/contactus" element={<Navigate to="/contact" replace />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:jobId" element={<JobPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ErrorBoundary>
      <footer>
        <Footer />
      </footer>
      <Analytics />
    </Router>
  );
};

export default App;