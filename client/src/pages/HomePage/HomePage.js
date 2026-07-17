import { useEffect } from 'react';
import './HomePage.css';
import { Helmet } from 'react-helmet-async';
import Seo from '../../components/Seo/Seo';
import { Link } from 'react-router-dom';
import { pingBackend } from '../../config';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

const SERVICES = [
  {
    icon: 'target',
    title: 'Direct Placement',
    tag: '90-Day Guarantee',
    body: 'Find the right fit for your hard-to-fill positions. We deliver top talent for roles open for 30+ days, backed by a 90-day guarantee. You pay only when we succeed.',
    linkText: 'Learn more about Direct Placement',
  },
  {
    icon: 'clock',
    title: 'Contract Recruiting',
    body: 'Flexible recruiting capacity for short or long-term projects, surge hiring, and proposal efforts. Hire by the hour and cancel anytime.',
    linkText: 'Learn more about Contract Recruiting',
  },
];

const STATS = [
  {
    value: '90-Day',
    label: 'Placement Guarantee',
    body: 'Every direct placement is backed by a 90-day guarantee, so you can hire with confidence.',
  },
  {
    value: '30+ Day',
    label: 'Vacancies Filled',
    body: 'We specialize in the hard-to-fill roles that have sat open for a month or longer.',
  },
  {
    value: 'Success-Based',
    label: 'Pricing',
    body: 'You only pay for positions we successfully fill, making the recruitment process risk-free.',
  },
];

export const HomePage = () => {
  // Every homepage load wakes the Render backend (and Firebase via its "/" route).
  useEffect(() => {
    pingBackend();
  }, []);

  return (
    <main className="home">
      <Seo
        title="The Wheaton Group, LLC | Talent Acquisition & Recruiting"
        description="Talent acquisition & recruiting from The Wheaton Group, LLC: direct placement with a 90-day guarantee plus flexible contract recruiting for the federal sector and beyond."
      />
      {/* Preload the hero image (AVIF, matches the <picture> below), but only
          on viewports where it's above the fold. On mobile the hero image sits
          below the copy, and preloading it would steal bandwidth from the
          fonts, which gate the text LCP. */}
      <Helmet>
        <link
          rel="preload"
          as="image"
          type="image/avif"
          media="(min-width: 1025px)"
          imageSrcSet="/assets/images/hero-img1-480.avif 480w, /assets/images/hero-img1-840.avif 840w, /assets/images/hero-img1-1280.avif 1280w"
          imageSizes="40vw"
          fetchpriority="high"
        />
      </Helmet>

      {/* Hero - split layout, off-white bg */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <SectionEyebrow>Talent Acquisition &amp; Recruiting</SectionEyebrow>
            <h1 className="home-hero__title">
              Your Talent Acquisition Partner in Identifying the Right Candidate.
            </h1>
            <p className="home-hero__subtext">
              The Wheaton Group, LLC connects organizations, from federal
              sector contractors to professional services firms, with
              professionals who have the right skills and fit the team,
              through direct placement and contract recruiting.
            </p>
            <div className="home-hero__ctas">
              <Button to="/services" variant="primary" pill>Our Services</Button>
              <Button to="/about" variant="ghost" pill>Who We Are</Button>
            </div>
          </div>
          <div className="home-hero__image">
            <picture>
              <source
                type="image/avif"
                srcSet="/assets/images/hero-img1-480.avif 480w, /assets/images/hero-img1-840.avif 840w, /assets/images/hero-img1-1280.avif 1280w"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <img
                src="/assets/images/hero-img1.webp"
                srcSet="/assets/images/hero-img1-480.webp 480w, /assets/images/hero-img1-840.webp 840w, /assets/images/hero-img1-1280.webp 1280w"
                sizes="(max-width: 1024px) 100vw, 40vw"
                alt="Two business professionals working out a solution"
                width="1280"
                height="854"
                fetchpriority="high"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* About snapshot - image left, copy right, off-white bg for separation */}
      <section className="section section--off-white">
        <div className="container home-about__grid">
          <div className="home-about__image">
            <img
              src="/assets/images/whoweare-img1.webp"
              srcSet="/assets/images/whoweare-img1-480.webp 480w, /assets/images/whoweare-img1-760.webp 760w, /assets/images/whoweare-img1-1280.webp 1280w"
              sizes="(max-width: 1024px) 100vw, 50vw"
              alt="A one-on-one meeting between a recruiter and a candidate"
              width="1280"
              height="854"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="home-about__copy">
            <SectionEyebrow>Who We Are</SectionEyebrow>
            <h2>Your Trusted Talent Solutions Partner.</h2>
            <p>
              The Wheaton Group, LLC (TWG) helps you find a role that fits your
              skills. By understanding your experience and career goals, we
              connect you with companies that value your work and where you can
              do it well.
            </p>
            <Link to="/about" className="arrow-link">
              Learn more about us <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview - 2-up cards */}
      <section className="section">
        <div className="container">
          <SectionEyebrow>Talent Solutions</SectionEyebrow>
          <h2>Direct Placement and Contract Recruiting.</h2>
          <div className="home-services__grid">
            {SERVICES.map(({ icon, title, tag, body, linkText }, index) => (
              <div key={title} className="card home-service">
                <div className="home-service__head">
                  <span className="home-service__num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="card__icon">
                    <Icon name={icon} />
                  </span>
                </div>
                <div className="home-service__head">
                  <h3>{title}</h3>
                  {tag && <span className="guarantee-tag">{tag}</span>}
                </div>
                <p>{body}</p>
                <Link to="/services" className="arrow-link">
                  {linkText} <Icon name="arrow-right" size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TWG - 3 differentiators, dark proof-point band */}
      <section className="home-stats">
        <div className="container">
          <SectionEyebrow>Why TWG</SectionEyebrow>
          <h2>Hiring Without the Risk.</h2>
          <div className="home-stats__grid">
            {STATS.map(({ value, label, body }) => (
              <div key={label} className="home-stat">
                <span className="home-stat__value">{value}</span>
                <h3>{label}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <SectionEyebrow>Get Started</SectionEyebrow>
          <h2>Ready to find the right fit?</h2>
          <p>
            Tell us about the role you need to fill, and we'll handle the rest.
          </p>
          <Button to="/contact" variant="primary">Contact Us</Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
