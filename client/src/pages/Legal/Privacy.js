import React from 'react';
import './Legal.css';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo/Seo';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';

const Privacy = () => (
  <main className="legal">
    <Seo
      title="Privacy Policy | The Wheaton Group, LLC"
      description="How The Wheaton Group, LLC collects, uses, and protects the personal information you share with us through our website and recruiting services."
    />

    {/* Page hero - navy bar */}
    <section className="page-hero">
      <div className="container">
        <SectionEyebrow />
        <h1>Privacy Policy.</h1>
        <p className="page-hero__breadcrumb">
          <Link to="/">Home</Link> / Privacy Policy
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container legal-content">
        <p className="legal-updated">Last updated: July 13, 2026</p>

        <h2>Who We Are</h2>
        <p>
          The Wheaton Group, LLC (&ldquo;TWG,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us&rdquo;) is a talent acquisition and recruiting firm. This
          policy explains what personal information we collect through
          wheaton-group.com and our recruiting services, how we use it, and
          the choices you have.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Contact form submissions:</strong> name, email address,
            phone number, service interest, and the message you send us.
          </li>
          <li>
            <strong>Candidate information:</strong> resumes and career
            details you choose to share with us by email or through a job
            application.
          </li>
          <li>
            <strong>Usage data:</strong> anonymized page-view analytics
            (via Vercel Analytics) that do not use advertising cookies or
            track you across other sites.
          </li>
        </ul>

        <h2>How We Use It</h2>
        <ul>
          <li>To respond to your inquiry and provide recruiting services.</li>
          <li>
            To match candidates with roles at our client organizations. We
            share candidate information with a prospective employer only as
            part of the recruiting process.
          </li>
          <li>To understand site usage and improve our website.</li>
        </ul>
        <p>
          We do not sell personal information, and we do not share it with
          third parties for their own marketing.
        </p>

        <h2>Retention &amp; Security</h2>
        <p>
          We keep personal information only as long as needed for the purposes
          above or as required by law, and we use reasonable administrative
          and technical safeguards to protect it.
        </p>

        <h2>Your Choices</h2>
        <p>
          You may request a copy of the personal information we hold about
          you, ask us to correct it, or ask us to delete it at any time by
          emailing{' '}
          <a href="mailto:will@wheaton-group.com">will@wheaton-group.com</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email{' '}
          <a href="mailto:will@wheaton-group.com">will@wheaton-group.com</a>{' '}
          or call <a href="tel:+16097077128">(609) 707-7128</a>.
        </p>
      </div>
    </section>
  </main>
);

export default Privacy;
