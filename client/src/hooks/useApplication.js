import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 1. FETCH ALL APPLICATIONS
 */
const fetchApplicationTypes = async ( { filters, page, limit } ) => {
  const queryParams = new URLSearchParams( { ...filters, page, limit } ).toString();
  const res = await fetch(
    `http://localhost:8080/application-types/all-application-types?${ queryParams }`
  );
  if ( !res.ok ) {
    throw new Error( "Error fetching applications" );
  }
  return res.json();
};

export const useApplicationTypes = ( filters, page = 1, limit = 6 ) => {
  return useQuery({
    queryKey: [ "applicationTypes", filters, page ],
    queryFn: () => fetchApplicationTypes( { filters, page, limit }),
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
