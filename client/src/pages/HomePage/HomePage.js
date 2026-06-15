import { useEffect } from 'react';
import './HomePage.css';
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
    body: 'Find the right fit for your hard-to-fill positions. We deliver top talent for roles open for 30+ days, backed by a 90-day guarantee — pay only when we succeed.',
  },
  {
    icon: 'clock',
    title: 'Contract Recruiting',
    body: 'Flexible staffing solutions tailored to your needs. Perfect for short or long-term projects, surge hiring, and proposal efforts — hire by the hour, cancel anytime.',
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
    body: 'You only pay for positions we successfully fill — a risk-free recruitment process.',
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
        description="Talent acquisition & recruiting from The Wheaton Group, LLC — direct placement with a 90-day guarantee plus flexible, hourly contract recruiting."
      />

      {/* Hero — split layout, off-white bg */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <h1 className="home-hero__title">
              Your Talent Acquisition Partner in Identifying the Right Candidate.
            </h1>
            <p className="home-hero__subtext">
              The Wheaton Group, LLC connects organizations with professionals
              who have the right skills and align with their vision — through
              direct placement and contract recruiting built on results.
            </p>
            <div className="home-hero__ctas">
              <Button to="/services" variant="primary" pill>Our Services</Button>
              <Button to="/about" variant="ghost" pill>Who We Are</Button>
            </div>
          </div>
          <div className="home-hero__image">
            <img
              src="/assets/images/hero-img1.webp"
              alt="Two business professionals working out a solution"
              width="1280"
              height="854"
              fetchpriority="high"
            />
          </div>
        </div>
      </section>

      {/* About snapshot — copy left, image right */}
      <section className="section">
        <div className="container home-about__grid">
          <div className="home-about__copy">
            <SectionEyebrow>Who We Are</SectionEyebrow>
            <h2>Your Trusted Talent Solutions Partner.</h2>
            <p>
              The Wheaton Group, LLC (TWG) is dedicated to helping you find the
              perfect opportunity to showcase your skills. By understanding your
              expertise and career goals, we connect you with companies that
              value your talent, ensuring a seamless match that supports your
              growth and success.
            </p>
            <Link to="/about" className="arrow-link">
              Learn more about us <Icon name="arrow-right" size={18} />
            </Link>
          </div>
          <div className="home-about__image">
            <img
              src="/assets/images/whoweare-img1.webp"
              alt="A one-on-one meeting between a recruiter and a candidate"
              width="1280"
              height="854"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Services preview — 2-up cards */}
      <section className="section section--off-white">
        <div className="container">
          <SectionEyebrow>Talent Solutions</SectionEyebrow>
          <h2>Direct Placement and Contract Recruiting.</h2>
          <div className="home-services__grid">
            {SERVICES.map(({ icon, title, body }) => (
              <div key={title} className="card">
                <span className="card__icon">
                  <Icon name={icon} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
                <Link to="/services" className="arrow-link">
                  Learn More <Icon name="arrow-right" size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TWG — 3 differentiators */}
      <section className="section">
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
            Tell us about the role you need to fill — we'll handle the rest.
          </p>
          <Button to="/contact" variant="light">Contact Us</Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
