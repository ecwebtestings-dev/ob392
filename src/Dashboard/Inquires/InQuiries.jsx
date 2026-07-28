import {
  EnvelopeIcon,
  ClockIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useInquiries } from "./useInquiries";
import { getInitials, getAvatarColor, formatInquiryDate } from "./inQuiryHelper";

export default function Inquiries() {
  const { inquiries, loading, error, stats } = useInquiries();

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold tracking-tight text-heading">
        Inquiries
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Messages submitted through the website contact form.
      </p>

      {/* Stat Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={EnvelopeIcon} label="Total Inquiries" value={stats.total} />
        <StatCard icon={ClockIcon} label="This Week" value={stats.thisWeek} />
        <StatCard icon={BuildingOfficeIcon} label="From Organisations" value={stats.withOrg} />
      </div>

      {/* Table — fixed-size card; scrolls internally in both directions
          instead of resizing or breaking out of the page layout */}
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading inquiries...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-sm text-red-500">{error}</div>
        ) : inquiries.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">
            No inquiries yet.
          </div>
        ) : (
          <div className="max-h-[600px] w-full overflow-x-auto overflow-y-auto">
            <table className="w-full min-w-[720px] divide-y divide-gray-200 text-xs">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr>
                  <Th>Name</Th>
                  <Th>Contact</Th>
                  <Th>Organisation</Th>
                  <Th>Subject</Th>
                  <Th>Message</Th>
                  <Th>Received</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <InquiryRow key={inq.id} inquiry={inq} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}



function InquiryRow({ inquiry }) {
  return (
    <tr className="transition-colors hover:bg-gray-50">
      <Td>
        <div className="flex items-center gap-3">
          <span
            className={`flex size-8 flex-none items-center justify-center rounded-full text-xs font-semibold ${getAvatarColor(
              inquiry.full_name
            )}`}
          >
            {getInitials(inquiry.full_name)}
          </span>
          <span className="font-medium text-heading">{inquiry.full_name}</span>
        </div>
      </Td>
      <Td>
        <div className="flex flex-col">
          <span className="text-heading">{inquiry.email}</span>
          <span className="text-xs text-gray-400">
            {inquiry.phone || "No phone provided"}
          </span>
        </div>
      </Td>
      <Td>
        {inquiry.organisation ? (
          <span className="inline-flex items-center rounded-full bg-badge-bg px-2.5 py-1 text-xs font-medium text-icons">
            {inquiry.organisation}
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </Td>
      <Td className="font-medium text-heading">{inquiry.subject || "—"}</Td>
      <Td className="max-w-xs truncate text-gray-500" title={inquiry.message}>
        {inquiry.message}
      </Td>
      <Td className="whitespace-nowrap text-gray-500">
        {formatInquiryDate(inquiry.created_at)}
      </Td>
    </tr>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex size-11 items-center justify-center rounded-xl bg-badge-bg">
        <Icon className="size-5 text-icons" />
      </div>
      <p className="mt-4 text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-heading">{value}</p>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
      {children}
    </th>
  );
}

function Td({ children, className = "", ...rest }) {
  return (
    <td className={`px-4 py-3 align-middle text-gray-700 ${className}`} {...rest}>
      {children}
    </td>
  );
}