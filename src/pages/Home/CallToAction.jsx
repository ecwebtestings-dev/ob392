import images from "../../assets/assets";
import AnimatedButton from "../../components/ui/Buttons";

export default function CallToAction() {
  return (
    <section className="py-28">
      <div className=" lg:mx-auto lg:max-w-7xl px-0 lg:px-8">

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

          <div className="relative z-10 px-10 py-20 text-center lg:px-28">

            <span className="inline-flex rounded-full border border-badges/30 bg-badges/10 px-2 py-2 text-sm font-medium text-badges">
              Join the Movement
            </span>

            <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-bold tracking-tight text-white">
              Building Africa's Future,
              
              One Community at a Time.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300">
              Whether you're a farmer, entrepreneur, investor or development
              partner, OB39 Ltd provides the platform to grow businesses,
              strengthen communities and unlock global opportunities.
            </p>

            <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

              <AnimatedButton href='/'>
                Become a member
                </AnimatedButton>

              <a href="/" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-lg font-semibold text-white backdrop-blur hover:bg-white/20 transition">
                Explore Our Services
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}