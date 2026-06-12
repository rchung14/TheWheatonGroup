import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Employers.css';
import DocumentTitle from 'react-document-title';

export const Employers = () => {
  const navigate = useNavigate();

  return (
    <main className="employerscontainer">
      <DocumentTitle title="For Employers | The Wheaton Group, LLC" />

      {/* Intro Section */}
      <section className="employersintro">
        <span>For Employers</span>
        <h1>Hire the Right Candidate, Guaranteed.</h1>
      </section>
      <div className="employersintroimg">
        <img
          src="/assets/images/whoweare-img2.jpg"
          alt="A recruiter and a hiring manager shaking hands across a desk"
        />
      </div>

      {/* Value Props Section */}
      <section className="valueprops">
        <div className="valueprop">
          <h2>Direct Placement</h2>
          <p>
            Top talent for your hard-to-fill roles, backed by a 90-day guarantee.
            You pay only when we succeed.
          </p>
        </div>
        <div className="valueprop">
          <h2>Contract Recruiting</h2>
          <p>
            Flexible, hourly recruiting capacity for surge hiring, proposals, and
            short or long-term projects. Cancel anytime.
          </p>
        </div>
        <div className="valueprop">
          <h2>Dedicated Partnership</h2>
          <p>
            One point of contact who learns your culture and pipeline, so every
            search starts ahead of schedule.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="hiringprocess">
        <h2>How It Works</h2>
        <div className="hiringsteps">
          <div className="hiringstep">
            <img
              src="/assets/images/servicesimg-bottom.jpg"
              alt="Taking notes together at a sunlit table"
            />
            <span className="stepnum">1</span>
            <h3>Discovery</h3>
            <p>We learn the role, the team, and what success looks like.</p>
          </div>
          <div className="hiringstep">
            <img
              src="/assets/images/careersimg.jpg"
              alt="A team working around an office table"
            />
            <span className="stepnum">2</span>
            <h3>Sourcing</h3>
            <p>We tap our network to surface qualified, interested candidates.</p>
          </div>
          <div className="hiringstep">
            <img
              src="/assets/images/whoweare-img1.jpg"
              alt="A one-on-one interview by a city window"
            />
            <span className="stepnum">3</span>
            <h3>Interviews</h3>
            <p>You meet a curated shortlist — no resume floods.</p>
          </div>
          <div className="hiringstep">
            <img
              src="/assets/images/hero-img1.jpg"
              alt="Two professionals reviewing an offer on a laptop"
            />
            <span className="stepnum">4</span>
            <h3>Placement</h3>
            <p>We close the offer and stay engaged through onboarding.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="employerscta"
        style={{
          background:
            'linear-gradient(rgba(1, 23, 102, 0.92), rgba(1, 23, 102, 0.72)), ' +
            'url(/assets/images/servicesimg.jpg) center 30% / cover no-repeat',
        }}
      >
        <h2>Ready to build your team?</h2>
        <button
          className="employersctabutton"
          onClick={() => navigate('/contactus')}
        >
          Contact Us
        </button>
      </section>
    </main>
  );
};

export default Employers;
