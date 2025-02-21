import React, { useState, useEffect } from 'react';

const OtherApplicationsTab = ({ candidateId }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/application/candidate/${candidateId}`)
            .then((res) => res.json())
            .then((data) => setApplications(data.applications || []));
    }, [candidateId]);

    return (
        <div className="border p-4 rounded">
            <h2 className="text-lg text-deepBlack font-semibold mb-2">Other Applications</h2>
            {applications.length > 0 ? applications.map((app) => (
                <p key={app._id}>{app.jobID?.title || 'N/A'}</p>
            )) : <p>No other applications found.</p>}
        </div>
    );
};

export default OtherApplicationsTab;
