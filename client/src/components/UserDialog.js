import React from 'react';
import PropTypes from 'prop-types';

const UserDialog = ( {
    dialogMode,
    formData,
    handleFormChange,
    handleFormSubmit,
    handleCloseDialog,
} ) => {
    return (
        <div
            style={ {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.6)',
                zIndex: 1000,
            } }
        >
            <div
                style={ {
                    position: 'relative',
                    width: '400px',
                    margin: '100px auto',
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                } }
            >
                <h2>{ dialogMode === 'add' ? 'Add User' : 'Edit User' }</h2>
                <form onSubmit={ handleFormSubmit }>
                    <div>
                        <label>User Name:</label>
                        <input
                            type="text"
                            name="userName"
                            value={ formData.userName }
                            onChange={ handleFormChange }
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={ formData.email }
                            onChange={ handleFormChange }
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={ formData.password || '' }
                            onChange={ handleFormChange }
                            required={ dialogMode === 'add' }
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={ formData.gender }
                            onChange={ handleFormChange }
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-Binary</option>
                        </select>
                    </div>
                    <div>
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={ formData.address || '' }
                            onChange={ handleFormChange }
                        />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select
                            name="role"
                            value={ formData.role || '' }
                            onChange={ handleFormChange }
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="recruiter_manager">Recruiter Manager</option>
                            <option value="hiring_manager">Hiring Manager</option>
                            <option value="interviewer">Interviewer</option>
                            <option value="candidate">Candidate</option>
                        </select>
                    </div>
                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            className="mr-2"
                            value={ formData.head }
                            onChange={ handleFormChange }
                        />
                        <label className="text-sm">
                            Are you a head?
                        </label>
                    </div>
                    <div style={ { marginTop: '1rem' } }>
                        <button type="submit">
                            { dialogMode === 'add' ? 'Add User' : 'Update User' }
                        </button>
                        <button type="button" onClick={ handleCloseDialog } style={ { marginLeft: '1rem' } }>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UserDialog.propTypes = {
    dialogMode: PropTypes.oneOf( [ 'add', 'edit' ] ).isRequired,
    formData: PropTypes.shape( {
        userName: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        gender: PropTypes.string,
        address: PropTypes.string,
        role: PropTypes.string,
        head: PropTypes.bool,
    } ).isRequired,
    handleFormChange: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
};

export default UserDialog;
