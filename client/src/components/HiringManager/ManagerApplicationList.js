import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationList = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [selectedJobField, setSelectedJobField] = useState("All");
    const [search, setSearch] = useState("");
    const [detailedApplication, setDetailedApplication] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        date: "",
        time: "",
        interviewType: "",
        meetingLink: ""
    });
    const [editingId, setEditingId] = useState(null);

    const hiringManagerEmail = "hassan123@gmail.com";

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`http://localhost:8080/application/get-application-hm/${hiringManagerEmail}`);
                if (!response.ok) throw new Error("API not available");
                const data = await response.json();
                setApplications(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };
        fetchApplications();
    }, []);

    const jobFields = ["All", ...new Set(applications.map(app => app.jobDetails?.title || "Unknown"))];

    const filteredApplications = applications.filter(app =>
        (selectedJobField === "All" || app.jobDetails?.title === selectedJobField) &&
        (search === "" || app.applicationStatus.toLowerCase().includes(search.toLowerCase()))
    );

    const handleApplicationClick = (application) => {
        setDetailedApplication(application);
        setEditForm({
            date: application.interview?.date || "",
            time: application.interview?.time || "",
            interviewType: application.interview?.interviewType || "",
            meetingLink: application.interview?.meetingLink || ""
        });
        setEditingId(application._id);
        setIsEditModalOpen(true);
    };

    const handleUpdate = () => {
        setApplications(applications.map(app =>
            app._id === editingId
                ? { ...app, interview: { ...editForm } }
                : app
        ));
        setIsEditModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Application List</h1>

                <input
                    type="text"
                    placeholder="Search by Status"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded-md w-1/2 mb-4"
                />

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Job Field:</label>
                    <select
                        className="w-1/3 p-2 border rounded-md"
                        value={selectedJobField}
                        onChange={(e) => setSelectedJobField(e.target.value)}
                    >
                        {jobFields.map((field, index) => (
                            <option key={index} value={field}>{field}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredApplications.map(app => (
                        <div key={app._id} className="bg-white p-4 shadow rounded-md border cursor-pointer hover:shadow-lg" onClick={() => handleApplicationClick(app)}>
                            <h3 className="text-lg font-semibold text-gray-800">{app.jobDetails?.title || "N/A"}</h3>
                            <p className="text-sm text-gray-600">Applicant Name: {app.candidateDetails.userName || "N/A"}</p>
                            <p className="text-sm text-gray-600">Application Status: {app.applicationStatus || "N/A"}</p>
                            {app.interview && (
                                <p className="text-sm text-gray-600">Scheduled Interview: {app.interview.date} at {app.interview.time}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Application & Interview Details</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        <div className="space-y-4">
                            <p><strong>Job Title:</strong> {detailedApplication?.jobDetails?.title || "N/A"}</p>
                            <p><strong>User Name:</strong> {detailedApplication?.candidateDetails?.userName || "N/A"}</p>
                            <p><strong>Application Status:</strong> {detailedApplication?.applicationStatus || "N/A"}</p>
                            <p><strong>Scheduled Interview:</strong> {editForm.date} at {editForm.time}</p>
                            <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} className="w-full border rounded-md p-2" />
                            <input type="time" value={editForm.time} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} className="w-full border rounded-md p-2" />
                            <input type="text" value={editForm.interviewType} onChange={(e) => setEditForm({ ...editForm, interviewType: e.target.value })} className="w-full border rounded-md p-2" placeholder="Interview Type" />
                            <input type="url" value={editForm.meetingLink} onChange={(e) => setEditForm({ ...editForm, meetingLink: e.target.value })} className="w-full border rounded-md p-2" placeholder="Meeting Link" />
                        </div>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationList;