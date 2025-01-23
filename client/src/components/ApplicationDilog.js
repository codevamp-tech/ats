import React from "react";
import PropTypes from "prop-types";

const ApplicationDialog = ({
  dialogMode,
  formData,
  handleFormChange,
  handleFormSubmit,
  handleCloseDialog,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "400px",
          margin: "100px auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h2>{dialogMode === "add" ? "Add Application" : "Edit Application"}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Application Step:</label>
            <input
              type="text"
              name="applicationStep"
              value={formData.applicationStep}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label>Application Status:</label>
            <input
              type="text"
              name="applicationStatus"
              value={formData.applicationStatus}
              onChange={handleFormChange}
              required
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <button type="submit">
              {dialogMode === "add" ? "Add application" : "Update Application"}
            </button>
            <button
              type="button"
              onClick={handleCloseDialog}
              style={{ marginLeft: "1rem" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ApplicationDialog.propTypes = {
  dialogMode: PropTypes.oneOf(["add", "edit"]).isRequired,
  formData: PropTypes.shape({
    applicationStep: PropTypes.string,
    applicationStatus: PropTypes.string,
  }).isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default ApplicationDialog;
