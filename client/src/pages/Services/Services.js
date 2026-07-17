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
    direct: 'Success-based: pay only when we fill the role',
    contract: 'Hourly: pay for the recruiting time you use',
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
    body: 'You meet a curated shortlist, not a flood of resumes.',
  },
  {
    icon: 'check-circle',
    title: 'Placement',
    body: 'We close the offer and stay engaged through onboarding.',
  },
];

// FAQ copy is the single source for both the visible section and the
// FAQPage JSON-LD below, so the structured data can never drift from
// what's on the page.
const FAQS = [
  {
    question: 'What is direct placement recruiting?',
    answer:
      'Direct placement recruiting is a success-based hiring model: we source, vet, and deliver candidates for a permanent role, and you pay a fee only when you hire one of them. The Wheaton Group specializes in direct placement for hard-to-fill positions that have been open 30 days or longer, and every placement is backed by a 90-day guarantee.',
  },
  {
    question: 'How does the 90-day guarantee work?',
    answer:
      'Every direct placement is backed for 90 days from the candidate’s start date. If a placed candidate leaves or is released within that window, we restart the search and replace them at no additional fee. Combined with success-based pricing, that means you only ever pay for a hire that sticks.',
  },
  {
    question: 'What is contract recruiting?',
    answer:
      'Contract recruiting gives you dedicated recruiting capacity on an hourly basis instead of a per-hire fee. It’s built for surge hiring, proposal and capture efforts, and short- or long-term projects where you need an experienced recruiter embedded with your team. You scale hours up or down as demand changes and can cancel anytime without penalties.',
  },
  {
    question: 'What industries does The Wheaton Group specialize in?',
    answer:
      'The Wheaton Group specializes in the federal sector, including government contractors and consulting firms supporting federal agencies, along with professional services, finance, and technology roles. That focus is built on 15+ years of recruiting relationships developed by our Principal, William Hwang.',
  },
];

const SERVICE_SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Direct Placement Recruiting',
    serviceType: 'Direct placement recruiting',
    description:
      'Success-based permanent-hire recruiting for hard-to-fill roles open 30+ days, backed by a 90-day placement guarantee. Pay only when the role is filled.',
    url: 'https://www.wheaton-group.com/services',
    areaServed: 'US',
    provider: {
      '@type': 'Organization',
      name: 'The Wheaton Group, LLC',
      url: 'https://www.wheaton-group.com/',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contract Recruiting',
    serviceType: 'Contract recruiting',
    description:
      'Flexible, hourly recruiting capacity for surge hiring, proposal efforts, and short or long-term projects. Scale up or down and cancel anytime.',
    url: 'https://www.wheaton-group.com/services',
    areaServed: 'US',
    provider: {
      '@type': 'Organization',
      name: 'The Wheaton Group, LLC',
      url: 'https://www.wheaton-group.com/',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  },
];

export const Services = () => {
  return (
    <main className="services">
      <Seo
        title="Direct Placement & Contract Recruiting Services | The Wheaton Group"
        description="Direct placement backed by a 90-day guarantee plus flexible hourly contract recruiting for federal sector and professional services hiring. Compare both models."
        jsonLd={SERVICE_SCHEMAS}
      />

      {/* Page hero - navy bar */}
      <section className="page-hero">
        <div className="container">
          <SectionEyebrow />
          <h1>Direct Placement and Contract Recruiting.</h1>
          <p className="page-hero__intro">
            Two ways to hire with one standard of quality, built on 15+ years
            of recruiting for the federal sector, government contractors, and
            professional services firms.
          </p>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / Services
          </p>
        </div>
      </section>

      {/* Direct Placement */}
      <section className="section">
        <div className="container services-detail__grid">
          <div className="services-detail__copy">
            <SectionEyebrow />
            <h2>Direct Placement</h2>
            <p>
              Direct placement helps you fill critical positions that have
              stayed open too long. We specialize in roles that have been
              vacant for 30 days or longer: the searches where
              job boards have gone quiet, internal referrals are exhausted, and
              every week the seat stays empty costs the team momentum.
            </p>
            <p>
              The engagement starts with a discovery conversation, not a resume
              database. We learn the role as your hiring manager sees it: the
              must-have skills, the clearance or compliance requirements common
              in federal sector work, the team it joins, and what the first
              year of success looks like. From there we map the market, tap a
              network built over 15+ years of recruiting relationships, and
              approach qualified candidates directly, including the passive
              ones who never see a job posting.
            </p>
            <p>
              Every candidate you meet has already been screened against the
              role, briefed on your organization, and confirmed to be genuinely
              interested. You receive a curated shortlist rather than a flood
              of resumes, and we stay engaged through interviews, offer
              negotiation, and onboarding.
            </p>
            <h3>Who it&rsquo;s for</h3>
            <ul>
              <li>
                Hiring managers with critical roles open 30+ days and no
                qualified pipeline
              </li>
              <li>
                Federal contractors and professional services firms that need
                niche or cleared talent
              </li>
              <li>
                Teams that want a recruiting partner accountable for results,
                not activity
              </li>
            </ul>
            <h3>What you receive</h3>
            <ul>
              <li>A curated, pre-screened shortlist for each role</li>
              <li>Market and compensation insight gathered during the search</li>
              <li>Interview scheduling, offer support, and onboarding follow-through</li>
              <li>A 90-day placement guarantee on every hire</li>
            </ul>
            <p>
              Because pricing is success-based, you pay only for positions we
              actually fill. There are no retainers and no charges for a
              search that doesn&rsquo;t end in a hire. It&rsquo;s a risk-free
              way to take your hardest searches off your desk.
            </p>
          </div>
          <aside className="services-callout">
            <span className="services-callout__icon">
              <Icon name="shield-check" />
            </span>
            <h3>90-Day Guarantee</h3>
            <p>
              Every placement is backed for 90 days from the start date. If a
              hire doesn&rsquo;t work out, we restart the search at no extra
              cost, and you pay only when we succeed.
            </p>
          </aside>
        </div>
      </section>

      {/* Contract Recruiting */}
      <section className="section section--off-white">
        <div className="container services-detail__grid">
          <div className="services-detail__copy">
            <SectionEyebrow />
            <h2>Contract Recruiting</h2>
            <p>
              Built for hiring that ebbs and flows, contract recruiting
              supports your short- or long-term needs. Instead of paying a fee
              per hire, you get dedicated recruiting
              capacity by the hour: an experienced recruiter working as an
              embedded extension of your talent acquisition team.
            </p>
            <p>
              This model was built for the rhythms of federal sector and
              professional services hiring: proposal and capture efforts that
              need staffing plans and contingent candidates on short deadlines,
              contract awards that trigger a surge of openings at once, and
              seasonal or project-based demand that doesn&rsquo;t justify a
              permanent recruiting hire. We plug into your process, your
              applicant tracking system, and your hiring managers, and we run
              the full cycle of sourcing, screening, scheduling, and offer
              support under your banner.
            </p>
            <p>
              The terms stay flexible. You set the hours, we track and report
              them, and you can scale up, scale down, or cancel at any time
              without penalties.
              When the surge ends, the engagement ends, with no severance, no
              bench, and no long-term commitment.
            </p>
            <h3>Who it&rsquo;s for</h3>
            <ul>
              <li>
                Contractors staffing up after an award or preparing a proposal
                bid
              </li>
              <li>
                Talent acquisition teams that need surge capacity without
                adding headcount
              </li>
              <li>
                Growing organizations that need senior recruiting expertise a
                few days a week
              </li>
            </ul>
            <h3>What you receive</h3>
            <ul>
              <li>A dedicated recruiter embedded with your team, hour by hour</li>
              <li>Full-cycle recruiting: sourcing, screening, scheduling, offers</li>
              <li>Transparent time tracking and regular pipeline reporting</li>
              <li>The freedom to scale or cancel anytime, without penalties</li>
            </ul>
            <p>
              The result is flexibility: recruiting help exactly when you
              need it, at a predictable hourly cost, without the overhead of a
              permanent hire or the per-placement fees of a search firm.
            </p>
          </div>
          <aside className="services-callout">
            <span className="services-callout__icon">
              <Icon name="clock" />
            </span>
            <h3>Hire by the Hour</h3>
            <p>
              Pay only for the recruiting capacity you use. Scale up for surge
              hiring and proposals, and cancel anytime without penalties.
            </p>
          </aside>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section">
        <div className="container">
          <SectionEyebrow />
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
          <SectionEyebrow />
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

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionEyebrow />
          <h2>Frequently Asked Questions.</h2>
          <div className="services-faq">
            {FAQS.map(({ question, answer }) => (
              <details key={question} className="services-faq__item">
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <SectionEyebrow />
          <h2>Not sure which fits? Let&rsquo;s talk.</h2>
          <p>
            Tell us about your hiring challenge and we&rsquo;ll recommend the
            right approach, with no obligation.
          </p>
          <Button to="/contact" variant="light">Contact Us</Button>
        </div>
      </section>
    </main>
  );
};

export default Services;
