import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useCallback } from "react";
import images from "../../assets/assets";

const testimonials = [
  {
    body:
      "Before joining OB39, I struggled to get fair prices for my crops. The middlemen took most of my profits. Today, through our cooperative, we access international buyers directly. My income has grown significantly, allowing me to invest in my family and farm with confidence.",
    author: "Grace Nakato",
    role: "Small-Scale Farmer • Uganda",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop&crop=face",
  },
  {
    body:
      "The business incubation programme transformed my tailoring business. Instead of relying on expensive loans, I received structured growth capital that allowed me to expand, employ more people, and serve a larger customer base.",
    author: "Samuel",
    role: "Micro Enterprise Owner • Uganda",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&crop=face",
  },
  {
    body:
      "OB39 connected our farming cooperative with better seeds, training, storage facilities and export opportunities. Today our produce reaches international markets, giving our community a stronger and more sustainable future.",
    author: "Amara Diallo",
    role: "Cooperative Leader • Ghana",
    image:
      "https://images.unsplash.com/photo-1589156280159-27698a70f64e?w=256&h=256&fit=crop&crop=face",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goTo = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative overflow-hidden py-32 px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.35] bg-fixed scale-105"
        style={{ backgroundImage: `url(${images.HeroLeftImage})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,.16),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,197,94,.08),transparent_40%)]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-badges/30 bg-badges/10 px-4 py-1.5 text-sm font-medium tracking-wide text-badges">
            <span className="h-1.5 w-1.5 rounded-full bg-badges animate-pulse" />
            Stories from our communities
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Real People.
            <br />
            <span className="bg-gradient-to-r from-white via-white to-badges bg-clip-text text-transparent">
              Real Transformation.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            Discover how farmers, entrepreneurs and communities are building
            sustainable prosperity through the OB39 ecosystem.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative mt-16">
          {/* Gradient border glow */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-badges/40 via-white/5 to-transparent opacity-60" />

          <div className="relative min-h-[340px] rounded-3xl border border-white/10 bg-white/[0.06] p-10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] lg:p-16 sm:min-h-[300px]">
            {/* Quote mark */}
            <svg
              className="absolute left-8 top-8 h-12 w-12 text-badges/25 lg:left-10 lg:top-10"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-400 ease-out ${
                  index === currentSlide
                    ? "relative z-10 translate-x-0 opacity-100"
                    : "pointer-events-none absolute inset-0 p-10 opacity-0 lg:p-16"
                } ${
                  index !== currentSlide
                    ? direction === 1
                      ? "translate-x-2"
                      : "-translate-x-4"
                    : ""
                }`}
              >
                <blockquote>
                  <p className="text-lg font-light leading-relaxed text-white/90 lg:text-xl">
                    {testimonial.body}
                  </p>
                </blockquote>

                {/* Author */}
                <div className="mt-10 flex items-center gap-5 border-t border-white/10 pt-8">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-badges/40 ring-offset-2 ring-offset-black/40"
                  />
                  <div>
                    <h3 className="font-semibold tracking-wide text-white">
                      {testimonial.author}
                    </h3>
                    <p className="text-sm text-badges/90">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-10 flex items-center justify-between">
          {/* Indicators */}
          <div className="flex gap-2.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-10 bg-badges shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:scale-105 hover:border-badges/50 hover:bg-badges/20"
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:scale-105 hover:border-badges/50 hover:bg-badges/20"
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}