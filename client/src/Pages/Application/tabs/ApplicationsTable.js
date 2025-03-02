import React from 'react';
import { Link } from 'react-router-dom';
import { getStatusColor, getColorStyles } from './utils';

const ApplicationsTable = ({ 
    filteredApps, 
    statuses, 
    onStatusChange,
    onViewResume
}) => {
    return (
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
                            Resume
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
                        const statusColor = getStatusColor(app.applicationStatus);

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
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: getColorStyles(statusColor, 100),
                                            color: getColorStyles(statusColor, 800)
                                        }}
                                    >
                                        {app.applicationStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {app.contactInfo || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => onViewResume(app)}
                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        View Resume
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <select
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        value={app.applicationStatus}
                                        onChange={(e) => onStatusChange(app._id, e.target.value)}
                                    >
                                        {statuses.map(status => (
                                            <option key={status._id} value={status.applicationStatus}>
                                                {status.applicationStatus}
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
    );
};

export default ApplicationsTable;