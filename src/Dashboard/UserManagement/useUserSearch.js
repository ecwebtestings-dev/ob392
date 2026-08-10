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
      const query = encodeURIComponent(debouncedTerm);
      const res = await api.get(`/users/search?search=${query}`);
      return Array.isArray(res) ? res : res?.data ?? [];
    },
    enabled: debouncedTerm.trim().length > 0, 
    staleTime: 60 * 1000, 
  });

  return {
    results: data ?? [],
    searching: isLoading || isFetching,
    error: error?.message ?? null,
  };
}