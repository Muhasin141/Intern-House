import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await fetch(
        "https://intern-house-backend-one.vercel.app/jobs"
      );
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      toast.error("Error fetching jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      await fetch(`https://intern-house-backend-one.vercel.app/jobs/${id}`, {
        method: "DELETE",
      });

      toast.success("Job deleted successfully");
      fetchJobs(); // refresh list
    } catch (error) {
      toast.error("Error deleting job");
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by job title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredJobs.map((job) => (
          <div key={job._id} className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm">
              <h5>{job.title}</h5>
              <p>
                <strong>{job.companyName}</strong>
              </p>
              <p>{job.location}</p>
              <p>{job.jobType}</p>

              <div className="d-flex justify-content-between">
                <Link to={`/job/${job._id}`} className="btn btn-primary btn-sm">
                  See Details
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
