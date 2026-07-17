import { ArrowRightIcon } from "@heroicons/react/24/outline";
import images from "../../assets/assets";
import AnimatedButton from "../../components/ui/Buttons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat bg-fixed scale-105"
        style={{
          backgroundImage: `url('${images.Ugx}')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/40" />

      {/* header/testimonials styling */}
      <div className="pointer-events-none absolute -top-32 right-0 -z-10 h-96 w-96 rounded-full bg-badges/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32 pb-16 lg:px-8 lg:pt-40">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Left Content */}
          <div className="relative z-10 gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-badges/30 bg-badges/10 px-4 py-1.5 text-sm font-medium tracking-wide text-badges">
              <span className="h-1.5 w-1.5 rounded-full bg-badges animate-pulse" />
              Building Africa's Entrepreneurs Future
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-white lg:text-5xl lg:leading-[1.1]">
              Empowering Africa's Farmers & Entrepreneurs for Global Markets
            </h1>

            <p className="mt-7 max-w-xl leading-relaxed font-light text-hero-text">
              OB39 Ltd transforms small-scale producers and emerging businesses
              through cooperative capital cycles, modern training, and direct
              digital market access—bypassing middlemen and building
              sustainable, globally competitive enterprises.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <AnimatedButton>Lend With Us</AnimatedButton>

              <a
                href="/"
                className="group inline-flex w-1/2 items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-badges/40 hover:bg-white/5 sm:w-auto"
              >
                Learn More
                <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            
          </div>

         

        </div>
      </div>
    </section>
  );
}