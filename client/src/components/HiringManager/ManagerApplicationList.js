import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyApplications = [
    { _id: 1, jobTitle: "Senior React Developer", jobField: "Development", applicantName: "John Smith", email: "john.smith@email.com", status: "Interview", experience: "5 years", appliedDate: "2025-01-15", skills: [ "React", "Node.js", "TypeScript" ], stage: "Technical Round" },
    { _id: 2, jobTitle: "UX Designer", jobField: "Design", applicantName: "Emily Brown", email: "emily.b@email.com", status: "Screening", experience: "3 years", appliedDate: "2025-01-18", skills: [ "Figma", "UI/UX", "Wireframing" ], stage: "Initial Screening" },
    { _id: 3, jobTitle: "Product Manager", jobField: "Management", applicantName: "Michael Chen", email: "m.chen@email.com", status: "Shortlisted", experience: "7 years", appliedDate: "2025-01-20", skills: [ "Agile", "Product Strategy", "Team Leadership" ], stage: "HR Round" },
    { _id: 4, jobTitle: "DevOps Engineer", jobField: "Operations", applicantName: "Sarah Wilson", email: "sarah.w@email.com", status: "Rejected", experience: "4 years", appliedDate: "2025-01-10", skills: [ "AWS", "Docker", "Jenkins" ], stage: "Technical Round" },
    { _id: 5, jobTitle: "Backend Developer", jobField: "Development", applicantName: "David Lee", email: "david.lee@email.com", status: "Offered", experience: "6 years", appliedDate: "2025-01-12", skills: [ "Node.js", "MongoDB", "Express.js" ], stage: "Final Round" }
];

const ApplicationList = () => {
    const navigate = useNavigate();
    const [ applications, setApplications ] = useState( [] );
    const [ selectedJobField, setSelectedJobField ] = useState( "All" );
    const [ detailedApplication, setDetailedApplication ] = useState( null );
    const [ page, setPage ] = useState( 1 );
    const [ totalPages, setTotalPages ] = useState( 1 );
    const [ search, setSearch ] = useState( "" );

    // Fetch applications from API
    useEffect( () => {
        const fetchApplications = async () => {
            try {
                const response = await fetch( `http://localhost:8080/api/application-types?page=${ page }&limit=10&search=${ search }` );
                if ( !response.ok ) throw new Error( "API not available" );

                const data = await response.json();
                setApplications( data.applicationTypes );
                setTotalPages( data.totalPages );
            } catch ( error ) {
                console.error( "Error fetching applications:", error );
                setApplications( dummyApplications ); // Fallback to dummy data
                setTotalPages( 1 );
            }
        };

        fetchApplications();
    }, [ page, search ] );

    const jobFields = [ "All", ...new Set( applications.map( app => app.jobField ) ) ];

    const filteredApplications = selectedJobField === "All"
        ? applications
        : applications.filter( app => app.jobField === selectedJobField );

    const handleApplicationClick = ( application ) => {
        setDetailedApplication( application );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Application List</h1>

                {/* Search Box */ }
                <input
                    type="text"
                    placeholder="Search by Application Step or Status"
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
                        <p><strong>Status:</strong> { detailedApplication.status }</p>
                        <p><strong>Experience:</strong> { detailedApplication.experience }</p>
                        <p><strong>Applied Date:</strong> { detailedApplication.appliedDate }</p>
                        <p><strong>Skills:</strong> { detailedApplication.skills.join( ", " ) }</p>
                        <p><strong>Stage:</strong> { detailedApplication.stage }</p>
                        <button
                            onClick={ () => setDetailedApplication( null ) }
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Back to List
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Job Field Filter */ }
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
                                    <p className="text-sm text-gray-600">Email: { app.email }</p>
                                    <p className="text-sm text-gray-600">Experience: { app.experience }</p>
                                    <p className="text-sm text-gray-600">Stage: { app.stage }</p>
                                    <button
                                        className={ `px-2 py-1 text-sm font-semibold rounded-md focus:outline-none 
                                        ${ app.status === "Offered" ? "bg-purple-100 text-purple-800" :
                                                app.status === "Interview" ? "bg-blue-100 text-blue-800" :
                                                    app.status === "Shortlisted" ? "bg-green-100 text-green-800" :
                                                        app.status === "Screening" ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-red-100 text-red-800" }` }
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
