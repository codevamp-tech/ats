import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationTypes } from '../../hooks/useApplicationTypes';

const CandidateApplication = () => {
    const [ formInputs, setFormInputs ] = useState( {
        title: '',
        city: '',
        employmentType: '',
        scheduleType: '',
        hireType: '',
        locationType: '',
    } );

    // Add employment type options
    const types = [
        { value: '', label: 'Select Employment Type' },
        { value: 'Full-Time', label: 'Full-Time' },
        { value: 'Part-Time', label: 'Part-Time' },
        { value: 'Contract', label: 'Contract' }
    ];
    const scheduleTypes = [
        { value: '', label: 'Select Schedule Type' },
        { value: 'Flexible', label: 'Flexible' },
        { value: 'Morning Shift', label: 'Morning Shift' },
        { value: 'Day Shift', label: 'Day Shift' },
        { value: 'Night Shift', label: 'Night Shift' }
    ];
    const hireTypes = [
        { value: '', label: 'Select Hire Type' },
        { value: 'New', label: 'New' },
        { value: 'Replacement', label: 'Replacement' },
    ];
    const locationType = [
        { value: '', label: 'Select Job Location Type' },
        { value: 'Remote', label: 'Remote' },
        { value: 'On-Site', label: 'On-site' },
        { value: 'Hybrid', label: 'Hybrid' },
    ]

    const [ showFilters, setShowFilters ] = useState( false );
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ jobsPerPage ] = useState( 6 ); // Number of jobs per page
    const [ appliedFilters, setAppliedFilters ] = useState( {} ); // Store applied filters

    const navigate = useNavigate();

    // Fetching the jobs and application count with active filters
    const { data: jobData, isLoading, isError } = useApplicationTypes(
        appliedFilters, currentPage, jobsPerPage
    );

    // Handle filter input changes
    const handleFilterChange = ( e ) => {
        const { name, value } = e.target;
        setFormInputs( ( prev ) => ( {
            ...prev,
            [ name ]: value,
        } ) );
    };

    // Submit the filters and reset pagination to page 1
    const handleFilterSubmit = ( e ) => {
        e.preventDefault();
        setAppliedFilters( formInputs ); // Apply the current filter inputs
        setCurrentPage( 1 ); // Reset pagination when filters are applied

    };

    // Reset all filters
    const handleResetFilters = () => {
        setFormInputs( {
            title: '',
            city: '',
            employmentType: '',
            scheduleType: '',
            hireType: '',
            locationType: '',
        } );
        setAppliedFilters( {} ); // Reset applied filters to show all results
        setCurrentPage( 1 ); // Reset to page 1
    };

    // Handle pagination
    const handlePageChange = ( newPage ) => {
        setCurrentPage( newPage );
    };

    if ( isLoading ) {
        return <p className="text-center mt-4">Loading...</p>;
    }

    if ( isError ) {
        return <p className="text-center mt-4 text-red-600">An error occurred while fetching data.</p>;
    }

    const totalPages = jobData.totalPages;
    const allJobs = jobData.data;

    // console.log("")

    return (
        <div className="max-w-screen-2xl mx-auto px-4 xl:px-24 py-8 min-h-screen">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header */ }
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">All Posted Jobs</h3>
                        <div className="flex justify-between items-center px-2">
                            <button
                                type="button"
                                onClick={ () => setShowFilters( ( prev ) => !prev ) }
                                className="inline-flex items-center ml-4 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
                            >
                                { showFilters ? 'Hide Filters' : 'Sort By Filters' }
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Section */ }
                { showFilters && (
                    <form className="flex flex-wrap gap-6 px-6 py-6 bg-lightGray rounded-lg shadow-md w-fit" onSubmit={ handleFilterSubmit }>
                        {/* Job Title */ }
                        <div className="flex flex-wrap justify-around gap-6 px-6 py-6 bg-white rounded-lg shadow-md w-fit">
                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
                                <label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-2">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={ formInputs.title }
                                    onChange={ handleFilterChange }
                                    placeholder="Enter Job Title"
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                                />
                            </div>
                            {/* Location */ }
                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
                                <label htmlFor="city" className="text-sm font-semibold text-gray-700 mb-2">Location of Job</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={ formInputs.city }
                                    onChange={ handleFilterChange }
                                    placeholder="Enter Location"
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                                />
                            </div>
                            {/* Employment Type */ }
                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
                                <label htmlFor="type" className="text-sm font-semibold text-gray-700 mb-2">Employment Type</label>
                                <select
                                    type="text"
                                    name="type"
                                    value={ formInputs.type }
                                    onChange={ handleFilterChange }
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                                >
                                    { types.map( ( type ) => (
                                        <option key={ type.value } value={ type.value }>
                                            { type.label }
                                        </option>
                                    ) ) }
                                </select>
                            </div>

                            {/* Schedule Type */ }
                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
                                <label htmlFor="scheduleType" className="text-sm font-semibold text-gray-700 mb-2">Schedule Type</label>
                                <select
                                    type="text"
                                    name="scheduleType"
                                    id="scheduleType"
                                    placeholder="Select Schedule Type"
                                    value={ formInputs.scheduleType }
                                    onChange={ handleFilterChange }
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                                >
                                    { scheduleTypes.map( ( type ) => (
                                        <option key={ type.value } value={ type.value }>
                                            { type.label }
                                        </option>
                                    ) ) }
                                </select>
                            </div>

                            {/* Hire Type */ }
                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
                                <label htmlFor="hireType" className="text-sm font-semibold text-gray-700 mb-2">Hire Type</label>
                                <select
                                    type="text"
                                    name="hireType"
                                    id="hireType"
                                    placeholder="Select Hire Type"
                                    value={ formInputs.hireType }
                                    onChange={ handleFilterChange }
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                                >
                                    { hireTypes.map( ( type ) => (
                                        <option key={ type.value } value={ type.value }>
                                            { type.label }
                                        </option>
                                    ) ) }
                                </select>
                            </div>

                            {/* Location Type */ }
                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
                                <label htmlFor="locationType" className="text-sm font-semibold text-gray-700 mb-2">Location Type</label>
                                <select
                                    type="text"
                                    name="locationType"
                                    id="locationType"
                                    placeholder="Select Location Type"
                                    value={ formInputs.locationType }
                                    onChange={ handleFilterChange }
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                                >
                                    { locationType.map( ( type ) => (
                                        <option key={ type.value } value={ type.value }>
                                            { type.label }
                                        </option>
                                    ) ) }
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center gap-4 mt-2">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
                            >
                                Apply Filters
                            </button>
                            <button
                                type="button"
                                onClick={ handleResetFilters }
                                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-colors duration-200 ease-in-out"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </form>
                ) }

                {/* Jobs Table */ }
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Schedule</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Hire Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Compensation</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"># Apps</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            { jobData?.data?.length === 0 &&
                                < p className="text-center mt-4">No application found.</p>
                            }
                            { allJobs.map( ( job ) => (
                                <tr key={ job.jobID } className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{ job.title || 'N/A' }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{ job.city || 'N/A' }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{ job.type || 'N/A' }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{ job.scheduleType || 'N/A' }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-600">{ job.hireType || 'N/A' }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-600">{ job.compensation || 'N/A' }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-600">{ job.applicationCount }</div>
                                    </td>
                                    <td>
                                        <button onClick={ () => navigate( `/job-detail/${ job.jobID }` ) }>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </div>

                {/* Pagination */ }
                { totalPages > 0 && (
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            {/* Previous Button or Placeholder */ }
                            { currentPage > 1 ? (
                                <button
                                    onClick={ () => setCurrentPage( ( p ) => Math.max( 1, p - 1 ) ) }
                                    className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    ← Previous
                                </button>
                            ) : (
                                <div className="w-[84px]"></div> // Placeholder to maintain spacing
                            ) }

                            {/* Page Information */ }
                            <span className="text-sm text-gray-600">
                                Page { currentPage } of { totalPages }
                            </span>

                            {/* Next Button or Placeholder */ }
                            { currentPage < totalPages ? (
                                <button
                                    onClick={ () => setCurrentPage( ( p ) => Math.min( totalPages, p + 1 ) ) }
                                    className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Next →
                                </button>
                            ) : (
                                <div className="w-[84px]"></div> // Placeholder to maintain spacing
                            ) }
                        </div>
                    </div>
                ) }
            </div>
        </div >
    );
};

export default CandidateApplication;
