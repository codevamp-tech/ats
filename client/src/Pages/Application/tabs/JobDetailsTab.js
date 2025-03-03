import React from 'react';

const JobDetailsTab = ({ job }) => {
  if (!job) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No job data available</h3>
        </div>
      </div>
    );
  }

  const {
    jobID,
    title,
    locationType,
    type,
    scheduleType,
    shiftStart,
    shiftEnd,
    hireType,
    country,
    state,
    city,
    description,
    compensation,
    experienceRequired,
    requiredResources,
    status,
    recruiterName,
    hiringManagerEmail,
    hiringManagerName,
  } = job;

  // Status badge styles based on status
  const getStatusStyle = (status) => {
    const styles = {
      Active: 'bg-green-100 text-green-800',
      Paused: 'bg-yellow-100 text-yellow-800',
      Closed: 'bg-red-100 text-red-800',
      Draft: 'bg-gray-100 text-gray-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 border-b pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title || 'N/A'}</h1>
            <p className="mt-1 text-sm text-gray-500">Job ID: {jobID || 'N/A'}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(status)}`}>
            {status || 'N/A'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Details Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Job Overview */}
          <section className="bg-white rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Job Overview
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="font-medium">{type || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Schedule</p>
                <p className="font-medium">{scheduleType || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shift Hours</p>
                <p className="font-medium">{shiftStart ? `${shiftStart} - ${shiftEnd}` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hire Type</p>
                <p className="font-medium">{hireType || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Location Details */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Location Type</p>
                <p className="font-medium">{locationType || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{country || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{state || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{city || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Job Description */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Job Description
            </h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: description || 'No description available.' }} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Requirements Card */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Requirements
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Experience Required</p>
                <p className="font-medium">{experienceRequired || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Resources Required</p>
                <p className="font-medium">{requiredResources || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Compensation</p>
                <p className="font-medium">{compensation || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Contact Card */}
          <section className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Recruiter</p>
                <p className="font-medium">{recruiterName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hiring Manager</p>
                <p className="font-medium">{hiringManagerName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Manager Email</p>
                <p className="font-medium break-words">{hiringManagerEmail || 'N/A'}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsTab;