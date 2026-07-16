import { Sprout, Briefcase, Globe } from 'lucide-react';

const pillars = [
  {
    icon: Briefcase,
    title: 'Business Incubation & Capital Access',
    description:
      'Structured savings and capital-pooling units that help small businesses grow without high-interest loans.',
    link: '#business-incubation',
  },
  {
    icon: Sprout,
    title: 'Agribusiness & Export Facilitation',
    description:
      'Cooperative farming units, modern inputs, and direct export links that cut out exploitative middlemen.',
    link: '#agribusiness',
  },
  {
    icon: Globe,
    title: 'Digital Marketplace (Project OM)',
    description:
      'A growing digital ecosystem connecting member farmers and businesses to buyers locally and internationally.',
    link: '#digital-marketplace',
  },
];

export default function ServicesOverview() {
  return (
    <section id="services-overview" className="py-20 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-4">
            Three Pillars of Empowerment
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            An integrated ecosystem designed to lift African farmers and entrepreneurs
            into globally competitive markets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {pillars.map((pillar, idx) => {

            const Icon = pillar.icon;

            return (
              <a key={idx} href={pillar.link}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-stone-200 hover:border-green-400 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-green-100 group-hover:bg-amber-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-7 h-7 text-green-800 group-hover:text-amber-600 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-green-950 mb-3">
                  {pillar.title}
                </h3>

                <p className="text-stone-600 leading-relaxed mb-4">
                  {pillar.description}
                </p>

                <a href='/contact' className="text-green-600 font-semibold group-hover:text-green-700 inline-flex items-center gap-1">
                  Learn more →
                </a>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}