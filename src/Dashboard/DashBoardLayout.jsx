import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  UsersIcon,
  CalendarDaysIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import images from "../assets/assets";
import { getCurrentUser, logout } from "../Authentication/authService";
import { api } from "../Authentication/api";
import Notification from "./Notifications/Notifications";

const navItems = [
  { to: "/dashboard/inquiries", label: "Inquiries", icon: EnvelopeIcon },
  { to: "/dashboard/users", label: "Users", icon: UsersIcon },
  { to: "/dashboard/events", label: "Events", icon: CalendarDaysIcon },
];

const ADMIN_ROLES = ["admin", "super_admin"];

// Turns a full name into up-to-2-letter initials, e.g. "Jane Doe" -> "JD"
function getInitials(fullName) {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const token = api.getToken();
    if (!token) return;

    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Failed to log out");
    }
  }

  // While `user` is still null (not yet loaded), isAdmin is false — this means the
  // Admin & Roles link stays hidden until we've confirmed the role, rather than
  // briefly flashing it for a non-admin user before the check resolves.
  const isAdmin = ADMIN_ROLES.includes(user?.role);
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-64 flex-none flex-col bg-background lg:flex">
        <div className="flex h-16 flex-none items-center gap-2 px-6">
          <img alt="Logo" src={images.logo} className="h-7 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-badges">OB39</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-hero-text/60">
              Admin
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {visibleNavItems.map((item) => (
            <SidebarLink key={item.to} item={item} />
          ))}
        </nav>

        {/* User + logout, pinned to the bottom of the sidebar */}
        <div className="flex-none border-t border-white/10 p-3">
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
            <span className="flex size-8 flex-none items-center justify-center rounded-full bg-badges text-xs font-semibold text-background">
              {getInitials(user?.name) || "?"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || "..."}
              </p>
              <p className="truncate text-xs text-hero-text/60">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <ArrowRightStartOnRectangleIcon className="size-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* MAIN COLUMN */}
      <div className="flex flex-1 flex-col">
        {/* DESKTOP TOP BAR — hosts the notification bell (and room for breadcrumbs/search later) */}
        <header className="hidden h-16 flex-none items-center justify-end border-b border-gray-200 bg-white px-6 lg:flex">
          <Notification />
        </header>

        {/* MOBILE TOP BAR */}
        <header className="flex h-16 flex-none items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <img alt="Logo" src={images.logo} className="h-7 w-auto" />
            <span className="text-sm font-bold tracking-tight text-heading">
              OB39 <span className="text-badges">Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Notification />

            <button
              onClick={() => setMobileNavOpen((o) => !o)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            >
              {mobileNavOpen ? (
                <XMarkIcon className="size-5" />
              ) : (
                <Bars3Icon className="size-5" />
              )}
            </button>
          </div>
        </header>

        {/* MOBILE NAV — toggled open/closed rather than always visible */}
        {mobileNavOpen && (
          <nav className="flex flex-col gap-1 border-b border-gray-200 bg-white px-3 py-3 lg:hidden">
            {visibleNavItems.map((item) => (
              <SidebarLink
                key={item.to}
                item={item}
                light
                onClick={() => setMobileNavOpen(false)}
              />
            ))}
            <button
              onClick={handleLogout}
              className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              <ArrowRightStartOnRectangleIcon className="size-4" />
              Log out
            </button>
          </nav>
        )}

        <main className="flex-1">
          {/* Active dashboard screen renders here based on the matched child route.
              `user` is passed down so child screens (e.g. AdminManagement) can read
              the current user's role without fetching it again themselves. */}
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}

// Shared nav link — `light` swaps the styling for the mobile (white background) context,
// since the desktop sidebar sits on the dark navy background instead.
function SidebarLink({ item, light = false, onClick }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) => {
        if (light) {
          return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive
              ? "bg-badge-bg text-icons"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`;
        }
        return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-badges/15 text-badges"
            : "text-hero-text/70 hover:bg-white/5 hover:text-white"
        }`;
      }}
    >
      <item.icon className="size-5 flex-none" />
      {item.label}
    </NavLink>
  );
}