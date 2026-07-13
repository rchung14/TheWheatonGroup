import React from 'react';
import './Legal.css';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo/Seo';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';

const Accessibility = () => (
  <main className="legal">
    <Seo
      title="Accessibility Statement | The Wheaton Group, LLC"
      description="The Wheaton Group, LLC is committed to making wheaton-group.com accessible to everyone, including people who rely on assistive technology."
    />

    {/* Page hero - navy bar */}
    <section className="page-hero">
      <div className="container">
        <SectionEyebrow />
        <h1>Accessibility Statement.</h1>
        <p className="page-hero__breadcrumb">
          <Link to="/">Home</Link> / Accessibility Statement
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container legal-content">
        <p className="legal-updated">Last updated: July 13, 2026</p>

        <h2>Our Commitment</h2>
        <p>
          The Wheaton Group, LLC wants everyone to be able to use
          wheaton-group.com, including people who use screen readers,
          keyboard navigation, or other assistive technology. We aim to
          conform to the Web Content Accessibility Guidelines (WCAG) 2.1,
          Level AA.
        </p>

        <h2>What We Do</h2>
        <ul>
          <li>Semantic HTML landmarks, headings, and labeled form fields.</li>
          <li>Text alternatives for meaningful images.</li>
          <li>Color contrast that meets WCAG AA ratios.</li>
          <li>Visible keyboard focus indicators on interactive elements.</li>
          <li>
            Reduced-motion support that disables animations when your system
            requests it.
          </li>
        </ul>

        <h2>Known Limitations</h2>
        <p>
          We review the site regularly, but some third-party content or newly
          published material may not yet meet our standards. When we find an
          issue, we fix it as quickly as we can.
        </p>

        <h2>Feedback</h2>
        <p>
          If you have difficulty using any part of this website, or would like
          information in an alternative format, please email{' '}
          <a href="mailto:will@wheaton-group.com">will@wheaton-group.com</a>{' '}
          or call <a href="tel:+16097077128">(609) 707-7128</a>. We&rsquo;ll
          do our best to help promptly.
        </p>
      </div>
    </section>
  </main>
);

export default Accessibility;
