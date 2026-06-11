import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { database } from './database/firebaseConfig.js';
import jobsRoutes from './routes/jobsRoutes.js';
import applyRoutes from './routes/applyRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check — pinged by cron every 5 minutes to keep the Render free
// instance awake; the Firebase read keeps the database connection warm too.
app.get('/', async (req, res) => {
  try {
    await database.ref('jobs').limitToFirst(1).once('value');
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ status: 'error' });
  }
});

// Route Handlers
app.use(jobsRoutes);
app.use(applyRoutes);
app.use(contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
