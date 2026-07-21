// Single source of truth for the backend URL.
// Override locally with REACT_APP_API_URL in client/.env (e.g. http://localhost:5000).
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://thewheatongroup-1.onrender.com";

// Fire-and-forget ping to the Render backend. The server's "/" route also
// reads Firebase RTDB, so one ping keeps both the Render instance and the
// database connection warm. Uses sendBeacon (falling back to fetch) because
// a cold/timed-out fetch logs a console error that Lighthouse flags, while
// beacon failures aren't surfaced as page resource errors.
export const pingBackend = () => {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${API_BASE_URL}/`);
  } else {
    fetch(`${API_BASE_URL}/`).catch(() => {
      // Keep-alive only - ignore failures so they never affect the UI.
    });
  }
};
