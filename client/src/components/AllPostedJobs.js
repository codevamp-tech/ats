import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobDescriptionModal from "./JobDescriptionModal"; // Import the new modal component

export const AllPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/jobs/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        const newData = data.slice(0, 6);
        setJobs(newData);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-primary mb-8">
        Explore Our Opportunities
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job, key) => (
          <Card 
            key={key} 
            job={job} 
            onViewDetails={() => setSelectedJob(job)} 
          />
        ))}
      </div>

      {selectedJob && (
        <JobDescriptionModal 
          job={selectedJob} 
          isOpen={!!selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </div>
  );
};

const Card = ({ job, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all group">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 1-7.5 0" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 capitalize">
              {job.title || 'Software Engineer'}
            </h2>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>{job.type} | {job.scheduleType}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="capitalize">{job.city}, {job.state} | {job.locationType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.038-.775-1.038-2.041 0-2.816.952-.765 2.508-.765 3.461 0l.808.529m0 0a.75.75 0 0 1 1.052.14l.933 1.13.434-.217a.75.75 0 0 1 1.007.322l.558 1.116.34-.17c.448-.223.851-.526 1.201-.907l.579-.55-.764-.538a.75.75 0 0 1-.285-.803l.333-1.005-.871-.496c-.268-.153-.47-.456-.47-.805V9.456c0-.347.202-.65.47-.805l.87-.496-.333-1.005a.75.75 0 0 1 .285-.804l.764-.538-.579-.55a4.75 4.75 0 0 0-1.2-.907l-.34-.17-.558 1.116a.75.75 0 0 1-1.008.322l-.434-.217-.933 1.13a.75.75 0 0 1-1.052.14l-.808-.529" />
            </svg>
            <span>₹{job.compensation}/Annum</span>
          </div>
        </div>

        <div className="text-sm text-gray-700 mb-4 line-clamp-3">
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {job.experienceRequired} years experience
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onViewDetails}
              className="bg-purple-100 text-purple-700 px-3 py-2 rounded-md hover:bg-purple-200 transition-colors text-sm"
            >
              View Details
            </button>
            <Link to={`/current-job/${job._id}`}>
              <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};