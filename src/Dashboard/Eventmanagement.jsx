import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null); // event object | null

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      try {
        const token = api.getToken();
        const res = await fetch(`${BASE_URL}/api/events`, {
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

  function handleCreated(newEvent) {
    setEvents((prev) => [newEvent, ...prev]);
    setShowCreate(false);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    try {
      const token = api.getToken();
      const res = await fetch(
        `${BASE_URL}/api/event/destroy/${pendingDelete.id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || "Failed to delete event");
      }

      setEvents((prev) => prev.filter((e) => e.id !== pendingDelete.id));
      toast.success("Event removed");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Events
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Scheduled events visible to authenticated users.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex flex-none items-center gap-1.5 rounded-lg bg-button-bg px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-button-hover"
        >
          <PlusIcon className="size-4" />
          New event
        </button>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            Loading events...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-red-500 shadow-sm">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            No events scheduled yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="relative aspect-video w-full flex-none bg-gray-100">
                  {ev.image ? (
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-gray-300">
                      <PhotoIcon className="size-10" />
                    </div>
                  )}

                  <button
                    onClick={() => setPendingDelete(ev)}
                    className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-gray-500 opacity-0 shadow-sm backdrop-blur transition-opacity hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                    aria-label="Delete event"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {ev.title}
                  </h3>
                  {ev.description && (
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {ev.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateEventModal
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}

      {pendingDelete && (
        <ConfirmDeleteModal
          event={pendingDelete}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}

function CreateEventModal({ onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  // Release the object URL when the modal unmounts or the file changes, to avoid leaking memory
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) {
      toast.error("Please give the event a title.");
      return;
    }

    setSubmitting(true);
    try {
      const token = api.getToken();

      // multipart/form-data — don't set Content-Type manually, the browser
      // sets the correct boundary header automatically for FormData bodies
      const body = new FormData();
      body.append("title", title);
      body.append("description", description);
      if (imageFile) body.append("image", imageFile);

      const res = await fetch(`${BASE_URL}/api/event/create`, {
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

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              New event
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                Image
              </label>
              <label className="flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-badges/50 hover:bg-badge-bg/40">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="flex flex-col items-center gap-1.5 text-gray-400">
                    <PhotoIcon className="size-8" />
                    <span className="text-xs font-medium">Click to upload an image</span>
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Cooperative training day"
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-badges/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-badges/50 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-button-bg px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating..." : "Create event"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function ConfirmDeleteModal({ event, onConfirm, onCancel }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirm() {
    setSubmitting(true);
    await onConfirm();
    setSubmitting(false);
  }

  return (
    <Dialog open onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-start gap-3">
            <span className="flex size-10 flex-none items-center justify-center rounded-full bg-red-50">
              <ExclamationTriangleIcon className="size-5 text-red-500" />
            </span>
            <div>
              <DialogTitle className="text-base font-semibold text-gray-900">
                Delete event
              </DialogTitle>
              <p className="mt-1 text-sm text-gray-500">
                This will permanently remove "{event.title}". This can't be undone.
              </p>
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
              onClick={handleConfirm}
              disabled={submitting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Deleting..." : "Delete event"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}