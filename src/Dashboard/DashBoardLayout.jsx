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
  UserCircleIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import images from "../assets/assets";
import { getCurrentUser, logout } from "../Authentication/authService";
import { api } from "../Authentication/api";
import Notification from "./Notifications/Notifications";

// DIFFERENT COMPONENTS CONNECTED TO THE DASHBOARDS
const navItems = [
  { to: "/dashboard", label: "Overview", icon: Squares2X2Icon, end: true },
  { to: "/dashboard/inquiries", label: "Inquiries", icon: EnvelopeIcon },
  { to: "/dashboard/users", label: "Users", icon: UsersIcon },
  { to: "/dashboard/events", label: "Events", icon: CalendarDaysIcon },
];

const ADMIN_ROLES = ["admin", "super_admin"];

// Get up to 2 initials from a full name, e.g. "Tony Robert" -> "TR"
function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Closed Menu Icon by default — controlled ONLY by the toggle button, no hover-to-expand
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const sidebarExpanded = !sidebarCollapsed;

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);

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
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to log out");
    }
  }

  const isAdmin = ADMIN_ROLES.includes(user?.role);
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin);
  const initials = getInitials(user?.name);

  return (
    <div className="flex min-h-screen bg-[#F5F7F6] text-[#0B1F17]">
      <div
        className={`hidden flex-none transition-all duration-200 lg:block ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      />

      {/* Sidebar — dark green chrome, no hover-to-expand */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/5 bg-gradient-to-br from-[#12855A] via-[#0F6B45] to-[#063822] transition-all duration-200 lg:flex ${
          sidebarExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="flex h-16 flex-none items-center gap-2.5 border-b border-white/10 px-6">
          <div className="flex size-9 flex-none items-center justify-center rounded-xl bg-[#0F6B45]">
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
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Menu
            </p>
          )}

          {/**SIDE BAR MENU LINKS */}
          {visibleNavItems.map((item) => (
            <SidebarLink key={item.to} item={item} expanded={sidebarExpanded} />
          ))}
        </nav>

        {/* ACCOUNT ACTIONS — pinned to bottom */}
        <div className="flex-none space-y-1 border-t border-white/10 px-4 py-4">
          <SidebarActionLink
            to="/dashboard/profile"
            label="My Profile"
            icon={UserCircleIcon}
            expanded={sidebarExpanded}
          />
          <SidebarActionLink
            to="/dashboard/settings"
            label="Settings"
            icon={Cog6ToothIcon}
            expanded={sidebarExpanded}
          />
          <SidebarActionButton
            label="Log out"
            icon={ArrowRightStartOnRectangleIcon}
            expanded={sidebarExpanded}
            onClick={handleLogout}
            danger
          />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[#F5F7F6]">
        {/* Desktop Header — soft white chrome, green + gold accents */}
        <header className="sticky top-0 z-30 hidden h-16 flex-none items-center justify-between gap-4 border-b border-black/5 bg-white px-6 lg:flex">
          <div className="flex min-w-0 flex-1 max-w-md items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed((c) => !c)}
              className="flex-none rounded-lg p-2 text-[#0B1F17]/60 transition-colors hover:bg-[#0F6B45]/10 hover:text-[#0F6B45]"
              aria-label="Toggle sidebar"
            >
              <Bars3Icon className="size-5" />
            </button>

            {/* SEARCH BAR */}
            <div className="relative min-w-0 flex-1">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#0F6B45]/50" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-black/5 bg-[#F5F7F6] py-2 pl-9 pr-14 text-sm text-[#0B1F17] placeholder:text-[#0B1F17]/40 outline-none transition-colors focus:border-[#0F6B45]/40 focus:bg-white focus:ring-2 focus:ring-[#0F6B45]/15"
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center rounded-md bg-[#FFD230]/25 px-1.5 py-0.5 text-[10.5px] font-semibold text-[#0B1F17]/70 sm:flex">
                Enter
              </span>
            </div>
          </div>

          {/* NOTIFICATIONS + ACCOUNT DISPLAY */}
          <div className="flex flex-none items-center gap-2">
            <Notification />

            <div className="flex items-center gap-2.5 rounded-lg py-1.5 pl-1.5 pr-2.5">
              <span className="flex size-9 flex-none items-center justify-center rounded-full bg-[#0F6B45] text-xs font-semibold text-white">
                {initials || <UserCircleIcon className="size-5" />}
              </span>

              <span className="hidden flex-col items-start leading-tight sm:flex">
                <span className="text-sm font-medium text-[#0B1F17]">
                  {user?.name || "..."}
                </span>
                <span className="max-w-[160px] truncate text-[11px] text-[#0B1F17]/50">
                  {user?.email}
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Header  */}
        <header className="sticky top-0 z-30 flex flex-col border-b border-black/5 bg-white lg:hidden">
          <div className="flex h-16 flex-none items-center justify-between px-4">
            <button
              onClick={() => setMobileNavOpen((o) => !o)}
              className="rounded-lg p-2 text-[#0B1F17]/60 hover:bg-[#0F6B45]/10 hover:text-[#0F6B45]"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? (
                <XMarkIcon className="size-5" />
              ) : (
                <Bars3Icon className="size-5" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#0F6B45]">
                <img alt="Logo" src={images.logo} className="h-4 w-auto" />
              </div>
              <span className="text-sm font-bold tracking-tight text-[#0B1F17]">
                OB39 <span className="text-[#0F6B45]">Admin</span>
              </span>
            </div>

            <button
              onClick={() => setMobileActionsOpen((o) => !o)}
              className="rounded-lg p-2 text-[#0B1F17]/60 hover:bg-[#0F6B45]/10 hover:text-[#0F6B45]"
              aria-label="Toggle account actions"
            >
              <EllipsisHorizontalIcon className="size-5" />
            </button>
          </div>

          {mobileActionsOpen && (
            <div className="flex items-center justify-between border-t border-black/5 px-4 py-3">
              <Notification />

              <div className="flex items-center gap-2.5 rounded-lg py-1.5 pl-1.5 pr-2.5">
                <span className="flex size-9 flex-none items-center justify-center rounded-full bg-[#0F6B45] text-xs font-semibold text-white">
                  {initials || <UserCircleIcon className="size-5" />}
                </span>

                <span className="flex flex-col items-start leading-tight">
                  <span className="text-sm font-medium text-[#0B1F17]">
                    {user?.name || "..."}
                  </span>
                  <span className="max-w-[120px] truncate text-[11px] text-[#0B1F17]/50">
                    {user?.email}
                  </span>
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Mobile Navigation Drawer — same gradient as desktop sidebar */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
              onClick={() => setMobileNavOpen(false)}
            />

            <div className="fixed inset-y-0 left-0 flex w-72 max-w-[80%] flex-col bg-gradient-to-br from-[#12855A] via-[#0F6B45] to-[#063822] shadow-2xl shadow-black/30">
              <div className="flex h-16 flex-none items-center justify-between border-b border-white/10 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#0F6B45]">
                    <img alt="Logo" src={images.logo} className="h-4 w-auto" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-white">OB39</span>
                </div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <XMarkIcon className="size-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-white/40">
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

              {/* ACCOUNT ACTIONS — pinned to bottom, mobile */}
              <div className="flex-none space-y-1 border-t border-white/10 px-4 py-4">
                <SidebarActionLink
                  to="/dashboard/profile"
                  label="My Profile"
                  icon={UserCircleIcon}
                  expanded
                  onClick={() => setMobileNavOpen(false)}
                />
                <SidebarActionLink
                  to="/dashboard/settings"
                  label="Settings"
                  icon={Cog6ToothIcon}
                  expanded
                  onClick={() => setMobileNavOpen(false)}
                />
                <SidebarActionButton
                  label="Log out"
                  icon={ArrowRightStartOnRectangleIcon}
                  expanded
                  danger
                  onClick={() => {
                    setMobileNavOpen(false);
                    handleLogout();
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden bg-[#eaf2ee] p-6">
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
        end={item.end}
        onClick={onClick}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setTooltipPos(null)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 w-full py-2.5 text-sm font-medium transition-colors ${
            expanded ? "" : "justify-center px-2"
          } ${
            isActive
              ? "bg-white/10 text-white"
              : "text-white/55 hover:bg-white/5 hover:text-white"
          }`
        }
      >
        <item.icon className="size-5 flex-none text-[#FFD230]" />
        {expanded && item.label}
      </NavLink>

      {tooltipPos &&
        createPortal(
          <span
            style={{ top: tooltipPos.top, left: tooltipPos.left, transform: "translateY(-50%)" }}
            className="pointer-events-none fixed z-50 whitespace-nowrap rounded-md bg-[#0B1F17] px-2 py-1 text-xs font-medium text-white shadow-lg"
          >
            {item.label}
          </span>,
          document.body
        )}
    </>
  );
}

// Account action rendered as a route link (Profile, Settings)
function SidebarActionLink({ to, label, icon: Icon, expanded, onClick }) {
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
        to={to}
        onClick={onClick}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setTooltipPos(null)}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 w-full py-2.5 text-sm font-medium transition-colors ${
            expanded ? "" : "justify-center px-2"
          } ${
            isActive
              ? "bg-white/10 text-white"
              : "text-white/55 hover:bg-white/5 hover:text-white"
          }`
        }
      >
        <Icon className="size-5 flex-none text-[#FFD230]" />
        {expanded && label}
      </NavLink>

      {tooltipPos &&
        createPortal(
          <span
            style={{ top: tooltipPos.top, left: tooltipPos.left, transform: "translateY(-50%)" }}
            className="pointer-events-none fixed z-50 whitespace-nowrap rounded-md bg-[#0B1F17] px-2 py-1 text-xs font-medium text-white shadow-lg"
          >
            {label}
          </span>,
          document.body
        )}
    </>
  );
}

// Account action rendered as a button (Log out)
function SidebarActionButton({ label, icon: Icon, expanded, onClick, danger }) {
  const btnRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  function showTooltip() {
    if (expanded || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setTooltipPos({ top: rect.top + rect.height / 2, left: rect.right + 8 });
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={onClick}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setTooltipPos(null)}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          expanded ? "" : "justify-center px-2"
        } ${
          danger
            ? "text-red-300 hover:bg-red-500/10 hover:text-red-200"
            : "text-white/55 hover:bg-white/5 hover:text-white"
        }`}
      >
        <Icon className={`size-5 flex-none ${danger ? "text-red-300" : "text-[#FFD230]"}`} />
        {expanded && label}
      </button>

      {tooltipPos &&
        createPortal(
          <span
            style={{ top: tooltipPos.top, left: tooltipPos.left, transform: "translateY(-50%)" }}
            className="pointer-events-none fixed z-50 whitespace-nowrap rounded-md bg-[#0B1F17] px-2 py-1 text-xs font-medium text-white shadow-lg"
          >
            {label}
          </span>,
          document.body
        )}
    </>
  );
}