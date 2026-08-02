import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import { useAuditLogsTable, useAuditLogActions } from "./useAuditLogs";
import {Th,Td} from "../UserManagement/userTable";

const PAGE_SIZE = 10;


const ACTION_TONES = {
  created: "green",
  promoted: "green",
  unsuspended: "green",
  updated: "amber",
  demoted: "amber",
  suspended: "red",
  deleted: "red",
};



function formatAction(action) {
  if (!action) return { label: "Unknown", tone: "gray" };

  const prefix = action.split("_")[0];
  const tone = ACTION_TONES[prefix] || "gray";
  const label = action
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return { label, tone };
}

function formatTimestamp(iso) {
  if (!iso) return "—";
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AuditLogsTable() {
  const [page, setPage] = useState(1);

  const { logs, currentPage, lastPage, total, loading, error } = useAuditLogsTable(page);
  const { pendingDelete, setPendingDelete, submitting, confirmDelete } = useAuditLogActions();

  if (loading) {
    return (
      <div className="flex h-[450px] items-center justify-center  bg-white text-sm text-gray-500 shadow sm:h-[500px] lg:h-[600px]">
        Loading audit logs...
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
    // OUTER CONTAINER 
    <div className="flex h-[450px] w-full min-w-0 flex-col overflow-hidden bg-white shadow sm:h-[500px] lg:h-[600px]">
      {/* HEADER */}
      <div className="flex flex-none items-center gap-2.5 border-b border-gray-100 px-4 py-4 sm:px-5">
        <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-[#0F6B45]/10">
          <ClockIcon className="size-4 text-[#0F6B45]" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-heading">Audit Logs</h2>
          <p className="text-xs text-gray-500">System activity and administrative actions</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full min-w-[700px] divide-y divide-gray-200 text-xs">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <Th>Action</Th>
              <Th>Description</Th>
              <Th>Timestamp</Th>
              <Th><span className="sr-only">Actions</span></Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.length === 0 ? (
              <tr>
                <Td colSpan={5} className="py-12 text-center text-gray-400">
                  No audit logs found.
                </Td>
              </tr>
            ) : (
              logs.map((log) => (
                <LogRow key={log.id} log={log} onDelete={() => setPendingDelete(log)} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION  */}
      <div className="flex flex-none flex-col gap-3 border-t border-gray-100 bg-gray-50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
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
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-heading disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeftIcon className="size-4" />
          </button>

          <span className="whitespace-nowrap px-1 text-xs font-medium text-gray-500">
             {currentPage} of {lastPage}
          </span>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
            disabled={currentPage >= lastPage}
            aria-label="Next page"
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-heading disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      {pendingDelete && (
        <ConfirmDeleteDialog
          log={pendingDelete}
          submitting={submitting}
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

/* =========================================================
   LOG ROW
========================================================= */

function LogRow({ log, onDelete }) {
  const { label } = formatAction(log.action);

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <Td>
        <span
          className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium`}
        >
          {label}
        </span>
      </Td>
      <Td>
        <span className="text-gray-700">{log.body || "—"}</span>
      </Td>
      
      <Td>
        <span className="whitespace-nowrap text-gray-500">{formatTimestamp(log.created_at)}</span>
      </Td>
      <Td className="text-right">
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1.5  border border-red-200 bg-red-50/60 px-2.5 py-1.5 text-xs font-medium text-red-600  transition-all duration-150  hover:border-red-300 hover:bg-red-100 hover:shadow-md active:translate-y-0 sm:px-3"
        >
          <TrashIcon className="size-3.5" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </Td>
    </tr>
  );
}

/* =========================================================
   CONFIRM DELETE DIALOG
========================================================= */

function ConfirmDeleteDialog({ log, submitting, onCancel, onConfirm }) {
  return (
    <Dialog open onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <DialogTitle className="text-lg font-semibold text-gray-900">Delete log entry</DialogTitle>
          <p className="mt-2 text-sm text-gray-600">
            This will permanently delete log {log.id} ({formatAction(log.action).label}). This
            action cannot be undone.
          </p>

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
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {submitting ? "Deleting..." : "Delete log"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}