import React from 'react';
import './Employers.css';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

const VALUE_PROPS = [
  {
    icon: 'target',
    title: 'Direct Placement',
    body: 'Top talent for your hard-to-fill roles, backed by a 90-day guarantee. You pay only when we succeed.',
  },
  {
    icon: 'clock',
    title: 'Contract Recruiting',
    body: 'Flexible, hourly recruiting capacity for surge hiring, proposals, and short or long-term projects. Cancel anytime.',
  },
  {
    icon: 'users',
    title: 'Dedicated Partnership',
    body: 'One point of contact who learns your culture and pipeline, so every search starts ahead of schedule.',
  },
];

const STEPS = [
  {
    image: '/assets/images/servicesimg-bottom.jpg',
    alt: 'Taking notes together at a sunlit table',
    title: 'Discovery',
    body: 'We learn the role, the team, and what success looks like.',
  },
  {
    image: '/assets/images/careersimg.jpg',
    alt: 'A team working around an office table',
    title: 'Sourcing',
    body: 'We tap our network to surface qualified, interested candidates.',
  },
  {
    image: '/assets/images/whoweare-img1.jpg',
    alt: 'A one-on-one interview by a city window',
    title: 'Interviews',
    body: 'You meet a curated shortlist — no resume floods.',
  },
  {
    image: '/assets/images/hero-img1.jpg',
    alt: 'Two professionals reviewing an offer on a laptop',
    title: 'Placement',
    body: 'We close the offer and stay engaged through onboarding.',
  },
];

export const Employers = () => {
  return (
    <main className="employers">
      <DocumentTitle title="For Employers | The Wheaton Group, LLC" />

      {/* Page hero — navy bar */}
      <section className="page-hero">
        <div className="container">
          <SectionEyebrow>For Employers</SectionEyebrow>
          <h1>Hire the Right Candidate, Guaranteed.</h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / Employers
          </p>
        </div>
      </section>

      {/* Value props — 3-up cards */}
      <section className="section">
        <div className="container">
          <SectionEyebrow>How We Help</SectionEyebrow>
          <h2>Recruiting That Fits the Way You Hire.</h2>
          <div className="employers-props__grid">
            {VALUE_PROPS.map(({ icon, title, body }) => (
              <div key={title} className="card">
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

      {/* How it works — 4 steps with photos */}
      <section className="section section--off-white">
        <div className="container">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2>Four Steps to Your Next Hire.</h2>
          <div className="employers-steps__grid">
            {STEPS.map(({ image, alt, title, body }, index) => (
              <div key={title} className="employers-step">
                <img src={image} alt={alt} />
                <div className="employers-step__body">
                  <span className="employers-step__num">{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <SectionEyebrow>Get Started</SectionEyebrow>
          <h2>Ready to build your team?</h2>
          <p>
            Tell us about the role — we&rsquo;ll bring you a curated shortlist,
            risk-free.
          </p>
          <Button to="/contact" variant="light">Contact Us</Button>
        </div>
      </section>
    </main>
  );
};

export default Employers;
