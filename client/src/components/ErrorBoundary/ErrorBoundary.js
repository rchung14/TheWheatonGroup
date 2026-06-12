import React from 'react';
import './ErrorBoundary.css';

// Catches render crashes so users see a generic fallback instead of a blank
// page — and no component names, file paths, or stack traces leak to the UI.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <div className="container">
            <h1>Something went wrong.</h1>
            <p>
              Please refresh the page or come back shortly. If the problem
              persists, reach us at{' '}
              <a href="mailto:will@wheaton-group.com">will@wheaton-group.com</a>.
            </p>
            <a className="btn btn--primary" href="/">
              Back to Home
            </a>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
