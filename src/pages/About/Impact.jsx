const regions = [
  {
    label: "Uganda",
    stat: "90%",
    statLabel: "of the private sector",
    points: [
      { value: "90%+", text: "of the private sector is made up of MSMEs" },
      { value: "3M+", text: "Ugandans employed through MSMEs" },
    ],
    footnote: "Making MSMEs one of the country's largest sources of employment.",
  },
  {
    label: "Africa",
    stat: "90%",
    statLabel: "of businesses are SMEs",
    points: [
      { value: "90%+", text: "of businesses across Africa are SMEs" },
      { value: "63%", text: "of employment generated in low-income countries" },
      { value: "80–90%", text: "of employment when informal micro-enterprises & self-employment are included" },
    ],
    footnote: "SMEs remain the backbone of employment across the continent.",
  },
];

export default function MsmeImpact() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-badges/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-badges/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-badges/30 bg-badges/10 px-4 py-1.5 text-sm font-medium tracking-wide text-badges">
            <span className="h-1.5 w-1.5 rounded-full bg-badges animate-pulse" />
            Why MSMEs Matter
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The Backbone of{" "}
            <span className="text-white">
              Local Economies
            </span>
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-gray-400">
            Micro, Small and Medium Enterprises aren't a niche of the
            economy — in Uganda and across Africa, they are the economy.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
          {regions.map((region) => (
            <div
              key={region.label}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:border-badges/30 hover:bg-white/[0.06] sm:p-10"
            >
              {/* Corner glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-badges/0 blur-2xl transition-colors duration-500 group-hover:bg-badges/15" />

              {/* Region label */}
              <span className="relative z-10 text-xs font-semibold uppercase tracking-widest text-badges/80">
                {region.label}
              </span>

              {/* Hero stat */}
              <p className="relative z-10 mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                {region.stat}
              </p>
              <p className="relative z-10 mt-1 text-sm font-medium text-gray-400">
                {region.statLabel}
              </p>

              {/* Divider */}
              <div className="relative z-10 mt-7 h-px w-full bg-gradient-to-r from-badges/0 via-white/10 to-badges/0" />

              {/* Data points */}
              <ul className="relative z-10 mt-7 space-y-5">
                {region.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex-none rounded-lg border border-badges/20 bg-badges/10 px-2.5 py-1 text-sm font-bold text-badges">
                      {point.value}
                    </span>
                    <span className="text-sm leading-relaxed text-gray-300">
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footnote */}
              <p className="relative z-10 mt-7 text-sm italic leading-relaxed text-gray-500">
                {region.footnote}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom takeaway strip */}
        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-badges/20 bg-badges/[0.06] px-6 py-5 text-center">
          <p className="text-sm font-medium leading-relaxed text-gray-300">
            <span className="font-semibold text-badges">This is why OB39 exists</span>{" "}
            — to give MSMEs and micro-enterprises the capital, training, and
            market access they need to grow, formalize, and thrive.
          </p>
        </div>
      </div>
    </section>
  );
}