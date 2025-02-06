import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // <-- Import from react-router-dom

const ApplicationsListTab = ( { applications } ) => {
    // Load applications from localStorage or use provided applications prop
    const [ allApps, setAllApps ] = useState(applications);
    const [ statusFilter, setStatusFilter ] = useState( '' );
    const [ searchTerm, setSearchTerm ] = useState( '' );

    const statuses = [
        { value: 'New Submission', color: 'blue' },
        { value: 'Initial Review', color: 'purple' },
        { value: 'Screening', color: 'indigo' },
        { value: 'Interview', color: 'cyan' },
        { value: 'Offer', color: 'green' },
        { value: 'Hired', color: 'emerald' },
        { value: 'Withdrawn', color: 'yellow' },
        { value: 'Rejected', color: 'red' }
    ];

    const handleStatusChange = ( appId, newStatus ) => {
        const updated = allApps.map( app =>
            app._id === appId ? { ...app, applicationStatus: newStatus } : app
        );
        setAllApps( updated );
    };

    const getStatusCount = (status) => {
        return allApps.filter(app => app.applicationStatus === status).length;
    };

    const filteredApps = allApps
        .filter(app => statusFilter ? app.applicationStatus === statusFilter : true)
        .filter(app => 
            searchTerm ? 
            app.candidateID?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.contactInfo?.toLowerCase().includes(searchTerm.toLowerCase()) :
            true
        );

    const getStatusColor = (status) => {
        const statusObj = statuses.find(s => s.value === status);
        return statusObj?.color || 'gray';
    };

    return (
        <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Application Status</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => setStatusFilter('')}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                                statusFilter === '' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <span>All Applications</span>
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                                    {allApps.length}
                                </span>
                            </div>
                        </button>
                        {statuses.map(status => (
                            <button
                                key={status.value}
                                onClick={() => setStatusFilter(status.value)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                                    statusFilter === status.value ? `bg-${status.color}-50 text-${status.color}-700` : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span className={`w-2 h-2 rounded-full bg-${status.color}-500 mr-2`}></span>
                                        <span>{status.value}</span>
                                    </div>
                                    <span className={`bg-${status.color}-100 text-${status.color}-700 px-2 py-0.5 rounded-full text-xs`}>
                                        {getStatusCount(status.value)}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
                {/* Search Bar */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Applications List</h2>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Applications Table */}
                {filteredApps.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Candidate
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>              
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredApps.map((app) => {
                                    // Prepare candidateID & jobID for the link
                                    const candidateId = app.candidateID?._id;
                                    const jobId = app.jobID?._id || app.jobID; 
                                    
                                    return (
                                        <tr key={app._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <span className="text-lg font-medium text-gray-600">
                                                                {(app.candidateID?.userName?.[0] || 'N').toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        {/* Wrap candidate name in a link */}
                                                        <Link 
                                                            to={`/candidate-details/${candidateId}/${jobId}`} 
                                                            className="text-sm font-medium text-blue-600 hover:underline"
                                                        >
                                                            {app.candidateID?.userName || 'N/A'}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span 
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                                    bg-${getStatusColor(app.applicationStatus)}-100 
                                                    text-${getStatusColor(app.applicationStatus)}-800`}
                                                >
                                                    {app.applicationStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {app.contactInfo || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <select
                                                    className="block w-full rounded-md border-gray-300 shadow-sm 
                                                            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                    value={app.applicationStatus}
                                                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                >
                                                    {statuses.map(status => (
                                                        <option key={status.value} value={status.value}>
                                                            {status.value}
                                                        </option>
                                                    ))}
                                                    
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationsListTab;
