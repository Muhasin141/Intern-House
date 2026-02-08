import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(
          `https://intern-house-backend-one.vercel.app/jobs/${id}`
        );
        const data = await res.json();
        setJob(data);
      } catch (error) {
        toast.error("Error loading job details");
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="card p-4 shadow">
      <h2>{job.title}</h2>
      <p>
        <strong>Company:</strong> {job.companyName}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Salary:</strong> ${job.salary}
      </p>
      <p>
        <strong>Type:</strong> {job.jobType}
      </p>
      <p>
        <strong>Description:</strong> {job.description}
      </p>

      <h5>Qualifications:</h5>
      <ol>
        {job.qualifications.map((q, index) => (
          <li key={index}>{q}</li>
        ))}
      </ol>
    </div>
  );
}

export default JobDetails;
