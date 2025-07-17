import express from 'express';
import pingFirebase from '../database/pingFirebase.js';

const router = express.Router();

router.get('/ping-firebase', async (req, res) => {
  try {
    await pingFirebase();
    res.status(200).json({ message: 'Firebase pinged' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to ping Firebase' });
  }
});

export default router;