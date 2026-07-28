import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUser, updateUser } from "./UserService";
import { api } from "./api";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const FIVE_MINUTES = 5 * 60 * 1000;

//CACHING USERS
export function useUsers(){
    const {data, isLoading, error} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const data = await getUsers();
            return Array.isArray(data) ? data : data.data ?? [];
        },
        staleTime: FIVE_MINUTES, // stays fresh, won't auto-refetch
    });

    return {
        users: data ?? [],
        loading: isLoading,
        error: error?.message ?? null,
    };
}


//A SINGLE USER WITH ID
export function useUser(userid){
    return useQuery({
        queryKey: ['users', userid],
        queryFn: async()=>{
            const data = await getUser(userid); 
            return data.data ?? data;
        },
        enabled: !!userid,
        staleTime: FIVE_MINUTES,
    })
}

//UPDATING USER
export function useUpdateUsr(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({userid, FormData}) => updateUser(userid, {id: userid, ...FormData}),
        onSuccess: () => {
            toast.success('User updated');
            queryClient.invalidateQueries({queryKey: ['users']});
        },
        onError: (err) => {
            toast.error(err.message || 'Something went wrong. Please try again')
        },
    })
}


//FOR SUSPEND / PROMOTE / DEMOTE USER
export function useUserAction(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({endpoint}) => api.post(endpoint),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        },
        onError: (err) => {
            toast.error(err.message || 'Something went wrong. Please try again')
        }
    })
}


//FOR INQUIRIES
async function fetchInquiries() {
  const token = api.getToken();
  const res = await fetch(`${BASE_URL}/inquiry`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to load inquiries");

  const data = await res.json();
  return Array.isArray(data) ? data : data.data ?? [];
}

export function useUserInquiry() {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: fetchInquiries,
    staleTime: FIVE_MINUTES,
  });
}