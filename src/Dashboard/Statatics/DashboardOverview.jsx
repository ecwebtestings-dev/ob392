import { useCallback } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  EnvelopeIcon,
  UsersIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
  ArrowUpRightIcon,
  ExclamationCircleIcon,
  HandRaisedIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import { api } from "../../Authentication/api";

import { useEventManagement, useCreateEvent } from "../Events/EventManagement";
import { CreateEventModal } from "../Events/useEventManagement";

const STATS_ENDPOINT = "/dashboard/stats";
const DASHBOARD_STATS_QUERY_KEY = ["dashboard-stats"];

const RECENT_EVENTS_LIMIT = 5;

// ============================================================
// CARD DEFINITIONS
// ============================================================

const CARD_DEFS = [
  {
    key: "users",
    label: "Users",
    icon: UsersIcon,
    to: "/dashboard/users",
    chips: [
      { field: "active", label: "Active", tone: "primary" },
      { field: "suspended", label: "Suspended", tone: "muted" },
    ],
  },
  {
    key: "inquiries",
    label: "Inquiries",
    icon: EnvelopeIcon,
    to: "/dashboard/inquiries",
    chips: [
      { field: "unreplied", label: "Unreplied", tone: "muted" },
      { field: "replied", label: "Replied", tone: "primary" },
    ],
  },
  {
    key: "events",
    label: "Events",
    icon: CalendarDaysIcon,
    to: "/dashboard/events",
    chips: [
      { field: "pending", label: "Pending", tone: "muted" },
      { field: "completed", label: "Completed", tone: "primary" },
    ],
  },
];

// ============================================================
// CHART STYLES
// ============================================================

const chartTooltipStyle = {
  background: "#FFFFFF",
  border: "1px solid rgba(11,31,23,0.08)",
  borderRadius: 8,
  fontSize: 12,
  fontFamily: "var(--font-sans)",
  color: "#0B1F17",
  boxShadow: "0 8px 24px rgba(11,31,23,0.08)",
};

const chartAxisTick = { fill: "#6B7A72", fontSize: 11 };
const chartAxisLine = { stroke: "rgba(11,31,23,0.1)" };

// ============================================================
// DATA FETCHING
// ============================================================

async function fetchDashboardStats() {
  const json = await api.get(STATS_ENDPOINT);

  if (!json) {
    throw new Error("Empty response from server");
  }

  if (json.status !== "success") {
    throw new Error(json.message || "Unable to load dashboard statistics");
  }

  if (!json.data) {
    throw new Error("Dashboard response does not contain data");
  }

  return json.data;
}

function useDashboardStats() {
  const query = useQuery({
    queryKey: DASHBOARD_STATS_QUERY_KEY,
    queryFn: fetchDashboardStats,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });

  const status = query.isPending
    ? "loading"
    : query.isError
    ? "error"
    : "ready";

  const reload = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    status,
    data: query.data ?? null,
    error: query.error?.message ?? null,
    isFetching: query.isFetching,
    reload,
  };
}

// ============================================================
// WELCOME BANNER
// ============================================================

function WelcomeBanner({ name }) {
  const firstName = name ? name.split(" ")[0] : null;

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#12855A] via-[#0F6B45] to-[#063822] p-6 shadow-sm">
      <div className="relative flex items-center gap-4">
        <div className="flex size-12 flex-none items-center justify-center rounded-xl bg-white/15">
          <HandRaisedIcon className="size-6 text-[#FFD230]" />
        </div>
        <div className="min-w-0">
          <h1 className="text-md font-semibold text-white sm:text-xl">
            Welcome  
            {firstName && <span className="text-[#FFD230]"> Mr/Mrs {firstName}!</span>}
          </h1>
          <p className="mt-0.5 text-xs text-white/70 sm:text-[13px]">
            Here&apos;s what&apos;s happening with OB39 today.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// METRIC CARD
// ============================================================

function MetricCard({ def, cardData, featured }) {
  const total = cardData?.total ?? 0;

  return (
    <Link
      to={def.to}
      className={`
        relative block overflow-hidden rounded-2xl p-3 shadow-sm 
        transition-all 
        ${
          featured
            ? "group bg-gradient-to-br from-[#12855A] via-[#0F6B45] to-[#063822] hover:shadow-lg hover:shadow-[#0F6B45]/20"
            : "border border-black/5 bg-white hover:border-[#0F6B45]/30 hover:shadow-md"
        }
      `}
    >
      <div className="mb-5 flex items-center justify-between">
        <span
          className={`text-[14px] font-medium ${
            featured ? "text-white" : "text-[#0B1F17]"
          }`}
        >
          {def.label}
        </span>

        <span
          className={`
            flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-colors
            ${
              featured
                ? "border-white/25 text-[#FFD230] group-hover:bg-white/10"
                : "border-[#0B1F17]/10 text-[#0B1F17]/70"
            }
          `}
        >
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>

      <div
        className={`mb-4 text-3xl font-bold tracking-tight ${
          featured ? "text-[#FFD230]" : "text-[#0B1F17]"
        }`}
      >
        {Number(total).toLocaleString()}
      </div>

      <div className="flex flex-wrap gap-2">
        {def.chips.map((chip) => {
          const value = cardData?.[chip.field] ?? 0;
          const isPrimary = chip.tone === "primary";

          return (
            <span
              key={chip.field}
              className={`
                inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px]
                ${
                  featured
                    ? "bg-white/15 text-white"
                    : isPrimary
                    ? "bg-[#0F6B45]/10 text-[#0F6B45]"
                    : "bg-[#0B1F17]/5 text-[#0B1F17]/60"
                }
              `}
            >
              {chip.label}
              <span className="font-semibold">
                {Number(value).toLocaleString()}
              </span>
            </span>
          );
        })}
      </div>
    </Link>
  );
}

// ============================================================
// RECENT EVENTS CARD
// ============================================================

function RecentEventsCard({ events, loading, error, onNewEvent }) {
  const recent = [...events]
    .sort((a, b) => {
      const aTime = new Date(a.created_at || a.id).getTime();
      const bTime = new Date(b.created_at || b.id).getTime();
      return bTime - aTime;
    })
    .slice(0, RECENT_EVENTS_LIMIT);

  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-[13.5px] font-medium text-[#0B1F17]">Scheduled Events</h2>
          <p className="text-xs text-[#0B1F17]/50">Most recent events</p>
        </div>

        <button
          type="button"
          onClick={onNewEvent}
          className="
            inline-flex flex-none items-center gap-1.5 rounded-lg
            bg-gradient-to-br from-[#12855A] via-[#0F6B45] to-[#063822]
            px-2.5 py-1.5 text-[11.5px] font-semibold text-white shadow-sm
            transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md
            active:translate-y-0
          "
        >
          <PlusIcon className="size-3.5" />
          New event
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-[#0B1F17]/5" />
          ))}
        </div>
      ) : error ? (
        <p className="py-6 text-center text-xs text-red-500">{error}</p>
      ) : recent.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-8 text-center">
          <CalendarDaysIcon className="size-8 text-[#0F6B45]/30" />
          <p className="text-xs text-[#0B1F17]/50">No events scheduled yet.</p>
        </div>
      ) : (
        <ul className="min-w-0 divide-y divide-black/5">
          {recent.map((ev) => (
            <li key={ev.id} className="flex min-w-0 items-start gap-3 py-3 first:pt-0 last:pb-0">
              <span className="mt-0.5 flex size-8 flex-none items-center justify-center rounded-lg bg-[#0F6B45]/10">
                <CalendarDaysIcon className="size-4 text-[#0F6B45]" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#0B1F17]">{ev.title}</p>
                {ev.description && (
                  <p className="mt-0.5 line-clamp-1 text-xs text-[#0B1F17]/50">
                    {ev.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/dashboard/events"
        className="mt-4 inline-flex w-fit items-center gap-1 text-xs font-medium text-[#0F6B45] hover:underline"
      >
        View all events
        <ArrowUpRightIcon className="size-3" />
      </Link>
    </div>
  );
}

// ============================================================
// LOADING SKELETON
// ============================================================

function CardsSkeleton() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="min-h-[120px] animate-pulse rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 h-2.5 w-2/5 rounded bg-[#0B1F17]/10" />
          <div className="mb-4 h-6 w-3/5 rounded bg-[#0B1F17]/10" />
          <div className="h-2.5 w-4/5 rounded bg-[#0B1F17]/10" />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// EMPTY CHART STATE
// ============================================================

function EmptyChart() {
  return (
    <div className="flex h-[200px] items-center justify-center text-center text-[12.5px] text-[#0B1F17]/50">
      No data for this period yet.
    </div>
  );
}

// ============================================================
// MAIN DASHBOARD COMPONENT
// ============================================================

export default function DashboardOverview() {
  const { user } = useOutletContext();
  const { status, data, error, isFetching, reload } = useDashboardStats();

  const cards = data?.cards ?? {};
  const monthly = data?.charts?.user_registrations_monthly ?? [];
  const growth = data?.charts?.user_growth_trend ?? [];

  // Reusing the exact same event creation logic/UI as the Events page
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
    showCreate,
    setShowCreate,
    handleEventCreated,
  } = useEventManagement();

  const {
    title,
    setTitle,
    description,
    setDescription,
    eventLink,
    setEventLink,
    eventDate,
    setEventDate,
    imagePreview,
    submitting: isCreatingEvent,
    handleImageChange,
    handleSubmit,
  } = useCreateEvent(handleEventCreated);

  return (
    <div className="min-w-0 rounded-2xl bg-[#F5F7F6] p-2 sm:p-6 font-sans">
      {/* WELCOME BANNER */}
      <WelcomeBanner name={user?.name} />

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-[#0B1F17] sm:text-2xl">
            Dashboard
          </h1>
          <p className="mt-0.5 text-xs text-[#0B1F17]/60 sm:text-[13.5px]">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>

        <button
          type="button"
          onClick={reload}
          disabled={isFetching}
          aria-busy={isFetching}
          aria-label="Refresh dashboard statistics"
          className="
            flex w-full items-center justify-center gap-1.5 rounded-md 
            bg-[#0F6B45] px-3 py-2 text-[12.5px] font-medium text-white 
            transition-colors hover:bg-[#0C5A39] 
            disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto
          "
        >
          <ArrowPathIcon
            className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* ERROR STATE */}
      {status === "error" && (
        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center">
          <ExclamationCircleIcon className="h-5 w-5 shrink-0 text-red-500" />
          <span className="text-[13px] text-red-600">
            Couldn&apos;t load dashboard stats — {error}.
          </span>
          <button
            type="button"
            onClick={reload}
            className="rounded-md border border-red-200 px-3 py-1.5 text-[12.5px] text-red-600 hover:bg-red-100 sm:ml-auto"
          >
            Retry
          </button>
        </div>
      )}

      {/* METRIC CARDS */}
      {status === "loading" ? (
        <CardsSkeleton />
      ) : status === "ready" ? (
        <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {CARD_DEFS.map((def, index) => (
            <MetricCard
              key={def.key}
              def={def}
              cardData={cards[def.key]}
              featured={index === 0}
            />
          ))}
        </div>
      ) : null}

      {/* CHARTS + RECENT EVENTS */}
      {status === "ready" && (
        <div className="grid min-w-0 grid-cols-1 gap-3.5 lg:grid-cols-3">
          
          {/* Monthly Registrations — column chart */}
          <div className="min-w-0 rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 text-[13.5px] font-medium text-[#0B1F17]">
              Monthly registrations
            </div>
            {monthly.length === 0 ? (
              <EmptyChart />
            ) : (
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthly}
                    margin={{ top: 4, right: 8, bottom: 0, left: -20 }}
                    barCategoryGap="30%"
                  >
                    <CartesianGrid
                      stroke="rgba(11,31,23,0.08)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={chartAxisTick}
                      axisLine={chartAxisLine}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={chartAxisTick}
                      axisLine={false}
                      tickLine={false}
                      width={32}
                    />
                    <Tooltip
                      contentStyle={chartTooltipStyle}
                      cursor={{ fill: "rgba(15,107,69,0.08)" }}
                    />
                    <Bar
                      dataKey="count"
                      fill="#0F6B45"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={36}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Cumulative User Growth */}
          <div className="min-w-0 rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-3 text-[13.5px] font-medium text-[#0B1F17]">
              Cumulative user growth
            </div>
            {growth.length === 0 ? (
              <EmptyChart />
            ) : (
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={growth}
                    margin={{ top: 4, right: 8, bottom: 0, left: -20 }}
                  >
                    <defs>
                      <linearGradient
                        id="growthFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#0F6B45" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#0F6B45" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="rgba(11,31,23,0.08)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={chartAxisTick}
                      axisLine={chartAxisLine}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={chartAxisTick}
                      axisLine={false}
                      tickLine={false}
                      width={32}
                    />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="cumulative_total"
                      stroke="#0F6B45"
                      strokeWidth={2}
                      fill="url(#growthFill)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Scheduled Events */}
          <RecentEventsCard
            events={events}
            loading={eventsLoading}
            error={eventsError}
            onNewEvent={() => setShowCreate(true)}
          />

        </div>
      )}

      {/* CREATE EVENT MODAL — same modal/logic as the Events page */}
      {showCreate && (
        <CreateEventModal
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          eventLink={eventLink}
          setEventLink={setEventLink}
          eventDate={eventDate}
          setEventDate={setEventDate}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          submitting={isCreatingEvent}
          onSubmit={handleSubmit}
          onClose={() => setShowCreate(false)}
        />
      )}
    </div>
  );
}