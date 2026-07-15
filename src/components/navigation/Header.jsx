'use client'

import { useState } from 'react'
import {Dialog,DialogPanel,Disclosure,DisclosureButton,DisclosurePanel,Popover,PopoverGroup,} from '@headlessui/react'
import {

  PhoneIcon,
  ChevronDownIcon,
  ArrowPathIcon,Bars3Icon,ChartPieIcon,CursorArrowRaysIcon,FingerPrintIcon,SquaresPlusIcon,XMarkIcon,} from '@heroicons/react/24/outline'

import images from '../../assets/assets'


const products = [
  { name: 'Business Development & Advisory', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Cooperative Financing', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Market Access & Exports', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Quality Inputs & Farm Support', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Modern Agriculture', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]

const callsToAction = [
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-background fixed top-0 left-0 right-0 z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2 text-2xl">
            <img alt="Logo" src={images.logo} className="h-8 w-auto" />
            <h1 className='text-white'>OB39</h1>
          </a>
        </div>


        {/**MOBILE MENU TOOGLE */}
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

        </div>


        {/**DROP DOWN MENU */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <a href="/" className="flex items-center gap-x-1 text-sm/6 font-semibold text-badges cursor-pointer">
              Home
            </a>


        
           
            
          </Popover>


          <a href="/about" className="text-sm/6 font-medium text-gray-400 hover:text-badges flex items-center gap-1"> 
          Who We Are</a>
          <a href="/" className="text-sm/6 font-medium text-gray-400  hover:text-badges flex items-center gap-1">
         Services</a>
          <a href="/contact" className="text-sm/6 font-medium text-gray-400  hover:text-badges flex items-center gap-1">
         Contact Us
          </a>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          <a href="/" className="text-sm/6 font-medium text-gray-400 px-3 py-1">
            Log in 
          </a>
          <a href="/" className="text-sm/6 font-medium text-background  hover:bg-button-hover bg-button-bg px-3 py-1
          rounded ">
            Sign Up
          </a>
        </div>
      </nav>


      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img alt="Logo" src={images.logo} className="h-8 w-auto"/>
            </a>

              {/**CLOSE ICON */}
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-400">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>

          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <a href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-light text-gray-400 hover:bg-white/5
                flex items-center gap-2">
                Home
                </a>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7
                   font-light text-gray-400 hover:bg-white/5">
                   Our Services
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-0.5 pr-3 pl-6 text-sm/7 font-light text-white hover:bg-white/5"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>


                <a href="/services" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-light text-gray-400 hover:bg-white/5
                flex items-center gap-2">
                 Who We Are
                </a>
                
                <a href="/contact" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-light text-gray-400 hover:bg-white/5
                flex items-center gap-2">
                Contact Us
                </a>
              </div>

               {/* MOBILE REGISTRATION BUTTONS */}
<div className="border-t border-white/10 py-6">
  <a
    href="#"
    className="block rounded-lg bg-button-bg px-3 py-3 text-center text-sm font-semibold text-background hover:bg-button-hover"
  >
    Log In
  </a>

  <a
    href="#"
    className="mt-3 block rounded-lg border border-white/20 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
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
