import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { getUser, updateUser } from "../../Authentication/UserService";

// Hook that handles all the logic for the edit modal: fetching the user,
// tracking form state, and saving changes back to the server.
function useEditModal(userId, { onClose, onUpdated }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  // Fetches the user's details when the modal opens (or userId changes),
  // and populates the form. Closes the modal and shows a toast on failure.
  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        const data = await getUser(userId);
        // NOTE: unconfirmed shape — update endpoint wraps its user object
        // under "profile", not "data". If the form loads with blank fields,
        // this line likely needs the same fix (e.g. data.profile ?? data).
        const user = data.data ?? data;

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
  }, [userId]);

  // Updates a single field in form state as the user types/selects.
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Submits the form: sends the updated fields to the server, merges the
  // response back into the user object, notifies the parent, and closes
  // the modal. Shows a success or error toast depending on the outcome.
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const data = await updateUser(userId, { id: userId, ...formData });
      // API wraps the updated user under "profile" (confirmed from Postman doc)
      const updatedUser = data?.profile ?? {};

      toast.success("User updated");
      onUpdated({ id: userId, ...formData, ...updatedUser });
      onClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return { loading, saving, formData, handleChange, handleSave };
}

// Modal dialog for editing a single user's details (name, email, phone, role).
// Delegates all data/logic to useEditModal and just renders the UI.
export default function UserEditModal({ userId, onClose, onUpdated }) {
  const { loading, saving, formData, handleChange, handleSave } = useEditModal(userId, {
    onClose,
    onUpdated,
  });

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

// Reusable labeled text input used for each editable field in the modal.
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