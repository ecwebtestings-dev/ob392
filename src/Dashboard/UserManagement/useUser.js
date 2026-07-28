import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUsers } from "../../Authentication/UserService";
import { api } from "../../Authentication/api";

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

export function useUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getUsers();
      return Array.isArray(data) ? data : data.data ?? [];
    },
    staleTime: 5 * 60 * 1000, // won't refetch on remount/focus within 5 min
  });

  const [pendingAction, setPendingAction] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Refreshes the cache directly instead of a full refetch
  function handleUserUpdated(updatedUser) {
    queryClient.setQueryData(["users"], (prev = []) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    );
  }

  async function confirmAction() {
    if (!pendingAction) return;
    const { type, user } = pendingAction;
    const action = ACTIONS[type];

    setSubmitting(true);
    try {
      await api.post(action.endpoint(user.id));

      queryClient.setQueryData(["users"], (prev = []) =>
        prev.map((u) => {
          if (u.id !== user.id) return u;
          if (type === "suspend") return { ...u, status: "suspended" };
          if (type === "promote") return { ...u, role: "admin" };
          if (type === "demote") return { ...u, role: "user" };
          return u;
        })
      );

      toast.success(
        type === "suspend"
          ? "User suspended"
          : type === "promote"
          ? "Admin access granted"
          : "Admin access removed"
      );
      setPendingAction(null);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    users: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    handleUserUpdated,
    pendingAction,
    setPendingAction,
    submitting,
    confirmAction,
    ACTIONS,
  };
}