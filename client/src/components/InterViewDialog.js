
import React from "react";
import PropTypes from "prop-types";

const InterViewDialog = ({
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
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "450px",
          background: "#ffffff",
          padding: "30px 20px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#333",
            textAlign: "center",
          }}
        >
          {dialogMode === "add" ? "Add Interview Round" : "Edit Interview Round"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Round Name:
            </label>
            <input
              type="text"
              name="roundName"
              value={formData.roundName}
              onChange={handleFormChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "0.9rem",
                transition: "border 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.border = "1px solid #007BFF")
              }
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#555",
              }}
            >
              Round Number:
            </label>
            <input
              type="text"
              name="roundNumber"
              value={formData.roundNumber}
              onChange={handleFormChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "0.9rem",
                transition: "border 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.border = "1px solid #007BFF")
              }
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#007BFF")
              }
            >
              {dialogMode === "add" ? "Add" : "Update"}
            </button>
            <button
              type="button"
              onClick={handleCloseDialog}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#5a6268")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#6c757d")
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

InterViewDialog.propTypes = {
  dialogMode: PropTypes.oneOf(["add", "edit"]).isRequired,
  formData: PropTypes.shape({
    roundName: PropTypes.string,
    roundNumber: PropTypes.string,
  }).isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};

export default InterViewDialog;

