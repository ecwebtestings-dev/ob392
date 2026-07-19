import images from "../../assets/assets";
import AnimatedButton from "../../components/ui/Buttons";

export default function ContactHero() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] lg:min-h-[100vh] overflow-hidden">

      {/* background image */}
      <div
        className="absolute inset-0 -z-20 scale-105 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url('${images.ContactHeroImage}')` }}
      />

     

      {/* Layered gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/50" />
      <div className="absolute inset-0 -z-10 bg-background/30" />

      {/* Ambient glow accents, consistent with rest of site */}
      <div className="pointer-events-none absolute -left-24 top-1/4 -z-10 h-96 w-96 rounded-full bg-badges/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-badges/5 blur-3xl" />

      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-32 lg:px-8">
        <div className="max-w-4xl">

          {/* Status badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-badges/30 bg-badges/10 px-4 py-1.5 text-sm font-medium tracking-wide text-badges backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-badges/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-badges" />
            </span>
            We're Online
          </span>

          <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-5xl">
            Let's Build{" "}
            <span className="text-white">
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
             
             <AnimatedButton href="/contact#contact-form">Start A Conservation</AnimatedButton>
            
            
          </div>
        </div>

        
      </div>
    </section>
  );
}