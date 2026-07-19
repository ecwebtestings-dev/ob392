import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import images from "../../assets/assets";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === "login";




  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-badges/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-badges/5 blur-3xl" />

      <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="grid lg:grid-cols-2">

          {/* Left: Form */}
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-14">

            {/* Logo */}
            <a href="/" className="flex w-fit items-center gap-2 text-2xl">
              <img alt="Logo" src={images.logo} className="h-8 w-auto" />
              <span className="font-semibold text-white">OB39</span>
            </a>

            {/* Heading */}
            <div className="mt-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {isLogin ? (
                  <>
                    Welcome{" "}
                    <span className="bg-gradient-to-r from-white via-white to-badges bg-clip-text text-transparent">
                      Back
                    </span>
                  </>
                ) : (
                  <>
                    Join{" "}
                    <span className="bg-gradient-to-r from-white via-white to-badges bg-clip-text text-transparent">
                      OB39
                    </span>
                  </>
                )}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-400">
                {isLogin
                  ? "Thank you for coming back. Please log in to your account to continue."
                  : "Create an account to access capital, training, and global markets."}
              </p>
            </div>

            {/* Form */}
            <form className="mt-10 space-y-5">
              {!isLogin && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First Name" type="text" placeholder="John" />
                  <Field label="Last Name" type="text" placeholder="Doe" />
                </div>
              )}

              <Field
                label="Email Address"
                type="email"
                placeholder="coolname@name.com"
              />

              <div className="group relative rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-badges/50 focus-within:bg-white/[0.06]">
                <label className="block text-xs font-medium tracking-wide text-gray-500">
                  Password
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent text-sm font-medium text-white placeholder:text-gray-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="size-5" />
                    ) : (
                      <EyeIcon className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <Field
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••••••"
                />
              )}


              {/* Row: remember me / forgot password */}
              {isLogin && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-white/20 bg-white/5 text-badges accent-badges focus:ring-badges/40"
                    />
                    Remember me
                  </label>
                  
                  <a  href="#"
                    className="text-sm font-medium text-badges hover:text-white transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-button-bg py-3.5 text-sm font-semibold uppercase tracking-wider text-background transition-all duration-300 hover:bg-button-hover hover:shadow-lg hover:shadow-badges/25 hover:-translate-y-0.5"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-transparent px-3 text-xs text-gray-500">
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-4">
                <SocialButton label="Google" />
                <SocialButton label="Apple" />
              </div>
            </form>









            {/* Toggle mode */}
            <p className="mt-8 text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(isLogin ? "signup" : "login")}
                className="font-semibold text-badges hover:text-white transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>

          {/* Right: Image panel */}
          <div className="relative hidden lg:block">
            <img
              src={images.HeroLeftImage}
              alt="Farmers and entrepreneurs building sustainable growth"
              className="absolute inset-0 h-full w-full scale-105 object-cover"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-badges/10" />
            <div className="absolute inset-0 bg-background/20" />

            {/* Content over image */}
            <div className="relative z-10 flex h-full flex-col justify-between p-12">
              <div className="flex items-center gap-2 text-xl">
                <img alt="Logo" src={images.logo} className="h-7 w-auto" />
                <span className="font-semibold text-white">OB39</span>
              </div>

              <div>
                <h2 className="max-w-sm text-3xl font-bold leading-tight text-white">
                  Building sustainable prosperity across Africa
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-300">
                  Cooperative capital, modern training, and direct market
                  access for farmers and entrepreneurs.
                </p>

                {/* Stat row */}
                <div className="mt-8 flex gap-8 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-2xl font-bold text-white">10K+</p>
                    <p className="text-xs text-gray-400">Farmers Empowered</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">$2M+</p>
                    <p className="text-xs text-gray-400">Capital Deployed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type, placeholder }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-badges/50 focus-within:bg-white/[0.06]">
      <label className="block text-xs font-medium tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full bg-transparent text-sm font-medium text-white placeholder:text-gray-600 focus:outline-none"
      />
    </div>
  );
}

function SocialButton({ label }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-3 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
    >
      {label}
    </button>
  );
}