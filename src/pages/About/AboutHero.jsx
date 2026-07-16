import images from "../../assets/assets"

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
]

export default function AboutHero() {


  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-30 sm:py-50 mt-6">
     <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${images.AboutHero4})`,
        }}
    ></div>

    
      {/**DARK OVERLAY */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/90 via-background/70 via-40% to-background/40"></div>

        
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-30">
         
        <div className="mx-auto max-w-4xl lg:mx-0">
           
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Building the Digital Rails for Africa’s Community Finance
          </h2>
          <p className="mt-8 text-lg font-light text-pretty text-gray-300 sm:text-xl/8">
            "0B39 builds the digital infrastructure and export ecosystems that connect African farmers and young businesses directly to high-value domestic and global markets
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-white/80 font-bold text-badges transition-colors">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}