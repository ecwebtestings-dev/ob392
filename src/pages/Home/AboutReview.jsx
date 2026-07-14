import { 
  BanknotesIcon, 
  ChartBarIcon, 
  GlobeAltIcon, 
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Access to Growth Capital',
    description:
      'We eliminate the barrier of inadequate financial capital through structured profit pooling and micro-capital cycles, enabling businesses to expand without high-interest loans.',
    icon: BanknotesIcon,
  },
  {
    name: 'Market Exploitation',
    description:
      'We bypass exploitative middlemen by connecting farmers directly to high-value international buyers, ensuring fair pricing and better returns for producers.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Poor Business Management',
    description:
      'We address weak financial management and bookkeeping failures through professional training, mentorship, and structured business support systems.',
    icon: ChartBarIcon,
  },
  {
    name: 'Limited Resources & Knowledge',
    description:
      'We provide scientifically tested seeds, modern farm tools, equipment, and comprehensive training on contemporary farming methods and best practices.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Weak Market Access',
    description:
      'We create direct pathways to domestic and international markets through digital marketplaces, trade exhibitions, and strategic partnerships.',
    icon: UserGroupIcon,
  },
  {
    name: 'Business Insecurity & Failure',
    description:
      'We ensure business continuity through risk management guidance, operational support, and collaborative networks that strengthen resilience.',
    icon: ShieldCheckIcon,
  },
]

export default function ProblemsWeSolve() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base/7 font-semibold text-badges">Problems We Solve</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-4xl lg:text-balance">
            Removing Barriers to Success
          </h2>
          <p className="mt-6 text-md/8 text-text-color">
            African farmers and entrepreneurs face critical challenges. We provide integrated solutions 
            that address the root causes of business failure and agricultural underperformance.
          </p>
        </div>

        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-badges">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1.5 text-base/7 text-[#99A1AF]">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}