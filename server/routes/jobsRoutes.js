import { Router } from 'express';
import { database } from "../database/firebaseConfig.js";

const router = Router();

// Jobs change rarely (only via loadJobs.js), so serve from a short-lived
// in-memory cache instead of hitting Firebase on every request.
const CACHE_TTL_MS = 5 * 60 * 1000;
let cachedJobs = null;
let cachedAt = 0;

async function getJobs() {
  if (cachedJobs && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedJobs;
  }
  const snapshot = await database.ref("jobs").once("value");
  cachedJobs = snapshot.exists() ? snapshot.val() : null;
  cachedAt = Date.now();
  return cachedJobs;
}

// Get All Job Listings from Firebase
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await getJobs();
    if (jobs) {
      res.status(200).json(jobs);
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
    const jobs = await getJobs();
    const job = jobs?.[jobId];
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found." });
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Error retrieving job." });
  }
});

export default router;
