import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthLayout from "./AuthLayout";
import { Field } from "./AuthFields";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight m-auto text-white flex justify-center">
          Welcome To OB39
         
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 m-auto flex justify-center">
           Please log in to your account to continue.
        </p>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-4">

        {/**EMAIL INPUT */}
        <Field label="Email Address" type="email" placeholder="" />

        {/**PASSWORD INPUT */}
        <div className="group relative rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-colors focus-within:border-badges/50 focus-within:bg-white/[0.06]">
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

        {/* FORGET PASSWORD LINK */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 text-sm text-gray-400">
            <input
              type="checkbox"
              className="size-4 rounded border-white/20 bg-white/5 text-badges accent-badges focus:ring-badges/40"
            />
            Remember me
          </label>

          <a href="#" className="text-sm font-medium text-badges hover:text-white transition-colors">
            Forgot password?
          </a>
        </div>



        {/** SUBMIT BUTTON*/}
        <button type="submit"
          className="mt-2 w-full rounded-lg bg-button-bg py-3.5 text-sm font-semibold uppercase tracking-wider text-background transition-all duration-300 hover:bg-button-hover hover:shadow-lg hover:shadow-badges/25 hover:-translate-y-0.5"
        >
          Login
        </button>
      </form>

      {/* Link to signup */}
      <p className="mt-8 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <a href="/signup" className="font-semibold text-badges hover:text-white transition-colors">
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
}