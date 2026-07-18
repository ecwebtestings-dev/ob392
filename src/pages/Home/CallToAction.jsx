import images from "../../assets/assets";
import AnimatedButton from "../../components/ui/Buttons";

export default function CallToAction() {
  return (
    <section className="py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-0 lg:px-8">
        <div
          className="relative overflow-hidden lg:rounded-[32px]"
          style={{
            backgroundImage: `url(${images.CallToActionImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-heading/80" />

          {/* Decorative Glow */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-badges/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-badges/10 blur-3xl" />

          <div className="relative z-10 px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-28 lg:py-24">
            <span className="inline-flex rounded-full border border-badges/30 bg-badges/10 px-4 py-1.5 text-sm font-medium text-badges">
              Join the Movement
            </span>

            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Building Africa&rsquo;s Future, One Community at a Time.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-hero-text/85">
              Whether you&rsquo;re a farmer, entrepreneur, investor or
              development partner, OB39 Ltd gives you the platform to grow,
              strengthen communities and unlock global opportunities.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <AnimatedButton href="/contact">Become a member</AnimatedButton>

              <a
                href="/services"
                className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}