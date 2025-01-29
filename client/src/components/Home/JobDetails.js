import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import atsLogo1URL from "../../assets/img/atslogo1.jpg";
import { useForm } from "react-hook-form";
import { SimilarJobs } from "../SimilarJobs";

export const JobDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      candidateID: "",
      jobID: "",
      applicationStatus: "active",
      resume: null,
      applicationForm: [{ question: "", answer: "" }],
      candidateFeedback: [{ question: "", answer: "" }],
    },
  });

  const randomNum = Math.floor(Math.random() * (200 - 20 + 1) + 20);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [file, setFile] = useState("");
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setLoginData(JSON.parse(token));
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/jobs/current-job/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);

  useEffect(() => {
    if (job?.applicants?.length) {
      const fetchApplicantsData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/users/all-users`);
          if (!response.ok) throw new Error("Failed to fetch applicants data");

          const data = await response.json();
          const filteredApplicants = data.filter((app) =>
            job.applicants.some((jobApplicant) => jobApplicant.applicant === app._id)
          );
          setApplicants(filteredApplicants);
        } catch (error) {
          console.error("Error fetching applicants data:", error);
        }
      };

      fetchApplicantsData();
    }
  }, [job]);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile?.name || "");

    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append("resume", uploadedFile);

    try {
      const response = await fetch(`http://localhost:8080/upload/resume/${applicants[0]?._id}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload file");

      const result = await response.json();
      console.log("File upload result:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-screen-2xl w-full md:w-5/6 lg:w-6/8 container mt-2 mx-auto xl:px-24 px-4 pb-7">
      <div className="bg-[#efefef] mx-auto py-12 md:px-14 px-8 rounded-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          {job && (
            <div className="w-full">
              {/* Job Details */}
              <div className="flex items-center flex-wrap justify-center md:justify-start">
                <img src={atsLogo1URL} alt="Company Logo" className="rounded-full w-20 md:w-24 h-auto" />
                <div className="mx-4 my-3 text-center md:text-left">
                  <h1 className="text-xl md:text-2xl font-bold">{job.jobTitle}</h1>
                  <p className="text-secondary">A T S</p>
                  <p className="text-sm text-gray-700">Posted - 19/06/2024</p>
                </div>
              </div>

              {/* Job Highlights */}
              <div className="my-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-blue-300 rounded-lg py-4 md:py-5 text-center">
                  <h2 className="text-xs md:text-md font-semibold text-gray-700">Job Type</h2>
                  <p className="text-sm md:text-lg font-bold">{job.employmentType}</p>
                </div>
                <div className="bg-green-300 rounded-lg py-4 md:py-5 text-center">
                  <h2 className="text-xs md:text-md font-semibold text-gray-700">Salary</h2>
                  <p className="text-sm md:text-lg font-bold">{job.salary}</p>
                </div>
                <div className="bg-blue-300 rounded-lg py-4 md:py-5 text-center">
                  <h2 className="text-xs md:text-md font-semibold text-gray-700">Location</h2>
                  <p className="text-sm md:text-lg font-bold">{job.location}</p>
                </div>
                <div className="bg-green-300 rounded-lg py-4 md:py-5 text-center">
                  <h2 className="text-xs md:text-md font-semibold text-gray-700">Applicants</h2>
                  <p className="text-sm md:text-lg font-bold">{randomNum}</p>
                </div>
              </div>

              {/* Job Description */}
              <div className="px-1">
                <h2 className="my-2 font-bold">Job Description</h2>
                <p className="text-sm md:text-base text-justify">{job.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Upload Resume */}
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-bold my-4">
            Upload Resume to Apply<span className="text-red-600">*</span>
          </h2>
          <div className="px-2 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-4">
            <div className="w-full md:w-5/6">
              <input
                type="file"
                onChange={handleFileUpload}
                {...register("resume")}
                id="file-input"
                className="block w-full cursor-pointer border border-primary shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 file:bg-primary file:text-deepBlack file:py-2 file:px-3"
              />
            </div>

            <div className="flex justify-center">
              <Link to={`/application-form/${job?._id}`}>
                <button className="block bg-primary text-deepBlack text-md py-2 px-12 md:px-16 rounded-md">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        </form>

        {file && (
          <div className="mt-4">
            <h2 className="font-bold">Uploaded Resume:</h2>
            <p>{file}</p>
          </div>
        )}

        <div className="text-center">
          <p className="hover:underline text-xs md:text-sm mt-8">
            By applying to the above job, you agree to our terms and conditions.
          </p>
        </div>
      </div>

      <SimilarJobs />
    </div>
  );
};
