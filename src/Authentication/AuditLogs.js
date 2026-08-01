import { api } from "./api";

export async function getAuditLogs() {
  return api.get("/logs");
}

export async function deleteAuditLog(id) {
  return api.delete(`/logs/${id}`);
}