import {
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PhotoIcon,
  CalendarIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEventManagement, useCreateEvent } from "./EventManagement";


export default function EventManagement() {
  const {
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
  } = useEventManagement();

  const {
    title,
    setTitle,
    description,
    setDescription,
    eventLink,
    setEventLink,
    eventDate,
    setEventDate,
    imagePreview,
    submitting: isCreating,
    handleImageChange,
    handleSubmit,
  } = useCreateEvent(handleEventCreated);

  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Events
          </h1>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
            Scheduled events visible to authenticated users.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#04472B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:cursor-pointer sm:w-auto sm:flex-none"
        >
          <PlusIcon className="size-4" />
          New event
        </button>
      </div>

      {/* EVENTS */}
      <div className="mt-6 sm:mt-8">
        {loading ? (
          <StatePanel tone="default">Loading events...</StatePanel>
        ) : error ? (
          <StatePanel tone="error">{error}</StatePanel>
        ) : events.length === 0 ? (
          <StatePanel tone="default">No events scheduled yet.</StatePanel>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {events.map((ev) => (
              <EventCard
                key={ev.id}
                event={ev}
                onDelete={() => setPendingDelete(ev)}
              />
            ))}
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <CreateEventModal
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          eventLink={eventLink}
          setEventLink={setEventLink}
          eventDate={eventDate}
          setEventDate={setEventDate}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          submitting={isCreating}
          onSubmit={handleSubmit}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* DELETE MODAL */}
      {pendingDelete && (
        <ConfirmDeleteModal
          event={pendingDelete}
          submitting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}

// ============================================================
// STATE PANEL (loading / error / empty)
// ============================================================

function StatePanel({ tone = "default", children }) {
  const toneClass = tone === "error" ? "text-red-500" : "text-gray-500";

  return (
    <div
      className={`flex min-h-[250px] items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center text-sm shadow-sm sm:rounded-2xl ${toneClass}`}
    >
      {children}
    </div>
  );
}

// ============================================================
// EVENT CARD
// ============================================================

function EventCard({ event, onDelete }) {
  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl">
      {/* IMAGE */}
      <div className="relative aspect-video w-full flex-none overflow-hidden bg-gray-100">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="size-full object-cover duration-300"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-gray-300">
            <PhotoIcon className="size-9 sm:size-10" />
          </div>
        )}

        {/* DELETE BUTTON — visible on mobile, hover-enhanced on desktop */}
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${event.title}`}
          className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-lg bg-white/95 text-gray-500 shadow-sm backdrop-blur transition-colors hover:bg-red-50 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <h3
          title={event.title}
          className="break-words text-sm font-semibold leading-5 text-gray-900 sm:text-base"
        >
          {event.title}
        </h3>

        {formattedDate && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarIcon className="size-3.5 flex-none" />
            <span>{formattedDate}</span>
          </div>
        )}

        {event.description && (
          <p
            title={event.description}
            className="mt-2 line-clamp-3 break-words text-xs leading-5 text-gray-500 sm:text-sm sm:leading-relaxed"
          >
            {event.description}
          </p>
        )}

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-button-bg transition-colors hover:text-button-hover hover:underline sm:text-sm"
          >
            <LinkIcon className="size-3.5 flex-none" />
            View event
          </a>
        )}
      </div>
    </article>
  );
}

// ============================================================
// FORM FIELD (shared input wrapper for the create modal)
// ============================================================

function FormField({ label, optional, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
        {label}{" "}
        {optional && <span className="font-normal text-gray-400">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-badges/50 focus:outline-none focus:ring-2 focus:ring-badges/10";

// ============================================================
// CREATE EVENT MODAL
// ============================================================

export function CreateEventModal({
  title,
  setTitle,
  description,
  setDescription,
  eventLink,
  setEventLink,
  eventDate,
  setEventDate,
  imagePreview,
  handleImageChange,
  submitting,
  onSubmit,
  onClose,
}) {
  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-3 sm:p-4">
        <DialogPanel className="relative flex max-h-[85vh] w-full max-w-sm flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[80vh] sm:rounded-2xl">
          {/* HEADER */}
          <div className="flex flex-none items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
            <DialogTitle className="text-base font-semibold text-gray-900">
              Add New event
            </DialogTitle>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          {/* FORM */}
          <form
            onSubmit={onSubmit}
            className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4"
          >
            <div className="space-y-3">
              <FormField label="Image">
                <label className="flex h-24 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-badges/50 hover:bg-badge-bg/40">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="size-full object-cover" />
                  ) : (
                    <span className="flex flex-col items-center gap-1 px-4 text-center text-gray-400">
                      <PhotoIcon className="size-6" />
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
              </FormField>

              <FormField label="Title">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder=""
                  className={inputClass}
                />
              </FormField>

              <FormField label="Description">
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder=""
                  className={`resize-none ${inputClass}`}
                />
              </FormField>

              {/* Date + Link share a row to save vertical space */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Event date">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Link">
                  <input
                    type="url"
                    value={eventLink}
                    onChange={(e) => setEventLink(e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </FormField>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex items-center justify-center">
              

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-[#04472B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Creating..." : "Create event"}
              </button>
            </div>
          </form>

          {/* Fade + hint so users notice the form scrolls if content overflows */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[60px] h-6 bg-gradient-to-t from-white to-transparent sm:bottom-[68px]" />
        </DialogPanel>
      </div>
    </Dialog>
  );
}

// ============================================================
// CONFIRM DELETE MODAL
// ============================================================

function ConfirmDeleteModal({ event, submitting, onConfirm, onCancel }) {
  return (
    <Dialog open onClose={onCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex size-10 flex-none items-center justify-center rounded-full bg-red-50">
              <ExclamationTriangleIcon className="size-5 text-red-500" />
            </span>

            <div className="min-w-0">
              <DialogTitle className="text-base font-semibold text-gray-900">
                Delete event
              </DialogTitle>
              <p className="mt-1 break-words text-sm leading-5 text-gray-500">
                This will permanently remove "{event.title}". This can't be undone.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-60 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={submitting}
              className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Deleting..." : "Delete event"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}


