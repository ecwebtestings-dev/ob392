import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;
const FIVE_MINUTES = 5 * 60 * 1000;

// ---------------------------------------------------------------------
// TEMPORARY LOCAL FALLBACK for link/date
// The backend doesn't persist these fields yet. Until it does, we cache
// them in localStorage keyed by event id so they survive a page refresh
// on this browser. Remove this once /event/create and GET /events
// actually store & return `link` and `event_date`.
// ---------------------------------------------------------------------
const EXTRAS_KEY = "ob39_event_extras";

function getStoredExtras() {
  try {
    return JSON.parse(localStorage.getItem(EXTRAS_KEY)) || {};
  } catch {
    return {};
  }
}

function setStoredExtra(eventId, extra) {
  if (!eventId) return;
  const all = getStoredExtras();
  all[eventId] = { ...all[eventId], ...extra };
  localStorage.setItem(EXTRAS_KEY, JSON.stringify(all));
}

function mergeExtras(ev) {
  const stored = getStoredExtras()[ev.id];
  if (!stored) return ev;
  return {
    ...ev,
    link: ev.link ?? stored.link ?? null,
    event_date: ev.event_date ?? stored.event_date ?? null,
  };
}

async function fetchEvents() {
  const token = api.getToken();
  const res = await fetch(`${BASE_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to load events");

  const data = await res.json();
  const list = Array.isArray(data) ? data : data.data ?? [];

  return list.map(mergeExtras);
}

// ---------------------------------------------------------------------
// Main List Logic
// ---------------------------------------------------------------------
export function useEventManagement() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: FIVE_MINUTES,
  });

  const [showCreate, setShowCreate] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  function handleEventCreated(newEvent) {
    // Persist link/date locally as a fallback until the backend supports them
    setStoredExtra(newEvent.id, {
      link: newEvent.link || null,
      event_date: newEvent.event_date || null,
    });

    queryClient.setQueryData(["events"], (prev = []) => [newEvent, ...prev]);
    setShowCreate(false);
  }

  const deleteMutation = useMutation({
    mutationFn: async (eventId) => {
      const token = api.getToken();
      const res = await fetch(`${BASE_URL}/event/destroy/${eventId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || "Failed to delete event");
      }
    },
    onSuccess: (_, eventId) => {
      queryClient.setQueryData(["events"], (prev = []) =>
        prev.filter((e) => e.id !== eventId)
      );
      toast.success("Event removed");
      setPendingDelete(null);
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  async function handleDelete() {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id);
  }

  return {
    events: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    showCreate,
    setShowCreate,
    pendingDelete,
    setPendingDelete,
    isDeleting: deleteMutation.isPending,
    handleEventCreated,
    handleDelete,
  };
}

// ---------------------------------------------------------------------
// Create Form Logic
// ---------------------------------------------------------------------
export function useCreateEvent(onCreated) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) {
      toast.error("Please give the event a title.");
      return;
    }

    setSubmitting(true);
    try {
      const token = api.getToken();
      const body = new FormData();
      body.append("title", title);
      body.append("description", description);
      if (imageFile) body.append("image", imageFile);
      // Sent optimistically — backend may or may not persist these yet.
      if (eventLink) body.append("link", eventLink);
      if (eventDate) body.append("event_date", eventDate);

      const res = await fetch(`${BASE_URL}/event/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || "Failed to create event");
      }

      const data = await res.json();
      const created = data.data ?? data;

      toast.success("Event created");
      onCreated({
        id: created.id ?? Date.now(),
        title,
        description,
        image: created.image ?? imagePreview,
        link: created.link ?? eventLink ?? null,
        event_date: created.event_date ?? eventDate ?? null,
        ...created,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setEventLink("");
      setEventDate("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    eventLink,
    setEventLink,
    eventDate,
    setEventDate,
    imagePreview,
    submitting,
    handleImageChange,
    handleSubmit,
  };
}