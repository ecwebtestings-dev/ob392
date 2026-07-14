import { CheckCircleIcon } from '@heroicons/react/24/solid'
import images from '../../assets/assets'
import AnimatedButton from '../../components/ui/Buttons'


export default function InvestmentOpportunity() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 ">
          
          

          {/* Right Column - Stats */}
          <div className="relative rounded-3xl p-3 lg:p-12 order-2 lg:order-1 bg-cover bg-center bg-no-repeat "
              style={{
                backgroundImage: `url(${images.Ugx2})`,
              }}>
                {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
            <div className="space-y-8 relative z-10">
              {/* Stat 1 */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm/6 text-text-color">Total Addressable Market</p>
                <p className="mt-1 text-4xl font-bold text-heading">4M+</p>
                <p className="mt-1 text-sm/6 text-text-color">Unbanked farmers & entrepreneurs in Uganda</p>
              </div>

              {/* Stat 2 */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm/6 text-text-color">Capital Deployed</p>
                <p className="mt-1 text-4xl font-bold text-heading">10M+</p>
                <p className="mt-1 text-sm/6 text-text-color">In fair trade value distributed through direct market access</p>
              </div>

              {/* Stat 3 */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm/6 text-text-color">Market Coverage</p>
                <p className="mt-1 text-4xl font-bold text-heading">10M</p>
                <p className="mt-1 text-sm/6 text-text-color">Farmers and businesses to empower by 2030</p>
              </div>
            </div>
          </div>

          {/* Left Column */}
          <div className='order-1 lg:order-2'>
            <div className="inline-flex items-center rounded-full bg-badge-bg px-3 py-1 text-sm font-medium text-badges">
               For Investors
            </div>
            
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
              The Empowerment Infrastructure
            </h2>
            
            <p className="mt-4 text-lg/7">
              We're not just another business support program — we're building the 
              comprehensive infrastructure for Africa's small-scale farmers and micro-enterprises. 
              Here's why this is a generational investment opportunity.
            </p>

            <div className="mt-7 space-y-6">
              <div className="flex gap-x-4">
                <div className="flex-shrink-0">
                  <div className="flex size-8 items-center justify-center rounded-full bg-badge-bg">
                    <CheckCircleIcon aria-hidden="true" className="size-5 text-badges" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-heading">Dual Market Leadership</h3>
                  <p className="mt-0.5 text-sm/6">
                    Dominant position in both agribusiness cooperatives and SME incubation across multiple African markets.
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="flex-shrink-0">
                  <div className="flex size-8 items-center justify-center rounded-full bg-badge-bg">
                    <CheckCircleIcon aria-hidden="true" className="size-5 text-badges" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-heading">Proven Cooperative Model</h3>
                  <p className="mt-0.5 text-sm/6">
                    Structured profit pooling with 98% member retention and sustainable capital cycles that eliminate high-interest debt.
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="flex-shrink-0">
                  <div className="flex size-8 items-center justify-center rounded-full bg-badge-bg">
                    <CheckCircleIcon aria-hidden="true" className="size-5 text-badges" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-heading">Network Effects at Scale</h3>
                  <p className="mt-0.5 text-sm/6">
                    Each new farming cluster and business unit strengthens the internal marketplace — classic infrastructure play with compounding value.
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="flex-shrink-0">
                  <div className="flex size-8 items-center justify-center rounded-full bg-badge-bg">
                    <CheckCircleIcon aria-hidden="true" className="size-5 text-badges" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-heading">Massive Addressable Market</h3>
                  <p className="mt-0.5 text-sm/6 text-text-color">
                    400M+ African small-scale farmers and micro-entrepreneurs waiting for access to capital and global markets — we're just getting started.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <AnimatedButton href='/'>
                Partner with us
              </AnimatedButton>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}