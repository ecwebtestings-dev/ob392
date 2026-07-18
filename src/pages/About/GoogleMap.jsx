
export default function LocationSection() {
  return (
    <section className="bg-white py-24 sm:py-32 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Rooted in Kampala,{' '}
              <span className="text-badges">Connected Globally.</span>
            </h2>
            
            <p className="mt-6 text-md leading-relaxed text-text-color">
              Our HQ is in Kampala—a vibrant hub of innovation. We designed our space to be a home for creativity, with the best cassava in Uganda just a walk away.
            </p>

            {/* Address Card */}
            <div className="mt-10 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-badge-bg">
                <svg 
                  className="h-6 w-6 text-badges" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </div>
              
              <div>
                <h3 className="text-md font-bold text-heading">
                  ob39 Uganda Ltd.
                </h3>
                <p className="mt-1 text-text-color">
                  Kampala, Uganda.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
            

              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56937.4142604401!2d32.59901961121614!3d0.2854245411898566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbdd859044fb5%3A0xb2db3b8b874c82fa!2sBunga%2C%20Kampala!5e0!3m2!1sen!2sug!4v1784396509363!5m2!1sen!2sug" 
              width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                title="0b39 Location Map"></iframe>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-badges/10 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-badge-bg blur-2xl" />
          </div>

        </div>
      </div>
    </section>
  );
}