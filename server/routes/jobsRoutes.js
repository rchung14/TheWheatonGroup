import { Router } from 'express';
import { database } from "../database/firebaseConfig.js";
import { ref, get, set } from "firebase/database";

const router = Router();

// Get All Job Listings from Firebase
router.get('/jobs', async (req, res) => {
  try {
    const jobsRef = ref(database, "jobs");
    const snapshot = await get(jobsRef);
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
    const jobRef = ref(database, `jobs/${jobId}`);
    const snapshot = await get(jobRef);
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

// Add New Job
router.post('/add-job', async (req, res) => {
  const { jobID, jobTitle, city, industry, blurb, workType, company } = req.body;
  if (!jobID || !jobTitle || !city || !industry || !blurb || !workType || !company) {
    return res.status(400).json({ message: "All job fields are required." });
  }
  try {
    const jobRef = ref(database, `jobs/${jobID}`);
    await set(jobRef, { jobID, jobTitle, city, industry, blurb, workType, company });
    res.status(201).json({ message: "Job added successfully!" });
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Error adding job listing" });
  }
});

export default router;