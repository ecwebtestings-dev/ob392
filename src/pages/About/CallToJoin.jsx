import AnimatedButton from "../../components/ui/Buttons";


export default function JoinUsCTA() {
  return (
    <section className="py-10 sm:py-15 font-sans">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        
        {/* CTA Container */}
        <div className="relative overflow-hidden rounded-3xl bg-background px-4 py-16 sm:px-12 sm:py-20 lg:px-10 lg:py-15">
          
          {/* Optional: Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-badges/5 to-transparent" />

          {/* Content */}
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Want to be part of the story?
            </h2>
            
            <p className="mt-6 text-md sm:text-lg text-hero-text/90 leading-relaxed">
              We are always looking for passionate individuals who want to use their skills for good. 
              If you're ready to build impact, we're ready to meet you.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <AnimatedButton href="/contact">
                Contact Us
              </AnimatedButton>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}