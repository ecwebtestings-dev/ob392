import { useCallback } from "react";
import { Link } from "react-router-dom";
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
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import { api } from "../../Authentication/api";

// ============================================================
// CONFIGURATION
// ============================================================

const STATS_ENDPOINT = "/dashboard/stats";
const DASHBOARD_STATS_QUERY_KEY = ["dashboard-stats"];

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
      {
        field: "active",
        label: "Active",
        tone: "primary",
      },
      {
        field: "suspended",
        label: "Suspended",
        tone: "muted",
      },
    ],
  },

  {
    key: "inquiries",
    label: "Inquiries",
    icon: EnvelopeIcon,
    to: "/dashboard/inquiries",
    chips: [
      {
        field: "unreplied",
        label: "Unreplied",
        tone: "muted",
      },
      {
        field: "replied",
        label: "Replied",
        tone: "primary",
      },
    ],
  },

  {
    key: "events",
    label: "Events",
    icon: CalendarDaysIcon,
    to: "/dashboard/events",
    chips: [
      {
        field: "pending",
        label: "Pending",
        tone: "muted",
      },
      {
        field: "completed",
        label: "Completed",
        tone: "primary",
      },
    ],
  },
];

// ============================================================
// TOOLTIP STYLE (dark)
// ============================================================

const chartTooltipStyle = {
  background: "#0B0F3D",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  fontSize: 12,
  fontFamily: "var(--font-sans)",
  color: "#ffffff",
};

const chartAxisTick = { fill: "#9CA6C2", fontSize: 11 };
const chartAxisLine = { stroke: "rgba(255,255,255,0.14)" };

// ============================================================
// FETCH DASHBOARD STATS (react-query)
// ============================================================

async function fetchDashboardStats() {
  const json = await api.get(STATS_ENDPOINT);

  console.log("Dashboard stats response:", json);

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
    staleTime: 60_000, // data is considered fresh for 1 minute — no refetch on remount within that window
    gcTime: 5 * 60_000, // cached data kept in memory for 5 minutes after last use
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
// METRIC CARD
// ============================================================

function MetricCard({ def, cardData }) {
  const Icon = def.icon;

  const total = cardData?.total ?? 0;

  return (
    <Link
      to={def.to}
      className="
        block
        rounded-xl
        border
        border-white/10
        bg-white/5
        p-4
        transition-colors
        hover:border-badges/40
        hover:bg-white/[0.07]
      "
    >
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[13px] text-hero-text">
          {def.label}
        </span>

        <Icon className="h-4 w-4 text-badges" />
      </div>

      <div className="mb-3 text-2xl font-semibold text-white">
        {Number(total).toLocaleString()}
      </div>

      <div className="flex flex-wrap gap-2">
        {def.chips.map((chip) => {
          const value = cardData?.[chip.field] ?? 0;

          const isPrimary = chip.tone === "primary";

          return (
            <span
              key={chip.field}
              className={
                isPrimary
                  ? `
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-md
                    bg-badges/15
                    px-2
                    py-1
                    text-[11.5px]
                    text-badges
                  `
                  : `
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-md
                    bg-white/10
                    px-2
                    py-1
                    text-[11.5px]
                    text-hero-text
                  `
              }
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
// LOADING SKELETON
// ============================================================

function CardsSkeleton() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="
            min-h-[108px]
            animate-pulse
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-4
          "
        >
          <div className="mb-3.5 h-2.5 w-2/5 rounded bg-white/10" />

          <div className="mb-3.5 h-5 w-3/5 rounded bg-white/10" />

          <div className="h-2.5 w-4/5 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MAIN DASHBOARD
// ============================================================

export default function DashboardOverview() {
  const {
    status,
    data,
    error,
    isFetching,
    reload,
  } = useDashboardStats();

  const cards = data?.cards ?? {};

  const monthly =
    data?.charts?.user_registrations_monthly ?? [];

  const growth =
    data?.charts?.user_growth_trend ?? [];

  return (
    <div className="min-w-0 rounded-2xl bg-background p-6 font-sans">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-white sm:text-2xl">
            Dashboard overview
          </h1>

          <p className="mt-0.5 text-xs text-hero-text sm:text-[13.5px]">
            Summary and registration trends
          </p>
        </div>

        <button
          type="button"
          onClick={reload}
          disabled={isFetching}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-md
            bg-button-bg
            px-3
            py-2
            text-[12.5px]
            font-medium
            text-white
            transition-colors
            hover:bg-button-hover
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
          "
        >
          <ArrowPathIcon
            className={`
              h-3.5
              w-3.5
              ${isFetching ? "animate-spin" : ""}
            `}
          />

          Refresh
        </button>
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {status === "error" && (
        <div
          className="
            mb-4
            flex
            flex-col
            gap-3
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            sm:flex-row
            sm:items-center
          "
        >
          <ExclamationCircleIcon className="h-5 w-5 shrink-0 text-red-400" />

          <span className="text-[13px] text-red-300">
            Couldn't load dashboard stats — {error}.
          </span>

          <button
            type="button"
            onClick={reload}
            className="
              rounded-md
              border
              border-red-500/30
              px-3
              py-1.5
              text-[12.5px]
              text-red-300
              hover:bg-red-500/10
              sm:ml-auto
            "
          >
            Retry
          </button>
        </div>
      )}

      {/* ======================================================
          CARDS
      ====================================================== */}

      {status === "loading" ? (
        <CardsSkeleton />
      ) : status === "ready" ? (
        <div
          className="
            mb-4
            grid
            grid-cols-1
            gap-3.5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {CARD_DEFS.map((def) => (
            <MetricCard
              key={def.key}
              def={def}
              cardData={cards[def.key]}
            />
          ))}
        </div>
      ) : null}

      {/* ======================================================
          CHARTS
      ====================================================== */}

      {status === "ready" && (
        <div className="grid min-w-0 grid-cols-1 gap-3.5 lg:grid-cols-2">

          {/* ==================================================
              MONTHLY REGISTRATIONS
          ================================================== */}

          <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="mb-3 text-[13.5px] font-medium text-white">
              Monthly registrations
            </div>

            {monthly.length === 0 ? (
              <EmptyChart />
            ) : (
              <div className="h-[200px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={monthly}
                    margin={{
                      top: 4,
                      right: 8,
                      bottom: 0,
                      left: -20,
                    }}
                  >
                    <CartesianGrid
                      stroke="rgba(255,255,255,0.08)"
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
                      cursor={{ fill: "rgba(89,185,71,0.08)" }}
                    />

                    <Bar
                      dataKey="count"
                      fill="#59B947"
                      radius={[3, 3, 0, 0]}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* ==================================================
              USER GROWTH
          ================================================== */}

          <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="mb-3 text-[13.5px] font-medium text-white">
              Cumulative user growth
            </div>

            {growth.length === 0 ? (
              <EmptyChart />
            ) : (
              <div className="h-[200px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart
                    data={growth}
                    margin={{
                      top: 4,
                      right: 8,
                      bottom: 0,
                      left: -20,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="growthFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#59B947"
                          stopOpacity={0.35}
                        />

                        <stop
                          offset="100%"
                          stopColor="#59B947"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      stroke="rgba(255,255,255,0.08)"
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
                    />

                    <Area
                      type="monotone"
                      dataKey="cumulative_total"
                      stroke="#59B947"
                      strokeWidth={2}
                      fill="url(#growthFill)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// EMPTY CHART
// ============================================================

function EmptyChart() {
  return (
    <div className="flex h-[200px] items-center justify-center text-center text-[12.5px] text-hero-text">
      No data for this period yet.
    </div>
  );
}