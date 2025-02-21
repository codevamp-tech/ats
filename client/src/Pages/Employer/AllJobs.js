import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJob';

export const AllJobs = () => {
    // Separate state for form inputs and API filters
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

    // This state will only be updated when "Apply Filters" is clicked
    const [ activeFilters, setActiveFilters ] = useState( {} );
    const [ activeInput, setActiveInput ] = useState( null );
    const [ showFilters, setShowFilters ] = useState( false );

    // Adding search and pagination states
    const [ search, setSearch ] = useState( '' );
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ jobsPerPage ] = useState( 6 ); // Number of jobs per page

    // Now useJobs will only trigger when activeFilters changes
    const { data: allJobs = [], isLoading } = useJobs( activeFilters, currentPage, jobsPerPage );
    const navigate = useNavigate();

    // Create refs for inputs
    const inputRefs = {
        title: useRef(),
        location: useRef(),
        city: useRef(),
        type: useRef(),
        scheduleType: useRef(),
        hireType: useRef(),
    };

    console.log( 'newFilters', activeFilters );

    // Filter jobs based on search term
    const filteredJobs = allJobs?.jobs?.filter( ( job ) =>
        job.title.toLowerCase().includes( search.toLowerCase() ) ||
        ( job.city && job.city.toLowerCase().includes( search.toLowerCase() ) ) ||
        ( job.state && job.state.toLowerCase().includes( search.toLowerCase() ) ) ||
        ( job.country && job.country.toLowerCase().includes( search.toLowerCase() ) )

    );

    // Calculate pagination
    const totalPages = allJobs?.totalPages;

    console.log( "totalPages", totalPages, allJobs );

    // Handle filter input changes without triggering API calls
    const handleFilterChange = ( e ) => {
        const { name, value } = e.target;
        setFormInputs( ( prev ) => ( {
            ...prev,
            [ name ]: value,
        } ) );
    };

    // Handle focus
    const handleFocus = ( name ) => {
        setActiveInput( name );
    };

    // Maintain focus after re-render
    useEffect( () => {
        if ( activeInput && inputRefs[ activeInput ]?.current ) {
            inputRefs[ activeInput ].current.focus();
            const len = inputRefs[ activeInput ].current.value.length;
            inputRefs[ activeInput ].current.setSelectionRange( len, len );
        }
    }, [ activeInput, formInputs ] );

    // Apply filters only when the form is submitted
    const handleFilterSubmit = ( e ) => {
        e.preventDefault();

        // Create an object with only non-empty values
        const newFilters = Object.entries( formInputs ).reduce( ( acc, [ key, value ] ) => {
            if ( value ) {
                acc[ key ] = value;
            }
            return acc;
        }, {} );

        // Only update activeFilters if there are actual filters
        if ( Object.keys( newFilters ).length > 0 ) {
            console.log( 'set filters new', newFilters );
            setActiveFilters( newFilters );
        } else {
            setActiveFilters( {} ); // Reset to empty if no filters
        }

        // Reset to first page when applying filters
        setCurrentPage( 1 );
    };

    // Reset filters handler
    const handleResetFilters = () => {
        setFormInputs( {
            title: '',
            location: '',
            employmentType: '',
            scheduleType: '',
            hireType: '',
            city: '',
        } );
        setActiveFilters( {} );
        setActiveInput( null );
        setSearch( '' );
        setCurrentPage( 1 );
    };

    const toggleFilters = () => {
        setShowFilters( ( prev ) => !prev );
    }

    if ( isLoading ) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto px-4 xl:px-24 py-8 min-h-screen">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Header Section */ }
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">All Posted Jobs</h3>
                        <div className="flex justify-between items-center px-2">
                            {/* Filter Button */ }
                            <div className="px-6 py-4 ">
                                <button
                                    type="button"
                                    onClick={ toggleFilters }
                                    className="inline-flex items-center ml- px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
                                >
                                    { showFilters ? 'Hide Filters' : 'Sort By Filters' }
                                </button>
                            </div>
                            <Link
                                to="/post-job"
                                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
                            >
                                <span className="mr-2">+</span>
                                Add Job
                            </Link>
                        </div>
                    </div>
                </div>



                {/* Filters Section - Conditional Rendering */ }
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
                                    ref={ inputRefs.title }
                                    placeholder="Enter Job Title"
                                    value={ formInputs.title }
                                    onChange={ handleFilterChange }
                                    onFocus={ () => handleFocus( 'title' ) }
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
                                    ref={ inputRefs.location }
                                    placeholder="Enter Location"
                                    value={ formInputs.city }
                                    onChange={ handleFilterChange }
                                    onFocus={ () => handleFocus( 'city' ) }
                                />
                            </div>

                            {/* Employment Type */ }
                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
                                <label htmlFor="type" className="text-sm font-semibold text-gray-700 mb-2">Employment Type</label>
                                <select
                                    type="text"
                                    name="type"
                                    id="type"
                                    placeholder="Select Employment Type"
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
                        {/* Action Buttons */ }

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

                {/* Table Section */ }
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Salary</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            { filteredJobs.map( ( job ) => (
                                <tr key={ job._id } className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{ job.title }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">₹{ job.compensation }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{ job.city }, { job.state }, { job.country }</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={ () => navigate( '/post-job', { state: { job } } ) }
                                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>

                    {/* Empty State */ }
                    { filteredJobs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No jobs found</p>
                        </div>
                    ) }
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

export default AllJobs;