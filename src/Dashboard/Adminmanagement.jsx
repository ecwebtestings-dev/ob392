import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;

// The three destructive actions this screen can take, and which API route/verb each uses.
// Centralized here so the confirm modal can stay generic and just read from this config.
const ACTIONS = {
  delete: {
    verb: "delete",
    endpoint: (id) => `/api/users/delete/${id}`,
    title: "Delete user",
    body: (name) => `This will soft-delete "${name}". They'll lose access immediately.`,
    confirmLabel: "Delete user",
    confirmClass: "bg-red-600 hover:bg-red-700",
  },
  promote: {
    verb: "promote",
    endpoint: (id) => `/api/users/create_admin/${id}`,
    title: "Grant admin access",
    body: (name) => `"${name}" will gain administrative permissions.`,
    confirmLabel: "Grant admin",
    confirmClass: "bg-button-bg hover:bg-button-hover",
  },
  demote: {
    verb: "demote",
    endpoint: (id) => `/api/users/demote_admin/${id}`,
    title: "Remove admin access",
    body: (name) => `"${name}" will lose administrative permissions.`,
    confirmLabel: "Remove admin",
    confirmClass: "bg-amber-600 hover:bg-amber-700",
  },
};

export default function AdminManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // { type: 'delete' | 'promote' | 'demote', user: {...} } | null
  const [pendingAction, setPendingAction] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const token = api.getToken();
        const res = await fetch(`${BASE_URL}/api/users`, {
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
          if (type === "delete") return { ...u, deleted: true };
          if (type === "promote") return { ...u, role: "admin" };
          if (type === "demote") return { ...u, role: "user" };
          return u;
        })
      );

      toast.success(
        type === "delete"
          ? "User deleted"
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

  const visibleUsers = users.filter((u) => !u.deleted);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Admin & Role Management
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Grant or remove admin access, or remove a user from the system.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading users...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-sm text-red-500">{error}</div>
        ) : visibleUsers.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">
            No users yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>
                    <span className="sr-only">Actions</span>
                  </Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibleUsers.map((u) => {
                  const isAdmin = u.role === "admin" || u.role === "super_admin";
                  const isSuperAdmin = u.role === "super_admin";

                  return (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <Td>{u.name}</Td>
                      <Td>{u.email}</Td>
                      <Td>
                        <span className="inline-flex items-center rounded-full bg-badge-bg px-2.5 py-0.5 text-xs font-medium text-icons">
                          {u.role || "user"}
                        </span>
                      </Td>
                      <Td className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* Super admins are left alone here — no demote/delete on them from this screen */}
                          {!isSuperAdmin && (
                            <>
                              {isAdmin ? (
                                <ActionButton
                                  icon={ShieldExclamationIcon}
                                  label="Demote"
                                  className="text-amber-600 hover:bg-amber-50"
                                  onClick={() =>
                                    setPendingAction({ type: "demote", user: u })
                                  }
                                />
                              ) : (
                                <ActionButton
                                  icon={ShieldCheckIcon}
                                  label="Promote"
                                  className="text-icons hover:bg-badge-bg"
                                  onClick={() =>
                                    setPendingAction({ type: "promote", user: u })
                                  }
                                />
                              )}
                              <ActionButton
                                icon={TrashIcon}
                                label="Delete"
                                className="text-red-500 hover:bg-red-50"
                                onClick={() =>
                                  setPendingAction({ type: "delete", user: u })
                                }
                              />
                            </>
                          )}
                        </div>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pendingAction && (
        <ConfirmModal
          action={ACTIONS[pendingAction.type]}
          user={pendingAction.user}
          submitting={submitting}
          onConfirm={confirmAction}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium transition-colors ${className}`}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}

function ConfirmModal({ action, user, submitting, onConfirm, onCancel }) {
  return (
    <Dialog open onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-start gap-3">
            <span className="flex size-10 flex-none items-center justify-center rounded-full bg-amber-50">
              <ExclamationTriangleIcon className="size-5 text-amber-500" />
            </span>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                {action.title}
              </DialogTitle>
              <p className="mt-1 text-sm text-gray-500">{action.body(user.name)}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={submitting}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${action.confirmClass}`}
            >
              {submitting ? "Working..." : action.confirmLabel}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
      {children}
    </th>
  );
}

function Td({ children, className = "", ...rest }) {
  return (
    <td className={`px-4 py-3 text-gray-700 ${className}`} {...rest}>
      {children}
    </td>
  );
}