import { BriefcaseIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const highlights = [
  "Affordable growth capital",
  "Professional business training",
  "Cooperative resource sharing",
  "Direct market & export access",
];

export default function Story() {
  return (
    <section className="relative overflow-hidden bg-white py-24 font-sans sm:py-32">

      {/* Subtle ambient accents — light theme appropriate */}
      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-badges/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-badges/[0.04] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left Column: The Why */}
          <div id="ourstory" className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-badge-bg px-4 py-2 text-sm font-semibold uppercase tracking-wider text-badges">
              <span className="h-1.5 w-1.5 rounded-full bg-badges" />
              Our Journey
            </span>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              Our Story
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-color">
              OB39 was founded to solve a critical challenge: the high
              failure rate of young businesses and the untapped potential of
              small-scale farmers. We recognized that hard work wasn't enough
              without access to capital, knowledge, and organized markets.
            </p>

            {/* Quote */}
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/80 p-7 shadow-sm sm:p-9">
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-badges to-badges/40" />

              <svg
                className="absolute right-6 top-6 h-10 w-10 text-badges/10"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <p className="relative text-lg italic leading-8 text-heading">
                "Real transformation happens when communities own the tools,
                knowledge, and opportunities that shape their future."
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-text-color">
                — OB39 Leadership
              </p>
            </div>
          </div>

          {/* Right Column: The Solution */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/60 sm:p-10 lg:p-12">

            {/* Corner accent */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-badges/[0.07] blur-2xl" />

            <div className="relative flex items-center gap-5">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-badge-bg ring-1 ring-inset ring-badges/10">
                <BriefcaseIcon className="h-7 w-7 text-badges" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-heading">
                Building Growth Infrastructure
              </h3>
            </div>

            <p className="relative mt-7 text-lg leading-8 text-text-color">
              Instead of solving these problems individually, we built one
              integrated ecosystem. We combine cooperative finance, business
              incubation, and digital marketplaces to help entrepreneurs and
              farming communities thrive sustainably.
            </p>

            <div className="relative mt-9">
              <h4 className="text-sm font-bold uppercase tracking-wider text-heading">
                This foundation enables:
              </h4>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3 rounded-xl border border-transparent bg-badge-bg px-4 py-3.5 transition-all duration-300 hover:border-badges/20 hover:bg-badges/10 hover:shadow-md hover:shadow-badges/10"
                  >
                    <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-badges transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm font-semibold text-heading">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}