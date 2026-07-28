import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;
const FIVE_MINUTES = 5 * 60 * 1000;

async function fetchEvents() {
  const token = api.getToken();
  const res = await fetch(`${BASE_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to load events");

  const data = await res.json();
  return Array.isArray(data) ? data : data.data ?? [];
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
        ...created,
      });
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
    imagePreview,
    submitting,
    handleImageChange,
    handleSubmit,
  };
}