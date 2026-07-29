
import { useState } from "react";
import {
  EnvelopeIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import { useInquiries } from "./useInquiries";
import { formatInquiryDate } from "./inQuiryHelper";

const PAGE_SIZE = 15;


// ============================================================
// MAIN PAGE
// ============================================================

export default function Inquiries() {
  const { inquiries, loading, error, stats } = useInquiries();
  //SORTING ACCORDINGLY
  const sortedInquiries = [...inquiries].sort(
    (a,b)=> new Date(b.created_at)-new Date(a.created_at)
  );


  //PAGES
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1,Math.ceil(sortedInquiries.length / PAGE_SIZE));

  const start = (page - 1) * PAGE_SIZE;

  const pageInquiries = sortedInquiries.slice(
    start,
    start + PAGE_SIZE
  );

  function goToPage(next) {
    setPage(
      Math.min(
        Math.max(next, 1),
        totalPages
      )
    );
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl overflow-hidden">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
          Inquiries
        </h1>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
          Messages submitted through the website contact form.
        </p>
      </div>


      {/* ======================================================
          STATISTICS CARDS
      ====================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">

        <StatCard
          icon={EnvelopeIcon}
          label="Total Inquiries"
          value={stats.total}
        />

        <StatCard
          icon={ClockIcon}
          label="This Week"
          value={stats.thisWeek}
        />

        <StatCard
          icon={BuildingOfficeIcon}
          label="From Organisations"
          value={stats.withOrg}
        />

      </div>


      {/* ======================================================
          TABLE CONTAINER
      ====================================================== */}

      <div className="mt-6 w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:mt-8 sm:rounded-2xl">

        {/* LOADING */}
        {loading ? (
          <div className="flex h-[450px] items-center justify-center px-4 text-center text-xs text-gray-500 sm:h-[500px] lg:h-[600px]">
            Loading inquiries...
          </div>

        /* ERROR */
        ) : error ? (
          <div className="flex h-[450px] items-center justify-center px-4 text-center text-xs text-red-500 sm:h-[500px] lg:h-[600px]">
            {error}
          </div>

        /* EMPTY */
        ) : inquiries.length === 0 ? (
          <div className="flex h-[450px] items-center justify-center px-4 text-center text-xs text-gray-500 sm:h-[500px] lg:h-[600px]">
            No inquiries yet.
          </div>

        /* DATA */
        ) 
        : (
          <>
            {/* ==================================================
                FIXED HEIGHT TABLE
            ================================================== */}

            <div
              className="
                h-[450px]
                w-full
                min-w-0
                overflow-x-auto
                overflow-y-auto
                sm:h-[500px]
                lg:h-[600px]
              "
            >

              <table
                className="
                  w-full
                  min-w-[720px]
                  divide-y
                  divide-gray-200
                  text-[11px]
                  sm:text-xs
                "
              >

                {/* TABLE HEADER */}

                <thead className="sticky top-0 z-10 bg-gray-50">
                  <tr>

                    <Th>Name</Th>

                    <Th>Contact</Th>

                    <Th>Organisation</Th>

                    <Th>Subject</Th>
                    <Th>Phone</Th>
                    <Th>Message</Th>

                    <Th>Received</Th>

                  </tr>
                </thead>


                {/* TABLE BODY */}

                <tbody className="divide-y divide-gray-100">

                  {pageInquiries.map((inq) => (
                    <InquiryRow
                      key={inq.id}
                      inquiry={inq}
                    />
                  ))}

                </tbody>

              </table>

            </div>


            {/* ==================================================
                PAGINATION
            ================================================== */}

            <Pagination
              page={page}
              totalPages={totalPages}
              total={inquiries.length}
              pageSize={PAGE_SIZE}
              onPrev={() => goToPage(page - 1)}
              onNext={() => goToPage(page + 1)}
            />

          </>
        )}

      </div>

    </div>
  );
}


// ============================================================
// INQUIRY ROW
// ============================================================

function InquiryRow({ inquiry }) {
  return (
    <tr className="transition-colors hover:bg-gray-50">

      {/* NAME */}

      <Td>
        <div className="flex min-w-[100px] items-center gap-2 sm:gap-3">
          <span className=" text-heading">
            {inquiry.full_name}
          </span>
        </div>
      </Td>


      {/* CONTACT */}

      <Td>
        <div className="flex min-w-[170px] ">

          <span className="truncate items-center text-heading">
            {inquiry.email}
          </span>

         
        </div>
      </Td>


      {/**PHONE NUMBER */}
      <Td>
          <div className=" min-w-[120] px-2 py-1">
           <span className="mt-0.5  sm:text-xs">
            {inquiry.phone || "No phone provided"}
          </span>
        </div>

      </Td>
       
      {/* ORGANISATION */}

      <Td>
        <div className="min-w-[120px]">

          {inquiry.organisation && (
            <span className="inline-flex max-w-[180px] truncate items-center px-2 py-1 text-[10px] sm:text-xs">
              {inquiry.organisation}
            </span>
          )
          }

        </div>
      </Td>


      {/* SUBJECT */}

      <Td className=" text-heading">
        <div className="min-w-[130px] max-w-[220px] truncate">
          {inquiry.subject || ""}
        </div>
      </Td>


      {/* MESSAGE */}

      <Td
        className="max-w-xs text-gray-500"
        title={inquiry.message}
      >
        <div className="max-w-[250px] truncate sm:max-w-xs">
          {inquiry.message}
        </div>
      </Td>


      {/* DATE */}

      <Td className="whitespace-nowrap text-gray-500">
        {formatInquiryDate(inquiry.created_at)}
      </Td>

    </tr>
  );
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({ icon: Icon, label, value }) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
        sm:block
        sm:rounded-2xl
        sm:p-5
      "
    >

      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-badge-bg sm:size-11 sm:rounded-xl">
        <Icon className="size-5 text-icons" />
      </div>

      <div className="min-w-0 sm:mt-4">

        <p className="text-xs text-gray-500 sm:text-sm">
          {label}
        </p>

        <p className="mt-0.5 text-xl font-bold text-heading sm:mt-1 sm:text-2xl">
          {value}
        </p>

      </div>

    </div>
  );
}


// ============================================================
// TABLE HEADER
// ============================================================

function Th({ children }) {
  return (
    <th
      className="
        whitespace-nowrap
        px-3
        py-2.5
        text-left
        text-[10px]
        font-semibold
        uppercase
        tracking-wider
        text-gray-500
        sm:px-4
        sm:py-3
        sm:text-xs
      "
    >
      {children}
    </th>
  );
}


// ============================================================
// TABLE CELL
// ============================================================

function Td({
  children,
  className = "",
  ...rest
}) {
  return (
    <td
      className={`
        px-3
        py-2
        align-middle
        text-[11px]
        text-gray-700
        sm:px-4
        sm:py-2.5
        sm:text-xs
        ${className}
      `}
      {...rest}
    >
      {children}
    </td>
  );
}


// ============================================================
// PAGINATION
// ============================================================

function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPrev,
  onNext,
}) {
  const start =
    total === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const end = Math.min(
    page * pageSize,
    total
  );

  return (
    <div
      className="
        flex
        flex-col
        gap-3
        border-t
        border-gray-100
        bg-gray-50
        px-3
        py-3
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-4
      "
    >

      {/* RESULTS */}

      <p className="text-center text-[11px] text-gray-500 sm:text-left sm:text-xs">

        <span className="font-medium text-heading">
          {start}
        </span>

        –

        <span className="font-medium text-heading">
          {end}
        </span>

        {" "}of{" "}

        <span className="font-medium text-heading">
          {total}
        </span>

      </p>


      {/* CONTROLS */}

      <div className="flex items-center justify-center gap-2">

        {/* PREVIOUS */}

        <button
          type="button"
          onClick={onPrev}
          disabled={page === 1}
          aria-label="Previous page"
          className="
            flex
            size-8
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            text-gray-600
            transition-colors
            hover:bg-gray-50
            hover:text-heading
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronLeftIcon className="size-4" />
        </button>


        {/* CURRENT PAGE */}

        <span className="whitespace-nowrap px-2 text-[11px] font-medium text-gray-500 sm:text-xs">
           {page} of {totalPages}
        </span>


        {/* NEXT */}

        <button
          type="button"
          onClick={onNext}
          disabled={page === totalPages}
          aria-label="Next page"
          className="
            flex
            size-8
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            text-gray-600
            transition-colors
            hover:bg-gray-50
            hover:text-heading
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronRightIcon className="size-4" />
        </button>

      </div>

    </div>
  );
}

