import { BoltIcon, UsersIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import images from '../../assets/assets'

const features = [
  {
    name: 'Integrated Digital Marketplace.',
    description:
      'Connecting farmers, businesses, buyers, suppliers, and investors through one trusted digital ecosystem that promotes transparency and efficient trade.',
    icon: BoltIcon,
  },
  {
    name: 'Cooperative Growth Model.',
    description:
      'Organizing farming households and business members into structured cooperative units that encourage collaboration, shared resources, and sustainable growth.',
    icon: UsersIcon,
  },
  {
    name: 'Export & Enterprise Development.',
    description:
      'Providing market access, business incubation, value addition, and export facilitation to help African products reach high-value domestic and international markets.',
    icon: CheckCircleIcon,
  },
]

export default function ScalingImpact() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-badges"></h2>
    
              <div className="inline-flex items-center rounded-full bg-badge-bg px-3 py-1 text-sm font-medium text-badges">
               Scaling for Impact
            </div>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-heading sm:text-5xl">
                Building Uganda's Next Economic Ecosystem
              </p>
              <p className="mt-6 text-lg/8">
                We've proven it works – empowering thousands of farmers and businesses across Uganda. 
                Now we scale to reach 2 million African farmers and entrepreneurs with access 
                to growth capital, modern training, and global markets by 2030. The infrastructure to make it happen: 
                 already built and tested.
              </p>
              <dl className="mt-5 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-heading">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-badges" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="relative">
            <img
              alt="African farmers and entrepreneurs"
              src={images.Money}
              width={2432}
              height={1442}
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-900/10 sm:w-228 md:-ml-4 lg:ml-0"
            />
            
            {/* Floating Stat Card */}
            <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10">
              <div className="rounded-xl bg-card-background p-6 shadow-2xl ring-1 ring-badges/20">
                <p className="text-4xl font-bold text-heading">2M+</p>
                <p className="mt-2 text-sm/6">
                  African small-scale farmers and micro-entrepreneurs waiting for access to capital and markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}