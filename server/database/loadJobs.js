import fs from "fs";
import csv from "csv-parser";
import { database } from "./firebaseConfig.js";
import { ref, set, get, remove } from "firebase/database";

const csvJobIDs = new Set();

fs.createReadStream("./exampleJobs.csv")
  .pipe(csv())
  .on("data", (row) => {
    // Create a job object from CSV row data
    const job = {
      jobID: row.jobID,
      jobTitle: row.jobTitle,
      city: row.city,
      industry: row.industry,
      blurb: row.blurb,
      workType: row.workType,
      company: row.company,
      description: row.description,
      requirements: row.requirements,
    };

    // Store the jobID from the CSV file
    csvJobIDs.add(job.jobID);

    // Add or update the job in Firebase
    const jobRef = ref(database, `jobs/${job.jobID}`);
    set(jobRef, job)
      .then(() => console.log(`Job ${job.jobID} added/updated successfully.`))
      .catch((error) =>
        console.error(`Error adding/updating job ${job.jobID}:`, error)
      );
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");

    // Fetch all existing jobs from Firebase
    const jobsRef = ref(database, "jobs");
    get(jobsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const existingJobs = snapshot.val();
          // Loop through each job in Firebase
          Object.keys(existingJobs).forEach((jobID) => {
            // If a jobID exists in Firebase but not in the CSV, remove it.
            if (!csvJobIDs.has(jobID)) {
              remove(ref(database, `jobs/${jobID}`))
                .then(() =>
                  console.log(`Job ${jobID} removed successfully.`)
                )
                .catch((error) =>
                  console.error(`Error removing job ${jobID}:`, error)
                );
            }
          });
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  });