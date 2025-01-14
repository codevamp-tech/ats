// src/pages/User/UserListing.js
import React, { useState } from 'react';
import { useUsers, useAddUser, useUpdateUser } from '../../hooks/useUser';
import UserDialog from '../../components/UserDialog';

const UserListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  // Dialog, form, etc.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    gender: '',
    address: '',
    role: '',
    head: false,
  });

  // --- React Query Hooks ---
  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useUsers({
    page: currentPage,
    limit: 5,
    search,
  });

  const { mutate: addUser } = useAddUser();
  const { mutate: updateUser } = useUpdateUser();

  const users = usersData?.users || [];
  const totalPages = usersData?.totalPages || 1;

  // Handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenAddDialog = () => {
    setDialogMode('add');
    setFormData({
      userName: '',
      email: '',
      password: '',
      gender: '',
      address: '',
      role: '',
      head: false,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (user) => {
    setDialogMode('edit');
    setSelectedUser(user);
    setFormData({
      userName: user.userName || '',
      email: user.email || '',
      password: '',
      gender: user.gender || '',
      address: user.address || '',
      role: user.role || '',
      head: user.head || false,
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (dialogMode === 'add') {
      addUser(formData, {
        onSuccess: () => {
          alert('User added successfully');
          handleCloseDialog();
        },
        onError: () => {
          alert('Failed to add user');
        },
      });
    } else {
      if (!selectedUser) return;
      updateUser(
        { userId: selectedUser._id, formData },
        {
          onSuccess: () => {
            alert('User updated successfully');
            handleCloseDialog();
          },
          onError: () => {
            alert('Failed to update user');
          },
        }
      );
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  // Loading & Error UI
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Listing</h1>

      {/* Search Field */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Add User Button */}
      <button onClick={handleOpenAddDialog}>Add User</button>

      {/* User List */}
      <div style={{ marginTop: '1rem' }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <p>
              <strong>Name:</strong> {user.userName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <button onClick={() => handleOpenEditDialog(user)}>Edit</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <UserDialog
          isDialogOpen={isDialogOpen}
          dialogMode={dialogMode}
          formData={formData}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default UserListing;
