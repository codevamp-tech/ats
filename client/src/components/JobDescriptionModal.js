import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const JobDescriptionModal = ({ job, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    {/* <X className="w-6 h-6" /> */}
                    <div className="w-6 h-6">x</div>
                </button>

                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize mb-2">
                        {job.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <span>{job.city}, {job.state} | {job.locationType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.038-.775-1.038-2.041 0-2.816.952-.765 2.508-.765 3.461 0l.808.529m0 0a.75.75 0 0 1 1.052.14l.933 1.13.434-.217a.75.75 0 0 1 1.007.322l.558 1.116.34-.17c.448-.223.851-.526 1.201-.907l.579-.55-.764-.538a.75.75 0 0 1-.285-.803l.333-1.005-.871-.496c-.268-.153-.47-.456-.47-.805V9.456c0-.347.202-.65.47-.805l.87-.496-.333-1.005a.75.75 0 0 1 .285-.804l.764-.538-.579-.55a4.75 4.75 0 0 0-1.2-.907l-.34-.17-.558 1.116a.75.75 0 0 1-1.008.322l-.434-.217-.933 1.13a.75.75 0 0 1-1.052.14l-.808-.529" />
                            </svg>
                            <span>₹{job.compensation}/Annum</span>
                        </div>
                    </div>
                </div>

                <div className="prose max-w-none">
                    <ReactQuill
                        value={job.description}
                        readOnly={true}
                        theme={"bubble"}
                    />
                </div>

                <div className="mt-6 flex justify-between items-center border-t pt-4">
                    <div className="text-sm text-gray-500">
                        {job.experienceRequired} years experience
                    </div>
                    <a
                        href={`/current-job/${job._id}`}
                        className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-colors"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobDescriptionModal;