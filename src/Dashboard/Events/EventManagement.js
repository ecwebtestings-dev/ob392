import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../../Authentication/api"; // Adjust path as needed

const BASE_URL = import.meta.env.VITE_API_URL;

// ---------------------------------------------------------------------
// Main List Logic
// ---------------------------------------------------------------------
export function useEventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      try {
        const token = api.getToken();
        const res = await fetch(`${BASE_URL}/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load events");

        const data = await res.json();
        if (!cancelled) setEvents(Array.isArray(data) ? data : data.data ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          toast.error(err.message || "Could not load events");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEvents();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleEventCreated(newEvent) {
    setEvents((prev) => [newEvent, ...prev]);
    setShowCreate(false);
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    
    setIsDeleting(true);
    try {
      const token = api.getToken();
      const res = await fetch(`${BASE_URL}/event/destroy/${pendingDelete.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || "Failed to delete event");
      }

      setEvents((prev) => prev.filter((e) => e.id !== pendingDelete.id));
      toast.success("Event removed");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    events,
    loading,
    error,
    showCreate,
    setShowCreate,
    pendingDelete,
    setPendingDelete,
    isDeleting,
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