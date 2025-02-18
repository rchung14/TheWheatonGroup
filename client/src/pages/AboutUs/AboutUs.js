import React from 'react';
import './AboutUs.css';
import DocumentTitle from 'react-document-title';

export const AboutUs = () => {
  return (
    <main className="aboutuscontainer">
      <DocumentTitle title="About Us | The Wheaton Group, LLC" />
      
      <section className="aboutwheaton">
        <span>About The Wheaton Group, LLC</span>
        <h1>Your Trusted Talent Acquisition Partner.</h1>
      </section>

      <div className="bigimg1-container">
        <img
          className="bigimg1"
          src="assets/images/aboutus.jpg"
          alt="About Us"
        />
      </div>

      <section className="aboutushero">
        <div></div>
        <h2>A Real Partner. Personalized Hiring Solutions.</h2>
        <p>
          At The Wheaton Group, LLC, we understand that hiring the right people is critical to a company’s success. 
          That’s why we take a personalized, strategic approach to talent acquisition, working closely with businesses 
          to understand their unique needs, company culture, and long-term goals. 
          <br /><br />
          Through our tailored process, we 
          connect organizations with top professionals who not only have the right skills but also align with their 
          vision and values. With a commitment to quality, efficiency, and lasting partnerships, we help companies build strong, 
          high-performing teams that drive growth and success.
        </p>
      </section>

      <section className="foundercontainer">
        <h3>Meet William Hwang</h3>
        <p>
          Discover how William's extensive experience and passion for talent
          acquisition can transform your hiring process. Let’s build a diverse and successful workforce together.
        </p>
        <section className="founder">
          <img
            className="headshotimg"
            src="assets/images/headshotexample.jpeg"
            alt="Principal of The Wheaton Group, William Hwang"
          />
          <span>William Hwang, Principal</span>
          <p>
            Degree in Finance and MIS from Drexel University
            <br />
            15+ years of experience in recruiting for clients in the federal sector
          </p>
          <a
            href="https://www.linkedin.com/in/willhwang/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href="mailto:ryanchung14@gmail.com" className="email">
            <i className="fas fa-envelope"></i> Email
          </a>
          <a href="tel:+16103317775" className="phone">
            <i className="fas fa-phone-alt"></i> Phone
          </a>
        </section>
      </section>

      <div className="bigimg2-container">
        <img
          className="bigimg2"
          src="assets/images/founderimg.jpg"
          alt="Group of Asian Americans in corporate setting"
        />
      </div>
    </main>
  );
};

export default AboutUs;