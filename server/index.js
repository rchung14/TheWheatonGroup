import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { database } from './database/firebaseConfig.js';
import jobsRoutes from './routes/jobsRoutes.js';
import applyRoutes from './routes/applyRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

// Render terminates TLS at a proxy; trust it so rate limiting sees real IPs.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// Security headers (nosniff, frameguard, HSTS, etc.)
app.use(
  helmet({
    frameguard: { action: 'deny' },
    hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// CORS allowlist — only the production site and local dev may call the API
// from a browser. Override with ALLOWED_ORIGINS (comma-separated) if needed.
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  'https://www.wheaton-group.com,https://wheaton-group.com,http://localhost:3000'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Non-browser requests (no Origin header) pass through; CORS only
      // governs browsers, and the keep-alive pinger has no Origin.
      callback(null, !origin || allowedOrigins.includes(origin));
    },
    methods: ['GET', 'POST'],
  })
);

// CSRF defense for the email endpoints: browsers always send Origin on
// cross-site POSTs, so reject any POST whose Origin isn't allowlisted.
app.use((req, res, next) => {
  if (req.method === 'POST' && req.headers.origin && !allowedOrigins.includes(req.headers.origin)) {
    return res.status(403).json({ success: false, message: 'Forbidden.' });
  }
  next();
});

// JSON bodies are small forms — anything bigger is abuse.
app.use(express.json({ limit: '50kb' }));

// Global rate limit; health-check pings every 5 min stay well under this.
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests. Please try again later.' },
  })
);

// Health check — pinged by cron every 5 minutes to keep the Render free
// instance awake; the Firebase read keeps the database connection warm too.
app.all('/', async (req, res) => {
  try {
    await database.ref('jobs').limitToFirst(1).once('value');
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ status: 'error' });
  }
});

// Route Handlers
app.use(jobsRoutes);
app.use(applyRoutes);
app.use(contactRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found.' });
});

// Final error handler — log details server-side, never leak them to clients.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const isClientError =
    err.type === 'entity.parse.failed' ||
    err.type === 'entity.too.large' ||
    err.name === 'MulterError';
  res
    .status(isClientError ? 400 : 500)
    .json({ success: false, message: 'Request could not be processed.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
