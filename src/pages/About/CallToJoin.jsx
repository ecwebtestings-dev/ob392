import AnimatedButton from "../../components/ui/Buttons";


export default function JoinUsCTA() {
  return (
    <section className="py-10 sm:py-15">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        
        {/* Container */}
        <div className="relative overflow-hidden rounded-3xl bg-background px-4 py-16 sm:px-12 sm:py-20 lg:px-10 lg:py-15">
    
          {/* Content */}
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Want to be part of the story?
            </h2>
            
            <p className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed">
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