import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid'
import images from '../../assets/assets'
import AnimatedButton from '../../components/ui/Buttons'

export default function Footer() {
  const footerDate = new Date().getFullYear();

  

  const company = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Like to invest/partner ?', href: '/partners' },
];

  const socials = [
    {
      name: 'X',
      href: 'https://x.com/Ocaajoshuaxuo',
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      name: 'LinkedIn',
      href: '#',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      name: 'Facebook',
      href: '#',
      path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      name: 'WhatsApp',
      href: '#',
      path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z',
      note: 'body',
    },
  ];

  return (
    <footer className="relative bg-background ubuntu-light overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,.07),transparent_50%)]" />

      {/* Top CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl lg:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-badges/10 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to transform your business?
                </h2>
                <p className="mt-4 text-md leading-relaxed text-gray-400">
                  Join thousands of farmers and entrepreneurs already using OB39
                  Ltd to access capital, training, and global markets across
                  Africa.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <AnimatedButton href="/contact">Join Us</AnimatedButton>

                <a
                  href="tel:+256772840840"
                  className="inline-flex items-center justify-center rounded-lg border border-badges/40 px-3 py-3 text-base font-semibold text-white transition-colors duration-300 hover:border-badges hover:bg-badges/10"
                >
                  Talk to Our Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Main Footer */}
<div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
  <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
    {/* Brand Column */}
    <div className="lg:col-span-2">
      <a href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-2xl">
        <img alt="Logo" src={images.logo} className="h-8 w-auto" />
        <h1 className="text-white">OB39</h1>
      </a>
      <p className="mt-6 max-w-sm text-base/7 text-gray-400">
        Empowering Africa's farmers and entrepreneurs through cooperative
        capital, modern training, and direct market access. Building
        globally competitive enterprises for sustainable economic growth.
      </p>
    </div>

    {/* Company Column */}
    <div className="lg:col-span-1">
      <h3 className="text-xs font-semibold tracking-widest text-badges">
        COMPANY
      </h3>
      
          <ul role="list" className="mt-6 space-y-4">
      {company.map((item, index) => (
        <li key={item.name}>
          <a
            href={item.href}
            className={`text-sm/6 transition-colors hover:text-white ${
              index === company.length - 1 
                ? 'text-[#59B947] hover:text-[#7ddb6a]' 
                : 'text-gray-400'
            }`}
          >
            {item.name}
          </a>
        </li>
  ))}
</ul>
    </div>

    {/* Get In Touch Column */}
    <div className="lg:col-span-2">
      <h3 className="text-xs font-semibold tracking-widest text-badges">
        GET IN TOUCH
      </h3>
      <ul role="list" className="mt-6 space-y-5">
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex size-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <MapPinIcon className="size-4 text-badges" />
          </span>
          <span className="text-sm/6 text-gray-400">
            Plot 238 Kalule Road,
            <br />
            Kampala, Uganda
          </span>
        </li>
        <li className="flex items-center gap-3">
          <span className="flex size-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <PhoneIcon className="size-4 text-badges" />
          </span>
          
          <a  href="tel:+256772840840"
            className="text-sm/6 text-gray-400 transition-colors hover:text-white"
          >
            +256772840840
          </a>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex size-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <EnvelopeIcon className="size-4 text-badges" />
          </span>
          <div className="text-sm/6 text-gray-400">
            
            <a  href="mailto:info@ob39.co.ug"
              className="block transition-colors hover:text-white"
            >
              info@ob39.co.ug
            </a>
            
            <a  href="mailto:support@ob39.co.ug"
              className="block transition-colors hover:text-white"
            >
              support@ob39.co.ug
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="text-sm/6 text-gray-500">
              © {footerDate} OB39 Ltd. All rights reserved.
            </div>

            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-badges/50 hover:bg-badges hover:text-white"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}