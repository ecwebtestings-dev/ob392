import { Bell, Check, X, Loader2, AlertCircle } from "lucide-react";
import { useNotifications } from "./UseNotifcations";

const TYPE_DOT = {
  info: "bg-blue-500",
  success: "bg-badges",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

export default function Notification() {
  const {
    open,
    setOpen,
    notifications,
    loading,
    marking,
    error,
    removingIds,
    unreadCount,
    panelRef,
    buttonRef,
    loadNotifications,
    handleMarkAllRead,
    handleDelete,
  } = useNotifications();

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
          open
            ? "border-badges/30 bg-white/10"
            : "border-white/10 bg-white/5 hover:border-badges/30"
        }`}
      >
        <Bell size={18} className="text-gray-400" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-badges px-1 text-[11px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="fixed inset-x-4 top-20 z-50 flex max-h-[500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-[370px]"
        >
          <NotificationHeader
            unreadCount={unreadCount}
            marking={marking}
            onMarkAllRead={handleMarkAllRead}
          />

          {error && (
            <div className="flex items-center gap-2 bg-red-900/20 px-4 py-2 text-sm text-red-400">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 size={22} className="animate-spin text-gray-500" />
              </div>
            ) : notifications.length === 0 ? (
              <EmptyState />
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  removing={removingIds.has(notification.id)}
                  onDelete={() => handleDelete(notification.id)}
                />
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <NotificationFooter
              loading={loading}
              onRefresh={loadNotifications}
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Subcomponents 
// ===========================================================================

export function NotificationHeader({ unreadCount, marking, onMarkAllRead }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <div>
        <h2 className="text-sm font-semibold text-white">Notifications</h2>
        <p className="text-xs text-gray-500">{unreadCount} unread</p>
      </div>

      <button
        onClick={onMarkAllRead}
        disabled={!unreadCount || marking}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-badges transition hover:bg-badges/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {marking ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
        Mark all
      </button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="px-6 py-10 text-center">
      <Bell size={26} className="mx-auto mb-3 text-gray-700" />
      <h3 className="text-sm font-semibold text-gray-300">You're all caught up</h3>
      <p className="mt-1 text-xs text-gray-500">New notifications will appear here.</p>
    </div>
  );
}

export function NotificationItem({ notification, removing, onDelete }) {
  return (
    <div
      className={`flex gap-3 border-b border-white/5 px-4 py-3 transition-all duration-200 ${
        notification.read ? "bg-transparent" : "bg-white/[0.04]"
      } ${removing ? "translate-x-3 opacity-0" : "translate-x-0 opacity-100"}`}
    >
      <span
        className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${
          notification.read ? "bg-gray-700" : TYPE_DOT[notification.type] || TYPE_DOT.info
        }`}
      />

      <div className="min-w-0 flex-1">
        <h3 className={`text-sm font-semibold ${notification.read ? "text-gray-400" : "text-white"}`}>
          {notification.title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {notification.body}
        </p>
        <span className="mt-2 block text-[11px] text-gray-600">
          {notification.time}
        </span>
      </div>

      <button onClick={onDelete} className="rounded-md p-1.5 text-gray-600 transition hover:bg-red-500/10 hover:text-red-400">
        <X size={15} />
      </button>
    </div>
  );
}

export function NotificationFooter({ loading, onRefresh, onClose }) {
  return (
    <div className="border-t border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="flex gap-2">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex-1 rounded-lg border border-white/10 py-2 text-sm font-medium text-gray-300 transition-all hover:border-badges/30 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Refreshing...
            </span>
          ) : (
            "Refresh"
          )}
        </button>

        <button
          onClick={onClose}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:border-badges/30 hover:bg-white/5 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}