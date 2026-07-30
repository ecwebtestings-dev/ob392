import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUser, updateUser } from "./UserService";
import { api } from "./api";
import toast from "react-hot-toast";

const FIVE_MINUTES = 5 * 60 * 1000;

// CACHING USERS (fetches every page)
export function useUsers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "all"],
    queryFn: async () => {
      let page = 1;
      let allUsers = [];
      let hasMore = true;

      while (hasMore) {
        const res = await getUsers(page); // getUsers must accept & forward a page param
        const pageUsers = Array.isArray(res) ? res : res.data ?? [];
        allUsers = allUsers.concat(pageUsers);

        const lastPage = res.last_page ?? 1; // fallback to 1 if API isn't paginated
        hasMore = page < lastPage;
        page++;
      }

      return allUsers;
    },
    staleTime: FIVE_MINUTES,
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
        mutationFn: ({userid, formData}) => updateUser(userid, {id: userid, ...formData}),
        onSuccess: () => {
            toast.success('User updated');
            queryClient.invalidateQueries({queryKey: ['users']}); 
        },
        onError: (err) => {
            toast.error(err.message || 'Something went wrong. Please try again')
        },
    })
}


//FOR INQUIRIES
async function fetchInquiries() {
  const res = await api.get('/inquiry');
  return Array.isArray(res) ? res : res.data ?? [];
}

export function useUserInquiry() {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: fetchInquiries,
    staleTime: FIVE_MINUTES,
  });
}