import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { Analytics } from "@vercel/analytics/react";

// pages
import HomePage from './pages/HomePage/HomePage';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import Careers from './pages/Careers/Careers';
import JobPage from './pages/JobPage/JobPage';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:jobId" element={<JobPage />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
      <Analytics />
    </Router>
  );
};

export default App;