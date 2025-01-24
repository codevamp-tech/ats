import React from 'react';
import PropTypes from 'prop-types';

const UserDialog = ({ handleCloseDialog, dialogMode, formData, handleFormChange, handleFormSubmit }) => {

    // Close the dialog when clicking outside (on the overlay)
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseDialog(); // Ensure handleCloseDialog is called
        }
    };

    return (
        <div
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {dialogMode === 'add' ? 'Add New User' : 'Edit User Details'}
                    </h2>
                </div>

                <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                User Name
                            </label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleFormChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            />
                        </div>

                        {dialogMode === 'add' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password || ''}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-Binary</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                name="role"
                                value={formData.role || ''}
                                onChange={handleFormChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="recruiter_manager">Recruiter Manager</option>
                                <option value="hiring_manager">Hiring Manager</option>
                                <option value="interviewer">Interviewer</option>
                                <option value="candidate">Candidate</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="head"
                                checked={formData.head || false}
                                onChange={handleFormChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Are you a head?
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCloseDialog}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {dialogMode === 'add' ? 'Add User' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UserDialog.propTypes = {
    dialogMode: PropTypes.oneOf(['add', 'edit']).isRequired,
    formData: PropTypes.shape({
        userName: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        gender: PropTypes.string,
        address: PropTypes.string,
        role: PropTypes.string,
        head: PropTypes.bool,
    }).isRequired,
    handleFormChange: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
};

export default UserDialog;