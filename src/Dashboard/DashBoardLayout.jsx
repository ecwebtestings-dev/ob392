import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  UsersIcon,
  CalendarDaysIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  UserCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import images from "../assets/assets";
import { getCurrentUser, logout } from "../Authentication/authService";
import { api } from "../Authentication/api";
import Notification from "./Notifications/Notifications";

// DIFFERENT COMPONENTS CONNECTED TO THE DASHBOARDS
const navItems = [
  { to: "/dashboard", label: "Overview", icon: Squares2X2Icon },
  { to: "/dashboard/inquiries", label: "Inquiries", icon: EnvelopeIcon },
  { to: "/dashboard/users", label: "Users", icon: UsersIcon },
  { to: "/dashboard/events", label: "Events", icon: CalendarDaysIcon },
];

const ADMIN_ROLES = ["admin", "super_admin"];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Closed Menu Icon by default
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const sidebarExpanded = !sidebarCollapsed || sidebarHovered;

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

  const isAdmin = ADMIN_ROLES.includes(user?.role);
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <div className="flex min-h-screen bg-background text-text-color">
      <div
        className={`hidden flex-none transition-all duration-200 lg:block ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      />

      {/* Sidebar — navy chrome */}
      <aside
        onMouseEnter={() => sidebarCollapsed && setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/10 bg-background transition-all duration-200 lg:flex ${
          sidebarExpanded ? "w-64" : "w-20"
        } ${sidebarCollapsed && sidebarHovered ? "shadow-2xl shadow-background/40" : ""}`}
      >
        <div className="flex h-16 flex-none items-center gap-2.5 border-b border-white/10 px-6">
          <div className="flex size-9 flex-none items-center justify-center rounded-xl bg-badges">
            <img alt="Logo" src={images.logo} className="h-5 w-auto" />
          </div>
          {sidebarExpanded && (
            <span className="truncate text-lg font-bold tracking-tight text-white">
              OB39
            </span>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-4 py-6">
          {sidebarExpanded && (
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-hero-text/60">
              Menu
            </p>
          )}

          {visibleNavItems.map((item) => (
            <SidebarLink key={item.to} item={item} expanded={sidebarExpanded} />
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-background">
        {/* Desktop Header — navy chrome */}
        <header className="sticky top-0 z-30 hidden h-16 flex-none items-center justify-between gap-2 border-b border-white/10 bg-background px-6 lg:flex">
          <div className="flex min-w-0 flex-1 max-w-md items-center gap-2">
            <button
              onClick={() => setSidebarCollapsed((c) => !c)}
              className="flex-none rounded-lg p-2 text-hero-text/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Toggle sidebar"
            >
              <Bars3Icon className="size-5" />
            </button>
          </div>

          {/* NOTIFICATIONS ICON */}
          <div className="flex flex-none items-center gap-2">
            <Notification />

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-white/10"
              >
                <span className="text-sm font-medium text-white">
                  {user?.name || "..."}
                </span>
                <ChevronDownIcon
                  className={`size-4 text-hero-text/60 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-text-color/10 bg-card-background py-1.5 shadow-xl shadow-background/40">
                  <div className="border-b border-text-color/10 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-heading">
                      {user?.name || "..."}
                    </p>
                    <p className="truncate text-xs text-text-color/70">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-text-color transition-colors hover:bg-badge-bg"
                  >
                    <UserCircleIcon className="size-4.5 text-text-color/60" />
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

        {/* Mobile Header  */}
        <header className="sticky top-0 z-30 flex flex-col border-b border-white/10 bg-background lg:hidden">
          <div className="flex h-16 flex-none items-center justify-between px-4">
            <button
              onClick={() => setMobileNavOpen((o) => !o)}
              className="rounded-lg p-2 text-hero-text/80 hover:bg-white/10 hover:text-white"
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
              <span className="text-sm font-bold tracking-tight text-white">
                OB39 <span className="text-badges">Admin</span>
              </span>
            </div>

            <button
              onClick={() => setMobileActionsOpen((o) => !o)}
              className="rounded-lg p-2 text-hero-text/80 hover:bg-white/10 hover:text-white"
              aria-label="Toggle account actions"
            >
              <EllipsisHorizontalIcon className="size-5" />
            </button>
          </div>

          {mobileActionsOpen && (
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
              <Notification />

              <div className="relative" ref={mobileUserMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-white/10"
                >
                  <span className="text-sm font-medium text-white">
                    {user?.name || "..."}
                  </span>
                  <ChevronDownIcon
                    className={`size-4 text-hero-text/60 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-text-color/10 bg-card-background py-1.5 shadow-xl shadow-background/40">
                    <div className="border-b border-text-color/10 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-heading">
                        {user?.name || "..."}
                      </p>
                      <p className="truncate text-xs text-text-color/70">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-text-color transition-colors hover:bg-badge-bg"
                    >
                      <UserCircleIcon className="size-4.5 text-text-color/60" />
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

        {/* Mobile Navigation Drawer — navy chrome */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-background/60 backdrop-blur-sm"
              aria-hidden="true"
              onClick={() => setMobileNavOpen(false)}
            />

            <div className="fixed inset-y-0 left-0 flex w-72 max-w-[80%] flex-col bg-background shadow-2xl shadow-background/50">
              <div className="flex h-16 flex-none items-center justify-between border-b border-white/10 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-badges">
                    <img alt="Logo" src={images.logo} className="h-4 w-auto" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-white">OB39</span>
                </div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-lg p-1.5 text-hero-text/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <XMarkIcon className="size-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-hero-text/60">
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




        {/* Main Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden bg-background p-6">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}

// Collapsed rail: icon only, tooltip on hover (via portal so it escapes the nav's overflow clipping)
function SidebarLink({ item, expanded, onClick }) {
  const linkRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  function showTooltip() {
    if (expanded || !linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    setTooltipPos({ top: rect.top + rect.height / 2, left: rect.right + 8 });
  }

  return (
    <>
      <NavLink
        ref={linkRef}
        to={item.to}
        onClick={onClick}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setTooltipPos(null)}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            expanded ? "" : "justify-center px-2"
          } ${
            isActive
              ? "bg-badge-bg text-icons"
              : "text-hero-text hover:bg-white/10 hover:text-white"
          }`
        }
      >
        <item.icon className="size-5 flex-none" />
        {expanded && item.label}
      </NavLink>

      {tooltipPos &&
        createPortal(
          <span
            style={{ top: tooltipPos.top, left: tooltipPos.left, transform: "translateY(-50%)" }}
            className="pointer-events-none fixed z-50 whitespace-nowrap rounded-md bg-background px-2 py-1 text-xs font-medium text-hero-text shadow-lg"
          >
            {item.label}
          </span>,
          document.body
        )}
    </>
  );
}