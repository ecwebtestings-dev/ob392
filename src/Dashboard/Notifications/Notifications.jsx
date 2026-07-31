import { Bell, Check, X, Loader2, AlertCircle } from "lucide-react";
import { useNotifications } from "./UseNotifcations";

const TYPE_DOT = {
  info: "bg-blue-500",
  success: "bg-[#0F6B45]",
  warning: "bg-[#FFD230]",
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
            ? "border-[#0F6B45]/30 bg-[#0F6B45]/10"
            : "border-black/5 bg-[#F5F7F6] hover:border-[#0F6B45]/30"
        }`}
      >
        <Bell size={18} className="text-[#0B1F17]/60" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="fixed inset-x-4 top-20 z-50 flex max-h-[500px] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl shadow-black/10 sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-[370px]"
        >
          <NotificationHeader
            unreadCount={unreadCount}
            marking={marking}
            onMarkAllRead={handleMarkAllRead}
          />

          {error && (
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 text-sm text-red-600">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 size={22} className="animate-spin text-[#0F6B45]/50" />
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
    <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
      <div>
        <h2 className="text-sm font-semibold text-[#0B1F17]">Notifications</h2>
        <p className="text-xs text-[#0B1F17]/50">{unreadCount} unread</p>
      </div>

      <button
        onClick={onMarkAllRead}
        disabled={!unreadCount || marking}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-[#0F6B45] transition hover:bg-[#0F6B45]/10 disabled:cursor-not-allowed disabled:opacity-50"
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
      <Bell size={26} className="mx-auto mb-3 text-[#0B1F17]/20" />
      <h3 className="text-sm font-semibold text-[#0B1F17]/70">You're all caught up</h3>
      <p className="mt-1 text-xs text-[#0B1F17]/50">New notifications will appear here.</p>
    </div>
  );
}

export function NotificationItem({ notification, removing, onDelete }) {
  return (
    <div
      className={`flex gap-3 border-b border-black/5 px-4 py-3 transition-all duration-200 ${
        notification.read ? "bg-transparent" : "bg-[#0F6B45]/[0.04]"
      } ${removing ? "translate-x-3 opacity-0" : "translate-x-0 opacity-100"}`}
    >
      <span
        className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${
          notification.read ? "bg-[#0B1F17]/15" : TYPE_DOT[notification.type] || TYPE_DOT.info
        }`}
      />

      <div className="min-w-0 flex-1">
        <h3 className={`text-sm font-semibold ${notification.read ? "text-[#0B1F17]/50" : "text-[#0B1F17]"}`}>
          {notification.title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-[#0B1F17]/60">
          {notification.body}
        </p>
        <span className="mt-2 block text-[11px] text-[#0B1F17]/40">
          {notification.time}
        </span>
      </div>

      <button onClick={onDelete} className="rounded-md p-1.5 text-[#0B1F17]/40 transition hover:bg-red-50 hover:text-red-500">
        <X size={15} />
      </button>
    </div>
  );
}

