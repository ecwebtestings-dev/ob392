import { Users, Leaf, GraduationCap, Warehouse, Globe, RefreshCw } from 'lucide-react';
import images from '../../assets/assets';

const features = [
  { icon: Users, text: 'Farmer organization into collaborative 15-household units' },
  { icon: Leaf, text: 'Certified seeds and fertilizers, matched to soil surveys' },
  { icon: GraduationCap, text: 'Training in modern planting, harvesting, storage, and processing techniques' },
  { icon: Warehouse, text: 'Shared farm tools, livestock, and cold-storage/warehouse access' },
  { icon: Globe, text: 'Direct market linkage to international buyers meeting export standards' },
  { icon: RefreshCw, text: 'Up to six capital/harvest cycles per year for continuous income' },
];

export default function AgribusinessExport() {
  return (
    <section id="agribusiness" className="py-20 px-6 bg-stone-100">
      <div className="max-w-6xl mx-auto">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          {/* Image column (left on desktop) */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gradient-to-br from-green-200 to-amber-100 flex items-center justify-center">
              <img
                src={images.Export2}
                alt="Farmers working cooperatively in a field"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              Export Development
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-6 leading-tight">
              From the Field to the Global Market — Without the Middleman
            </h2>
            <p className="text-stone-600 leading-relaxed">
              OB39 Ltd organizes farmers into cooperative units of roughly{' '}
              <strong>15 households</strong> who work each other's land on a rotational
              basis, backed by scientifically tested seeds, fertilizers, and modern
              training. Harvests are aggregated and sold directly to high-value
              international buyers at fair prices — bypassing the multiple layers of
              middlemen that typically erode farmer income.
            </p>
          </div>
        </div>

        {/* Feature list */}
        <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm">
          <h3 className="text-xl font-bold text-green-950 mb-6">What's included:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-amber-700" />
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed pt-1">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Harvest split infographic */}
        <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-6 text-center">
            How Harvest Proceeds Are Shared
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 30% block */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl font-bold text-amber-300">30%</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-stone-200">
                  Reinvested
                </div>
              </div>
              <ul className="space-y-2 text-sm text-stone-100">
                <li>• Research, seeds, and fertilizer</li>
                <li>• Training programs</li>
                <li>
                  <span className="text-amber-300">5%</span> toward community social
                  responsibility projects
                </li>
              </ul>
            </div>

            {/* 70% block */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl font-bold text-amber-300">70%</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-stone-200">
                  Mutual Growth
                </div>
              </div>
              <ul className="space-y-2 text-sm text-stone-100">
                <li>• Tools & ploughing livestock</li>
                <li>• Storage infrastructure</li>
                <li>• Members' personal needs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}