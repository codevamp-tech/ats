import React from 'react';
import ResumeTab from './ResumeTab';
import DetailsTab from './DetailsTab';
import QATab from './QATab';
import OtherApplicationsTab from './OtherApplicationsTab';

const ApplicationTabs = ({ activeTab, setActiveTab, applicationData }) => {
    const tabs = [
        { id: 'resume', label: 'CV / Resume' },
        { id: 'details', label: 'Application Details' },
        { id: 'qa', label: 'Q&A' },
        { id: 'other', label: 'Other Applications' }
    ];

    return (
        <>
            <div className="flex space-x-4 border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-4 text-sm font-medium transition-colors duration-200 
                            ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                {activeTab === 'resume' && <ResumeTab applicationData={applicationData} />}
                {activeTab === 'details' && <DetailsTab applicationData={applicationData} />}
                {activeTab === 'qa' && <QATab applicationData={applicationData} />}
                {activeTab === 'other' && <OtherApplicationsTab candidateId={applicationData?.candidateID?._id} />}
            </div>
        </>
    );
};

export default ApplicationTabs;
