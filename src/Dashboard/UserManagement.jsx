import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Which user is currently open in the edit modal (null = modal closed)
  const [activeUserId, setActiveUserId] = useState(null);

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
        // Adjust if your API wraps the array differently, e.g. data.data or data.users
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

  // Called by the modal after a successful update — patches the row in the local list
  // so the table reflects the change without a full refetch.
  function handleUserUpdated(updatedUser) {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Users</h1>
      <p className="mt-1 text-sm text-gray-500">
        Registered accounts on the platform.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading users...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-sm text-red-500">{error}</div>
        ) : users.length === 0 ? (
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
                  <Th>Joined</Th>
                  <Th>
                    <span className="sr-only">Actions</span>
                  </Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <Td>{u.name}</Td>
                    <Td>{u.email}</Td>
                    <Td>
                      <span className="inline-flex items-center rounded-full bg-badge-bg px-2.5 py-0.5 text-xs font-medium text-icons">
                        {u.role || "user"}
                      </span>
                    </Td>
                    <Td>
                      {u.created_at
                        ? new Date(u.created_at).toLocaleDateString()
                        : "—"}
                    </Td>
                    <Td className="text-right">
                      <button
                        onClick={() => setActiveUserId(u.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                      >
                        <PencilSquareIcon className="size-3.5" />
                        View / Edit
                      </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit modal — only mounted while a user id is selected */}
      {activeUserId && (
        <UserEditModal
          userId={activeUserId}
          onClose={() => setActiveUserId(null)}
          onUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
}

function UserEditModal({ userId, onClose, onUpdated }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null); // null until the fetch resolves

  // Fetch the full user detail as soon as the modal opens
  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        const token = api.getToken();
        const res = await fetch(`${BASE_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load user details");

        const data = await res.json();
        const user = data.data ?? data; // handle either a wrapped or bare object

        if (!cancelled) {
          setFormData({
            name: user.name ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
            role: user.role ?? "user",
          });
        }
      } catch (err) {
        if (!cancelled) {
          toast.error(err.message || "Could not load user");
          onClose();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUser();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const token = api.getToken();
      const res = await fetch(`${BASE_URL}/users/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || "Failed to update user");
      }

      const data = await res.json();
      const updatedUser = data.data ?? data ?? {};

      toast.success("User updated");
      onUpdated({ id: userId, ...formData, ...updatedUser });
      onClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Edit user
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          {loading || !formData ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Loading user...
            </div>
          ) : (
            <form className="mt-5 space-y-4" onSubmit={handleSave}>
              <ModalField
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <ModalField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <ModalField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />

              <div>
                <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-badges/50 focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-button-bg px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function ModalField({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-badges/50 focus:outline-none"
      />
    </div>
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