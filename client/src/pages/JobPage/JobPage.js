import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DocumentTitle from "react-document-title";
import "./JobPage.css";

const JobPage = () => {
  const { jobId } = useParams(); // expects route like /careers/:jobId
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state for applicant information
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [files, setFiles] = useState([]);

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch job details using the API base URL from the environment variable
    fetch(`https://thewheatongroup.onrender.com/jobs/${jobId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched job data:", data); // Debug log
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setError("Error fetching job details.");
        setLoading(false);
      });
  }, [jobId]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 2) {
      alert("You can attach up to 2 files only.");
      // Clear file input and state if too many files selected
      e.target.value = "";
      setFiles([]);
      return;
    }
    setFiles(selectedFiles);
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      if (newFiles.length === 0 && fileInputRef.current) {
        // Clear the file input's value if no files remain
        fileInputRef.current.value = "";
      }
      return newFiles;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure at least one file is attached
    if (files.length === 0) {
      alert("Please attach at least one file.");
      return;
    }

    // Safety check: Ensure no more than 2 files are attached
    if (files.length > 2) {
      alert("Please attach no more than 2 files.");
      return;
    }
    
    if (!applicantName || !applicantEmail || !applicantPhone) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare form data for backend (including files)
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("jobTitle", job.jobTitle);
    formData.append("company", job.company);
    formData.append("applicantName", applicantName);
    formData.append("applicantEmail", applicantEmail);
    formData.append("applicantPhone", applicantPhone);
    files.forEach((file) => {
      formData.append("files", file);
    });

    fetch(`${apiBaseUrl}/apply-job`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Application submitted successfully!");
          navigate("/"); // Redirect to home page after success
        } else {
          alert("Error submitting application.");
        }
      })
      .catch((err) => {
        console.error("Error applying for job:", err);
        alert("Error applying for job.");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>No job found.</div>;

  return (
    <main className="jobpage-container">
      <DocumentTitle title={`Careers | ${job.jobTitle}`} />
      <section className="jobpage-header">
        <h1>{job.jobTitle}</h1>
        <p><strong>Location:</strong> {job.city}</p>
        <p><strong>Industry:</strong> {job.industry}</p>
        <p><strong>Work Type:</strong> {job.workType}</p>
      </section>

      <section className="jobpage-description">
        <h2>Job Description</h2>
        <p>{job.description || "No description provided."}</p>
      </section>

      <section className="jobpage-requirements">
        <h2>Job Requirements</h2>
        <p>{job.requirements || "No requirements provided."}</p>
      </section>

      <section className="jobpage-apply">
        <h2>Apply for this Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={applicantPhone}
              onChange={(e) => setApplicantPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Attach Resume and/or Cover Letter (up to 2 files):</label>
            <input 
              type="file" 
              multiple 
              onChange={handleFileChange} 
              ref={fileInputRef} 
            />
            {files.length > 0 && (
              <ul className="file-list">
                {files.map((file, index) => (
                  <li key={index}>
                    <span>{file.name}</span>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => removeFile(index)}
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#777",
                        fontSize: "1.2em",
                        cursor: "pointer",
                        marginLeft: "0.5em",
                        WebkitAppearance: "none"
                      }}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" disabled={files.length === 0 || files.length > 2}>
            Apply Now
          </button>
        </form>
      </section>
    </main>
  );
};

export default JobPage;