import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useManagerApplications = (hiringManagerEmail, page, limit, search) => {
    return useQuery({
        queryKey: ["applications", hiringManagerEmail, page, limit, search],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:8080/application/get-application-hm/${hiringManagerEmail}`,
                { params: { page, limit, search } } // Axios handles query parameters
            );
            return response.data;
        },
        keepPreviousData: true, // Prevents flickering on pagination
    });
};

export default useManagerApplications;
