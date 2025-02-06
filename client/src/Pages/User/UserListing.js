import React, { useState, useMemo } from 'react';
import { useUsers, useAddUser, useUpdateUser } from '../../hooks/useUser';
import UserDialog from '../../components/UserDialog';

const UserListing = () => {
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ search, setSearch ] = useState( '' );
  const [ isDialogOpen, setIsDialogOpen ] = useState( false );
  const [ dialogMode, setDialogMode ] = useState( 'add' );
  const [ selectedUser, setSelectedUser ] = useState( null );
  const [ formData, setFormData ] = useState( {
    userName: '',
    email: '',
    password: '',
    gender: '',
    address: '',
    role: '',
    head: false,
  } );

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useUsers( {
    page: currentPage,
    limit: 10,
    search,
  } );

  const { mutate: addUser } = useAddUser();
  const { mutate: updateUser } = useUpdateUser();

  const users = usersData?.users || [];
  const totalPages = usersData?.totalPages || 1;

  const handleSearchChange = ( e ) => {
    setSearch( e.target.value );
    setCurrentPage( 1 );
  };

  // Memoize the filtered users
  const filteredUsers = useMemo( () => {
    return users.filter( ( user ) =>
      user.name?.toLowerCase().includes( search.toLowerCase() )
    );
  }, [ users, search ] );


  const handleOpenAddDialog = () => {
    setDialogMode( 'add' );
    setFormData( {
      userName: '',
      email: '',
      password: '',
      gender: '',
      address: '',
      role: '',
      head: false,
    } );
    setIsDialogOpen( true );
  };

  const handleOpenEditDialog = ( user ) => {
    setDialogMode( 'edit' );
    setSelectedUser( user );
    setFormData( {
      userName: user.userName || '',
      email: user.email || '',
      password: '',
      gender: user.gender || '',
      address: user.address || '',
      role: user.role || '',
      head: user.head || false,
    } );
    setIsDialogOpen( true );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen( false ); // Close the dialog
  };

  const handleFormChange = ( e ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData( ( prev ) => ( {
      ...prev,
      [ e.target.name ]: value,
    } ) );
  };
  const capitalizeFirstLetter = ( str ) => {
    if ( !str ) return '';
    return str.charAt( 0 ).toUpperCase() + str.slice( 1 ).toLowerCase();
  };

  const formatRole = ( role ) => {
    if ( !role ) return '';
    return role
      .split( '_' ) // Split by underscore
      .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() ) // Capitalize each word
      .join( ' ' ); // Join with space
  };


  const handleFormSubmit = ( e ) => {
    e.preventDefault();
    if ( dialogMode === 'add' ) {
      addUser( formData, {
        onSuccess: () => {
          handleCloseDialog();
        },
        onError: ( error ) => {
          console.error( 'Failed to add user:', error );
        },
      } );
    } else {
      if ( !selectedUser ) return;
      const updatedData = { ...formData };
      if ( !formData.password ) {
        delete updatedData.password;
      }
      updateUser(
        { userId: selectedUser._id, formData: updatedData },
        {
          onSuccess: () => {
            handleCloseDialog();
          },
          onError: ( error ) => {
            console.error( 'Failed to update user:', error );
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
    <div className="w-screen mx-auto px-4 py-8 h-full">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-[1.8rem] font-bold text-gray-900 mb-4 sm:mb-0">User Management</h1>
          
            <div className="relative ml-[50vw]">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search users..."
                value={ search }
                onChange={ ( e ) => handleSearchChange( e ) }
              className="w-full pl-10 pr-4 py-2 rounded-lg  focus:border-transparent hover:bg-lightGray bg-gray-100"
              />
              {/* Display filtered users */ }
              <ul>
                { filteredUsers.map( ( user ) => (
                  <li key={ user.id }>{ user.name }</li>
                ) ) }
              </ul>
            </div>

          <button
            onClick={ handleOpenAddDialog }
            className="flex items-center px-4 py-2 text-deepBlack rounded-lg hover:bg-lightGray bg-gray-100"
          >
            <span className="mr-2"><strong>+</strong></span>
            <strong>Add New User</strong>
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          { users.map( ( user ) => (
            <div
              key={ user._id }
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 "
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    { user.userName.charAt( 0 ).toUpperCase() }
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{ user.userName }</h3>
                    <p className="text-sm text-gray-600">{ user.email }</p>
                  </div>
                </div>
                <button
                  onClick={ () => handleOpenEditDialog( user ) }
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ✏️
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  { user.role && formatRole( user.role ) }
                </span>

                { user.head && (
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                    Head
                  </span>
                ) }
                { user.gender && (
                  <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800">
                    { user.gender && capitalizeFirstLetter( user.gender ) }
                  </span>

                ) }
              </div>
              { user.address && (
                <p className="mt-2 text-sm text-gray-600">
                  📍 { user.address }
                </p>
              ) }
            </div>
          ) ) }
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          {/* Previous Button or Placeholder */ }
          { currentPage > 1 ? (
            <button
              onClick={ () => setCurrentPage( ( p ) => Math.max( 1, p - 1 ) ) }
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ← Previous
            </button>
          ) : (
            <div className="w-[84px]"></div> // Placeholder to maintain spacing
          ) }

          {/* Page Information */ }
          <span className="text-sm text-gray-600">
            Page { currentPage } of { totalPages }
          </span>

          {/* Next Button or Placeholder */ }
          { currentPage < totalPages ? (
            <button
              onClick={ () => setCurrentPage( ( p ) => Math.min( totalPages, p + 1 ) ) }
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Next →
            </button>
          ) : (
            <div className="w-[84px]"></div> // Placeholder to maintain spacing
          ) }
        </div>

      </div>

      { isDialogOpen && (
        <UserDialog
          dialogMode={ dialogMode }
          formData={ formData }
          handleFormChange={ handleFormChange }
          handleFormSubmit={ handleFormSubmit }
          handleCloseDialog={ handleCloseDialog } // Ensure this is passed here
          isOpen={ isDialogOpen }
        />
      ) }

    </div>
  );
};

export default UserListing;
