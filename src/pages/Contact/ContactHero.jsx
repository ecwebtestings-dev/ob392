import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import images from "../../assets/assets";
import AnimatedButton from "../../components/ui/Buttons";

export default function ContactHero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-background">

      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 -z-20 scale-105 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${images.ContactHeroImage}')` }}
      />

      {/* Layered gradient overlays for depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/60" />
      <div className="absolute inset-0 -z-10 bg-background/20" />

      {/* Ambient glow accents, consistent with rest of site */}
      <div className="pointer-events-none absolute -left-24 top-1/4 -z-10 h-96 w-96 rounded-full bg-badges/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-badges/5 blur-3xl" />

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-32 lg:px-8">
        <div className="max-w-2xl">

          {/* Status badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-badges/30 bg-badges/10 px-4 py-1.5 text-sm font-medium tracking-wide text-badges backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-badges/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-badges" />
            </span>
            We're Online
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-6xl">
            Let's Build{" "}
            <span className="bg-gradient-to-r from-white via-white to-badges bg-clip-text text-transparent">
              Impact
            </span>{" "}
            Together
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed font-light text-hero-text">
            Ready to grow your business or farming enterprise? Partner with
            OB39 to access financing, modern agricultural support, business
            advisory services, and profitable local and international
            markets.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
             
             <AnimatedButton href="#contact-form">Get in Touch</AnimatedButton>
            
            <a  href="tel:+256701234567"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-badges/40 hover:bg-white/10"
            >
              Call Us
            </a>
          </div>
        </div>

        {/* Floating glass contact card */}
        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:absolute lg:bottom-16 lg:right-8 lg:mt-0 lg:max-w-sm lg:flex-col">
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl transition-colors duration-300 hover:border-badges/30">
            <span className="flex size-11 flex-none items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <PhoneIcon className="size-5 text-badges" />
            </span>
            <div>
              <p className="text-xs tracking-wide text-gray-400">Call us anytime</p>
              <p className="text-sm font-semibold text-white">+256 701 234 567</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur-xl transition-colors duration-300 hover:border-badges/30">
            <span className="flex size-11 flex-none items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <EnvelopeIcon className="size-5 text-badges" />
            </span>
            <div>
              <p className="text-xs tracking-wide text-gray-400">Email us</p>
              <p className="text-sm font-semibold text-white">info@ob39.co.ug</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}