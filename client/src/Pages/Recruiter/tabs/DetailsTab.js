import React from 'react';

const DetailsTab = ( { applicationData } ) => {
    // Define color classes based on status
    const getStatusColorClass = ( status ) => {
        switch ( status ) {
            case 'Scheduled':
            case 'Accepted':
                return 'bg-green-800 text-white';
            case 'screening':
                return 'text-yellow-600';
            case 'Pending':
                return 'text-amber-800';
            case 'In Review':
                return 'bg-gray-400 text-white';
            case 'Rejected':
            case 'Not Selected':
                return 'bg-red-900 text-white';
            default:
                return 'bg-gray-400 text-white'; // For unknown or undefined statuses
        }
    };

    return (
        <div className="border p-6 rounded-lg bg-lightGray shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Details</h2>

            {/* Status with dynamic color */ }
            <p className="text-deepBlack">
                Status:
                <span className={ `ml-5 px-3 py-2 rounded-md ${ getStatusColorClass( applicationData.applicationStatus ) }` }>
                    { applicationData.applicationStatus || 'N/A' }
                </span>
            </p>

            {/* Contact info */ }
            <p className="text-deepBlack">
                Contact:
                <span className="text-blue-500 ml-5">+91 { applicationData.contactInfo || 'N/A' }</span>
            </p>

            {/* Experience info */ }
            <p className="text-deepBlack">
                Experience:
                <span className="text-blue-500 ml-5">{ applicationData.experience || 'N/A' }</span>
            </p>
        </div>
    );
};

export default DetailsTab;
