import { BeakerIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/20/solid'
import images from '../../assets/assets'

export default function AboutOverview() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-badges/20"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-badge-bg">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-badges">About OB39 Ltd</p>
              <h1 className="mt-2 text-3xl font-semibold tracking  text-heading sm:text-5xl">
                Transforming African Potential into Global Competitiveness
              </h1>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                OB39 is empowering farmers and enterprises across Uganda through cooperative investment, business development, modern training, and market access. We operate in agriculture and enterprise sectors that collectively contribute more than 60% of Uganda's GDP. Agriculture contributes about 24% of the country's GDP, while the services sector contributes over 40%.  
              </p>

               <p className='mt-6 text-base leading-relaxed text-gray-600'>
                Micro, Small and Medium Enterprises (MSMEs)—the backbone of Uganda's economy—account for over 90% of the private sector and provide millions of jobs, making them a vital driver of economic growth, innovation, and sustainable livelihoods.Through innovation and strategic partnerships, OB39 is committed to strengthening Uganda's competitiveness in regional and global markets.
                 </p>

              <p className='mt-3 text-md/8 text-badges font-bold italic'>"Together we can stand and win."</p>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="OB39 Ltd empowering African farmers and entrepreneurs"
            src={images.countrysidefarmers}
            className="w-3xl max-w-none rounded-xl bg-card-background shadow-xl ring-1 ring-badges/10 sm:w-228"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-text-color lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-6 text-text-color">
                <li className="flex gap-x-3">
                  <BeakerIcon aria-hidden="true" className="mt-1 size-6 flex-none text-icons" />
                  <span className='text-base leading-relaxed text-gray-600'>
                    <strong className="font-semibold text-heading">Agribusiness Development.</strong> Cooperative farming units with tested seeds, training, and direct export access.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ChartBarIcon aria-hidden="true" className="mt-1 size-5 flex-none text-icons" />
                  <span  className='text-base leading-relaxed text-gray-600'>
                    <strong className="font-semibold text-heading">Business Incubation.</strong> Structured profit pooling and growth capital without high-interest loans.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <GlobeAltIcon aria-hidden="true" className="mt-1 size-5 flex-none text-icons" />
                  <span  className='text-base leading-relaxed text-gray-600'>
                    <strong className="font-semibold text-heading">Global Market Access.</strong> Digital marketplaces and partnerships for regional and international trade.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}