export default function CoreSolutions() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-badges">Our Core Solutions</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          The Two Pillars of Empowerment
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          
          {/* Card 1: Left Tall - Agribusiness */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white/5 lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Project L - Chapter B</p>
                <p className="mt-2 max-w-lg text-sm/6 text-hero-text max-lg:text-center">
                  Agribusiness, Farming Development & Agricultural Export. We organize farmers into cooperative units, providing tested seeds, modern tools, and direct export access.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-white/10 bg-white/5 outline outline-white/20">
                  <img
                    alt="Agribusiness"
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=1200&fit=crop"
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
          </div>

          {/* Card 2: Top Middle - Cooperative Farming */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white/5 max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Cooperative Production</p>
                <p className="mt-2 max-w-lg text-sm/6 text-hero-text max-lg:text-center">
                  Farmers grouped into units of 15 households, working collectively on each other's fields to improve productivity and share resources.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt="Cooperative farming"
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop"
                  className="w-full max-lg:max-w-xs rounded-lg"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
          </div>

          {/* Card 3: Bottom Middle - Capital Pooling */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white/5" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Structured Capital Cycles</p>
                <p className="mt-2 max-w-lg text-sm/6 text-hero-text max-lg:text-center">
                  Daily profit pooling of 10%, 20%, or 30% redistributed for verified business expansion without high-interest loans.
                </p>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  alt="Capital pooling"
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
                  className="h-[min(152px,40cqw)] w-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
          </div>

          {/* Card 4: Right Tall - Business Incubation */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Project L - Chapter A</p>
                <p className="mt-2 max-w-lg text-sm/6 text-hero-text max-lg:text-center">
                  Business Incubation, Capital Lifecycle & Security. We establish collective units of 60 businesses to address capital absence and business insecurity.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-white/5 outline outline-white/10">
                  <img
                    alt="Business incubation"
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=1200&fit=crop"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>

        </div>
      </div>
    </div>
  )
}