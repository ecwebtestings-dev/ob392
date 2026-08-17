'use client'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  BriefcaseIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

import images from '../../assets/assets'
import { getCurrentUser, logout } from '../../Authentication/authService'
import { api } from '../../Authentication/api'


// Services dropdown items
const products = [
  {
    name: 'Business Development & Advisory',
    description: 'Strategic guidance to grow your enterprise',
    href: '/services#agribusiness',
    icon: ChartPieIcon,
  },
  {
    name: 'Cooperative Financing',
    description: 'Pooled capital for sustainable growth',
    href: '/services#business-incubation',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Market Access & Exports',
    description: 'Direct routes to international buyers',
    href: '/services',
    icon: FingerPrintIcon,
  },
  {
    name: 'Modern Agriculture',
    description: 'Technology-driven farming practices',
    href: '/services#how-it-works',
    icon: ArrowPathIcon,
  },
]

// Footer CTA row inside the services dropdown panel
const callsToAction = [
  { 
    name: 'For Investors/Partners', 
    href: './partners',
    icon: BriefcaseIcon 
  }
]

// Top-level nav links (rendered on both desktop and mobile)
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
]

// Shared active-link classes for desktop nav — underline animates in/out based on isActive
function getDesktopLinkClasses(isActive) {
  return `relative text-sm/6 font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-badges after:transition-all after:duration-300 ${
    isActive
      ? 'text-badges after:w-full'
      : 'text-gray-400 hover:text-white after:w-0 hover:after:w-full'
  }`
}

// Shared active-link classes for mobile nav (simpler highlight, no underline animation)
function getMobileLinkClasses(isActive) {
  return `-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base/7 font-medium transition-colors hover:bg-white/5 ${
    isActive ? 'text-badges' : 'text-gray-400 hover:text-white'
  }`
}

export default function Header() {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()

  // Navigation / UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false) // toggles the frosted background once user scrolls past 8px

  // Track scroll position to switch header background/border styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])



// initialize authLoading 
const [user, setUser] = useState(null)
const [authLoading, setAuthLoading] = useState(() => Boolean(api.getToken()))

useEffect(() => {
  const token = api.getToken()
  if (!token) return // authLoading already correctly initialized to false above

  getCurrentUser()
    .then(setUser)
    .catch(() => {
      api.setToken(null)
      setUser(null)
    })
    .finally(() => setAuthLoading(false))
}, [])


  // Logs the user out
  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Failed to log out')
    }
  }

  // Highlights the "Services" popover trigger whenever we're anywhere under /services
  const isServicesActive = currentPath.startsWith('/services')

  //2-letter initials
  function getInitials(fullName) {
    if (!fullName) return ''

    const parts = fullName.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''

    return (first + last).toUpperCase()
  }

  return (
    
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/100 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-background/0 border-b border-transparent'
      }`}
    >
      {/* MAIN NAVIGATION */}
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* LOGO / BRAND */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-2xl">
            <img alt="Logo" src={images.logo} className="h-8 w-auto" />
            <div className="flex flex-col leading-none">
              <h1 className="text-lg font-bold tracking-tight text-badges leading-none">OB39</h1>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-white leading-none">
                Transforming Africa
              </span>
            </div>
          </a>
        </div>

        {/* MOBILE MENU TOGGLE  */}
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

        {/* DESKTOP NAVIGATION  */}
        <PopoverGroup className="hidden lg:flex lg:items-center lg:gap-x-10">
          {/* HOME LINK */}
          <a href="/" className={getDesktopLinkClasses(currentPath === '/')}>
            Home
          </a>

          {/* SERVICES DROPDOWN */}
          <Popover className="relative">
            <PopoverButton
              className={`group flex items-center gap-x-1 text-sm/6 font-medium transition-colors outline-none cursor-pointer ${
                isServicesActive ? 'text-badges' : 'text-gray-400 hover:text-white'
              }`}
            >
              Services
              <ChevronDownIcon
                aria-hidden="true"
                className={`size-4 flex-none transition-transform duration-200 group-data-open:rotate-180 ${
                  isServicesActive ? 'text-badges' : 'text-gray-500 group-data-open:text-badges'
                }`}
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
                      <p className="mt-1 text-xs text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 divide-x divide-white/10 bg-white/[0.03] border-t border-white/10">
                {callsToAction.map((item) => (
                  
                   <a key={item.name}
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

          {/* REMAINING NAV LINKS */}
          {navLinks
            .filter((link) => link.name !== 'Home')
            .map((link) => (
              <a key={link.name} href={link.href} className={getDesktopLinkClasses(currentPath === link.href)}>
                {link.name}
              </a>
            ))}
        </PopoverGroup>

        {/* DESKTOP AUTH AREA*/}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-3">
          {authLoading ? null : user ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors outline-none cursor-pointer">
                <span className="flex size-7 items-center justify-center rounded-full bg-badges text-xs font-semibold text-black">
                  {getInitials(user.name)}
                </span>
                <ChevronDownIcon className="size-4 text-gray-500" />
              </MenuButton>

             
              <MenuItems
                transition
                anchor="bottom end"
                className="z-50 w-48 origin-top-right rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-1.5 mt-2 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-leave:duration-100"
              >

                
                {/* LOG OUT BUTTON */}
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 data-focus:bg-red-500/10 data-focus:text-red-300 transition-colors"
                  >
                    <ArrowRightStartOnRectangleIcon className="size-4" />
                    Log out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            // Logged out: show login/signup 
            <>
              <a href="/login" className="text-sm/6 font-medium text-gray-400 hover:text-white px-3 py-1 transition-colors">
                Log in
              </a>

              
               <a href="/signup"
                className="text-sm/6 font-semibold text-background bg-button-bg hover:bg-button-hover px-5 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-badges/20 hover:-translate-y-0.5"
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </nav>

      {/* MOBILE MENU  */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        {/* Dimmed backdrop behind the panel */}
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          {/* Panel header */}
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-2xl">
              <img alt="Logo" src={images.logo} className="h-8 w-auto" />
              <div className="flex flex-col leading-none">
                <h1 className="text-lg font-bold tracking-tight text-badges leading-none">OB39</h1>
                <span className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-white leading-none">
                  Transforming Africa
                </span>
              </div>
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
              {/* MOBILE NAV LINKS */}
              <div className="space-y-2 py-6">
                <a href="/" className={getMobileLinkClasses(currentPath === '/')}>
                  Home
                </a>

                {/* Services section */}
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton
                    className={`group flex w-full items-center justify-between rounded-lg py-2.5 pr-3.5 pl-3 text-base/7 font-light hover:bg-white/5 transition-colors ${
                      isServicesActive ? 'text-badges' : 'text-gray-400 hover:text-white'
                    }`}
                  >
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

                {navLinks
                  .filter((link) => link.name !== 'Home')
                  .map((link) => (
                    <a key={link.name} href={link.href} className={getMobileLinkClasses(currentPath === link.href)}>
                      {link.name}
                    </a>
                  ))}
              </div>

              {/* MOBILE AUTH AREA */}
              <div className="border-t border-white/10 py-6 space-y-3">
                {authLoading ? null : user ? (
                  <>
                    {/* User summary card  */}
                    <div className="flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/10 px-3 py-3">
                      <UserCircleIcon className="size-8 text-badges flex-none" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    
                  
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        handleLogout()
                      }}
                      className="z-50 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-3 text-center text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <ArrowRightStartOnRectangleIcon className="size-4" />
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    
                     <a href="/login"
                      className="block rounded-lg bg-button-bg px-3 py-3 text-center text-sm font-semibold text-white hover:bg-button-hover transition-colors"
                    >
                      Log In
                    </a>

                    
                     <a href="/signup"
                      className="block rounded-lg border border-white/20 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}