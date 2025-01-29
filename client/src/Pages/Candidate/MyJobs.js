import React, { useEffect, useState } from 'react';

import Modal from './Modal'

const MyJobs = () => {
    const [loginData, setLoginData] = useState(null);
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('user');
        const user = JSON.parse(token);
        setLoginData(user);
    }, []);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                if (!loginData?._id) return;
                const res = await fetch(
                    `http://localhost:8080/application/candidate/${loginData._id}`
                );
                const data = await res.json();
                setApplications(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApplications();
    }, [loginData]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'New Submission':
                return 'bg-blue-100 text-blue-800';
            case 'In Review':
                return 'bg-yellow-100 text-yellow-800';
            case 'Accepted':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Applications</h1>

            {applications.length > 0 ? (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{app?.jobID?.title}</h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span>{app?.jobID?.city}, {app?.jobID?.state}, {app?.jobID?.country}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{app?.jobID?.locationType}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{app?.jobID?.shiftStart} - {app?.jobID?.shiftEnd}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(app.applicationStatus)}`}>
                                        {app.applicationStatus}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setSelectedApp(app);
                                            setIsModalOpen(true);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No applications</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't submitted any job applications yet.</p>
                </div>
            )}

            <Modal
                getStatusColor={getStatusColor}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                app={selectedApp}
            />
        </div>
    );
};

export default MyJobs;