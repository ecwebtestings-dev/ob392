import {
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  useEventManagement,
  useCreateEvent,
} from "./EventManagement";

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
    imagePreview,
    submitting: isCreating,
    handleImageChange,
    handleSubmit,
  } = useCreateEvent(handleEventCreated);

  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
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
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-lg
            bg-button-bg
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-colors
            hover:bg-button-hover
            sm:w-auto
            sm:flex-none
          "
        >
          <PlusIcon className="size-4" />
          New event
        </button>
      </div>

      {/* =====================================================
          EVENTS
      ====================================================== */}
      <div className="mt-6 sm:mt-8">
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500 shadow-sm sm:rounded-2xl">
            Loading events...
          </div>
        ) : error ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-red-500 shadow-sm sm:rounded-2xl">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500 shadow-sm sm:rounded-2xl">
            No events scheduled yet.
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              sm:gap-5
              lg:grid-cols-3
            "
          >
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

      {/* =====================================================
          CREATE MODAL
      ====================================================== */}
      {showCreate && (
        <CreateEventModal
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          submitting={isCreating}
          onSubmit={handleSubmit}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* =====================================================
          DELETE MODAL
      ====================================================== */}
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
// EVENT CARD
// ============================================================

function EventCard({ event, onDelete }) {
  return (
    <article
      className="
        group
        flex
        min-w-0
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-shadow
        hover:shadow-md
        sm:rounded-2xl
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-video w-full flex-none overflow-hidden bg-gray-100">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="
              size-full
              object-cover
              duration-300
            "
          />
        ) : (
          <div className="flex size-full items-center justify-center text-gray-300">
            <PhotoIcon className="size-9 sm:size-10" />
          </div>
        )}

        {/* DELETE BUTTON
            Visible on mobile, hover-enhanced on desktop */}
        <button
          type="button"
          onClick={onDelete}
          className="
            absolute
            right-2
            top-2
            flex
            size-9
            items-center
            justify-center
            rounded-lg
            bg-white/95
            text-gray-500
            shadow-sm
            backdrop-blur
            transition-colors
            hover:bg-red-50
            hover:text-red-500
            sm:opacity-0
            sm:group-hover:opacity-100
          "
          aria-label={`Delete ${event.title}`}
        >
          <TrashIcon className="size-4" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <h3
          title={event.title}
          className="
            break-words
            text-sm
            font-semibold
            leading-5
            text-gray-900
            sm:text-base
          "
        >
          {event.title}
        </h3>

        {event.description && (
          <p
            title={event.description}
            className="
              mt-2
              line-clamp-3
              break-words
              text-xs
              leading-5
              text-gray-500
              sm:text-sm
              sm:leading-relaxed
            "
          >
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
}

// ============================================================
// CREATE EVENT MODAL
// ============================================================

function CreateEventModal({
  title,
  setTitle,
  description,
  setDescription,
  imagePreview,
  handleImageChange,
  submitting,
  onSubmit,
  onClose,
}) {
  return (
    <Dialog open onClose={onClose} className="relative z-50">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* MODAL CONTAINER */}
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-3 sm:p-4">
        <DialogPanel
          className="
            flex
            max-h-[94vh]
            w-full
            max-w-md
            flex-col
            overflow-hidden
            rounded-xl
            bg-white
            shadow-2xl
            sm:max-h-[90vh]
            sm:rounded-2xl
          "
        >
          {/* MODAL HEADER */}
          <div className="flex flex-none items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
            <DialogTitle className="text-base font-semibold text-gray-900 sm:text-lg">
              New event
            </DialogTitle>

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                p-1.5
                text-gray-400
                transition-colors
                hover:bg-gray-100
                hover:text-gray-600
              "
              aria-label="Close"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          {/* SCROLLABLE FORM */}
          <form
            onSubmit={onSubmit}
            className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5"
          >
            <div className="space-y-4">
              {/* IMAGE */}
              <div>
                <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                  Image
                </label>

                <label
                  className="
                    flex
                    aspect-video
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    border
                    border-dashed
                    border-gray-300
                    bg-gray-50
                    transition-colors
                    hover:border-badges/50
                    hover:bg-badge-bg/40
                  "
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="flex flex-col items-center gap-1.5 px-4 text-center text-gray-400">
                      <PhotoIcon className="size-8" />

                      <span className="text-xs font-medium">
                        Click to upload an image
                      </span>
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

              {/* TITLE */}
              <div>
                <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Cooperative training day"
                  className="
                    w-full
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2.5
                    text-sm
                    text-gray-900
                    placeholder:text-gray-400
                    focus:border-badges/50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-badges/10
                  "
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the event..."
                  className="
                    w-full
                    resize-none
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2.5
                    text-sm
                    text-gray-900
                    placeholder:text-gray-400
                    focus:border-badges/50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-badges/10
                  "
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div
              className="
                mt-6
                flex
                flex-col-reverse
                gap-2
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={onClose}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-600
                  transition-colors
                  hover:bg-gray-50
                  sm:w-auto
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="
                  w-full
                  rounded-lg
                  bg-button-bg
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-button-hover
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
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

// ============================================================
// CONFIRM DELETE MODAL
// ============================================================

function ConfirmDeleteModal({
  event,
  submitting,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open onClose={onCancel} className="relative z-50">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* CONTAINER */}
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel
          className="
            w-full
            max-w-sm
            rounded-xl
            bg-white
            p-5
            shadow-2xl
            sm:rounded-2xl
            sm:p-6
          "
        >
          <div className="flex items-start gap-3">
            <span
              className="
                flex
                size-10
                flex-none
                items-center
                justify-center
                rounded-full
                bg-red-50
              "
            >
              <ExclamationTriangleIcon className="size-5 text-red-500" />
            </span>

            <div className="min-w-0">
              <DialogTitle className="text-base font-semibold text-gray-900">
                Delete event
              </DialogTitle>

              <p className="mt-1 break-words text-sm leading-5 text-gray-500">
                This will permanently remove "{event.title}". This can't be
                undone.
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div
            className="
              mt-6
              flex
              flex-col-reverse
              gap-2
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="
                w-full
                rounded-lg
                border
                border-gray-200
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-600
                transition-colors
                hover:bg-gray-50
                disabled:opacity-60
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={submitting}
              className="
                w-full
                rounded-lg
                bg-red-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition-colors
                hover:bg-red-700
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
              "
            >
              {submitting ? "Deleting..." : "Delete event"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}