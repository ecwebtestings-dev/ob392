import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PencilSquareIcon, NoSymbolIcon, ArrowUpCircleIcon, ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useUsers } from "./useUser";
import UserEditModal from "./userEdit";
import { Th, Td } from "./userTable";

// Main page: fetches the user list, renders it as a table, and manages
// which user (if any) is currently open in the edit modal or pending an
// admin action (suspend/promote/demote).
export default function UserManagement() {
  const {
    users,
    loading,
    error,
    handleUserUpdated,
    pendingAction,
    setPendingAction,
    submitting,
    confirmAction,
    ACTIONS,
  } = useUsers();

  // Which user is currently open in the edit modal
  const [activeUserId, setActiveUserId] = useState(null);

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
                  <Th>Status</Th>
                  <Th>Joined</Th>
                  <Th>
                    <span className="sr-only">Actions</span>
                  </Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <UserRow
                    key={u.id}
                    user={u}
                    onEdit={() => setActiveUserId(u.id)}
                    onAction={(type) => setPendingAction({ type, user: u })}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit modal  */}
      {activeUserId && (
        <UserEditModal
          userId={activeUserId}
          onClose={() => setActiveUserId(null)}
          onUpdated={handleUserUpdated}
        />
      )}

      {/* Confirmation dialog for suspend/promote/demote */}
      {pendingAction && (
        <ConfirmActionDialog
          action={ACTIONS[pendingAction.type]}
          user={pendingAction.user}
          submitting={submitting}
          onCancel={() => setPendingAction(null)}
          onConfirm={confirmAction}
        />
      )}
    </div>
  );
}

// Renders a single row in the users table, the "View / Edit" button, and
// whichever admin action buttons are relevant given the user's current
// role/status (promote OR demote, plus suspend unless already suspended).
function UserRow({ user, onEdit, onAction }) {
  const isAdmin = user.role === "admin" || user.role === "super_admin";
  const isSuspended = user.status === "suspended";

  return (
    <tr className="hover:bg-gray-50">
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>
        <span className="inline-flex items-center rounded-full bg-badge-bg px-2.5 py-0.5 text-xs font-medium text-icons">
          {user.role || "user"}
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
      <Td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</Td>
      <Td className="text-right">
        <div className="flex justify-end gap-1.5">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <PencilSquareIcon className="size-3.5" />
            Edit
          </button>

          {isAdmin ? (
            <button
              onClick={() => onAction("demote")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-50"
            >
              <ArrowDownCircleIcon className="size-3.5" />
              Demote
            </button>
          ) : (
            <button
              onClick={() => onAction("promote")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              <ArrowUpCircleIcon className="size-3.5" />
              Promote
            </button>
          )}

          {!isSuspended && (
            <button
              onClick={() => onAction("suspend")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <NoSymbolIcon className="size-3.5" />
              Suspend
            </button>
          )}
        </div>
      </Td>
    </tr>
  );
}

// Confirmation dialog shown before running a suspend/promote/demote action.
// Content 
// ACTIONS 
function ConfirmActionDialog({ action, user, submitting, onCancel, onConfirm }) {
  return (
    <Dialog open onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {action.title}
          </DialogTitle>
          <p className="mt-2 text-sm text-gray-600">{action.body(user.name)}</p>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
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