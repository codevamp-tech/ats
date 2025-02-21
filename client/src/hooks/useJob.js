import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
// import axios from 'axios';

// Fetch all jobs with filters
const fetchJobs = async ( { filters, page, limit } ) => {
    const queryParams = new URLSearchParams( { ...filters, page, limit } ).toString();
    const response = await fetch( `http://localhost:8080/jobs/all-jobs?${ queryParams }`
    );
    if ( !response.ok ) {
        throw new Error( "Error fetching jobs" );
    }
    return response.json();
};

// Post a new job
const postJob = async ( jobData ) => {
    const response = await fetch( "http://localhost:8080/jobs/post-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( jobData ),
    } );
    if ( !response.ok ) {
        throw new Error( "Error posting job" );
    }
    return response.json();
};

// Update an existing job
const updateJob = async ( jobData ) => {
    const response = await fetch( `http://localhost:8080/jobs/update-job/${ jobData._id }`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( jobData ),
    } );
    if ( !response.ok ) {
        throw new Error( "Error updating job" );
    }
    return response.json();
};

export const useJobs = ( filters, page = 1, limit = 6 ) => {
    return useQuery( {
        queryKey: [ 'jobs', filters, page ],
        queryFn: () => fetchJobs( { filters, page, limit } ),
        keepPreviousData: true,
    } );
};


export const usePostJob = () => {
    const queryClient = useQueryClient();
    return useMutation( {
        mutationFn: postJob,
        onSuccess: () => {
            queryClient.invalidateQueries( [ 'jobs' ] ); // Invalidate the jobs cache
        },
    } );
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();
    return useMutation( {
        mutationFn: updateJob,
        onSuccess: () => {
            queryClient.invalidateQueries( [ 'jobs' ] ); // Invalidate the jobs cache
        },
    } );
};
