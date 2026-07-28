import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAdminManagement, ACTIONS } from "./UseAdminManagement"; 

export default function AdminManagement() {
  const {
    users,
    loading,
    error,
    pendingAction,
    setPendingAction,
    submitting,
    confirmAction,
  } = useAdminManagement();

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
                  <Th>Status</Th>
                  <Th>
                    <span className="sr-only">Actions</span>
                  </Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => {
                  const isAdmin = u.role === "admin" || u.role === "super_admin";
                  const isSuperAdmin = u.role === "super_admin";
                  const isSuspended = u.status === "suspended";

                  return (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <Td>{u.name}</Td>
                      <Td>{u.email}</Td>
                      <Td>
                        <span className="inline-flex items-center rounded-full bg-badge-bg px-2.5 py-0.5 text-xs font-medium text-icons">
                          {u.role || "user"}
                        </span>
                      </Td>
                      <Td>
                        {isSuspended ? (
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
                            Suspended
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Active</span>
                        )}
                      </Td>
                      <Td className="text-right">
                        <div className="flex justify-end gap-2">
                          {!isSuperAdmin && !isSuspended && (
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
                                icon={NoSymbolIcon}
                                label="Suspend"
                                className="text-red-500 hover:bg-red-50"
                                onClick={() =>
                                  setPendingAction({ type: "suspend", user: u })
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

// ===========================================================================
// Subcomponents (Presentational Only)
// ===========================================================================

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