import React, { useState, useEffect } from 'react';

const OtherApplicationsTab = ({ candidateId }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/application/candidate/${candidateId}`)
            .then((res) => res.json())
            .then((data) => setApplications(data.applications || []));
    }, [candidateId]);

    console.log("applications", applications);

    return (
        <div className="border p-4 rounded">
            <h2 className="text-lg text-deepBlack font-semibold mb-2">Other Applications</h2>
            {applications.length > 0 ? applications.map((app) => (
                <div key={app._id} className="mb-4 p-4 border-b">
                    <h3 className="text-lg font-semibold">{app.jobID?.title || 'N/A'}</h3>
                    <p><strong>Location:</strong> {app.jobID?.locationType || 'N/A'}</p>
                    <p><strong>Schedule:</strong> {app.jobID?.scheduleType || 'N/A'}</p>
                    <p><strong>Shift:</strong> {app.jobID?.shiftStart} - {app.jobID?.shiftEnd}</p>
                    <p><strong>Compensation:</strong> {app.jobID?.compensation || 'N/A'}</p>
                    <p><strong>Status:</strong> {app.applicationStatus || 'N/A'}</p>
                    <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a>
                </div>
            )) : <p>No other applications found.</p>}
        </div>
    );
};

export default OtherApplicationsTab;
