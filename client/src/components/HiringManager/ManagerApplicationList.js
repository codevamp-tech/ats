import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ApplicationList = () => {
    const navigate = useNavigate();
    const [ applications, setApplications ] = useState( [] );
    const [ selectedJobField, setSelectedJobField ] = useState( "All" );
    const [ detailedApplication, setDetailedApplication ] = useState( null );
    const [ page, setPage ] = useState( 1 );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ search, setSearch ] = useState( "" );

    const hiringManagerEmail = "nawaz@gmail.com";

    // Fetch applications from API
    useEffect( () => {
        const fetchApplications = async () => {
            try {
                const response = await fetch( `http://localhost:8080/application/get-application-hm/${ hiringManagerEmail }` );
                if ( !response.ok ) throw new Error( "API not available" );

                const data = await response.json();
                console.log( "API Response:", data );

                if ( Array.isArray( data ) ) {
                    setApplications( data );
                    setTotalPages( 1 ); // Assuming no pagination for now
                } else {
                    setApplications( [] );
                }
            } catch ( error ) {
                console.error( "Error fetching applications:", error );
            }
        };

        fetchApplications();
    }, [ page, search ] );

    const jobFields = [ "All", ...new Set( applications.map( app => app.jobDetails?.title || "Unknown" ) ) ];

    const filteredApplications = applications.filter( app =>
        ( selectedJobField === "All" || app.jobDetails?.title === selectedJobField ) &&
        ( search === "" || app.AllPostedJobs.toLowerCase().includes( search.toLowerCase() ) )
    );

    const handleApplicationClick = ( application ) => {
        setDetailedApplication( application );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Application List</h1>

                <input
                    type="text"
                    placeholder="Search by Status"
                    value={ search }
                    onChange={ ( e ) => setSearch( e.target.value ) }
                    className="p-2 border rounded-md w-1/2 mb-4"
                />

                { detailedApplication ? (
                    <div className="bg-white p-6 shadow rounded-md border">
                        <h2 className="text-xl font-semibold mb-4">Application Details</h2>
                        <p><strong>Job Title:</strong> { detailedApplication.jobDetails?.title || "N/A" }</p>
                        <p><strong>User Name:</strong> { detailedApplication.candidateDetails.userName || "N/A" }</p>
                        <p><strong>Contact Info:</strong> { detailedApplication.contactInfo || "N/A" }</p>
                        <p><strong>Status:</strong> { detailedApplication.applicationStatus || "N/A" }</p>
                        <p><strong>Experience:</strong> { detailedApplication.experience || "N/A" }</p>
                        <p><strong>Resume:</strong> <a href={ detailedApplication.resume } target="_blank" rel="noopener noreferrer">View Resume</a></p>
                        <button
                            onClick={ () => setDetailedApplication( null ) }
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Back to List
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Job Field:</label>
                            <select
                                className="w-1/3 p-2 border rounded-md"
                                value={ selectedJobField }
                                onChange={ ( e ) => setSelectedJobField( e.target.value ) }
                            >
                                { jobFields.map( ( field, index ) => (
                                    <option key={ index } value={ field }>{ field }</option>
                                ) ) }
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            { filteredApplications.map( ( app ) => (
                                <div
                                    key={ app._id }
                                    className="bg-white p-6 shadow-lg rounded-xl border border-gray-200 cursor-pointer hover:shadow-2xl transition duration-300 transform hover:scale-105"
                                    onClick={ () => handleApplicationClick( app ) }
                                >
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{ app.jobDetails?.title || "N/A" }</h3>
                                    <p className="text-sm text-gray-600 mb-1"><strong>Name:</strong>  { app.candidateDetails.userName?.charAt( 0 ).toUpperCase() + app.candidateDetails.userName?.slice( 1 ) || "N/A" }</p>
                                    {/* <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> { app.applicationStatus || "N/A" }</p> */}
                                    <p className="text-sm text-gray-600 mb-1"><strong>Gender:</strong> { app.candidateDetails.gender ? app.candidateDetails.gender.charAt( 0 ).toUpperCase() + app.candidateDetails.gender.slice( 1 ) : "N/A" }</p>
                                    <p className="text-sm text-gray-600 mb-4"><strong>Experience:</strong> { app.experience || "N/A" }</p>
                                    <button className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                        { app.applicationStatus || "N/A" }
                                    </button>
                                </div>

                            ) ) }
                        </div>
                    </>
                ) }
            </div>
        </div>
    );
};

export default ApplicationList;