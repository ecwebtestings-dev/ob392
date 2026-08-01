import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { onSessionExpired } from "./SessionEvent";
import { api } from "./api";


export default function SessionExpiredModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // onSessionExpired returns an unsubscribe function
    const unsubscribe = onSessionExpired(() => {
      setOpen(true);
    });
    return unsubscribe;
  }, []);

  function handleLoginAgain() {
    api.setToken(null);
    setOpen(false);
    navigate("/login", { replace: true });
  }

  if (!open) return null;

  return (
    <Dialog open onClose={() => {}} className="relative z-[100]">
      {/* BACKDROP  */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-start gap-3">
            <span className="flex size-10 flex-none items-center justify-center rounded-full bg-red-50">
              <ExclamationTriangleIcon className="size-5 text-red-500" />
            </span>

            <div className="min-w-0">
              <DialogTitle className="text-base font-semibold text-gray-900">
                Session expired
              </DialogTitle>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                Please log in again to continue.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLoginAgain}
            className="mt-6 w-full cursor-pointer hover:bg-[#116742] rounded-lg bg-[#063822] px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            Log in again
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}