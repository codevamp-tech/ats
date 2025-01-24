import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJob';

export const AllJobs = () => {
    const { data: jobs = [], isLoading } = useJobs();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    console.log("jobs>>>", jobs);

    return (
        <div className="max-w-screen-2xl mx-auto px-4 xl:px-24 py-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">All Posted Jobs</h3>
                        <Link
                            to="/post-job"
                            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
                        >
                            <span className="mr-2">+</span>
                            Add Job
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Salary</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {jobs.map((job) => (
                                <tr
                                    key={job._id}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">₹{job.compensation}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{job.city},{job.state},{job.country}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => navigate(`/post-job`, { state: { job } })}
                                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {jobs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No jobs posted yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllJobs;