import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useScheduledInterview from "../../hooks/useScheduledInterview";

const AssignedInterviews = () => {
    const navigate = useNavigate();
    const { assignedInterviews, error, isLoading, refetchAssignedInterviews } = useScheduledInterview();
    const [search, setSearch] = useState("");
    const [detailedInterview, setDetailedInterview] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        date: "",
        time: "",
        interviewType: "",
        meetingLink: "",
    });

    const interviewTypes = ["online", "walkin"];

    const handleUpdateInterview = async () => {
        if (!detailedInterview?._id) return;

        try {
            const response = await fetch(`http://localhost:8080/applicationscheduledlist/update-interview/${detailedInterview._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: editForm.date,
                    scheduledTime: editForm.time,
                    interviewerType: editForm.interviewType,
                    meetingLink: editForm.meetingLink,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update interview");
            }

            await refetchAssignedInterviews(); // Refresh list after update
            setIsEditModalOpen(false);
            alert("Interview updated successfully!");
        } catch (error) {
            console.error("Error updating interview:", error);
            alert("Error updating interview. Please try again.");
        }
    };

    const handleInterviewClick = (interview) => {
        setDetailedInterview(interview);
        setEditForm({
            date: interview.date || "",
            time: interview.scheduledTime || "",
            interviewType: interview.interviewerType || "",
            meetingLink: interview.meetingLink || "",
        });
        setIsEditModalOpen(true);
    };

    if (isLoading) return <p>Loading interviews...</p>;
    if (error) return <p>Error loading interviews: {error.message}</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Assigned Interviews</h1>
                <input
                    type="text"
                    placeholder="Search by Interview Type"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded-md w-1/2 mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {assignedInterviews
                        .filter((interview) => search === "" || interview.interviewerType.toLowerCase().includes(search.toLowerCase()))
                        .map((interview) => (
                            <div
                                key={interview._id}
                                className="bg-white p-4 shadow rounded-md border cursor-pointer hover:shadow-lg"
                                onClick={() => handleInterviewClick(interview)}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{interview?.applicationID?.jobID?.title|| "N/A"}</h3>
                                <p className="text-sm text-gray-600">Applicant: {interview.applicationID?.candidateID?.userName || "N/A"}</p>
                                <p className="text-sm text-gray-600">Interview Type: {interview.interviewerType || "N/A"}</p>
                                <p className="text-sm text-gray-600">Scheduled: {interview.date} at {interview.scheduledTime}</p>
                            </div>
                        ))}
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Interview Details</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                        </div>
                        <div className="space-y-4">
                            <p><strong>Job Title:</strong> {detailedInterview?.applicationID?.jobID?.title || "N/A"}</p>
                            <p><strong>Applicant Name:</strong> {detailedInterview?.applicationID?.candidateID?.userName || "N/A"}</p>
                            <label className="block text-sm font-medium text-gray-700">Interview Type</label>
                            <select
                                value={editForm.interviewType}
                                onChange={(e) => setEditForm({ ...editForm, interviewType: e.target.value })}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">Select Interview Type</option>
                                {interviewTypes.map((type) => (
                                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>
                            <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} className="w-full border rounded-md p-2" />
                            <input type="time" value={editForm.time} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} className="w-full border rounded-md p-2" />
                            {editForm.interviewType === 'online' && (
                                <input type="url" value={editForm.meetingLink} onChange={(e) => setEditForm({ ...editForm, meetingLink: e.target.value })} className="w-full border rounded-md p-2" placeholder="Meeting Link" />
                            )}
                        </div>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                            <button onClick={handleUpdateInterview} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignedInterviews;
