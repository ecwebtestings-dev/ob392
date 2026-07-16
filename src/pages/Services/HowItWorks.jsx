import { UserPlus, HandCoins, Sprout, Rocket } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    num: '01',
    title: 'Join a Unit',
    description:
      'Become part of a farming cooperative (15 households) or a business unit (60 members).',
  },
  {
    icon: HandCoins,
    num: '02',
    title: 'Contribute & Access Resources',
    description:
      'Pool a share of profits or harvest, and gain access to training, tools, and inputs.',
  },
  {
    icon: Sprout,
    num: '03',
    title: 'Grow with Support',
    description:
      'Receive mentorship, financing, and shared resources tailored to your stage of growth.',
  },
  {
    icon: Rocket,
    num: '04',
    title: 'Reach the Market',
    description:
      'Sell through fair-price channels, export networks, or the OM digital marketplace.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-stone-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-4">
            How It Works
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Four simple steps from joining the network to reaching global markets.
          </p>
        </div>

        {/* Horizontal timeline (desktop) / vertical stack (mobile) */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-stone-300" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative text-center">
                  {/* Circle with icon */}
                  <div className="relative z-10 w-24 h-24 mx-auto mb-5 bg-white border-4 border-green-800 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-10 h-10 text-green-800" />
                  </div>
                  <div className="text-xs font-bold text-amber-600 mb-2 tracking-widest">
                    STEP {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-green-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}