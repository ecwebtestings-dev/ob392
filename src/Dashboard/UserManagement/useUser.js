import { useState, useEffect } from "react";
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

// Fetches the user list, tracks it in state, and exposes handlers for
// editing a single user (via the edit modal) and for suspend/promote/demote
// actions (via a confirmation dialog).
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Which action (suspend/promote/demote) is awaiting confirmation, and on whom
  const [pendingAction, setPendingAction] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const data = await getUsers();
        if (!cancelled) setUsers(Array.isArray(data) ? data : data.data ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          toast.error(err.message || "Could not load users");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  // Refreshes the table without a full refetch, after a single user is edited
  function handleUserUpdated(updatedUser) {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    );
  }

  // Runs whichever action is currently pending confirmation (suspend/promote/
  // demote), updates the affected user locally, and shows a success/error toast.
  async function confirmAction() {
    if (!pendingAction) return;
    const { type, user } = pendingAction;
    const action = ACTIONS[type];

    setSubmitting(true);
    try {
      await api.post(action.endpoint(user.id));

      // Reflect the change locally instead of refetching the whole list
      setUsers((prev) =>
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
    users,
    loading,
    error,
    handleUserUpdated,
    pendingAction,
    setPendingAction,
    submitting,
    confirmAction,
    ACTIONS,
  };
}