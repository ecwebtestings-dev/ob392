import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../Authentication/api";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchInquiries() {
      try {
        const token = api.getToken();
        const res = await fetch(`${BASE_URL}/inquiry`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load inquiries");
        }

        const data = await res.json();

        // Adjust this line if your API wraps the array, e.g. data.data or data.inquiries
        if (!cancelled) setInquiries(Array.isArray(data) ? data : data.data ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          toast.error(err.message || "Could not load inquiries");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchInquiries();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Inquiries
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Messages submitted through the website contact form.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Organisation</Th>
                  <Th>Subject</Th>
                  <Th>Message</Th>
                  <Th>Received</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50">
                    <Td>{inq.full_name}</Td>
                    <Td>{inq.email}</Td>
                    <Td>{inq.phone || "—"}</Td>
                    <Td>{inq.organisation || "—"}</Td>
                    <Td>{inq.subject || "—"}</Td>
                    <Td className="max-w-xs truncate" title={inq.message}>
                      {inq.message}
                    </Td>
                    <Td>
                      {inq.created_at
                        ? new Date(inq.created_at).toLocaleDateString()
                        : "—"}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
    <td className={`px-4 py-3 text-gray-700 ${className}`} {...rest}>
      {children}
    </td>
  );
}