import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch all jobs
const fetchJobs = async () => {
    const response = await fetch("http://localhost:8080/jobs/all-jobs");
    if (!response.ok) {
        throw new Error("Error fetching jobs");
    }
    return response.json();
};

// Post a new job
const postJob = async (jobData) => {
    const response = await fetch("http://localhost:8080/jobs/post-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
    });
    if (!response.ok) {
        throw new Error("Error posting job");
    }
    return response.json();
};

// Update an existing job
const updateJob = async (jobData) => {
    const response = await fetch(`http://localhost:8080/jobs/update-job/${jobData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
    });
    if (!response.ok) {
        throw new Error("Error updating job");
    }
    return response.json();
};

// React Query Hooks
export const useJobs = () => 
    useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs,
    });

export const usePostJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postJob,
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs']); // Invalidate the jobs cache
        },
    });
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateJob,
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs']); // Invalidate the jobs cache
        },
    });
};
