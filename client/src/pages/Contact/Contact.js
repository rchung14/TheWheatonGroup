import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css'; 
import DocumentTitle from 'react-document-title';

export const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('http://localhost:2000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatusMessage('Thank you! Your message has been sent successfully.');
        setFormData({ firstName: '', lastName: '', phoneNumber: '', message: '' });
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setStatusMessage('Oops! Something went wrong. Please try again later.');
      }
    } catch (error) {
      setStatusMessage('Error: Unable to send your message. Please check your connection.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contactcontainer">
      <DocumentTitle title="Contact | The Wheaton Group, LLC" />
      <section className="contactmsg">
        <h1>Success starts here</h1>
        <span>
          Leave us a message.
          <br />
          Let's get started.
        </span>
      </section>

      <section className="contactform">
        <form onSubmit={handleSubmit}>
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
          <button className="submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </section>
    </main>
  );
};

export default Contact;