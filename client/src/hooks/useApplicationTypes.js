import { useQuery } from '@tanstack/react-query';

const fetchApplicationTypes = async ( { filters, page, limit } ) => {
    const queryParams = new URLSearchParams( { ...filters, page, limit } ).toString();
    const res = await fetch( `http://localhost:8080/application/grouped-by-job?${ queryParams }` );
    if ( !res.ok ) {
        throw new Error( 'Error fetching applications' );
    }
    const json = await res.json();
    console.log( 'Fetched Data:', json ); // Debugging the API response
    return json;
};


export const useApplicationTypes = ( filters, page = 1, limit = 6 ) => {
    return useQuery( {
        queryKey: [ 'applicationTypes', filters, page ],
        queryFn: () => fetchApplicationTypes( { filters, page, limit } ),
        keepPreviousData: true, // Ensures previous data is displayed while new data is loading
    } );
};

