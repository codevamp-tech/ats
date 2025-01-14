// src/hooks/useUsers.js

import axios from 'axios';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

/**
 * 1. FETCH ALL USERS
 */
const fetchUsers = async ({ queryKey }) => {
  // v5 still supplies an object to 'queryFn'. 
  // Inside that object, you can destructure `queryKey` if needed.
  const [_key, { page, limit, search }] = queryKey;

  const res = await axios.get(
    `http://localhost:8080/users/all-users?page=${page}&limit=${limit}&search=${search}`
  );
  return res.data; // e.g. { users, totalCount, totalPages }
};

export const useUsers = ({ page, limit = 5, search = '' }) => {
  return useQuery({
    queryKey: ['users', { page, limit, search }],
    queryFn: fetchUsers,
    keepPreviousData: true,
    // Optionally configure staleTime, cacheTime, refetchOnWindowFocus, etc.
  });
};

/**
 * 2. ADD USER
 */
const addUser = async (formData) => {
  await axios.post('http://localhost:8080/auth/register', formData);
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // Force refetch so your user list stays fresh
      queryClient.invalidateQueries(['users']);
    },
  });
};

/**
 * 3. UPDATE USER
 */
const updateUser = async ({ userId, formData }) => {
  await axios.put(
    `http://localhost:8080/users/update-user/${userId}`,
    formData
  );
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};
