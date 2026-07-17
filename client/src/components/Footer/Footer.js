import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <div className="footer">
    <div className="footer__inner container">
      <div className="footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">The Wheaton Group, LLC</span>
          <p className="footer__tagline">
            Your talent acquisition partner in identifying the right candidate.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/employers">Employers</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="footer__contact">
          <a href="mailto:will@wheaton-group.com">will@wheaton-group.com</a>
          <a href="tel:+16097077128">(609) 707-7128</a>
        </div>
      </div>

      <div className="footer__divider"></div>

      <div className="footer__legal">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} The Wheaton Group, LLC. All rights reserved.
        </p>
        <ul className="footer__legal-links">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/accessibility">Accessibility Statement</Link></li>
        </ul>
      </div>
    </div>
  </div>
);

export default Footer;
