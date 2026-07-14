import StatCard from "../../components/ui/Cards.jsx";

const stats = [
  {
    value: "200",
    suffix: "+",
    title: "Farmer Cooperatives",
    description: "Working together.",
  },
  {
    value: "60",
    suffix: "+",
    title: "Business Units",
    description: "Growing together.",
  },
  {
    value: "500",
    suffix: "+",
    title: "Lives Impacted",
    description: "Active accounts served.",
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
    value: "1M+",
    title: "People Empowered",
    description: "Creating opportunities across Africa.",
  },
  {
    value: "54+",
    title: "African Markets",
    description: "Connecting producers to buyers.",
  },
  {
    value: "Sustainable",
    title: "Economic Growth",
    description: "Building stronger local economies.",
  },
];

export default function ImpactNumbers() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      {/* Top Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-green-600">
            Our Impact
          </h2>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            The Numbers Don't Lie: This Is Scale
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Our Services combine cooperative finance, business incubation,
            agribusiness development, digital marketplaces and export
            facilitation into one integrated ecosystem.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.title} className="transition-transform duration-300 hover:-translate-y-1">
              <StatCard
                value={item.value}
                suffix={item.suffix}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>

      {/*  Green Panel */}
      <div className="mt-24 px-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden md:rounded-3xl bg-gradient-to-br from-[#4FB145] via-[#319C3E] to-[#008737] px-6 py-16 shadow-2xl sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 -ml-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>

            <div className="relative mx-auto max-w-2xl text-center">
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Our Vision for Africa
              </h3>

              <p className="mt-6 text-lg leading-relaxed text-white sm:text-xl">
                Empowering communities through cooperative capital,
                innovation, entrepreneurship and direct access to global
                markets.
              </p>
            </div>

            {/* Impact Grid  */}
            <div className="relative mt-10 grid gap-12  sm:grid-cols-3 sm:gap-8">
              {impact.map((item, index) => (
                <div 
                  key={item.title} 
                  className={`flex flex-col items-center ${
                    // dividers on larger screens
                    index !== impact.length - 1 ? 'sm:border-r sm:border-white/20' : ''
                  }`}
                >
                  <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {item.value}
                  </p>

                  <p className="mt-2 text-xl font-semibold text-white">
                    {item.title}
                  </p>

                  <p className="mt-2 text-sm font-medium Capitalise tracking-wide text-white">
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