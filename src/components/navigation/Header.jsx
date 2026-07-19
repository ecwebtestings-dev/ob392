'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  PhoneIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import images from '../../assets/assets'

const products = [
  { name: 'Business Development & Advisory',
    description: 'Strategic guidance to grow your enterprise',
    href: '/services#agribusiness', 
    icon: ChartPieIcon 
  },
  { 
    name: 'Cooperative Financing', 
    description: 'Pooled capital for sustainable growth', 
    href: '/services#business-incubation', 
    icon: CursorArrowRaysIcon 
  },
  { 
    name: 'Market Access & Exports', 
    description: 'Direct routes to international buyers', 
    href: '/services', 
    icon: FingerPrintIcon 
  },
  { 
    name: 'Modern Agriculture', 
    description: 'Technology-driven farming practices', 
    href: '/services#how-it-works', 
    icon: ArrowPathIcon 
  },
]

const callsToAction = [{ name: 'Contact sales', href: '#', icon: PhoneIcon }]

const navLinks = [
  { name: 'Who We Are', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
]




export default function Header() {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-background/0 border-b border-transparent'
      }`}
    >
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-2xl">
            <img alt="Logo" src={images.logo} className="h-8 w-auto" />
            <h1 className="text-white">OB39
             
            </h1>
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* DESKTOP NAV */}
        <PopoverGroup className="hidden lg:flex lg:items-center lg:gap-x-10">
          <a
            href="/"
            className="relative text-sm/6 font-semibold text-badges group"
          >
            Home
            <span className="absolute -bottom-1 left-0 h-px w-full bg-badges" />
          </a>

          {/* SERVICES DROPDOWN */}
          <Popover className="relative">
            <PopoverButton className="group flex items-center gap-x-1 text-sm/6 font-medium text-gray-400 hover:text-white transition-colors outline-none cursor-pointer">
              Services
              <ChevronDownIcon
                aria-hidden="true"
                className="size-4 flex-none text-gray-500 transition-transform duration-200 group-data-open:rotate-180 group-data-open:text-badges"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-24 top-full z-10 mt-4 w-screen max-w-md overflow-hidden rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/40 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-start gap-4 rounded-xl p-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="mt-1 flex size-10 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-badges/40 group-hover:bg-badges/10 transition-colors">
                      <item.icon
                        aria-hidden="true"
                        className="size-5 text-gray-400 group-hover:text-badges transition-colors"
                      />
                    </div>
                    <div>
                      <a href={item.href} className="font-semibold text-white text-sm">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 divide-x divide-white/10 bg-white/[0.03] border-t border-white/10">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-white hover:bg-white/5 transition-colors"
                  >
                    <item.icon aria-hidden="true" className="size-5 flex-none text-badges" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm/6 font-medium text-gray-400 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-badges after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-3">
          <a href="/" className="text-sm/6 font-medium text-gray-400 hover:text-white px-3 py-1 transition-colors">
            Log in
          </a>
          
          <a  href="/"
            className="text-sm/6 font-semibold text-background bg-button-bg hover:bg-button-hover px-5 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-badges/20 hover:-translate-y-0.5"
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
              <img alt="Logo" src={images.logo} className="h-8 w-auto" />
              <h1 className="text-white text-xl">OB39</h1>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base/7 font-medium text-badges hover:bg-white/5"
                >
                  Home
                </a>

                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2.5 pr-3.5 pl-3 text-base/7 font-light text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    Our Services
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none transition-transform duration-200 group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-1 space-y-1 pb-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg py-2 pr-3 pl-6 text-sm/6 font-light text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <item.icon className="size-4 flex-none text-badges/70" />
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base/7 font-light text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* MOBILE AUTH BUTTONS */}
              <div className="border-t border-white/10 py-6 space-y-3">
                <a
                  href="#"
                  className="block rounded-lg bg-button-bg px-3 py-3 text-center text-sm font-semibold text-background hover:bg-button-hover transition-colors"
                >
                  Log In
                </a>
                
               <a  href="#"
                  className="block rounded-lg border border-white/20 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}