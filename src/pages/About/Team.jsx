import images from "../../assets/assets";

export default function TeamPhoto() {
  return (
    <section className="bg-white py-10 sm:py-20 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Photo Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          
         {/* Team Photo */}
        <img
          src={images.TeamPhoto}
          alt="The 0B39 Team"
          className="w-full h-[450px] sm:h-[500px] lg:h-[550px] md:object-cover object-contain  transition-transform duration-500 ease-out hover:scale-105"
        />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

          {/* Text Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              The 0B39 Family
            </h3>
            <p className="text-base sm:text-lg text-hero-text/90 max-w-2xl leading-relaxed">
              Engineers, designers, product managers, and field officers—all working for the last mile.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}