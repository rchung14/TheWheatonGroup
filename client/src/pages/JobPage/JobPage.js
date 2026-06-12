import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import NotFound from "../NotFound/NotFound";
import "./JobPage.css";
import { API_BASE_URL } from "../../config";
import SectionEyebrow from "../../components/SectionEyebrow/SectionEyebrow";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";

const BADGE_CLASS = {
  remote: "badge badge--remote",
  hybrid: "badge badge--hybrid",
  "on-site": "badge badge--onsite",
};

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
  const [website, setWebsite] = useState(""); // honeypot — stays empty for humans
  const [files, setFiles] = useState([]);

  // Create a ref for the file inputs
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs/${jobId}`)
      .then((response) => {
        if (!response.ok) {
          // Expired/unknown job IDs render the 404 page (with noindex) so
          // stale listings drop out of search indexes instead of soft-404ing.
          setError(response.status === 404 ? "not-found" : "Error fetching job details.");
          setLoading(false);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setJob(data);
          setLoading(false);
        }
      })
      .catch(() => {
        setError("Error fetching job details.");
        setLoading(false);
      });
  }, [jobId]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 2) {
      alert("You can attach up to 2 files only.");
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
        fileInputRef.current.value = "";
      }
      return newFiles;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please attach at least one file.");
      return;
    }

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
    formData.append("website", website);
    files.forEach((file) => {
      formData.append("files", file);
    });

    fetch(`${API_BASE_URL}/apply-job`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Application submitted successfully!");
          navigate("/");
        } else {
          alert("Error submitting application.");
        }
      })
      .catch(() => {
        alert("Error applying for job.");
      });
  };

  if (loading) return <main className="jobpage-status">Loading job details...</main>;
  if (error === "not-found" || (!loading && !error && !job)) return <NotFound />;
  if (error) return <main className="jobpage-status">{error}</main>;

  // Google Jobs / ATS structured data for this listing
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.jobTitle,
    description: job.description || "",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company || "The Wheaton Group, LLC",
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.city },
    },
    ...(job.datePosted && { datePosted: job.datePosted }),
    ...(job.workType === "Remote" && { jobLocationType: "TELECOMMUTE" }),
    ...(job.industry && { industry: job.industry }),
    identifier: {
      "@type": "PropertyValue",
      name: "The Wheaton Group, LLC",
      value: job.jobID || jobId,
    },
  };

  // Meta descriptions get truncated in search results past ~160 characters.
  const metaDescription = job.description
    ? `${job.description.slice(0, 157).trimEnd()}${job.description.length > 157 ? "…" : ""}`
    : `Apply for ${job.jobTitle} (${job.city}) through The Wheaton Group, LLC.`;

  return (
    <main className="jobpage">
      <Seo
        title={`${job.jobTitle} | Careers | The Wheaton Group, LLC`}
        description={metaDescription}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* Page hero — navy bar */}
      <section className="page-hero">
        <div className="container">
          <SectionEyebrow>Open Role</SectionEyebrow>
          <h1>{job.jobTitle}</h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / <Link to="/careers">Careers</Link> /{" "}
            {job.jobTitle}
          </p>
          <div className="jobpage-meta">
            <span className="jobpage-meta__item">
              <Icon name="map-pin" size={16} /> {job.city}
            </span>
            {job.industry && (
              <span className="jobpage-meta__item">
                <Icon name="briefcase" size={16} /> {job.industry}
              </span>
            )}
            {job.workType && (
              <span
                className={
                  BADGE_CLASS[(job.workType || "").toLowerCase()] || "badge"
                }
              >
                {job.workType}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section">
        <div className="container jobpage-body">
          <SectionEyebrow>The Role</SectionEyebrow>
          <h2>Job Description</h2>
          <p>{job.description || "No description provided."}</p>

          {job.requirements && (
            <>
              <h3 className="jobpage-requirements">Requirements</h3>
              <p>{job.requirements}</p>
            </>
          )}
        </div>
      </section>

      {/* Apply form */}
      <section className="section section--off-white">
        <div className="container jobpage-body">
          <SectionEyebrow>Apply</SectionEyebrow>
          <h2>Apply for this Job.</h2>
          <form onSubmit={handleSubmit} className="jobpage-form">
            {/* Honeypot — hidden from humans, catches naive bots */}
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="applicantName">Full Name</label>
              <input
                id="applicantName"
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="applicantEmail">Email</label>
              <input
                id="applicantEmail"
                type="email"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="applicantPhone">Phone</label>
              <input
                id="applicantPhone"
                type="text"
                value={applicantPhone}
                onChange={(e) => setApplicantPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="applicantFiles">
                Attach Resume and/or Cover Letter (up to 2 files)
              </label>
              <input
                id="applicantFiles"
                className="jobpage-form__files"
                type="file"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              {files.length > 0 && (
                <ul className="jobpage-form__file-list">
                  {files.map((file, index) => (
                    <li key={index}>
                      <span>{file.name}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => removeFile(index)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button type="submit" variant="primary">Apply Now</Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default JobPage;
