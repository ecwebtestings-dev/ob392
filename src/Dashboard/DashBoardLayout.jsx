import { NavLink, Outlet } from "react-router-dom";
import {
  EnvelopeIcon,
  UsersIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { to: "/dashboard/inquiries", label: "Inquiries", icon: EnvelopeIcon },
  { to: "/dashboard/users", label: "Users", icon: UsersIcon },
  
  { to: "/dashboard/events", label: "Events", icon: CalendarDaysIcon },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="hidden w-64 flex-none border-r border-gray-200 bg-white lg:block">
        <div className="flex h-16 items-center px-6">
          <span className="text-lg font-bold tracking-tight text-heading">
            OB39 <span className="text-badges">Admin</span>
          </span>
        </div>


        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-badge-bg text-icons"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="size-5 flex-none" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>




      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col">
        {/* Simple top bar — mainly useful for a mobile menu trigger later if needed */}
        <header className="flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:hidden">
          <span className="text-base font-bold tracking-tight text-heading">
            OB39 <span className="text-badges">Admin</span>
          </span>
        </header>

        {/* Mobile nav — simple horizontal scroll row since there's no off-canvas menu yet */}
        <nav className="flex gap-1 overflow-x-auto border-b border-gray-200 bg-white px-3 py-2 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-none items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-badge-bg text-icons"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1">
          {/* Each dashboard screen renders here based on the active nested route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}