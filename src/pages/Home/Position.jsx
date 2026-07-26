import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

// The programmes OB39 extends the reach of — a set, not a sequence, so these render as
// a flat list of pills rather than numbered steps.
const programmes = [
  "Parish Development Model",
  "Emyooga",
  "Operation Wealth Creation",
  "Uganda Women Entrepreneurship Programme",
  "Youth Livelihood Programme",
  "National Strategy for Youth Employment in Agriculture",
];

// OB39's actual workflow, in order — this genuinely is a sequence, so it earns numbering.
const process = [
  "Identify",
  "Organize",
  "Train & support",
  "Connect to finance & markets",
  "Monitor",
];

export default function PositioningSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-15"
    >
      {/* Ambient depth — a single soft green wash, kept subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 size-[32rem] rounded-full bg-badge-bg/60 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow + headline + intro */}
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-badges">
            <span className="h-px w-8 bg-badges" />
            Where OB39 stands
            <span className="h-px w-8 bg-badges" />
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-heading sm:text-4xl lg:text-[2.75rem]">
            Not another programme —{" "}
            <span className="text-badges">the bridge that makes yours work.</span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
            Instead of competing with existing government and NGO programmes, OB39
            serves as a community implementation partner — identifying entrepreneurs
            and farmers, organizing them into structured groups, and carrying them
            from training through to finance, markets, and long-term monitoring.
          </p>
        </div>

        {/* THE BRIDGE — signature element */}
        <div className="relative mt-16 lg:mt-20">
          {/* Connecting line, desktop only, sits behind the three nodes */}
          <div
            aria-hidden="true"
            className={`absolute top-1/2 left-[16.5%] right-[16.5%] hidden h-px -translate-y-1/2 bg-gradient-to-r from-badges/60 via-badges to-badges/60 transition-opacity duration-700 lg:block ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center lg:gap-8">
            {/* Shore A — Programmes */}
            <BridgeCard
              inView={inView}
              delay="delay-100"
              label="Government & development programmes"
            >
              <ul className="mt-4 flex flex-wrap gap-2">
                {programmes.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium leading-snug text-icons ring-1 ring-icons/15"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </BridgeCard>

            {/* Mobile-only connector */}
            <Connector inView={inView} />

            {/* The bridge itself — OB39, carrying its real workflow */}
            <div
              className={`relative z-10 flex flex-col rounded-3xl bg-background px-6 py-7 shadow-[0_20px_60px_-15px_rgba(0,2,56,0.4)] transition-all duration-700 lg:scale-105 ${
                inView ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 flex-none items-center justify-center rounded-full bg-badges text-sm font-extrabold tracking-tight text-background">
                  39
                </span>
                <div>
                  <p className="text-sm font-bold tracking-tight text-white">OB39</p>
                  <p className="text-xs text-hero-text/70">
                    Community implementation partner
                  </p>
                </div>
              </div>

              <ol className="mt-5 space-y-2">
                {process.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2"
                  >
                    <span className="flex size-4 flex-none items-center justify-center rounded-full bg-badges/20 text-[9px] font-bold text-badges">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-hero-text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Mobile-only connector */}
            <Connector inView={inView} />

            {/* Shore B — Entrepreneurs & farmers */}
            <BridgeCard
              inView={inView}
              delay="delay-300"
              label="Entrepreneurs & farmers"
            >
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Grouped for accountability, equipped with business and agricultural
                capability, linked to real buyers and finance — and followed up long
                after the training ends.
              </p>
            </BridgeCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// Shared "shore" card — the two endpoints the bridge connects.
function BridgeCard({ label, children, inView, delay }) {
  return (
    <div
      className={`h-full rounded-3xl bg-card-background px-6 py-7 transition-all duration-700 ${delay} ${
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-icons">
        {label}
      </p>
      {children}
    </div>
  );
}

// Vertical connector shown only below lg — removed from grid flow entirely on lg via lg:hidden,
// so it doesn't consume a column in the 3-col desktop layout.
function Connector({ inView }) {
  return (
    <div
      className={`flex items-center justify-center py-1 transition-opacity duration-700 lg:hidden ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <ArrowDownIcon className="size-5 text-badges/60" />
    </div>
  );
}