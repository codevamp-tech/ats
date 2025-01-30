
import React, { useState, useMemo } from "react";
import {
  useApplicationTypes,
  useAddApplication,
  useUpdateApplicationType,
} from "../../hooks/useApplication";
import ApplicationDialog from "../../components/ApplicationDialog";

const ApplicationListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [formData, setFormData] = useState({
    applicationStep: "",
    applicationStatus: "",
  });

  const {
    data: applicationTypesData,
    isLoading,
    isError,
    error,
  } = useApplicationTypes({
    page: currentPage,
    limit: 9,
    search,
  });


  const { mutate: addApplicationType } = useAddApplication();
  const { mutate: updateApplicationType } = useUpdateApplicationType();

  const applicationTypes = applicationTypesData?.applicationTypes || [];
  const totalPages = applicationTypesData?.totalPages || 1;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredApplications = useMemo(() => {
    return applicationTypes.filter((application) =>
      application.applicationStep?.toLowerCase().includes(search.toLowerCase())
    );
  }, [applicationTypes, search]);

  const handleOpenAddDialog = () => {
    setDialogMode("add");
    setFormData({
      applicationStep: "",
      applicationStatus: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (application) => {
    setDialogMode("edit");
    setSelectedApplication(application);
    setFormData({
      applicationStep: application.applicationStep || "",
      applicationStatus: application.applicationStatus || "",
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
        onSuccess: handleCloseDialog,
        onError: (error) => console.error("Failed to add application:", error),
      });
    } else {
      if (!selectedApplication) return;
      updateApplicationType(
        {
          applicationId: selectedApplication._id, // Ensure API expects "applicationId"
          formData, // Ensure API expects "formData"
        },
        {
          onSuccess: () => {
            alert("Application updated successfully");
            handleCloseDialog();
          },
          onError: (error) => {
            console.error("Update failed:", error);
            alert("Failed to update application");
          },
        }
      );

    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-12xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Application Management</h1>
          <button
            onClick={handleOpenAddDialog}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add New Application
          </button>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {filteredApplications.map((application) => (
            <div
              key={application._id}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{application.applicationStep}</h3>
                  <p className="text-sm text-gray-600">{application.applicationStatus}</p>
                </div>
                <button
                  onClick={() => handleOpenEditDialog(application)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          {currentPage > 1 ? (
            <button onClick={() => setCurrentPage((p) => p - 1)} className="px-4 py-2 bg-white border rounded-lg">← Previous</button>
          ) : (
            <div className="w-[84px]"></div>
          )}
          <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
          {currentPage < totalPages ? (
            <button onClick={() => setCurrentPage((p) => p + 1)} className="px-4 py-2 bg-white border rounded-lg">Next →</button>
          ) : (
            <div className="w-[84px]"></div>
          )}
        </div>
      </div>

      {isDialogOpen && (
        <ApplicationDialog
          isOpen={isDialogOpen}
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

