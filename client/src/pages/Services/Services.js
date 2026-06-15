import React from 'react';
import './Services.css';
import Seo from '../../components/Seo/Seo';
import { Link } from 'react-router-dom';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

const COMPARISON = [
  {
    label: 'Best for',
    direct: 'Critical roles open 30+ days',
    contract: 'Surge hiring, proposals, project-based needs',
  },
  {
    label: 'Cost model',
    direct: 'Success-based — pay only when we fill the role',
    contract: 'Hourly — pay for the recruiting time you use',
  },
  {
    label: 'Timeline',
    direct: 'Until the right candidate is placed',
    contract: 'Short or long-term, scales with your needs',
  },
  {
    label: 'Guarantee',
    direct: '90-day placement guarantee',
    contract: 'Cancel anytime, no penalties',
  },
];

const PROCESS = [
  {
    icon: 'search',
    title: 'Discovery',
    body: 'We learn the role, the team, and what success looks like.',
  },
  {
    icon: 'users',
    title: 'Sourcing',
    body: 'We tap our network to surface qualified, interested candidates.',
  },
  {
    icon: 'file-text',
    title: 'Vetting',
    body: 'You meet a curated shortlist — no resume floods.',
  },
  {
    icon: 'check-circle',
    title: 'Placement',
    body: 'We close the offer and stay engaged through onboarding.',
  },
];

export const Services = () => {
  return (
    <main className="services">
      <Seo
        title="Direct Placement & Contract Recruiting Services | The Wheaton Group"
        description="Direct placement backed by a 90-day guarantee plus flexible hourly contract recruiting. Compare both models and find the hiring approach that fits."
      />

      {/* Page hero — navy bar */}
      <section className="page-hero">
        <div className="container">
          <SectionEyebrow>Services</SectionEyebrow>
          <h1>Direct Placement and Contract Recruiting.</h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / Services
          </p>
        </div>
      </section>

      {/* Direct Placement */}
      <section className="section">
        <div className="container services-detail__grid">
          <div className="services-detail__copy">
            <SectionEyebrow>Service 01</SectionEyebrow>
            <h2>Direct Placement</h2>
            <p>
              Our direct placement service is designed to help you fill
              critical positions that have remained open for extended periods.
              We specialize in sourcing and securing top-tier talent for roles
              that have been vacant for 30 days or longer.
            </p>
            <p>
              This service is cost-effective, as clients only pay for positions
              that we successfully fill, ensuring a risk-free recruitment
              process.
            </p>
          </div>
          <aside className="services-callout">
            <span className="services-callout__icon">
              <Icon name="shield-check" />
            </span>
            <h3>90-Day Guarantee</h3>
            <p>
              You can trust that the candidates we place will meet your
              expectations — every placement is backed for 90 days, and you pay
              only when we succeed.
            </p>
          </aside>
        </div>
      </section>

      {/* Contract Recruiting */}
      <section className="section section--off-white">
        <div className="container services-detail__grid">
          <div className="services-detail__copy">
            <SectionEyebrow>Service 02</SectionEyebrow>
            <h2>Contract Recruiting</h2>
            <p>
              Ideal for projects requiring flexibility, our contract recruiting
              service supports your short-term or long-term hiring needs.
              Whether you are managing surge efforts or proposal-based demands,
              we provide skilled professionals on a pay-by-hour basis.
            </p>
            <p>
              Our contracts are designed with your convenience in mind,
              allowing you to scale your workforce as needed and cancel at any
              time without penalties. This solution ensures agility and
              efficiency for your evolving business needs.
            </p>
          </div>
          <aside className="services-callout">
            <span className="services-callout__icon">
              <Icon name="clock" />
            </span>
            <h3>Hire by the Hour</h3>
            <p>
              Pay only for the recruiting capacity you use — scale up for surge
              hiring and proposals, and cancel anytime without penalties.
            </p>
          </aside>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section">
        <div className="container">
          <SectionEyebrow>At a Glance</SectionEyebrow>
          <h2>Which Service Fits Your Need?</h2>
          <div className="services-compare__wrap">
            <table className="services-compare">
              <thead>
                <tr>
                  <th></th>
                  <th>Direct Placement</th>
                  <th>Contract Recruiting</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(({ label, direct, contract }) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{direct}</td>
                    <td>{contract}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="section section--off-white">
        <div className="container">
          <SectionEyebrow>Our Process</SectionEyebrow>
          <h2>From First Call to Placed Candidate.</h2>
          <div className="services-process__grid">
            {PROCESS.map(({ icon, title, body }, index) => (
              <div key={title} className="services-step">
                <span className="services-step__num">{index + 1}</span>
                <span className="card__icon">
                  <Icon name={icon} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <SectionEyebrow>Next Step</SectionEyebrow>
          <h2>Not sure which fits? Let&rsquo;s talk.</h2>
          <p>
            Tell us about your hiring challenge and we&rsquo;ll recommend the
            right approach — no obligation.
          </p>
          <Button to="/contact" variant="light">Contact Us</Button>
        </div>
      </section>
    </main>
  );
};

export default Services;
