import { useQuery } from "@tanstack/react-query";
import { api } from "../../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;
const FIVE_MINUTES = 5 * 60 * 1000;


//fUNCTION THAT FETCHES INQUIRIES
async function fetchInquiries() {
  const token = api.getToken();
  const res = await fetch(`${BASE_URL}/inquiry`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to load inquiries");

  const data = await res.json();
  return Array.isArray(data) ? data : data.data ?? [];
}



//CATCHING INQUIRIES
export function useInquiries() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["inquiries"],
    queryFn: fetchInquiries,
    staleTime: FIVE_MINUTES,
  });

  const inquiries = data ?? [];

  
  

  // DERIVED STATISTICS
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
    loading: isLoading,
    error: error?.message ?? null,
    stats: { total, thisWeek, withOrg },
  };
}