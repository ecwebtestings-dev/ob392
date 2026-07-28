import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchInquiries() {
      try {
        const token = api.getToken();
        const res = await fetch(`${BASE_URL}/inquiry`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load inquiries");
        }

        const data = await res.json();

        // Adjust this line if your API wraps the array, e.g. data.data or data.inquiries
        if (!cancelled) setInquiries(Array.isArray(data) ? data : data.data ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          toast.error(err.message || "Could not load inquiries");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchInquiries();
    return () => {
      cancelled = true;
    };
  }, []);

  // Derived stats, computed from whatever's currently loaded
  const total = inquiries.length;

  const thisWeek = inquiries.filter((inq) => {
    if (!inq.created_at) return false;
    const created = new Date(inq.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created >= weekAgo;
  }).length;

  const withOrg = inquiries.filter((inq) => inq.organisation).length;

  return {
    inquiries,
    loading,
    error,
    stats: { total, thisWeek, withOrg },
  };
}