import { Router } from 'express';
import { database } from "../database/firebaseConfig.js";

const router = Router();

// Get All Job Listings from Firebase
router.get('/jobs', async (req, res) => {
  try {
    const jobsRef = database.ref("jobs");
    const snapshot = await jobsRef.once("value");
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: "No jobs found." });
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error retrieving job listings" });
  }
});

// Get Single Job Listing by jobId
router.get('/jobs/:jobId', async (req, res) => {
  const { jobId } = req.params;
  try {
    const jobRef = database.ref(`jobs/${jobId}`);
    const snapshot = await jobRef.once("value");
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: "Job not found." });
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Error retrieving job." });
  }
});

export default router;