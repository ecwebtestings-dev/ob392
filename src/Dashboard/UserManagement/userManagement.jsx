import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  PencilSquareIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import { useUsersTable, useUserActions } from "./useUser";
import UserEditModal from "./userEdit";
import { Th, Td } from "./userTable";

const PAGE_SIZE = 10;

const iconBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium sm:px-3";
const pageBtn =
  "flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-heading disabled:cursor-not-allowed disabled:opacity-40";

export function UsersTable() {
  const [page, setPage] = useState(1);
  const [activeUserId, setActiveUserId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");
  const rowRefs = useRef({});

  const { users, currentPage, lastPage, total, loading, error } = useUsersTable(page);

  const {
    pendingAction,
    setPendingAction,
    submitting,
    confirmAction,
    handleUserUpdated,
    ACTIONS,
  } = useUserActions();

  // Scroll to and briefly flash the highlighted row (only works if it's on this page)
  useEffect(() => {
    if (!highlightId || !rowRefs.current[highlightId]) return;

    rowRefs.current[highlightId].scrollIntoView({ behavior: "smooth", block: "center" });

    const timeout = setTimeout(() => {
      searchParams.delete("highlight");
      setSearchParams(searchParams, { replace: true });
    }, 2500);

    return () => clearTimeout(timeout);
  }, [highlightId, users]);

  if (loading) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-2xl bg-white text-sm text-gray-500 shadow sm:h-[500px] lg:h-[600px]">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-2xl bg-white px-4 text-center text-sm text-red-600 shadow sm:h-[500px] lg:h-[600px]">
        {error}
      </div>
    );
  }

  const start = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <div className="w-full min-w-0 overflow-hidden  bg-white shadow">
      {/* TABLE */}
      <div className="w-full overflow-x-auto overflow-y-auto sm:h-[500px] lg:h-[600px]">
        <table className="w-full min-w-[850px] divide-y divide-gray-200 text-xs">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Joined</Th>
              <Th><span className="sr-only">Actions</span></Th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <Td colSpan={6} className="py-12 text-center text-gray-400">
                  No users found.
                </Td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  isHighlighted={String(user.id) === highlightId}
                  rowRef={(el) => (rowRefs.current[user.id] = el)}
                  onEdit={() => setActiveUserId(user.id)}
                  onAction={(type) => setPendingAction({ type, user })}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <p className="text-center text-xs text-gray-500 sm:text-left">
          <span className="font-medium text-heading">{start}</span>–
          <span className="font-medium text-heading">{end}</span> of{" "}
          <span className="font-medium text-heading">{total}</span>
        </p>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className={pageBtn}
          >
            <ChevronLeftIcon className="size-4" />
          </button>

          <span className="whitespace-nowrap px-1 text-xs font-medium text-gray-500">
            Page {currentPage} of {lastPage}
          </span>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
            disabled={currentPage >= lastPage}
            aria-label="Next page"
            className={pageBtn}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      {activeUserId && (
        <UserEditModal
          userId={activeUserId}
          onClose={() => setActiveUserId(null)}
          onUpdated={handleUserUpdated}
        />
      )}

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

/* =========================================================
   USER ROW
========================================================= */

function UserRow({ user, isHighlighted, rowRef, onEdit, onAction }) {
  const isAdmin = user.role === "admin" || user.role === "super_admin";
  const isSuspended = user.status === "suspended";

  return (
    <tr
      ref={rowRef}
      className={`transition-colors ${
        isHighlighted ? "bg-badge-bg/40" : "hover:bg-gray-50"
      }`}
    >
      <Td><span className="whitespace-nowrap font-medium text-heading">{user.name}</span></Td>
      <Td><span className="whitespace-nowrap text-gray-600">{user.email}</span></Td>
      <Td><span className="whitespace-nowrap capitalize">{user.role || "user"}</span></Td>

      <Td>
        {isSuspended ? (
          <span className="inline-flex whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium text-red-700">
            Suspended
          </span>
        ) : (
          <span className="inline-flex whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium text-green-700">
            Active
          </span>
        )}
      </Td>

      <Td>
        <span className="whitespace-nowrap">
          {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
        </span>
      </Td>

      <Td className="text-right">
        <div className="flex min-w-max justify-end gap-1.5">
          <button type="button" onClick={onEdit} className={`${iconBtn} text-gray-600 hover:bg-gray-50`}>
            <PencilSquareIcon className="size-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>

          {isAdmin ? (
            <button type="button" onClick={() => onAction("demote")} className={`${iconBtn} text-amber-600 hover:bg-amber-50`}>
              <ArrowDownCircleIcon className="size-3.5" />
              <span className="hidden sm:inline">Demote</span>
            </button>
          ) : (
            <button type="button" onClick={() => onAction("promote")} className={`${iconBtn} text-gray-600 hover:bg-gray-50`}>
              <ArrowUpCircleIcon className="size-3.5" />
              <span className="hidden sm:inline">Promote</span>
            </button>
          )}

          {isSuspended ? (
            <button type="button" onClick={() => onAction("unsuspend")} className={`${iconBtn} text-[#063822] hover:bg-green-50 border border-[#063822]`}>
              <CheckCircleIcon className="size-3.5" />
              <span className="hidden sm:inline">Unsuspend</span>
            </button>
          ) : (
            <button type="button" onClick={() => onAction("suspend")} className={`${iconBtn} text-red-600 hover:bg-red-50`}>
              <NoSymbolIcon className="size-3.5" />
              <span className="hidden sm:inline">Suspend</span>
            </button>
          )}
        </div>
      </Td>
    </tr>
  );
}

/* =========================================================
   CONFIRM DIALOG
========================================================= */

function ConfirmActionDialog({ action, user, submitting, onCancel, onConfirm }) {
  return (
    <Dialog open onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <DialogTitle className="text-lg font-semibold text-gray-900">{action.title}</DialogTitle>
          <p className="mt-2 text-sm text-gray-600">{action.body(user.name)}</p>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={submitting}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 ${action.confirmClass}`}
            >
              {submitting ? "Working..." : action.confirmLabel}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}