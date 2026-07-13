import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Careers.css";
import Seo from "../../components/Seo/Seo";
import { API_BASE_URL } from "../../config";
import SectionEyebrow from "../../components/SectionEyebrow/SectionEyebrow";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";

const WORK_TYPES = ["All", "Remote", "Hybrid", "On-site"];

const BADGE_CLASS = {
  remote: "badge badge--remote",
  hybrid: "badge badge--hybrid",
  "on-site": "badge badge--onsite",
};

export const Careers = () => {
  const [jobs, setJobs] = useState([]);

  // Input state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");

  // Filter state variables (text filters apply on Search; work type applies instantly)
  const [searchTermFilter, setSearchTermFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Suggestion visibility states
  const [jobTitleSuggestionsVisible, setJobTitleSuggestionsVisible] = useState(false);
  const [citySuggestionsVisible, setCitySuggestionsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs`)
      .then((response) => response.json())
      .then((data) => {
        let jobsArray = [];

        if (Array.isArray(data)) {
          jobsArray = data;
        } else if (data && typeof data === "object") {
          jobsArray = Object.values(data);
        }

        const cleanedJobs = jobsArray.filter(
          (job) => job && job.jobID && job.jobTitle
        );

        setJobs(cleanedJobs);
      })
      .catch(() => {
        // Listing fetch failed - the empty state below covers it.
      });
  }, []);

  // Suggestions based on current input values
  const jobTitleSuggestions = Array.from(
    new Set(
      jobs
        .filter((job) => job != null)
        .map((job) => job.jobTitle || "")
        .filter(
          (title) =>
            title &&
            title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            searchTerm !== ""
        )
    )
  );

  const citySuggestions = Array.from(
    new Set(
      jobs
        .filter((job) => job != null)
        .map((job) => job.city || "")
        .filter(
          (c) =>
            c &&
            c.toLowerCase().includes(city.toLowerCase()) &&
            city !== ""
        )
    )
  );

  const filteredJobs = jobs
    .filter((job) => job && job.jobID && job.jobTitle)
    .filter(
      (job) =>
        (searchTermFilter === "" ||
          (job.jobTitle || "").toLowerCase().includes(searchTermFilter.toLowerCase())) &&
        (cityFilter === "" ||
          (job.city || "").toLowerCase().includes(cityFilter.toLowerCase())) &&
        (workTypeFilter === "All" ||
          (job.workType || "").toLowerCase() === workTypeFilter.toLowerCase())
    );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTermFilter(searchTerm);
    setCityFilter(city);
    setCurrentPage(1);
  };

  const handleWorkType = (type) => {
    setWorkTypeFilter(type);
    setCurrentPage(1);
  };

  const selectSuggestion = (field, value) => {
    if (field === "jobTitle") {
      setSearchTerm(value);
      setJobTitleSuggestionsVisible(false);
    } else if (field === "city") {
      setCity(value);
      setCitySuggestionsVisible(false);
    }
  };

  return (
    <main className="careers">
      {/* noIndex: with no live listings this page would look like a soft 404
          to Google. Remove the flag once real job listings are published. */}
      <Seo
        title="Open Jobs & Careers | The Wheaton Group"
        description="Browse open remote, hybrid, and on-site roles. Search jobs by title, city, and work type, then apply directly through The Wheaton Group, LLC."
        noIndex
      />

      {/* Page hero - navy bar */}
      <section className="page-hero">
        <div className="container">
          <SectionEyebrow>Careers</SectionEyebrow>
          <h1>Browse Opportunities.</h1>
          <p className="page-hero__breadcrumb">
            <Link to="/">Home</Link> / Careers
          </p>
        </div>
      </section>

      {/* Search + filter bar */}
      <section className="careers-search">
        <div className="container">
          <form onSubmit={handleSearch} className="careers-search__form">
            <div className="careers-search__field">
              <input
                type="text"
                placeholder="Search by job title..."
                aria-label="Search by job title"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setJobTitleSuggestionsVisible(true);
                }}
                onBlur={() =>
                  setTimeout(() => setJobTitleSuggestionsVisible(false), 100)
                }
                onFocus={() => {
                  if (searchTerm !== "") setJobTitleSuggestionsVisible(true);
                }}
              />
              {jobTitleSuggestionsVisible && jobTitleSuggestions.length > 0 && (
                <ul className="careers-search__suggestions">
                  {jobTitleSuggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      onMouseDown={() => selectSuggestion("jobTitle", suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="careers-search__field">
              <input
                type="text"
                placeholder="Enter city..."
                aria-label="Filter by city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setCitySuggestionsVisible(true);
                }}
                onBlur={() =>
                  setTimeout(() => setCitySuggestionsVisible(false), 100)
                }
                onFocus={() => {
                  if (city !== "") setCitySuggestionsVisible(true);
                }}
              />
              {citySuggestionsVisible && citySuggestions.length > 0 && (
                <ul className="careers-search__suggestions">
                  {citySuggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      onMouseDown={() => selectSuggestion("city", suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button type="submit" variant="primary">
              <Icon name="search" size={18} /> Search
            </Button>
          </form>

          {/* Work type filter pills - apply instantly */}
          <div className="careers-search__pills" role="group" aria-label="Filter by work type">
            {WORK_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={`careers-pill${workTypeFilter === type ? " is-active" : ""}`}
                onClick={() => handleWorkType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section className="section careers-listings">
        <div className="container">
          {currentJobs.length > 0 ? (
            <div className="careers-listings__grid">
              {currentJobs.map((job) => (
                <div key={job.jobID} className="card careers-job">
                  <div className="careers-job__meta">
                    <span
                      className={
                        BADGE_CLASS[(job.workType || "").toLowerCase()] || "badge"
                      }
                    >
                      {job.workType}
                    </span>
                  </div>
                  <h3>{job.jobTitle}</h3>
                  <p className="careers-job__city">
                    <Icon name="map-pin" size={16} /> {job.city}
                  </p>
                  <button
                    className="arrow-link careers-job__link"
                    onClick={() => navigate(`/careers/${job.jobID}`)}
                  >
                    View Description <Icon name="arrow-right" size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="careers-empty">
              <h3>No roles match your search.</h3>
              <p>
                Check back soon or send us your resume, and we&rsquo;ll reach
                out when the right role opens up.
              </p>
            </div>
          )}

          {/* Evergreen context so the page has substance between postings */}
          <div className="careers-about">
            <h2>The Roles We Recruit For.</h2>
            <p>
              The Wheaton Group, LLC places professionals with federal sector
              contractors, consulting and professional services firms, and
              growing commercial organizations. Typical searches include
              program and project managers, proposal and capture specialists,
              finance and accounting professionals, software engineers and
              other technologists, and the hard-to-fill specialist roles that
              sit open for 30 days or longer. Openings move quickly, and many
              are filled through our network before they are ever posted here.
              If you don&rsquo;t see the right fit, send us your resume and
              we&rsquo;ll reach out when a matching role opens up.
            </p>
          </div>


          {totalPages > 1 && (
            <div className="careers-pagination">
              {currentPage > 1 && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Previous
                </Button>
              )}
              <span>
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Candidate CTA */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <SectionEyebrow>Candidates</SectionEyebrow>
          <h2>Don&rsquo;t see the right role?</h2>
          <p>
            Submit your resume and we&rsquo;ll keep you in mind as new
            opportunities open up.
          </p>
          <Button href="mailto:will@wheaton-group.com" variant="light">
            Submit Your Resume
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Careers;
