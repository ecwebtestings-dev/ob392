
const aboutItems = [
  {
    id: 1,
    title: 'Our Vision',
    description:
      "To become Africa's leading structural empowerment, digital marketplace, and export facilitation enterprise, transforming small-scale farmers, micro-enterprises, and young developing industries into globally competitive market players while ensuring sustainable rural development, security, and inclusive economic growth.",
    category: { title: 'The Future', href: '#' },
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Our Mission',
    description:
      'To empower young developing businesses and African farmers through structured micro-capital cycles, modern technical knowledge, automated peer-to-peer transaction visibility, cooperative resource sharing, and direct, un-interrupted access to high-value domestic and international markets via proprietary digital ecosystems.',
    category: { title: 'The Action', href: '#' },
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Our Core Pillars',
    description:
      'Comprehensive service provision, financial capital pooling logistics, industrial security and continuity, agricultural development, export facilitation, and digital marketplace management to ensure uninterrupted growth.',
    category: { title: 'The Foundation', href: '#' },
    icon: (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  return (
    <div className="bg-white py-24 sm:py-32 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-heading sm:text-5xl">
            Driving Uganda's Growth
          </h2>
          <p className="mt-2 text-lg text-text-color">
            We are building the digital and financial infrastructure needed to empower local communities and connect them to the global economy.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="mx-auto mt-3 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 pt-5 sm:mt-10 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {aboutItems.map((item) => (
            <article key={item.id} className="flex max-w-xl flex-col items-start justify-between group ">
              
              {/* Icon & Category Badge */}
              <div className="flex items-center gap-x-4 mb-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-badges/10 text-badges ring-1 ring-inset ring-badges/20 group-hover:bg-badges group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-8 text-heading group-hover:text-badges transition-colors duration-300">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.title}
                  </a>
                </h3>
              </div>

              {/* Title & Description */}
              <div className="group relative grow">
                
                <p className="mt-5 line-clamp-4 text-md/2 text-text-color">
                  {item.description}
                </p>
              </div>

              
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}