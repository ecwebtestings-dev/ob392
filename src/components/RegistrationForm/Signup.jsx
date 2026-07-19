import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import AuthLayout from "./AuthLayout";
import { Field } from "./AuthFields";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white m-auto flex justify-center">
          Join{" "}
          <span className="ml-1.5">
            OB39
          </span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 m-auto flex justify-center">
          Create an account to get started with us.
        </p>
      </div>

      {/* FORM */}
      <form className="mt-8 space-y-4">

        {/**USER NAME INPUT */}
      <Field label="Username" type="text" placeholder="" />

      {/**EMAIL INPUT */}
        <Field label="Email Address" type="email" placeholder="" />

      {/*PASSWORD INPUT */}
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

          {/**COMFIRM PASSWORD  */}
        <Field label="Confirm Password" type="password" placeholder="••••••••••••" />


          {/** CREATE ACCOUNT BUTTON */}
        <button type="submit"
          className="mt-2 w-full rounded-lg bg-button-bg py-3.5 text-sm font-semibold uppercase tracking-wider text-background transition-all duration-300 hover:bg-button-hover hover:shadow-lg hover:shadow-badges/25 hover:-translate-y-0.5"
        >
          Create Account
        </button>
      </form>

      {/* LINK TO SIGN IN */}
      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-badges hover:text-white transition-colors">
          Log in
        </a>
      </p>
    </AuthLayout>
  );
}