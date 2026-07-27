import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../../Authentication/api";

export function useNotifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState("");
  const [removingIds, setRemovingIds] = useState(new Set());

  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/notifications");
      const payload = response.data?.notifications || response.notifications || [];

      const normalized = payload.map((n) => ({
        id: n.id,
        title: n.title || n.data?.title || "Notification",
        body: n.message || n.data?.message || n.body || "No details provided",
        time: n.created_at 
          ? new Date(n.created_at).toLocaleString(undefined, { 
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
            }) 
          : "Recently",
        read: !!n.read_at,
        type: n.type || "info", 
      }));

      setNotifications(normalized);
    } catch (err) {
      setError(err.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Close on outside click
  useEffect(() => {
    function handleClick(event) {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Auto-hide errors
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(timer);
  }, [error]);

  async function handleMarkAllRead() {
    if (marking || unreadCount === 0) return;

    const previous = notifications;
    setNotifications((items) => items.map((item) => ({ ...item, read: true })));
    setMarking(true);

    try {
      await api.post("/notifications/mark-all-read");
    } catch (err) {
      setNotifications(previous);
      setError(err.message);
    } finally {
      setMarking(false);
    }
  }

  async function handleDelete(id) {
    setRemovingIds((prev) => new Set(prev).add(id));
    const previous = notifications;

    try {
      await api.delete(`/notifications/${id}`);
      
      setTimeout(() => {
        setNotifications((items) => items.filter((item) => item.id !== id));
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 150);
    } catch (err) {
      setNotifications(previous);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setError(err.message);
    }
  }

  return {
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
  };
}