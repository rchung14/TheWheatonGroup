import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jobsRoutes from './routes/jobsRoutes.js';
import applyRoutes from './routes/applyRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import pingRoute from './routes/pingRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route Handlers
app.use(jobsRoutes);
app.use(applyRoutes);
app.use(contactRoutes);
app.use('/api', pingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});