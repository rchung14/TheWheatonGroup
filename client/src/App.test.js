import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// CRA's Jest can't resolve this package's exports map, and it's a no-op in tests anyway.
jest.mock('@vercel/analytics/react', () => ({ Analytics: () => null }), { virtual: true });

beforeEach(() => {
  // jsdom has no fetch; the homepage pings the backend on mount.
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
});

test('renders the homepage hero', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const heroTitle = screen.getByRole('heading', {
    level: 1,
    name: /your talent acquisition partner/i,
  });
  expect(heroTitle).toBeInTheDocument();
});
