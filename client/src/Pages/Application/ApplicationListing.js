
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
    applicationStep: 0,
    applicationStatus: "",
  });

  const {
    data: applicationTypesData,
    isLoading,
    isError,
    error,
  } = useApplicationTypes({
    page: currentPage,
    limit: 6,
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

  // Memoize the filtered users

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
          applicationTypeId: selectedApplication._id, // Ensure API expects "applicationId"
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

  return (
    <div className="w-screen mx-auto px-4 py-8 h-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Application Types</h1>
          <div className="relative ml-[45vw]">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search Status..."
              value={search}
              onChange={(e) => handleSearchChange(e)}
              className="w-full pl-10 pr-4 py-2 rounded-lg  focus:border-transparent hover:bg-lightGray bg-gray-100"
            />
          </div>
          <button
            onClick={handleOpenAddDialog}
            className="flex items-center px-4 py-2 text-deepBlack rounded-lg hover:bg-lightGray bg-gray-100"
          >
            <span className="mr-2"><strong>+</strong></span>
            <strong>Add New Application Status</strong>
          </button>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {isLoading &&
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
          {isError &&
            <div className="min-h-screen flex items-center justify-center">
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600">Error: {error.message}</p>
              </div>
            </div>
          }
          {applicationTypes.map((application) => (
            <div
              key={application._id}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 "
            >
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 h-[20vh]">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-900 mr-2">Application Step:</h3>
                    <p className="text-lg font-semibold text-purple-800">{application.applicationStep}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <h3 className="font-semibold text-gray-900 mr-2">Application Status:</h3>
                    <p className="text-sm font-semibold text-green-800">{application.applicationStatus}</p>
                  </div>
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

