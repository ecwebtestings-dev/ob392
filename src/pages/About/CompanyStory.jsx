import { BriefcaseIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const highlights = [
  "Affordable growth capital",
  "Professional business training",
  "Cooperative resource sharing",
  "Direct market & export access",
];

export default function Story() {
  return (
    <section className="bg-white py-20 sm:py-15 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left Column: The Why */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full bg-badge-bg px-4 py-2 text-sm font-semibold uppercase tracking-wider text-badges">
              Our Journey
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              Our Story
            </h2>

            <p className="mt-5 text-md leading-7 text-text-color">
              OB39 was founded to solve a critical challenge: the high failure rate of young businesses and the untapped potential of small-scale farmers. We recognized that hard work wasn't enough without access to capital, knowledge, and organized markets.
            </p>

            {/* Quote */}
            <div className="relative mt-5 rounded-2xl bg-gray-50 p-6 sm:p-8">
              <div className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl bg-badges"></div>
              <p className="relative text-md italic leading-7 text-heading">
                "Real transformation happens when communities own the tools, knowledge, and opportunities that shape their future."
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-text-color">
                — OB39 Leadership
              </p>
            </div>
          </div>

          {/* Right Column: The Solution */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-10 lg:p-12">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-badge-bg">
                <BriefcaseIcon className="h-7 w-7 text-badges" />
              </div>
              <h3 className="text-2xl font-bold text-heading">
                Building Growth Infrastructure
              </h3>
            </div>

            <p className="mt-6 text-md leading-7 text-text-color">
              Instead of solving these problems individually, we built one integrated ecosystem. We combine cooperative finance, business incubation, and digital marketplaces to help entrepreneurs and farming communities thrive sustainably.
            </p>

            <div className="mt-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-heading">
                This foundation enables:
              </h4>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-badge-bg px-4 py-3 transition-colors hover:bg-badges/10"
                  >
                    <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-badges" />
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