import React, { useEffect, useState } from 'react';
import Modal from './Modal';

const MyJobs = () => {
    const [loginData, setLoginData] = useState(null);
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 3;

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
                    `http://localhost:8080/application/candidate/${loginData._id}?page=${currentPage}&limit=${limit}`
                );
                const data = await res.json();
                setApplications(data.applications);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApplications();
    }, [loginData, currentPage]);

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-center text-2xl md:text-3xl font-bold text-primary mb-8">
                My Applications
            </h1>

            {applications.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                            <div className="p-5">
                                <h2 className="text-lg font-bold text-gray-800 capitalize">{app?.jobID?.title}</h2>
                                <p className="text-sm text-gray-600">{app?.jobID?.locationType}</p>
                                <p className="text-sm text-gray-700">{app?.jobID?.city}, {app?.jobID?.state}</p>
                                <p className="text-sm text-gray-600">Shift: {app?.jobID?.shiftStart} - {app?.jobID?.shiftEnd}</p>
                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-transform: uppercase text-sm font-semibold ${getStatusColor(app.applicationStatus)}`}>
                                    {app.applicationStatus}
                                </span>
                                <div className="flex justify-end mt-4">
                                    <button onClick={() => { setSelectedApp(app); setIsModalOpen(true); }} className="bg-purple-100 text-purple-700 px-3 py-2 rounded-md hover:bg-purple-200 text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">No applications</h3>
                    <p className="mt-1 text-gray-600">You haven't submitted any job applications yet.</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="w-24 px-4 py-2 bg-gray-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed text-center"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="w-24 px-4 py-2 bg-gray-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed text-center"
                    >
                        Next
                    </button>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} app={selectedApp} getStatusColor={getStatusColor} />
        </div>
    );
};

export default MyJobs;