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
    <section id="impact" className="py-20 px-6 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Impact & Benefits
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Real outcomes for members, communities, and the continent.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, idx) => {
            const Icon = impact.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur border border-background rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-background">
                  {impact.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
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