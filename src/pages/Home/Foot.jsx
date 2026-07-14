import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  
} from '@heroicons/react/24/solid'
import images from '../../assets/assets'
import AnimatedButton from '../../components/ui/Buttons'


export default function Footer() {
  return (
    <footer className="bg-background ubuntu-light">
      {/* Top CTA Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your business?
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Join thousands of farmers and entrepreneurs already using OB39 Ltd to access capital, 
                training, and global markets across Africa.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
               <AnimatedButton href='/'>
                    Join Our Program
                </AnimatedButton>

                       
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-lg border border-badges/50 px-6 py-3 text-base font-semibold text-white hover:bg-badges/10 transition-colors duration-300 max-[20px]:"
              >
                Talk to Our Team
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2 text-2xl">
                  <img alt="Logo" src={images.logo} className="h-8 w-auto" />
                  <h1 className='text-white'>OB39</h1>
                </a>
            </div>
            <p className="mt-6 text-base/7 text-gray-400 max-w-sm">
              Empowering Africa's farmers and entrepreneurs through cooperative capital, 
              modern training, and direct market access. Building globally competitive 
              enterprises for sustainable economic growth.
            </p>
          </div>

          {/* Platforms Column */}
          <div className="lg:col-span-1">
            <h3 className="text-sm/6 font-semibold text-white">PLATFORMS</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  Agribusiness Development
                </a>
              </li>
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  Business Incubation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  Digital Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  Export Facilitation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  Capital Pooling
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-1">
            <h3 className="text-sm/6 font-semibold text-white">COMPANY</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  Who we are
                </a>
              </li>
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  Services
                </a>
              </li>
              
              <li>
                <a href="#" className="text-sm/6 text-gray-400 hover:text-badges transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Get In Touch Column */}
          <div className="lg:col-span-2">
            <h3 className="text-sm/6 font-semibold text-white">GET IN TOUCH</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="size-5 text-badges flex-shrink-0 mt-0.5" />
                <span className="text-sm/6 text-gray-400">
                  Plot 238 Kalule Road,<br />
                   Kampala, Uganda
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="size-5 text-badges flex-shrink-0" />
                <div className="text-sm/6 text-grau-400">
                  <a href="tel:+256701234567" className="hover:text-badges transition-colors">
                    +256 701 234 567
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeIcon className="size-5 text-badges flex-shrink-0" />
                <div className="text-sm/6 text-gray-400">
                  <a href="mailto:info@ob39.co.ug" className="hover:text-badges transition-colors">
                    info@ob39.co.ug
                  </a>
                  <br />
                  <a href="mailto:support@ob39.co.ug" className="hover:text-badges transition-colors">
                    support@ob39.co.ug
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-sm/6 text-gray-400">
              © 2026 OB39 Ltd. All rights reserved.
            </div>
           
            <div className="flex items-center gap-4">
              {/* X (Twitter) */}
              <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/5 text-hero-text hover:bg-badges hover:text-white transition-all duration-300">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/5 text-hero-text hover:bg-badges hover:text-white transition-all duration-300">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/5 text-hero-text hover:bg-badges hover:text-white transition-all duration-300">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/5 text-hero-text hover:bg-badges hover:text-white transition-all duration-300">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448zM6.577 17.432c.404.712.901 1.36 1.483 1.932.69.69 1.483 1.277 2.356 1.749 1.149.617 2.442.984 3.761 1.089 1.32.105 2.648-.053 3.91-.469.859-.282 1.675-.689 2.413-1.213.467-.331.898-.707 1.285-1.122.387-.415.728-.87 1.015-1.357.544-.923.896-1.953 1.034-3.02.138-1.067.061-2.15-.229-3.188-.29-1.038-.794-2.003-1.488-2.845-.694-.842-1.561-1.54-2.541-2.048-.98-.508-2.058-.821-3.166-.922-1.108-.101-2.226.011-3.294.331-1.068.32-2.062.846-2.929 1.556-.867.71-1.594 1.589-2.149 2.581-.555.992-.93 2.077-1.112 3.207-.182 1.13-.162 2.286.061 3.409.112.563.279 1.113.498 1.641zm10.422-1.544c-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.558-.279-.186-.093-.372-.186-.5......"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/5 text-hero-text hover:bg-badges hover:text-white transition-all duration-300">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}