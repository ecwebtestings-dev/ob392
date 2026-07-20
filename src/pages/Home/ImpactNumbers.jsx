const stats = [
  {
    value: "200",
    suffix: "+",
    title: "Farmer Cooperatives",
    description: "SACCOs • Cooperatives • VSLAs",
  },
  {
    value: "60",
    suffix: "+",
    title: "Business Units",
    description: "Proven incubation infrastructure",
  },
  {
    value: "500",
    suffix: "+",
    title: "Lives Impacted",
    description: "Active accounts served",
  },
  {
    value: "20",
    suffix: "+",
    title: "Districts Reached",
    description: "Including remote areas",
  },
];

const impact = [
  {
    value: "2M+",
    title: "Capital Deployed",
    description: "From cooperative and partner financing.",
  },
  {
    value: "96%",
    title: "Repayment Rate",
    description: "Community-based lending model that works",
  },
  {
    value: "45%",
    title: "Are Women",
    description: "Economic empowerment for female entrepreneurs",
  },
];

export default function ImpactNumbers() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            The Numbers Don't Lie: This Is Scale
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500">
            From small farming cooperatives to a national digital marketplace
            — we've built the infrastructure that actually works.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white px-5 py-6 text-center transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-100"
            >
              <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {item.value}
                <span className="text-badges">{item.suffix}</span>
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-800">
                {item.title}
              </p>

              <p className="mt-1 text-xs font-medium text-badges/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Green Panel */}
        <div className="mt-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br bg-green-700 via-green-800 to-green-900 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">

            {/* Decorative glow */}
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-black/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Real Economic Impact
              </h3>
              <p className="mt-3 text-base text-white/90">
                This is what happens when you build infrastructure that
                actually works.
              </p>
            </div>

            {/* Impact Grid */}
            <div className="relative mt-10 grid gap-y-8 sm:grid-cols-3 sm:gap-x-8">
              {impact.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center">
                  <p className="text-3xl font-extrabold tracking-tight text-[#FFD230] sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 max-w-[220px] text-xs font-medium text-white/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}