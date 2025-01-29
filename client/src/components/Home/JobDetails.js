import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { ApplicationForm } from "../ApplicationForm/ApplicationForm"; // <-- Import the new form component
import "react-quill/dist/quill.snow.css";
import { useApplicationTypes } from "../../hooks/useApplication";

export const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loginData, setLoginData] = useState(null);

  // 1. Fetch the logged-in user (if any)
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const user = JSON.parse(token);
      setLoginData(user);
    }
  }, []);

  // 2. Fetch the job details
  useEffect(() => {
    fetch(`http://localhost:8080/jobs/current-job/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error("Error fetching job data:", err));
  }, [id]);

  // 3. We also fetch the application types (and can pass them to the form)
  const {
    data: applicationTypesData,
    isLoading,
    isError,
    error,
  } = useApplicationTypes({});

  if (!job) {
    return <p className="p-6">Loading job details...</p>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6">
        {/* -- Left: Job Details Section -- */}
        <div className="col-span-8 bg-white shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {job.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>{job.locationType}</span>
              <span>•</span>
              <span>
                {job.city}, {job.state}, {job.country}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Compensation</p>
              <p className="font-semibold">₹{job.compensation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold">{job.experienceRequired} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Shift</p>
              <p className="font-semibold">{job.scheduleType}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2">
              Job Description
            </h2>
            <ReactQuill
              value={job.description}
              readOnly
              theme="bubble"
              className="text-gray-700"
            />
          </div>
        </div>

        {/* -- Right: Application Form Section -- */}
        <div className="col-span-4 bg-gray-50 p-8 rounded-lg shadow-md">
          <ApplicationForm
            job={job}
            loginData={loginData}
            applicationTypesData={applicationTypesData}
          />
        </div>
      </div>
    </div>
  );
};
