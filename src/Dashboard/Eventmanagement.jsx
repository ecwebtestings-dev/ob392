import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  PlusIcon,
  TrashIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;

const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
};

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {ev.title}
                  </h3>
                  <button
                    onClick={() => setPendingDelete(ev)}
                    className="flex-none rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label="Delete event"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>

                {ev.description && (
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {ev.description}
                  </p>
                )}

                <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-xs text-gray-500">
                  {(ev.date || ev.time) && (
                    <p className="flex items-center gap-1.5">
                      <CalendarDaysIcon className="size-3.5 flex-none text-icons" />
                      {[ev.date, ev.time].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {ev.location && (
                    <p className="flex items-center gap-1.5">
                      <MapPinIcon className="size-3.5 flex-none text-icons" />
                      {ev.location}
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
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Please give the event a title.");
      return;
    }

    setSubmitting(true);
    try {
      const token = api.getToken();
      const res = await fetch(`${BASE_URL}/api/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message || "Failed to create event");
      }

      const data = await res.json();
      const created = data.data ?? data;

      toast.success("Event created");
      onCreated({ id: created.id ?? Date.now(), ...formData, ...created });
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
            <Field
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Cooperative training day"
            />

            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-badges/50 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
              <Field
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <Field
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Kampala, Uganda"
            />

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

function Field({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-badges/50 focus:outline-none"
      />
    </div>
  );
}