import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUsers,suspendUser, unsuspendUser, promoteUser, demoteUser } from "../../Authentication/UserService";


const FIVE_MINUTES = 5 * 60 * 1000;


export const ACTIONS = {
  suspend: {
    verb: "suspend",
    request: suspendUser,  
    title: "Suspend user",
    body: (name) => `This will suspend "${name}"'s account. He/She will lose access immediately.`,
    confirmLabel: "Suspend user",
    confirmClass: "bg-red-600 hover:bg-red-700",
  },
  unsuspend: {
    verb: "unsuspend",
    request: unsuspendUser,
    title: "Unsuspend user",
    body: (name) => `This will grant "${name}" access to his account. He/she will gain access immediately.`,
    confirmLabel: "Unsuspend user",
    confirmClass: "bg-green-600 hover:bg-green-700",
  },
  promote: {
    verb: "promote",
    request: promoteUser,
    title: "Grant admin access",
    body: (name) => `"${name}" will gain administrative permissions.`,
    confirmLabel: "Grant admin",
    confirmClass: "bg-button-bg hover:bg-button-hover",
  },
  demote: {
    verb: "demote",
    request: demoteUser,
    title: "Remove admin access",
    body: (name) => `"${name}" will lose administrative permissions.`,
    confirmLabel: "Remove admin",
    confirmClass: "bg-amber-600 hover:bg-amber-700",
  },
};

const SUCCESS_MESSAGES = {
  suspend: "User suspended",
  unsuspend: "User unsuspended",
  promote: "Admin access granted",
  demote: "Admin access removed",
};

// PAGINATED USERS
export function useUsersTable(page = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "page", page],
    queryFn: async () => {
      const res = await getUsers(page);
      return res; // keep the full paginated shape
    },
    staleTime: FIVE_MINUTES,
    keepPreviousData: true,
  });

  return {
    users: data?.data ?? [],
    currentPage: data?.current_page ?? page,
    lastPage: data?.last_page ?? 1,
    total: data?.total ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

// USER ACTIONS
export function useUserActions() {
  const queryClient = useQueryClient();
  const [pendingAction, setPendingAction] = useState(null);

  
  function handleUserUpdated() {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }



  const actionMutation = useMutation({
    mutationFn: ({ type, user }) => {
    const action = ACTIONS[type];
    return action.request(user.id);  
  },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(SUCCESS_MESSAGES[type] ?? "Action completed");
      setPendingAction(null);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  async function confirmAction() {
    if (!pendingAction) return;
    actionMutation.mutate(pendingAction);
  }

  return {
    pendingAction,
    setPendingAction,
    submitting: actionMutation.isPending,
    confirmAction,
    handleUserUpdated,
    ACTIONS,
  };
}