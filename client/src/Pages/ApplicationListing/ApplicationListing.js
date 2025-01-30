import React, { useState } from "react";
import {
  useApplicationTypes,
  useAddApplication,
  useUpdateApplicationType,
} from "../../hooks/useApplication";
import ApplicationDialog from "../../components/ApplicationDilog";

const ApplicationListing = () => {
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ search, setSearch ] = useState( "" );
  const [ isDialogOpen, setIsDialogOpen ] = useState( false );
  const [ dialogMode, setDialogMode ] = useState( "add" );
  const [ selectedApplication, setSelectedApplication ] = useState( null );
  const [ formData, setFormData ] = useState( {
    applicationStep: "",
    applicationStatus: "",
  } );

  const {
    data: applicationTypesData,
    isLoading,
    isError,
    error,
  } = useApplicationTypes( {
    page: currentPage,
    limit: 12,
    search,
  } );

  const { mutate: addApplicationType } = useAddApplication();
  const { mutate: updateApplicationType } = useUpdateApplicationType();

  const applicationTypes = applicationTypesData?.applicationTypes || [];
  const totalPages = applicationTypesData?.totalPages || 1;

  const handleSearchChange = ( e ) => {
    setSearch( e.target.value );
    setCurrentPage( 1 );
  };

  const handleOpenAddDialog = () => {
    setDialogMode( "add" );
    setFormData( {
      applicationStep: "",
      applicationStatus: "",
    } );
    setIsDialogOpen( true );
  };

  const handleOpenEditDialog = ( applicationType ) => {
    setDialogMode( "edit" );
    setSelectedApplication( applicationType );
    setFormData( {
      applicationStep: applicationType.applicationStep || "",
      applicationStatus: applicationType.applicationStatus || "",
    } );
    setIsDialogOpen( true );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen( false );
    setSelectedApplication( null );
  };

  const handleFormChange = ( e ) => {
    setFormData( ( prev ) => ( {
      ...prev,
      [ e.target.name ]: e.target.value,
    } ) );
  };

  const handleFormSubmit = ( e ) => {
    e.preventDefault();
    if ( dialogMode === "add" ) {
      addApplicationType( formData, {
        onSuccess: () => {
          handleCloseDialog();
        },
        onError: () => {
          alert( "Failed to add application" );
        },
      } );
    } else {
      if ( !selectedApplication ) return;
      updateApplicationType(
        { applicationId: selectedApplication._id, formData },
        {
          onSuccess: () => {
            handleCloseDialog();
          },
          onError: () => {
            alert( "Failed to update application" );
          },
        }
      );
    }
  };


  if ( isLoading ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if ( isError ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">Error: { error.message }</p>
        </div>
      </div>
    );
  }

  return (

    <div
      className={ `w-screen mx-auto px-4 py-8 flex justify-center min-h-[85vh]` }
    >
      <div className="bg-clearWhite rounded-lg shadow-lg p-6 w-[100vw]">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className='w-[20vw]'>
            <h1 className="text-[2rem] font-bold text-mediumGray sm:mb-0 px-2">
              Application Types
            </h1>
          </div>
          <div className="relative ml-[45vw]">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search applications..."
                value={ search }
                onChange={ handleSearchChange }
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none hover:bg-lightGray"
              />
            </div>
          </div>
          <button
            onClick={ handleOpenAddDialog }
            className="flex items-center px-4 py-2 bg-clearWhite text-deepBlack rounded-lg hover:bg-lightGray"
          >
            <span className="mr-2">+</span>
            Add New Application
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          { applicationTypes.map( ( application ) => (
            <div
              key={ application._id }
              className="bg-clearWhite p-4 rounded-lg border border-gray-300 hover:shadow-xl transition-all duration-300 h-[21vh]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Application Step: { application.applicationStep }
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Application Status:{ " " }
                    <span
                      className={ `font-semibold ${ application.applicationStatus === "Active"
                        ? "text-green-600 "
                        : "text-red-600"
                        }` }
                    >
                      { application.applicationStatus }
                    </span>
                  </p>
                </div>

                <button
                  onClick={ () => handleOpenEditDialog( application ) }
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all duration-200"
                >
                  ✏️
                </button>
              </div>
            </div>
          ) ) }
        </div>


        <div className="flex items-center justify-between border-t pt-4">
          {/* Previous Button or Placeholder */ }
          { currentPage > 1 ? (
            <button
              onClick={ () => setCurrentPage( ( p ) => Math.max( 1, p - 1 ) ) }
              className="px-4 py-2 text-sm bg-clearWhite border border-gray-300 rounded-lg hover:bg-lightGray"
            >
              ← Previous
            </button>
          ) : (
            <div className="w-[84px]"></div> // Placeholder to maintain spacing
          ) }

          {/* Page Information */ }
          <span className="text-sm text-mediumGray">
            Page { currentPage } of { totalPages }
          </span>

          {/* Next Button or Placeholder */ }
          { currentPage < totalPages ? (
            <button
              onClick={ () => setCurrentPage( ( p ) => Math.min( totalPages, p + 1 ) ) }
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-lightGray"
            >
              Next →
            </button>
          ) : (
            <div className="w-[84px]"></div> // Placeholder to maintain spacing
          ) }
        </div>
      </div>

      { isDialogOpen && (
        <ApplicationDialog
          isDialogOpen={ isDialogOpen }
          dialogMode={ dialogMode }
          formData={ formData }
          handleFormChange={ handleFormChange }
          handleFormSubmit={ handleFormSubmit }
          handleCloseDialog={ handleCloseDialog }
        />
      ) }
    </div>
  );
};

export default ApplicationListing;
