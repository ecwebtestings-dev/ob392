import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  UsersIcon,
  CalendarDaysIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserCircleIcon,
  EllipsisHorizontalIcon,
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



export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Desktop sidebar: collapsed = icon-only rail; hovered = temporarily expanded
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const sidebarExpanded = !sidebarCollapsed || sidebarHovered;

  // Mobile drawer (hamburger) and mobile actions row (the "..." button)
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);

  useEffect(() => {
    const token = api.getToken();
    if (!token) return;

    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  // Close the user dropdown when clicking anywhere outside it — checks both
  // the desktop trigger and the mobile trigger, since they share one open state
  useEffect(() => {
    function handleClickOutside(e) {
      const insideDesktop = userMenuRef.current?.contains(e.target);
      const insideMobile = mobileUserMenuRef.current?.contains(e.target);
      if (!insideDesktop && !insideMobile) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      {/* DESKTOP SIDEBAR SPACER — reserves layout space at the collapsed width,
          so the fixed sidebar below can expand on hover without shifting content */}
      <div
        className={`hidden flex-none transition-all duration-200 lg:block ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      />

      {/* DESKTOP SIDEBAR — fixed position; expands over content on hover when collapsed */}
      <aside
        onMouseEnter={() => sidebarCollapsed && setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-gray-200 bg-white transition-all duration-200 lg:flex ${
          sidebarExpanded ? "w-64" : "w-20"
        } ${sidebarCollapsed && sidebarHovered ? "shadow-2xl" : ""}`}
      >
        {/* Logo */}
        <div className="flex h-16 flex-none items-center gap-2.5 border-b border-gray-100 px-6">
          <div className="flex size-9 flex-none items-center justify-center rounded-xl bg-badges">
            <img alt="Logo" src={images.logo} className="h-5 w-auto" />
          </div>
          {sidebarExpanded && (
            <span className="truncate text-lg font-bold tracking-tight text-heading">
              OB39
            </span>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-4 py-6">
          {sidebarExpanded && (
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Menu
            </p>
          )}

          {visibleNavItems.map((item) => (
            <SidebarLink key={item.to} item={item} expanded={sidebarExpanded} />
          ))}
        </nav>
      </aside>

      {/* MAIN COLUMN — min-w-0 lets this shrink instead of forcing the whole
          page wider when content inside (e.g. a wide table) wants more space. */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* DESKTOP TOP BAR — sticky, not fixed: it already sits correctly inside
            this flex column (offset by the sidebar spacer), so it doesn't need
            manual left/width math, and it can never drift with horizontal scroll. */}
        <header className="sticky top-0 z-30 hidden h-16 flex-none items-center justify-between gap-2 border-b border-gray-200 bg-white px-6 lg:flex">
          {/* Sidebar toggle + Search */}
          <div className="flex min-w-0 flex-1 max-w-md items-center gap-2">
            <button
              onClick={() => setSidebarCollapsed((c) => !c)}
              className="flex-none rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              <Bars3Icon className="size-5" />
            </button>

            <div className="relative min-w-0 flex-1">
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search or type command..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-14 text-sm text-heading placeholder:text-gray-400 focus:border-badges focus:outline-none focus:ring-1 focus:ring-badges"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-gray-400">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right cluster */}
          <div className="flex flex-none items-center gap-2">
            <Notification />

            {/* User dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-gray-50"
              >
              
                <span className="text-sm font-medium text-heading">
                  {user?.name || "..."}
                </span>
                <ChevronDownIcon
                  className={`size-4 text-gray-400 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl shadow-gray-200/60">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-heading">
                      {user?.name || "..."}
                    </p>
                    <p className="truncate text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <UserCircleIcon className="size-4.5 text-gray-400" />
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    <ArrowRightStartOnRectangleIcon className="size-4.5" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MOBILE TOP BAR */}
        <header className="sticky top-0 z-30 flex flex-col border-b border-gray-200 bg-white lg:hidden">
          <div className="flex h-16 flex-none items-center justify-between px-4">
            <button
              onClick={() => setMobileNavOpen((o) => !o)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? (
                <XMarkIcon className="size-5" />
              ) : (
                <Bars3Icon className="size-5" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-badges">
                <img alt="Logo" src={images.logo} className="h-4 w-auto" />
              </div>
              <span className="text-sm font-bold tracking-tight text-heading">
                OB39 <span className="text-badges">Admin</span>
              </span>
            </div>

            <button
              onClick={() => setMobileActionsOpen((o) => !o)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Toggle account actions"
            >
              <EllipsisHorizontalIcon className="size-5" />
            </button>
          </div>

          {/* Revealed by the "..." button: notification bell + user profile/logout */}
          {mobileActionsOpen && (
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
              <Notification />

              <div className="relative" ref={mobileUserMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-gray-50"
                >
                
                  <span className="text-sm font-medium text-heading">
                    {user?.name || "..."}
                  </span>
                  <ChevronDownIcon
                    className={`size-4 text-gray-400 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl shadow-gray-200/60">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-heading">
                        {user?.name || "..."}
                      </p>
                      <p className="truncate text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      <UserCircleIcon className="size-4.5 text-gray-400" />
                      My Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      <ArrowRightStartOnRectangleIcon className="size-4.5" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        {/* MOBILE NAV DRAWER — slide-in panel with backdrop, matching the reference layout */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/40"
              aria-hidden="true"
              onClick={() => setMobileNavOpen(false)}
            />

            <div className="fixed inset-y-0 left-0 flex w-72 max-w-[80%] flex-col bg-white shadow-2xl">
              <div className="flex h-16 flex-none items-center justify-between border-b border-gray-100 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-badges">
                    <img alt="Logo" src={images.logo} className="h-4 w-auto" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-heading">OB39</span>
                </div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100"
                >
                  <XMarkIcon className="size-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Menu
                </p>

                {visibleNavItems.map((item) => (
                  <SidebarLink
                    key={item.to}
                    item={item}
                    expanded
                    onClick={() => setMobileNavOpen(false)}
                  />
                ))}
              </nav>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 overflow-x-hidden p-6">
          {/* Active dashboard screen renders here based on the matched child route.
              `user` is passed down so child screens (e.g. AdminManagement) can read
              the current user's role without fetching it again themselves. */}
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}

// Shared nav link. `expanded` controls whether the label is shown alongside
// the icon (full sidebar / mobile drawer) or the icon is centered alone
// (collapsed desktop rail).
function SidebarLink({ item, expanded, onClick }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      title={!expanded ? item.label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          expanded ? "" : "justify-center px-2"
        } ${
          isActive
            ? "bg-badge-bg text-icons"
            : "text-gray-600 hover:bg-gray-50 hover:text-heading"
        }`
      }
    >
      <item.icon className="size-5 flex-none" />
      {expanded && item.label}
    </NavLink>
  );
}