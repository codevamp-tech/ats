import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 1. FETCH ALL APPLICATIONS
 */
const fetchApplicationTypes = async ({ queryKey }) => {
  const [_key, { page, limit, search }] = queryKey;

  const res = await axios.get(
    `http://localhost:8080/application-types/all-application-types?page=${page}&limit=${limit}&search=${search}`
  );
  return res.data; // e.g. { applications, totalCount, totalPages }
};

export const useApplicationTypes = ({ page, limit = 5, search = "" }) => {
  return useQuery({
    queryKey: ["applicationTypes", { page, limit, search }],
    queryFn: fetchApplicationTypes,
    keepPreviousData: true,
  });
};

/**
 * 2. ADD APPLICATION
 */
const addApplication = async (formData) => {
  await axios.post(
    "http://localhost:8080/application-types/add-application-type",
    formData
  );
};

export const useAddApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addApplication,
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
  });
};

/**
 * 3. UPDATE APPLICATION
 */
const updateApplicationType = async ({ applicationTypeId, formData }) => {
  await axios.put(
    `http://localhost:8080/application-types/update-application-type/${applicationTypeId}`,
    formData
  );
};

export const useUpdateApplicationType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplicationType,
    onSuccess: () => {
      queryClient.invalidateQueries(["applicationTypes"]);
    },
  });
};
