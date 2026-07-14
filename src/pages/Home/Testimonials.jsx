import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
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

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  return (
    <section className="relative overflow-hidden py-32 px-6 lg:px-8">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-80 bg-fixed"
        style={{
          backgroundImage: `url(${images.HeroLeftImage})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Green Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,.18),transparent_40%)]" />

      <div className="relative mx-auto max-w-5xl">

        {/* Heading */}
        <div className="text-center">

          <span className="inline-flex rounded-full border border-badges/30 bg-badges/10 px-4 py-1 text-sm font-medium text-badges">
            Stories from our communities
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Real People.
            <br />
            Real Transformation.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Discover how farmers, entrepreneurs and communities are building
            sustainable prosperity through the OB39 ecosystem.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative mt-16 rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-2xl lg:p-16">

          {/* Quote */}
          <div className="absolute left-8 top-2 text-[120px] leading-none text-badges/20 font-serif">
            "
          </div>

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide ? "block" : "hidden"
              }`}
            >
              <blockquote className="relative z-10">

                <p className="text-lg leading-relaxed font-light text-white lg:text-1xl">
                  {testimonial.body}
                </p>

              </blockquote>

              {/* Author */}
              <div className="mt-12 flex items-center gap-5">

                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-badges/30"
                />

                <div>

                  <h3 className="font-semibold text-white">
                    {testimonial.author}
                  </h3>

                  <p className="text-gray-300">
                    {testimonial.role}
                  </p>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="mt-10 flex items-center justify-between">

          {/* Indicators */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "h-2 w-10 rounded-full bg-badges"
                    : "h-2 w-2 rounded-full bg-white/40 hover:bg-white"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">

            <button
              onClick={prevSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur hover:scale-105 hover:bg-badges transition"
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur hover:scale-105 hover:bg-badges transition"
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}