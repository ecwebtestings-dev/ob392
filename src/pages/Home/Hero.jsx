import { ArrowRightIcon } from "@heroicons/react/24/outline";
import images from "../../assets/assets";
import AnimatedButton from "../../components/ui/Buttons";


export default function Hero() {
  return (
    <section className="relative overflow-hidden sm:h-[100vh] mt-5">
  {/* Background Image with Overlay */}
        <div 
            className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
            backgroundImage: `url('${images.Ugx}')`
            }}
        />
   {/*overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent " />
  
  <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
    <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">

      {/* Left Content */}
      <div className="relative z-10 gap-5">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-13 text-white lg:text-5xl">
          Empowering Africa’s Farmers & Entrepreneurs for Global Markets
        </h1>

        <p className="mt-7 max-w-xl  leading-6 font-light text-hero-text">
          OB39 Ltd transforms small-scale producers and emerging businesses
          through cooperative capital cycles, modern training,
          and direct digital market access—bypassing middlemen and building sustainable,
          globally competitive enterprises.
        </p>

       <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <AnimatedButton>
            Lend With Us
          </AnimatedButton>
            

            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-semibold text-white transition hover:bg-[#1A1C4C] w-1/2 sm:w-auto"
            >
              Learn More
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
      </div>

      {/* Right Image */}
      <div className="absolute right-[-35%] flex items-end lg:relative lg:right-[-35%] lg:justify-end">
        <img
          src={images.Farmers}
          alt="Farmers working together"
          className="
            h-[90%] w-auto object-cover
            lg:w-[170%]
            lg:max-w-none
            rounded-[50%]
            hidden
          "
        />
         {/*overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent lg:hidden " />

       
      </div>

    </div>
  </div>
</section>
  );
}