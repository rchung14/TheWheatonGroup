import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo/Seo';
import SectionEyebrow from '../../components/SectionEyebrow/SectionEyebrow';
import Button from '../../components/Button/Button';

const NotFound = () => {
  return (
    <main className="not-found">
      <Seo
        title="Page Not Found | The Wheaton Group, LLC"
        description="The page you're looking for doesn't exist."
        noIndex
      />

      {/* Page hero — navy bar */}
      <section className="page-hero">
        <div className="container">
          <SectionEyebrow>404</SectionEyebrow>
          <h1>Page Not Found.</h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / 404
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p>
            The page you're looking for doesn't exist or may have moved. Try
            one of the links above, or head back to the homepage.
          </p>
          <Button to="/" variant="primary">Back to Home</Button>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
