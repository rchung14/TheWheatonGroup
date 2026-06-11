// Single source of truth for the backend URL.
// Override locally with REACT_APP_API_URL in client/.env (e.g. http://localhost:5000).
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://thewheatongroup-1.onrender.com";

// Fire-and-forget ping to the Render backend. The server's "/" route also
// reads Firebase RTDB, so one ping keeps both the Render instance and the
// database connection warm.
export const pingBackend = () => {
  fetch(`${API_BASE_URL}/`).catch(() => {
    // Keep-alive only — ignore failures so they never affect the UI.
  });
};
