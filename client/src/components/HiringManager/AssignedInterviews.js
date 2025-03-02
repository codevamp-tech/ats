import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyApplications = [
    { _id: 1, jobTitle: "Senior React Developer", jobField: "Development", applicantName: "John Smith", email: "john.smith@email.com", status: "Interview", experience: "5 years", appliedDate: "2025-01-15", skills: [ "React", "Node.js", "TypeScript" ], stage: "Technical Round" },
    { _id: 2, jobTitle: "UX Designer", jobField: "Design", applicantName: "Emily Brown", email: "emily.b@email.com", status: "Screening", experience: "3 years", appliedDate: "2025-01-18", skills: [ "Figma", "UI/UX", "Wireframing" ], stage: "Initial Screening" }
];

const ApplicationList = ( { assignedInterviews, setAssignedInterviews } ) => {
    const navigate = useNavigate();
    const [ applications, setApplications ] = useState( [] );
    const [ selectedJobField, setSelectedJobField ] = useState( "All" );
    const [ detailedApplication, setDetailedApplication ] = useState( null );
    const [ page, setPage ] = useState( 1 );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ search, setSearch ] = useState( "" );

    // Fetch applications from API, fallback to dummy data if failed
    useEffect( () => {
        const fetchApplications = async () => {
            try {
                const response = await fetch( `http://localhost:5050/api/interviews?page=${ page }&limit=10&search=${ search }` );
                if ( !response.ok ) throw new Error( "API not available" );

                const data = await response.json();
                setApplications( data.interviews );
                setTotalPages( data.totalPages );
            } catch ( error ) {
                console.error( "Error fetching interviews:", error );
                setApplications( dummyApplications ); // Use dummy data
                setTotalPages( 1 );
            }
        };

        fetchApplications();
    }, [ page, search ] );

    const jobFields = [ "All", ...new Set( applications.map( ( app ) => app.jobField ) ) ];

    const filteredApplications =
        selectedJobField === "All"
            ? applications
            : applications.filter( ( app ) => app.jobField === selectedJobField );

    const handleApplicationClick = ( application ) => {
        setDetailedApplication( application );
    };

    const handleAssignInterview = () => {
        if ( !assignedInterviews.some( ( interview ) => interview._id === detailedApplication._id ) ) {
            setAssignedInterviews( [ ...assignedInterviews, detailedApplication ] );
        }
        setDetailedApplication( null );
    };

    const handleApproveCandidate = () => {
        setApplications( ( prevApplications ) =>
            prevApplications.map( ( app ) =>
                app._id === detailedApplication._id ? { ...app, status: "Approved" } : app
            )
        );
        setDetailedApplication( { ...detailedApplication, status: "Approved" } );
    };

    const handleRejectCandidate = () => {
        setApplications( ( prevApplications ) =>
            prevApplications.map( ( app ) =>
                app._id === detailedApplication._id ? { ...app, status: "Rejected After Interview" } : app
            )
        );
        setDetailedApplication( { ...detailedApplication, status: "Rejected After Interview" } );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Application List</h1>

                {/* Search Input */ }
                <input
                    type="text"
                    placeholder="Search by Round Name or Number"
                    value={ search }
                    onChange={ ( e ) => setSearch( e.target.value ) }
                    className="p-2 border rounded-md w-1/2 mb-4"
                />

                { detailedApplication ? (
                    <div className="bg-white p-6 shadow rounded-md border">
                        <h2 className="text-xl font-semibold mb-4">Application Details</h2>
                        <p><strong>Job Title:</strong> { detailedApplication.jobTitle }</p>
                        <p><strong>Applicant Name:</strong> { detailedApplication.applicantName }</p>
                        <p><strong>Email:</strong> { detailedApplication.email }</p>
                        <p><strong>Experience:</strong> { detailedApplication.experience }</p>
                        <p><strong>Applied Date:</strong> { detailedApplication.appliedDate }</p>
                        <p><strong>Skills:</strong> { detailedApplication.skills.join( ", " ) }</p>
                        <p><strong>Stage:</strong> { detailedApplication.stage }</p>
                        <p><strong>Status:</strong> { detailedApplication.status }</p>

                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={ handleApproveCandidate }
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Approve for Job
                            </button>
                            <button
                                onClick={ handleRejectCandidate }
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Reject After Interview
                            </button>
                            <button
                                onClick={ () => setDetailedApplication( null ) }
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Job Field Filter */ }
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Filter by Job Field:
                            </label>
                            <select
                                className="w-1/3 p-2 border rounded-md"
                                value={ selectedJobField }
                                onChange={ ( e ) => setSelectedJobField( e.target.value ) }
                            >
                                { jobFields.map( ( field, index ) => (
                                    <option key={ index } value={ field }>
                                        { field }
                                    </option>
                                ) ) }
                            </select>
                        </div>

                        {/* Applications List */ }
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            { filteredApplications.map( ( app ) => (
                                <div
                                    key={ app._id }
                                    className="bg-white p-4 shadow rounded-md border cursor-pointer hover:shadow-lg"
                                    onClick={ () => handleApplicationClick( app ) }
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{ app.jobTitle }</h3>
                                    <p className="text-sm text-gray-600">Applicant: { app.applicantName }</p>
                                    <button
                                        className={ `px-2 py-1 text-sm font-semibold rounded-md 
                                        ${ app.status === "Approved"
                                                ? "bg-green-100 text-green-800"
                                                : app.status === "Rejected After Interview"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }` }
                                    >
                                        { app.status }
                                    </button>
                                </div>
                            ) ) }
                        </div>

                        {/* Pagination */ }
                        <div className="mt-6 flex justify-center space-x-4">
                            <button
                                onClick={ () => setPage( prev => Math.max( prev - 1, 1 ) ) }
                                disabled={ page === 1 }
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 bg-white border rounded-md">
                                Page { page } of { totalPages }
                            </span>
                            <button
                                onClick={ () => setPage( prev => Math.min( prev + 1, totalPages ) ) }
                                disabled={ page === totalPages }
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) }
            </div>
        </div>
    );
};

export default ApplicationList;
