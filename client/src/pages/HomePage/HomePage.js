import React from 'react';
import { useEffect } from 'react';
import { database } from '../../../server/database/firebaseConfig.js'; 
import { ref, get } from 'firebase/database';
import './HomePage.css';
import DocumentTitle from 'react-document-title';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pingFirebase = async () => {
      try {
        const snapshot = await get(ref(database, '/ping'));
        console.log('Firebase ping success:', snapshot.exists());
      } catch (err) {
        console.error('Firebase ping failed:', err);
      }
    };

    pingFirebase();
  }, []);

  return (
    <main className="container">
      <DocumentTitle title="Home | The Wheaton Group, LLC" />

      {/* Intro Section */}
      <section className="intro">
        <h1>Your Talent Acquisition Partner in Identifying the Right Candidate.</h1>
      </section>
      <div className="introimg">
        <img
          src="assets/images/hero-img1.jpg"
          alt="Two business professionals working out a solution"
        />
      </div>

      {/* Hero Section */}
      <div className="herosection">
        <section className="heroblurb">
          <h2>Your Trusted Talent Solutions Partner</h2>
          <p>
            The Wheaton Group, LLC (TWG) is dedicated to helping you find the perfect opportunity to showcase your skills.
            By understanding your expertise and career goals, we connect you with companies that value your talent, ensuring a seamless match that supports your growth and success.
          </p>
        </section>
      </div>

      {/* Who We Are Section */}
      <section className="whowearecontainer">
        <div className="whoweareimg">
          <img
            src="assets/images/whoweare-img1.jpg"
            alt="A network of people that are always available"
          />
        </div>
        <section className="whoweare">
          <div className="whoweareblurb">
            <span>Want to know more about us?</span>
            <button
              className="whowearebutton"
              onClick={() => navigate('/aboutus')}
            >
              Who We Are
            </button>
          </div>
        </section>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="service">
          <h2>Direct Placement</h2>
          <span>
            Find the right fit for your hard-to-fill positions. We deliver top talent for roles open for 30+ days, backed by a 90-day guarantee—pay only when we succeed.
          </span>
        </div>
        <div className="service">
          <h2>Contract Recruiting</h2>
          <span>
            Flexible staffing solutions tailored to your needs. Perfect for short or long-term projects, surge hiring, and proposal efforts—hire by the hour, cancel anytime.
          </span>
        </div>
        <button
          className="servicesbutton"
          onClick={() => navigate('/services')}
        >
          Learn More
        </button>
      </section>
      <section className="homeimg-container">
        <img
          className="homeimg"
          src="assets/images/homeimg.jpg"
          alt="Home Banner"
        />
      </section>
    </main>
  );
};

export default HomePage;