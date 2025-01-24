import React, { useState } from "react";
import { useInterviews, useAddInterview, useUpdateInterview } from "../../hooks/useInterviewRounds";
import InterViewDialog from "../../components/InterViewDialog";

const InterviewListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [formData, setFormData] = useState({
    roundName: "",
    roundNumber: "",
  });

  const {
    data: interviewsData,
    isLoading,
    isError,
    error,
  } = useInterviews({
    page: currentPage,
    limit: 5,
    search,
  });

  const { mutate: addInterview } = useAddInterview();
  const { mutate: updateInterview } = useUpdateInterview();

  const interviews = interviewsData?.interviews || [];
  const totalPages = interviewsData?.totalPages || 1;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenAddDialog = () => {
    setDialogMode("add");
    setFormData({
      roundName: "",
      roundNumber: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (interview) => {
    setDialogMode("edit");
    setSelectedInterview(interview);
    setFormData({
      roundName: interview.roundName || "",
      roundNumber: interview.roundNumber || "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedInterview(null);
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
      addInterview(formData, {
        onSuccess: () => {
          alert("Interview added successfully");
          handleCloseDialog();
        },
        onError: () => {
          alert("Failed to add interview");
        },
      });
    } else {
      if (!selectedInterview) return;
      updateInterview(
        { interviewId: selectedInterview._id, formData },
        {
          onSuccess: () => {
            alert("Interview updated successfully");
            handleCloseDialog();
          },
          onError: () => {
            alert("Failed to update Interview");
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

  if (isLoading) return <p>Loading Interview Details...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Interview Round List
      </h1>

      {/* Search Field */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            outline: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Add Button */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={handleOpenAddDialog}
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Add Interview Round
        </button>
      </div>

      {/* Interview List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {interviews.map((interview) => (
          <div
            key={interview._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <strong>Round Name:</strong> {interview.roundName}
            </p>
            <p>
              <strong>Round Number:</strong> {interview.roundNumber}
            </p>
            <button
              onClick={() => handleOpenEditDialog(interview)}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={{
            backgroundColor: "#ddd",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: "16px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: "#ddd",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            marginLeft: "10px",
          }}
        >
          Next
        </button>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <InterViewDialog
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

export default InterviewListing;

