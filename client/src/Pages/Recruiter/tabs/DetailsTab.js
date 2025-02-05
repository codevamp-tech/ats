import React from 'react';

const DetailsTab = ({ applicationData }) => (
    <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Application Details</h2>
        <p><strong>Contact:</strong> {applicationData.contactInfo || 'N/A'}</p>
        <p><strong>Experience:</strong> {applicationData.experience || 'N/A'}</p>
        <p><strong>Status:</strong> {applicationData.applicationStatus || 'N/A'}</p>
    </div>
);

export default DetailsTab;
