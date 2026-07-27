import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;

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

export function useAdminManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const token = api.getToken();
        const res = await fetch(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load users");

        const data = await res.json();
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

  async function confirmAction() {
    if (!pendingAction) return;
    const { type, user } = pendingAction;
    const action = ACTIONS[type];

    setSubmitting(true);
    try {
      const token = api.getToken();
      const res = await fetch(`${BASE_URL}${action.endpoint(user.id)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || `Failed to ${action.verb} user`);
      }

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
    pendingAction,
    setPendingAction,
    submitting,
    confirmAction,
    ACTIONS,
  };
}