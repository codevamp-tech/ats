// src/pages/Application/ApplicationListing.js
import React, { useState } from "react";
import {
  useApplicationTypes,
  useAddApplication,
  useUpdateApplicationType,
} from "../../hooks/useApplication";
import ApplicationDialog from "../../components/ApplicationDilog";

const ApplicationListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Dialog, form, etc.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [formData, setFormData] = useState({
    applicationStep: "",
    applicationStatus: "",
  });

  // --- React Query Hooks ---
  const {
    data: applicationTypesData,
    isLoading,
    isError,
    error,
  } = useApplicationTypes({
    page: currentPage,
    limit: 5,
    search,
  });

  const { mutate: addApplicationType } = useAddApplication();
  const { mutate: updateApplicationType } = useUpdateApplicationType();

  const applicationTypes = applicationTypesData?.applicationTypes || [];
  const totalPages = applicationTypesData?.totalPages || 1;

  // Handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenAddDialog = () => {
    setDialogMode("add");
    setFormData({
      applicationStep: "",
      applicationStatus: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (applicationType) => {
    setDialogMode("edit");
    setSelectedApplication(applicationType);
    setFormData({
      applicationStep: applicationTypesData.applicationStep || "",
      applicationStatus: applicationTypesData.applicationStatus || "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (dialogMode === "add") {
      addApplicationType(formData, {
        onSuccess: () => {
          alert("Application added successfully");
          handleCloseDialog();
        },
        onError: () => {
          alert("Failed to add application");
        },
      });
    } else {
      if (!selectedApplication) return;
      updateApplicationType(
        { applicationId: selectedApplication._id, formData },
        {
          onSuccess: () => {
            alert("Application updated successfully");
            handleCloseDialog();
          },
          onError: () => {
            alert("Failed to update application");
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
  if (isLoading) return <p>Loading applications...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Application Listing</h1>

      {/* Search Field */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Add Application Button */}
      <button onClick={handleOpenAddDialog}>Add Application</button>

      {/* Application List */}
      <div style={{ marginTop: "1rem" }}>
        {applicationTypes.map((application) => (
          <div
            key={application._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {/* applicationStep: "", applicationStatus: "", */}
            <p>
              <strong>Application Step:</strong> {application.applicationStep}
            </p>
            <p>
              <strong>Application Status:</strong>{" "}
              {application.applicationStatus}
            </p>

            <button onClick={() => handleOpenEditDialog(application)}>
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <ApplicationDialog
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

export default ApplicationListing;
