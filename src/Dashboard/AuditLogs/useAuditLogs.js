import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAuditLogs, deleteAuditLog } from "../../Authentication/AuditLogs";

const FIVE_MINUTES = 5 * 60 * 1000;
const PAGE_SIZE = 10;

export function useAuditLogsTable(page = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["audit-logs"],
    queryFn: getAuditLogs,
    staleTime: FIVE_MINUTES,
  });

  const allLogs = data ?? [];
  const total = allLogs.length;
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, lastPage);
  const start = (currentPage - 1) * PAGE_SIZE;
  const logs = allLogs.slice(start, start + PAGE_SIZE);

  return {
    logs,
    currentPage,
    lastPage,
    total,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

// DELETE LOG
export function useAuditLogActions() {
  const queryClient = useQueryClient();
  const [pendingDelete, setPendingDelete] = useState(null);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAuditLog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
      toast.success("Log deleted");
      setPendingDelete(null);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });


  function confirmDelete() {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id);
  }

  return {
    pendingDelete,
    setPendingDelete,
    submitting: deleteMutation.isPending,
    confirmDelete,
  };
}