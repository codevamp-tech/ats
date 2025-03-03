import React, { useEffect, useState } from 'react';
import StatusSidebar from './StatusSidebar';
import EmptyState from './EmptyState';
import ApplicationsTable from './ApplicationsTable';
import ConfirmationDialog from './ConfirmationDialog';
import ResumeModal from './ResumeModal';
// import { updateApplicationStatus, getResumeData } from '../services/applicationService';

const ApplicationsListTab = ({ applications }) => {
    // Load applications from localStorage or use provided applications prop
    const [allApps, setAllApps] = useState(applications);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statuses, setStatuses] = useState([]);

    // State for confirmation dialog
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        applicationId: null,
        newStatus: ''
    });

    // State for resume modal
    const [resumeModal, setResumeModal] = useState({
        isOpen: false,
        resumeData: null
    });

    // Fetch statuses from API
    useEffect(() => {
        fetch("http://localhost:8080/application-types/all-application-types")
            .then(response => response.json())
            .then(data => setStatuses(data.applicationTypes))
            .catch(error => console.error("Error fetching statuses:", error));
    }, []);

    const updateApplicationStatus = async (applicationId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/application/update-candidate-application/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ applicationStatus: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update application status');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating application status:', error);
            throw error;
        }
    };

    const getStatusCount = (status) => {
        return allApps.filter(app => app.applicationStatus === status).length;
    };

    const handleStatusChangeRequest = (appId, newStatus) => {
        // Find the current app
        const app = allApps.find(a => a._id === appId);

        // If no change in status, do nothing
        if (app && app.applicationStatus === newStatus) return;

        // Open confirmation dialog
        setConfirmDialog({
            isOpen: true,
            title: 'Update Application Status',
            message: `Are you sure you want to change the status from "${app?.applicationStatus}" to "${newStatus}"?`,
            applicationId: appId,
            newStatus: newStatus,
            onConfirm: () => confirmStatusChange(appId, newStatus)
        });
    };

    const confirmStatusChange = async (appId, newStatus) => {
        try {
            // Call API to update status
            await updateApplicationStatus(appId, newStatus);

            // Update local state
            const updated = allApps.map(app =>
                app._id === appId ? { ...app, applicationStatus: newStatus } : app
            );
            setAllApps(updated);

            // Close dialog
            setConfirmDialog({ ...confirmDialog, isOpen: false });
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Please try again.");
        }
    };

    const handleViewResume = async (application) => {
        try {
            // Open resume modal
            setResumeModal({
                isOpen: true,
                resumeData: application,
            });
        } catch (error) {
            console.error("Error fetching resume:", error);
            alert("Failed to load resume. Please try again.");
        }
    };

    const filteredApps = allApps
        .filter(app => statusFilter ? app.applicationStatus === statusFilter : true)
        .filter(app =>
            searchTerm
                ? app.candidateID?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.contactInfo?.toLowerCase().includes(searchTerm.toLowerCase())
                : true
        );

    console.log("filteredApps", filteredApps)

    return (
        <div className="flex gap-6">
            {/* Sidebar */}
            <StatusSidebar
                statuses={statuses}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                allApps={allApps}
                getStatusCount={getStatusCount}
            />

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
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Applications Table */}
                {filteredApps.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ApplicationsTable
                        filteredApps={filteredApps}
                        statuses={statuses}
                        onStatusChange={handleStatusChangeRequest}
                        onViewResume={handleViewResume}
                    />
                )}
            </div>

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={confirmDialog.isOpen}
                title={confirmDialog.title}
                message={confirmDialog.message}
                onConfirm={() => confirmStatusChange(confirmDialog.applicationId, confirmDialog.newStatus)}
                onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
            />

            {/* Resume Modal */}
            <ResumeModal
                isOpen={resumeModal.isOpen}
                resumeData={resumeModal.resumeData}
                onClose={() => setResumeModal({ ...applications, isOpen: false })}
            />
        </div>
    );
};

export default ApplicationsListTab;