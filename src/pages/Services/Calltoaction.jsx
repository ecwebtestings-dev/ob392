
export default function CallToAction() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-heading mb-6 leading-tight">
          Ready to Grow With OB39?
        </h2>
        <p className="text-stone-600 text-lg mb-10 max-w-2xl mx-auto">
          Whether you farm, run a business, or want to invest in Africa's next generation
          of enterprises — there's a place for you in our network.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="px-8 py-4 bg-green-950 hover:bg-green-900 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
             Contact Us
          </a>
         
          
        </div>
      </div>
    </section>
  );
}