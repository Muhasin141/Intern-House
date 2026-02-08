import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    qualifications: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.companyName ||
      !form.location ||
      !form.salary ||
      !form.jobType ||
      !form.description ||
      !form.qualifications
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://intern-house-backend-one.vercel.app/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            salary: Number(form.salary),
            qualifications: form.qualifications.split(",").map((q) => q.trim()),
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Job posted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error posting job");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow">
      <input
        name="title"
        placeholder="Job Title"
        className="form-control mb-2"
        onChange={handleChange}
      />
      <input
        name="companyName"
        placeholder="Company Name"
        className="form-control mb-2"
        onChange={handleChange}
      />
      <input
        name="location"
        placeholder="Location"
        className="form-control mb-2"
        onChange={handleChange}
      />
      <input
        name="salary"
        type="number"
        placeholder="Salary"
        className="form-control mb-2"
        onChange={handleChange}
      />

      <select
        name="jobType"
        className="form-control mb-2"
        onChange={handleChange}
      >
        <option value="">Select Job Type</option>
        <option>Full-time (On-site)</option>
        <option>Part-time (On-site)</option>
        <option>Full-time (Remote)</option>
        <option>Part-time (Remote)</option>
      </select>

      <textarea
        name="description"
        placeholder="Job Description"
        className="form-control mb-2"
        onChange={handleChange}
      ></textarea>

      <input
        name="qualifications"
        placeholder="Qualifications (comma separated)"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <button className="btn btn-success">Post Job</button>
    </form>
  );
}

export default PostJob;
