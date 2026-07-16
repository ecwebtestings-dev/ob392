import { Sparkles } from 'lucide-react';

export default function DigitalMarketplace() {
  return (
    <section id="digital-marketplace" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-6 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          In Development
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-6 leading-tight">
          Connecting Every Member to Bigger Markets
        </h2>

        <p className="text-stone-600 leading-relaxed mb-10 max-w-3xl mx-auto">
          Alongside physical trade exhibitions and partnerships, OB39 Ltd is building{' '}
          <strong className="text-green-900">Project OM</strong> — a digital marketplace
          where member farmers and businesses can list produce and products, connect with
          verified local and international buyers, and track transactions transparently.
          It's designed to give every member — from a smallholder farmer to a growing
          small business — direct, uninterrupted access to markets that were previously
          out of reach.
        </p>

        {/* Mockup placeholder */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 bg-gradient-to-br from-green-50 via-stone-50 to-amber-50 aspect-video flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-green-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-amber-300">OM</span>
            </div>
            <p className="text-stone-500 font-medium">Project OM Marketplace Preview</p>
            <p className="text-stone-400 text-sm mt-1">Coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}