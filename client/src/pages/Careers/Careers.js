import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Careers.css";
import DocumentTitle from "react-document-title";

export const Careers = () => {
  const [jobs, setJobs] = useState([]);
  // Input state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [workType, setWorkType] = useState("");

  // Filter state variables (applied only when Search is clicked)
  const [searchTermFilter, setSearchTermFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Suggestion visibility states
  const [jobTitleSuggestionsVisible, setJobTitleSuggestionsVisible] = useState(false);
  const [citySuggestionsVisible, setCitySuggestionsVisible] = useState(false);
  const [industrySuggestionsVisible, setIndustrySuggestionsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://thewheatongroup-1.onrender.com/jobs")
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
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Suggestions based on current input values
  const jobTitleSuggestions = Array.from(
    new Set(
      jobs
        .filter((job) => job != null) // Filter out null jobs
        .map((job) => job.jobTitle || "") // Use empty string if jobTitle is undefined
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

  const industrySuggestions = Array.from(
    new Set(
      jobs
        .filter((job) => job != null)
        .map((job) => job.industry || "")
        .filter(
          (i) =>
            i &&
            i.toLowerCase().includes(industry.toLowerCase()) &&
            industry !== ""
        )
    )
  );

  // Filter jobs using the filter state values and safely access properties
  const filteredJobs = jobs
    .filter((job) => job && job.jobID && job.jobTitle)
    .filter(
      (job) =>
        (searchTermFilter === "" ||
          (job.jobTitle || "").toLowerCase().includes(searchTermFilter.toLowerCase())) &&
        (cityFilter === "" ||
          (job.city || "").toLowerCase().includes(cityFilter.toLowerCase())) &&
        (industryFilter === "" ||
          (job.industry || "").toLowerCase().includes(industryFilter.toLowerCase())) &&
        (workTypeFilter === "" ||
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
    setIndustryFilter(industry);
    setWorkTypeFilter(workType);
    setCurrentPage(1);
    setShowResults(true);
  };

  const selectSuggestion = (field, value) => {
    if (field === "jobTitle") {
      setSearchTerm(value);
      setJobTitleSuggestionsVisible(false);
    } else if (field === "city") {
      setCity(value);
      setCitySuggestionsVisible(false);
    } else if (field === "industry") {
      setIndustry(value);
      setIndustrySuggestionsVisible(false);
    }
  };

  return (
    <main className="careerscontainer">
      <DocumentTitle title="Careers | The Wheaton Group, LLC" />
      <section className="careersintro">
        <span>Search Jobs</span>
        <h1>Browse The Wheaton Group, LLC's Opportunities.</h1>
      </section>

      {/* Search Filters */}
      <section className="job-search">
        <form onSubmit={handleSearch}>
          <div className="input-group job-title">
            <input
              type="text"
              placeholder="Search by job title..."
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
              <ul className="suggestions">
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
          <div className="input-group city">
            <input
              type="text"
              placeholder="Enter city..."
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
              <ul className="suggestions">
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
          <div className="input-group industry">
            <input
              type="text"
              placeholder="Enter industry..."
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                setIndustrySuggestionsVisible(true);
              }}
              onBlur={() =>
                setTimeout(() => setIndustrySuggestionsVisible(false), 100)
              }
              onFocus={() => {
                if (industry !== "") setIndustrySuggestionsVisible(true);
              }}
            />
            {industrySuggestionsVisible && industrySuggestions.length > 0 && (
              <ul className="suggestions">
                {industrySuggestions.map((suggestion, idx) => (
                  <li
                    key={idx}
                    onMouseDown={() =>
                      selectSuggestion("industry", suggestion)
                    }
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="input-group worktype">
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
            >
              <option value="">All Work Types</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
          <button type="submit">Search</button>
        </form>
      </section>

      {/* Job Listings */}
      {showResults && (
        <section className="job-listings">
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h2>{job.jobTitle}</h2>
                <p>
                  <strong>City:</strong> {job.city}
                </p>
                <p>
                  <strong>Industry:</strong> {job.industry}
                </p>
                <p>
                  <strong>Work Type:</strong> {job.workType}
                </p>
                <button
                  className="apply-btn"
                  onClick={() => navigate(`/careers/${job.jobID}`)}
                >
                  View Description
                </button>
              </div>
            ))
          ) : (
            <p>No jobs found matching your criteria.</p>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              {currentPage > 1 && (
                <button
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Previous
                </button>
              )}
              <span>
                Page {currentPage} of {totalPages}
              </span>
              {currentPage < totalPages && (
                <button
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default Careers;