// import { useSearchParams, useNavigate } from "react-router-dom";
// import { UsersIcon, EnvelopeIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
// import { useGlobalSearch } from "./useGlobalSearch";

// export default function SearchResults() {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("q") ?? "";
//   const navigate = useNavigate();

//   const { data, isLoading, error } = useGlobalSearch(query);

//   if (!query.trim()) {
//     return (
//       <StatusPanel text="Type something in the search bar to get started." />
//     );
//   }

//   if (isLoading) {
//     return <StatusPanel text="Searching..." />;
//   }

//   if (error) {
//     return (
//       <StatusPanel
//         text={error.message || "Something went wrong while searching."}
//         tone="error"
//       />
//     );
//   }

//   const { users = [], inquiries = [], events = [] } = data ?? {};
//   const total = users.length + inquiries.length + events.length;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-lg font-semibold text-heading">
//         Search results for &quot;{query}&quot;
//         <span className="ml-2 text-sm font-normal text-gray-400">
//           ({total} result{total !== 1 ? "s" : ""})
//         </span>
//       </h1>

//       {total === 0 ? (
//         <StatusPanel text={`No matches found for "${query}".`} />
//       ) : (
//         <>
//           <ResultSection
//             title="Users"
//             icon={UsersIcon}
//             items={users}
//             onItemClick={(user) => navigate(`/dashboard/users?highlight=${user.id}`)}
//             renderItem={(user) => (
//               <>
//                 <p className="font-medium text-heading">{user.name}</p>
//                 <p className="text-xs text-gray-500">{user.email}</p>
//               </>
//             )}
//           />

//           <ResultSection
//             title="Inquiries"
//             icon={EnvelopeIcon}
//             items={inquiries}
//             onItemClick={() => navigate("/dashboard/inquiries")}
//             renderItem={(inquiry) => (
//               <>
//                 <p className="font-medium text-heading">
//                   {inquiry.subject || inquiry.name}
//                 </p>
//                 <p className="truncate text-xs text-gray-500">{inquiry.message}</p>
//               </>
//             )}
//           />

//           <ResultSection
//             title="Events"
//             icon={CalendarDaysIcon}
//             items={events}
//             onItemClick={() => navigate("/dashboard/events")}
//             renderItem={(event) => (
//               <>
//                 <p className="font-medium text-heading">{event.title || event.name}</p>
//                 <p className="text-xs text-gray-500">{event.date}</p>
//               </>
//             )}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// function StatusPanel({ text, tone = "default" }) {
//   return (
//     <div
//       className={`rounded-2xl bg-white p-8 text-center text-sm shadow ${
//         tone === "error" ? "text-red-600" : "text-gray-500"
//       }`}
//     >
//       {text}
//     </div>
//   );
// }

// function ResultSection({ title, icon: Icon, items, renderItem, onItemClick }) {
//   if (items.length === 0) return null;

//   return (
//     <div className="rounded-2xl bg-white shadow">
//       <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-3">
//         <Icon className="size-4.5 text-gray-400" />
//         <h2 className="text-sm font-semibold text-heading">{title}</h2>
//         <span className="text-xs text-gray-400">({items.length})</span>
//       </div>

//       <ul className="divide-y divide-gray-100">
//         {items.map((item) => (
//           <li
//             key={item.id}
//             onClick={() => onItemClick(item)}
//             className="cursor-pointer px-5 py-3 transition-colors hover:bg-gray-50"
//           >
//             {renderItem(item)}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }