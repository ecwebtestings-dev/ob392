import {
  GlobeAltIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/20/solid'
import images from '../../assets/assets'

const features = [
  {
    name: 'Integrated Digital Marketplace.',
    description:
      'One trusted ecosystem connecting farmers, businesses, buyers, and investors with full transparency.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Cooperative Growth Model.',
    description:
      'Structured units of farmers and businesses sharing resources and growing together.',
    icon: UserGroupIcon,
  },
  {
    name: 'Export & Enterprise Development.',
    description:
      'Market access, incubation, and export facilitation to reach high-value international buyers.',
    icon: ArrowTrendingUpIcon,
  },
]

export default function ScalingImpact() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <span className="inline-flex items-center rounded-full bg-badge-bg px-3 py-1 text-sm font-medium text-badges">
                Scaling for Impact
              </span>

              <p className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-heading sm:text-5xl">
                Building Uganda&rsquo;s Next Economic Ecosystem
              </p>
              <p className="mt-6 text-lg/8 text-text-color">
                We&rsquo;ve already empowered thousands of farmers and
                businesses across Uganda. Now we&rsquo;re scaling to reach 2
                million African farmers and entrepreneurs with growth
                capital, training, and global markets by 2030 &ndash; on
                infrastructure that&rsquo;s already built and tested.
              </p>
              <dl className="mt-8 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-heading">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-badges"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline text-text-color">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-heading/10">
              <img
                alt="African farmers and entrepreneurs"
                src={images.Money}
                width={2432}
                height={1442}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03] sm:aspect-[16/11]"
              />
            </div>

            {/* Floating Stat Card */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8">
              <div className="rounded-xl bg-card-background/95 p-5 shadow-2xl ring-1 ring-badges/20 backdrop-blur-sm sm:p-6">
                <p className="text-3xl font-bold text-heading sm:text-4xl">2M+</p>
                <p className="mt-2 text-sm/6 text-text-color">
                  African small-scale farmers and micro-entrepreneurs waiting
                  for access to capital and markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}