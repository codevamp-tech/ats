import React from 'react';

const QATab = ({ applicationData }) => (
    <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Q&A</h2>
        {applicationData.questions?.length > 0 ? (
            applicationData.questions.map((q, index) => (
                <div key={index} className="mb-4">
                    <p className="font-semibold">Q: {q}</p>
                    <p>A: {applicationData.answers?.[index] || 'Not answered'}</p>
                </div>
            ))
        ) : (
            <p className="text-gray-600">No Q&A available.</p>
        )}
    </div>
);

export default QATab;
