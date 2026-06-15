import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Contact.css';
import Seo from '../../components/Seo/Seo';
import { API_BASE_URL } from '../../config';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  serviceInterest: 'Not Sure',
  message: '',
  website: '', // honeypot — stays empty for humans
};

export const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    // The backend emails firstName/lastName/phoneNumber/message, so fold the
    // extra fields into the message body rather than changing the API.
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      message:
        `Email: ${formData.email}\n` +
        `Service Interest: ${formData.serviceInterest}\n\n` +
        formData.message,
      website: formData.website,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage('Thank you! Your message has been sent successfully.');
        setFormData(INITIAL_FORM);
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setStatusMessage('Oops! Something went wrong. Please try again later.');
      }
    } catch (error) {
      setStatusMessage('Error: Unable to send your message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact">
      <Seo
        title="Contact | The Wheaton Group — Hire the Right Candidate"
        description="Partner with The Wheaton Group, LLC to hire the right candidate. Call, email, or message us about direct placement or contract recruiting today."
      />

      {/* Page hero — navy bar */}
      <section className="page-hero">
        <div className="container">
          <SectionEyebrow>Success Starts Here</SectionEyebrow>
          <h1>Get in Touch.</h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / Contact
          </p>
        </div>
      </section>

      {/* Split layout — form left, contact info right */}
      <section className="section">
        <div className="container contact__grid">
          <div className="contact__form-col">
            <SectionEyebrow>Contact Form</SectionEyebrow>
            <h2>Leave us a message. Let&rsquo;s get started.</h2>

            <form onSubmit={handleSubmit} className="contact__form">
              {/* Honeypot — hidden from humans, catches naive bots */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>
              <div className="contact__form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="serviceInterest">Service Interest</label>
                <select
                  id="serviceInterest"
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                >
                  <option value="Direct Placement">Direct Placement</option>
                  <option value="Contract Recruiting">Contract Recruiting</option>
                  <option value="Not Sure">Not Sure</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="contact__submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
            {statusMessage && <p className="contact__status">{statusMessage}</p>}
          </div>

          <aside className="contact__info">
            <SectionEyebrow>Direct Contact</SectionEyebrow>
            <h3>Prefer to reach out directly?</h3>
            <p>
              Tell us about the role you&rsquo;re hiring for or the opportunity
              you&rsquo;re looking for — we typically respond within one
              business day.
            </p>
            <div className="contact__info-links">
              <a href="mailto:will@wheaton-group.com">
                <Icon name="mail" size={18} /> will@wheaton-group.com
              </a>
              <a href="tel:+16097077128">
                <Icon name="phone" size={18} /> (609) 707-7128
              </a>
            </div>
            <p className="contact__info-note">
              Every engagement starts with a conversation — no commitment, no
              pressure. We&rsquo;ll listen first and recommend the right
              approach for your situation.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Contact;
