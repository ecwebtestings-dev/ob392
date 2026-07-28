// Turns a full name into up-to-2-letter initials
export function getInitials(fullName) {
  if (!fullName) return "?";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// Add soft color for the avatar background, based on the name
const AVATAR_COLORS = [
  "bg-badges/15 text-icons",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

export function getAvatarColor(name = "") {
  const index = name.length % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export function formatInquiryDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}