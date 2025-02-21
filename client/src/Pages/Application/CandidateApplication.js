import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CandidateApplication = () => {
  const [ groupedData, setGroupedData ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ] = useState( '' );
  const navigate = useNavigate();

  useEffect( () => {
    const fetchGroupedByJob = async () => {
      try {
        const response = await fetch( 'http://localhost:8080/application/grouped-by-job' );
        if ( !response.ok ) {
          throw new Error( `Server error: ${ response.status }` );
        }

        // Parse JSON
        const result = await response.json();
        // "data" field from the server response: { data: [...] }
        setGroupedData( result.data || [] );
      } catch ( err ) {
        console.error( err );
        setError( 'Failed to fetch jobs' );
      } finally {
        setLoading( false );
      }
    };

    fetchGroupedByJob();
  }, [] );

  const handleJobClick = ( jobId ) => {
    navigate( `/job-detail/${ jobId }` );
  };

  if ( loading ) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if ( error ) {
    return <p className="text-center mt-4 text-red-600">{ error }</p>;
  }

  if ( groupedData.length === 0 ) {
    return <p className="text-center mt-4">No jobs found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className='flex justify-between items-start '>
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>
      <Link
          to="/shortlisted-applications"
        className="inline-flex items-center px-4 py-2 bg-lightGray text-deepBlack rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
      >
        <span className="mr-2 font-bold text-green-500">+</span>
        Shortlisted Applications
      </Link>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-black">All Posted Jobs</h3>
      </div>

      {/* Table container */ }
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left">Job Title</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left">Location</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left">Type</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left">Schedule</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left">Shift</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left">Compensation</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left"># Apps</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            { groupedData.map( ( group ) => {
              // The top-level "jobID" is just a string, e.g. "679219d2cf0dfe37a1e24649"
              const jobIdString = group.jobID;

              // The actual job details (title, locationType, etc.) are in the first application’s jobID object
              // (Assuming there's at least one application)
              const firstApp = group.applications[ 0 ];

              if ( !firstApp ) {
                // If no applications exist for this job, show a placeholder row
                return (
                  <tr key={ jobIdString }>
                    <td colSpan={ 8 } className="py-3 px-4 border-b border-gray-200 text-center">
                      No applications found for this job.
                    </td>
                  </tr>
                );
              }

              const jobDetails = firstApp.jobID || {};
              const {
                title,
                locationType,
                type,
                scheduleType,
                shiftStart,
                shiftEnd,
                compensation,
              } = jobDetails;

              return (
                <tr key={ jobIdString }>
                  {/* Job Title */ }
                  <td className="py-3 px-4 border-b border-gray-200">
                    { title || 'N/A' }
                  </td>

                  {/* Location (locationType) */ }
                  <td className="py-3 px-4 border-b border-gray-200">
                    { locationType || 'N/A' }
                  </td>

                  {/* Type (Full-Time, etc.) */ }
                  <td className="py-3 px-4 border-b border-gray-200">
                    { type || 'N/A' }
                  </td>

                  {/* Schedule Type (Morning, etc.) */ }
                  <td className="py-3 px-4 border-b border-gray-200">
                    { scheduleType || 'N/A' }
                  </td>

                  {/* Shift Time */ }
                  <td className="py-3 px-4 border-b border-gray-200">
                    { shiftStart && shiftEnd
                      ? `${ shiftStart } - ${ shiftEnd }`
                      : 'N/A' }
                  </td>

                  {/* Compensation */ }
                  <td className="py-3 px-4 border-b border-gray-200">
                    { compensation || 'N/A' }
                  </td>

                  {/* Number of Applications */ }
                  <td className="py-3 px-4 border-b border-gray-200">
                    { group.applications.length }
                  </td>

                  {/* Action (View Details / Navigate) */ }
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button
                      onClick={ () => handleJobClick( jobIdString ) }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            } ) }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateApplication;
