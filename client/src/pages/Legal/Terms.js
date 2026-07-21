import React from 'react';
import './Legal.css';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo/Seo';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';

const Terms = () => (
  <main className="legal">
    <Seo
      title="Terms of Service | The Wheaton Group, LLC"
      description="The terms and conditions that govern your use of wheaton-group.com and The Wheaton Group, LLC's recruiting and staffing services."
    />

    {/* Page hero - navy bar */}
    <section className="page-hero">
      <div className="container">
        <SectionEyebrow />
        <h1>Terms of Service.</h1>
        <p className="page-hero__breadcrumb">
          <Link to="/">Home</Link> / Terms of Service
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container legal-content">
        <p className="legal-updated">Last updated: July 20, 2026</p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing wheaton-group.com or engaging The Wheaton Group, LLC
          (&ldquo;TWG,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) for direct
          placement or contract recruiting services, you agree to these
          Terms of Service. If you don&rsquo;t agree, please don&rsquo;t use
          the site or our services.
        </p>

        <h2>Use of the Site</h2>
        <p>
          You may use wheaton-group.com to learn about our services, browse
          open roles, and contact us about hiring or career opportunities.
          You agree not to misuse the site, attempt to access it by
          unauthorized means, or submit false information through our forms
          or job applications.
        </p>

        <h2>Recruiting &amp; Placement Services</h2>
        <p>
          Direct placement engagements are success-based: fees apply only
          when a candidate we present is hired, and are subject to the
          90-day guarantee terms agreed with the client at engagement.
          Contract recruiting engagements are billed hourly under the terms
          agreed in the applicable service agreement. Where these Terms of
          Service and a signed client or candidate agreement conflict, the
          signed agreement controls.
        </p>

        <h2>No Guarantee of Placement</h2>
        <p>
          While we work to match qualified candidates with the right roles,
          TWG does not guarantee that any candidate will be hired or that
          any client role will be filled, except as expressly stated in a
          signed engagement agreement.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          The content on wheaton-group.com, including text, graphics, and
          logos, belongs to TWG or its licensors and may not be copied or
          reused without permission.
        </p>

        <h2>Disclaimer &amp; Limitation of Liability</h2>
        <p>
          The site and its content are provided &ldquo;as is&rdquo; without
          warranties of any kind. To the fullest extent permitted by law,
          TWG is not liable for indirect, incidental, or consequential
          damages arising from your use of the site or our services.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          site after changes are posted means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{' '}
          <a href="mailto:will@wheaton-group.com">will@wheaton-group.com</a>{' '}
          or call <a href="tel:+16097077128">(609) 707-7128</a>.
        </p>
      </div>
    </section>
  </main>
);

export default Terms;
