import { Check, TrendingUp, Users, Shield, BookOpen, Handshake } from 'lucide-react';

const features = [
  { icon: Users, text: 'Structured daily capital pooling and secure fund management' },
  { icon: BookOpen, text: 'Business training: financial risk management, bookkeeping, marketing, leadership' },
  { icon: TrendingUp, text: 'One-on-one business advisory and mentorship' },
  { icon: Shield, text: 'Business continuity and risk-management planning' },
  { icon: Handshake, text: 'Network of fellow entrepreneurs for referrals, partnerships, and joint ventures' },
  { icon: Check, text: 'Support in preparing investment proposals and feasibility studies' },
];

const steps = [
  { num: 1, label: 'Join a unit' },
  { num: 2, label: 'Contribute often %' },
  { num: 3, label: 'Receive growth capital' },
  { num: 4, label: 'Expand your business' },
];

export default function BusinessIncubation() {
  return (
    <section id="business-incubation" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          {/* Text column */}
          <div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              Growth Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-6 leading-tight">
              Turning Small Daily Contributions into Real Business Growth
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              Many small businesses fail not from lack of ambition, but from lack of
              capital, structure, and support. OB39 Ltd organizes entrepreneurs into
              units of roughly <strong>5 businesses</strong> that pool a share of daily profits
              — 10%, 20%, or 30% — into a secure, tripartite-authorized fund. These
              funds are then redistributed to members for verified business expansion,
              giving every entrepreneur a real shot at growth without predatory interest
              rates.
            </p>
          </div>

          {/* Image/diagram column */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-2xl p-8 border border-stone-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-800 text-white rounded-full text-2xl font-bold mb-3">
                  05
                </div>
                <p className="text-sm font-semibold text-green-900">Businesses per Unit</p>
              </div>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-stone-700">
                  Daily Profit %
                </div>
                <span className="text-green-700 font-bold">→</span>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-stone-700">
                  Pooled Fund
                </div>
                <span className="text-green-700 font-bold">→</span>
                <div className="bg-amber-100 px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-amber-800">
                  Growth Capital
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature list */}
        <div className="bg-stone-50 rounded-2xl p-8 mb-10">
          <h3 className="text-xl font-bold text-heading mb-6">What's included:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-green-100" />
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed pt-1">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4-step strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-stone-200 rounded-xl p-5 text-center hover:border-green-700 transition-colors"
            >
              <div className="w-10 h-10 bg-green-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                {step.num}
              </div>
              <p className="text-sm font-semibold text-green-950">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}