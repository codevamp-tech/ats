import React from 'react';
import CandidateForm from './CandidateForm';

// We import the same libraries used by the form UI
import { Controller } from 'react-hook-form';
import { Country, State, City } from 'country-state-city';
import TimePicker from 'react-time-picker';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

/**
 * The full form UI that was originally in the return(...) of PostJob.jsx
 *
 * Receives all required props from PostJob.jsx so that we don't change the original logic or JSX.
 */
export const PostJobForm = ({
    // props passed down
    jobToEdit,
    handleSubmit,
    onSubmit,
    errors,
    register,
    control,
    shiftStart,
    setShiftStart,
    shiftEnd,
    setShiftEnd,
    questions,
    setQuestions,
    addQuestion,
    handleDeleteQuestion,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
}) => {
    // We can re-derive these based on selectedCountry / selectedState:
    const countries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
    const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        {jobToEdit ? 'Edit Job Posting' : 'Create New Job Posting'}
                    </h1>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Notice we use handleSubmit(onSubmit) exactly as before */}
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                                {/* Job Details Section */}
                                <div className="space-y-12">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Fill in the basic information about the position.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Title */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                {...register('title', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                                placeholder="Ex: Software Engineer"
                                            />
                                        </div>

                                        {/* Location Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Location Type
                                            </label>
                                            <select
                                                {...register('locationType', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            >
                                                <option value="" disabled>
                                                    Select location type
                                                </option>
                                                <option value="Remote">Remote</option>
                                                <option value="On-site">On-site</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                        </div>

                                        {/* Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Type
                                            </label>
                                            <select
                                                {...register('type', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            >
                                                <option value="" disabled>
                                                    Select employment type
                                                </option>
                                                <option value="Full-Time">Full-Time</option>
                                                <option value="Part-Time">Part-Time</option>
                                                <option value="Contract">Contract</option>
                                            </select>
                                        </div>

                                        {/* Schedule Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Schedule Type
                                            </label>
                                            <select
                                                {...register('scheduleType', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            >
                                                <option value="" disabled>
                                                    Select schedule type
                                                </option>
                                                <option value="Flexible">Flexible</option>
                                                <option value="Morning Shift">Morning Shift</option>
                                                <option value="Day Shift">Day Shift</option>
                                                <option value="Night Shift">Night Shift</option>
                                            </select>
                                        </div>

                                        {/* Shift Start */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Shift Start
                                            </label>
                                            <TimePicker
                                                onChange={setShiftStart}
                                                value={shiftStart}
                                                disableClock={true}
                                                format="hh:mm a"
                                            />
                                        </div>

                                        {/* Shift End */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Shift End
                                            </label>
                                            <TimePicker
                                                onChange={setShiftEnd}
                                                value={shiftEnd}
                                                disableClock={true}
                                                format="hh:mm a"
                                            />
                                        </div>

                                        {/* Hire Type */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Hire Type
                                            </label>
                                            <select
                                                {...register('hireType', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            >
                                                <option value="" disabled>
                                                    Select hire type
                                                </option>
                                                <option value="New">New</option>
                                                <option value="Replacement">Replacement</option>
                                            </select>
                                        </div>

                                        {/* Compensation */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Compensation
                                            </label>
                                            <input
                                                type="number"
                                                {...register('compensation', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                                placeholder="Ex: 50000"
                                            />
                                        </div>

                                        {/* Experience Required */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Experience Required
                                            </label>
                                            <input
                                                type="number"
                                                {...register('experienceRequired', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                                placeholder="Ex: 3"
                                            />
                                        </div>

                                        {/* Required Number of Resources */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Required Number of Resources
                                            </label>
                                            <input
                                                type="text"
                                                {...register('requiredResources', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                                placeholder="Ex: 5"
                                            />
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                {...register('status', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            >
                                                <option value="" disabled>
                                                    Select status
                                                </option>
                                                <option value="Approve">Approve</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Filled">Filled</option>
                                                <option value="On Hold">On Hold</option>
                                            </select>
                                        </div>

                                        {/* Recruiter Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Recruiter Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register('recruiterName', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                                placeholder="Recruiter Name"
                                            />
                                        </div>

                                        {/* Hiring Manager Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Hiring Manager Email
                                            </label>
                                            <input
                                                type="email"
                                                {...register('hiringManagerEmail', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                                placeholder="manager@example.com"
                                            />
                                        </div>

                                        {/* Hiring Manager Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Hiring Manager Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register('hiringManagerName', { required: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                                                placeholder="Hiring Manager Name"
                                            />
                                        </div>

                                        {/* Country, State, City */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country
                                            </label>
                                            <select
                                                value={selectedCountry}
                                                onChange={(e) => {
                                                    // reset state and city
                                                    setSelectedCountry(e.target.value);
                                                    setSelectedState('');
                                                    setSelectedCity('');
                                                }}
                                                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            >
                                                <option value="">Select Country</option>
                                                {countries.map((country) => (
                                                    <option key={country.isoCode} value={country.isoCode}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>

                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State
                                            </label>
                                            <select
                                                value={selectedState}
                                                onChange={(e) => {
                                                    setSelectedState(e.target.value);
                                                    setSelectedCity('');
                                                }}
                                                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                disabled={!selectedCountry}
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state) => (
                                                    <option key={state.isoCode} value={state.isoCode}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>

                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City
                                            </label>
                                            <select
                                                value={selectedCity}
                                                onChange={(e) => setSelectedCity(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                disabled={!selectedState}
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city) => (
                                                    <option key={city.name} value={city.name}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rich Text Editor for Description */}
                            <div className="mt-8">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <ReactQuill
                                            {...field}
                                            theme="snow"
                                            className="bg-white border rounded"
                                        />
                                    )}
                                />
                            </div>

                            {/* Candidate Form Section (Already split into its own file) */}
                            <CandidateForm
                                questions={questions}
                                setQuestions={setQuestions}
                                addQuestion={addQuestion}
                                handleDeleteQuestion={handleDeleteQuestion}
                            />

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    {jobToEdit ? 'Update Job Post' : 'Create Job Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostJobForm;
