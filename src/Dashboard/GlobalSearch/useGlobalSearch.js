// import { useQuery } from "@tanstack/react-query";
// import { api } from "../../Authentication/api";

// const FIVE_MINUTES = 5 * 60 * 1000;

// // Searches users, inquiries, and events
// export function useGlobalSearch(query) {
//   const trimmed = query?.trim() ?? "";

//   return useQuery({
//     queryKey: ["search", trimmed],
//     queryFn: async () => {
//       const [usersRes, inquiriesRes, eventsRes] = await Promise.all([
//         api.get(`/users?search=${encodeURIComponent(trimmed)}`),
//         api.get(`/inquiry?search=${encodeURIComponent(trimmed)}`),
//         api.get(`/events?search=${encodeURIComponent(trimmed)}`),
//       ]);

//       return {
//         users: Array.isArray(usersRes) ? usersRes : usersRes.data ?? [],
//         inquiries: Array.isArray(inquiriesRes) ? inquiriesRes : inquiriesRes.data ?? [],
//         events: Array.isArray(eventsRes) ? eventsRes : eventsRes.data ?? [],
//       };
//     },
//     enabled: trimmed.length > 0, // don't fire on an empty query
//     staleTime: FIVE_MINUTES,
//   });
// }