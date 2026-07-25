import { api } from "./api";

// Fetches all scheduled events (requires the user to be logged in).
export function getEvents() {
  return api.get("/events");
}

// Creates a new event. Restricted to admin/super-admin accounts on the server.
export function createEvent(data) {
  return api.post("/event/create", data); // admin/super-admin only
}

// Permanently deletes the event with the given ID. Admin/super-admin only.
export function deleteEvent(eventId) {
  return api.post(`/event/destroy/${eventId}`); // admin/super-admin only
}