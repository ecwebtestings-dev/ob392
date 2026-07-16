import { Sprout, Briefcase } from 'lucide-react';

const audiences = [
  {
    icon: Sprout,
    title: 'For Farmers',
    description:
      'Smallholder and mid-scale farmers facing poor inputs, limited storage, and low market prices.',
    cta: 'Join as a Farmer',
    color: 'green',
  },
  {
    icon: Briefcase,
    title: 'For Entrepreneurs & SMEs',
    description:
      'Young and developing businesses struggling with capital access, bookkeeping, and market reach.',
    cta: 'Join as a Business',
    color: 'amber',
  },
];

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-4">
            Who We Serve
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Whether you work the land or run a growing enterprise, there's a place for
            you in our network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {audiences.map((audience, idx) => {
            const Icon = audience.icon;
            const isGreen = audience.color === 'green';
            return (
              <div
                key={idx}
                className={`rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${
                  isGreen
                    ? 'bg-green-50 border-green-200 hover:border-green-400'
                    : 'bg-amber-50 border-amber-200 hover:border-amber-400'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                    isGreen ? 'bg-green-800' : 'bg-amber-600'
                  }`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-950 mb-3">
                  {audience.title}
                </h3>
                <p className="text-stone-600 leading-relaxed mb-6">
                  {audience.description}
                </p>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all ${
                    isGreen
                      ? 'bg-green-800 hover:bg-green-700 text-white'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  {audience.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}