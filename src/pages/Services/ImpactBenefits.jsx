import { ShieldCheck, Coins, Users, Heart } from 'lucide-react';

const impacts = [
  {
    icon: ShieldCheck,
    title: 'Reduced Business Failure',
    description:
      'Structured capital, mentorship, and continuity planning help member businesses survive and grow.',
  },
  {
    icon: Coins,
    title: 'Fairer Farmer Incomes',
    description: 'Direct export access cuts out exploitative middlemen.',
  },
  {
    icon: Users,
    title: 'Local Job Creation',
    description:
      'Growth at the member level drives direct and indirect employment across sectors.',
  },
  {
    icon: Heart,
    title: 'Stronger Communities',
    description:
      'CSR-funded initiatives support education, environment, and youth empowerment.',
  },
];

export default function ImpactBenefits() {
  return (
    <section id="impact" className="relative overflow-hidden bg-white py-24 px-6 sm:py-32">

      {/* Subtle ambient accents */}
      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-badges/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-badges/[0.04] blur-3xl" />

      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-badges/10 px-4 py-1.5 text-sm font-medium tracking-wide text-badges">
            <span className="h-1.5 w-1.5 rounded-full bg-badges" />
            Impact & Benefits
          </span>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Real Outcomes, Real Communities
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Real outcomes for members, communities, and the continent.
          </p>
        </div>

        {/* Impact Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, idx) => {
            const Icon = impact.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-badges/30 hover:bg-white hover:shadow-xl hover:shadow-gray-200/60"
              >
                <div className="w-12 h-12 rounded-xl border border-badges/20 bg-badges/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-badges group-hover:border-badges">
                  <Icon className="w-6 h-6 text-badges transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {impact.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}