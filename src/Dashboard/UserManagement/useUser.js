import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUsers } from "../../Authentication/UserService";
import { api } from "../../Authentication/api";

const FIVE_MINUTES = 5 * 60 * 1000;

export const ACTIONS = {
  suspend: {
    verb: "suspend",
    endpoint: (id) => `/users/delete/${id}`,
    title: "Suspend user",
    body: (name) => `This will suspend "${name}"'s account. They'll lose access immediately.`,
    confirmLabel: "Suspend user",
    confirmClass: "bg-red-600 hover:bg-red-700",
  },
  promote: {
    verb: "promote",
    endpoint: (id) => `/users/create_admin/${id}`,
    title: "Grant admin access",
    body: (name) => `"${name}" will gain administrative permissions.`,
    confirmLabel: "Grant admin",
    confirmClass: "bg-button-bg hover:bg-button-hover",
  },
  demote: {
    verb: "demote",
    endpoint: (id) => `/users/demote_admin/${id}`,
    title: "Remove admin access",
    body: (name) => `"${name}" will lose administrative permissions.`,
    confirmLabel: "Remove admin",
    confirmClass: "bg-amber-600 hover:bg-amber-700",
  },
};

// PAGINATED USERS — powers the table + its pagination controls
export function useUsersTable(page = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "page", page],
    queryFn: async () => {
      const res = await getUsers(page); // must forward page to the API as ?page=
      return res; // keep the full paginated shape
    },
    staleTime: FIVE_MINUTES,
    keepPreviousData: true, // no flash-to-empty when flipping pages
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

// USER ACTIONS — edit callback + suspend/promote/demote, independent of page
export function useUserActions() {
  const queryClient = useQueryClient();
  const [pendingAction, setPendingAction] = useState(null);

  // Since data is paginated across multiple cache entries (one per page),
  // we can't patch a single flat array — invalidate all user pages instead
  // so whichever page is visible refetches with the updated user.
  function handleUserUpdated() {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }

  const actionMutation = useMutation({
    mutationFn: ({ type, user }) => {
      const action = ACTIONS[type];
      return api.post(action.endpoint(user.id));
    },
    onSuccess: (_, { type }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(
        type === "suspend"
          ? "User suspended"
          : type === "promote"
          ? "Admin access granted"
          : "Admin access removed"
      );
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