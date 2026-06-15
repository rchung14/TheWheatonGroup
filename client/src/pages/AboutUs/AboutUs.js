import React from 'react';
import './AboutUs.css';
import Seo from '../../components/Seo/Seo';
import { Link } from 'react-router-dom';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

const DIFFERENTIATORS = [
  {
    icon: 'users',
    title: 'Personalized Service',
    body: 'We work closely with every client to understand their unique needs, company culture, and long-term goals.',
  },
  {
    icon: 'target',
    title: 'Deep Network',
    body: 'Fifteen-plus years of recruiting relationships mean every search starts ahead of schedule.',
  },
  {
    icon: 'zap',
    title: 'Speed to Hire',
    body: 'We specialize in roles that have sat open 30+ days and move them to offer quickly.',
  },
  {
    icon: 'shield-check',
    title: '90-Day Guarantee',
    body: 'Every direct placement is backed by a 90-day guarantee — you only pay when we succeed.',
  },
];

export const AboutUs = () => {
  return (
    <main className="about">
      <Seo
        title="About Us | The Wheaton Group — Talent Acquisition Partner"
        description="The Wheaton Group, LLC is a talent acquisition partner built on 15+ years of recruiting relationships, personalized service, and a 90-day guarantee."
      />

      {/* Page hero — navy bar */}
      <section className="page-hero">
        <div className="container">
          <SectionEyebrow>About The Wheaton Group, LLC</SectionEyebrow>
          <h1>About Us</h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / About Us
          </p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="section">
        <div className="container about-mission">
          <SectionEyebrow>Our Mission</SectionEyebrow>
          <h2 className="about-mission__quote">
            A real partner. Personalized hiring solutions.
          </h2>
          <p>
            At The Wheaton Group, LLC, we understand that hiring the right
            people is critical to a company&rsquo;s success. That&rsquo;s why we
            take a personalized, strategic approach to talent acquisition,
            working closely with businesses to understand their unique needs,
            company culture, and long-term goals.
          </p>
          <p>
            Through our tailored process, we connect organizations with top
            professionals who not only have the right skills but also align
            with their vision and values. With a commitment to quality,
            efficiency, and lasting partnerships, we help companies build
            strong, high-performing teams that drive growth and success.
          </p>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="section section--off-white">
        <div className="container">
          <SectionEyebrow>What Sets Us Apart</SectionEyebrow>
          <h2>Built on Relationships, Measured by Results.</h2>
          <div className="about-diff__grid">
            {DIFFERENTIATORS.map(({ icon, title, body }) => (
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

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <SectionEyebrow>Leadership</SectionEyebrow>
          <h2>Meet William Hwang.</h2>
          <div className="about-founder">
            <img
              className="about-founder__photo"
              src="/assets/images/headshotexample.webp"
              alt="William Hwang, Principal of The Wheaton Group, LLC"
              width="350"
              height="397"
              loading="lazy"
            />
            <div className="about-founder__bio">
              <h3>William Hwang, Principal</h3>
              <p>
                Degree in Finance and MIS from Drexel University. 15+ years of
                experience recruiting for clients in the federal sector.
              </p>
              <p>
                Discover how William&rsquo;s extensive experience and passion
                for talent acquisition can transform your hiring process.
                Let&rsquo;s build a diverse and successful workforce together.
              </p>
              <div className="about-founder__links">
                <a
                  href="https://www.linkedin.com/in/willhwang/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="linkedin" size={18} /> LinkedIn
                </a>
                <a href="mailto:will@wheaton-group.com">
                  <Icon name="mail" size={18} /> Email
                </a>
                <a href="tel:+16097077128">
                  <Icon name="phone" size={18} /> Phone
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <SectionEyebrow>Work With Us</SectionEyebrow>
          <h2>Start working with us.</h2>
          <p>
            Whether you&rsquo;re hiring or job hunting, the first conversation
            is free — and worth it.
          </p>
          <Button to="/contact" variant="light">Contact Us</Button>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
