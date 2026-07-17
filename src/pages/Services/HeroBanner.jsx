import { ArrowDown } from "lucide-react";
import AnimatedButton from "../../components/ui/Buttons";
import images from "../../assets/assets";

export default function HeroBanner() {
  return (
    <section
      id="hero"
      className="relative lg:min-h-screen md:min-h-[80vh] min-h-[90vh] flex items-center overflow-hidden py-30 sm:py-50"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:`url(${images.Export})`
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/70 to-black/85" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-hero-text mb-6">
            Building Africa's Next Generation of{" "}
            <span className="text-badges">Farmers</span> and{" "}
            <span className="text-badges">Entrepreneurs</span>
          </h1>

          <p className="text-md md:text-lg text-hero-text/90 leading-relaxed mb-10">
            From cooperative farming to business capital pooling and digital
            marketplaces, OB39 Ltd empowers smallholder farmers and growing
            businesses with the capital, knowledge, and market access they need
            to thrive locally and compete globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            <AnimatedButton href="#who-we-serve">
                Join a Unit
            </AnimatedButton>
        
            <a
              href="#services-overview"
              className="inline-flex items-center gap-2 px-8 py-4 text-hero-text hover:text-badges font-semibold transition-colors"
            >
              Learn How It Works
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}