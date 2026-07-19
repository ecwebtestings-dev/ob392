export default function AuthLayout({ children }) {
  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-badges/10 blur-3xl" />

      <div className="relative w-full max-w-[400px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="px-3 py-10 sm:px-6 sm:py-8">
          {children}
        </div>
      </div>
    </section>
  );
}