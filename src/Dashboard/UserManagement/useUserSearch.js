import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../Authentication/api";

//delays updating the value until the user pauses typing
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// SEARCH USER FUNCTION
export function useUserSearch(searchTerm) {
  const debouncedTerm = useDebounce(searchTerm, 400);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["users", "search", debouncedTerm],
    queryFn: async () => {
      const res = await api.get(`/users/search`, { params: { search: debouncedTerm } });
      return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
    },
    enabled: debouncedTerm.trim().length > 0, // don't fire on empty search
    staleTime: 60 * 1000, // shorter stale time — search results are transient
  });

  return {
    results: data ?? [],
    searching: isLoading || isFetching,
    error: error?.message ?? null,
  };
}