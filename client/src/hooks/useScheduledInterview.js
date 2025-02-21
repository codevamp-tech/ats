import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchAssignedInterviews = async () => {
    const response = await fetch("http://localhost:8080/applicationscheduledlist/scheduled-interviewer-app");
    if (!response.ok) throw new Error("API not available");
    return response.json();
};

const useScheduledInterview = () => {
    const queryClient = useQueryClient();

    // Fetch assigned interviews using React Query
    const { data: assignedInterviews = [], error, isLoading } = useQuery({
        queryKey: ["assignedInterviews"],
        queryFn: fetchAssignedInterviews
    });

    // Mutation for refetching after updates
    const refetchAssignedInterviews = () => {
        queryClient.invalidateQueries(["assignedInterviews"]);
    };

    return { assignedInterviews, error, isLoading, refetchAssignedInterviews };
};

export default useScheduledInterview;
