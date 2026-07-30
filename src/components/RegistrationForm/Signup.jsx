import { useState } from "react";
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import AuthLayout from "./AuthLayout";
import { Field } from "./AuthFields";
import { register } from "../../Authentication/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [fieldErrors, setFieldErrors] = useState({}); // per-field validation errors
  const [error, setError] = useState("");             // general server error
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Updates one field and clears its error on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this specific field as the user retypes it
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));

    // Clear any leftover server error once the user starts editing again
    if (error) setError("");
  };

  // Runs before submit — returns true if the form passes validation
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submits the signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setError("");
    setLoading(true);

    try {
      await register(form); // registers the account, stores token
      toast.success("Account created! Login to access your account");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* HEADING */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white m-auto flex justify-center">
          Join <span className="ml-1.5">OB39</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-400 m-auto flex justify-center">
          Create an account to get started with us.
        </p>
      </div>

      {/* FORM */}
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {/* FULL NAME */}
        <Field
          label="Full name"
          type="text"
          name="name"
          placeholder=""
          value={form.name}
          onChange={handleChange}
          error={fieldErrors.name}
        />

        {/* EMAIL */}
        <Field
          label="Email Address"
          type="email"
          name="email"
          placeholder=""
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />

        {/* PASSWORD */}
        <div className="group relative rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-colors focus-within:border-badges/50 focus-within:bg-white/[0.06]">
          <label className="block text-xs font-medium tracking-wide text-gray-500">
            Password
          </label>

          <div className="mt-1 flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              value={form.password}
              onChange={handleChange}
              name="password"
              className="w-full bg-transparent text-sm font-medium text-white placeholder:text-gray-600 focus:outline-none"
            />

            {/* Toggles password visibility */}
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

          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <Field
          label="Confirm Password"
          type="password"
          placeholder=""
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          error={fieldErrors.password_confirmation}
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-button-bg py-3.5 text-sm font-semibold uppercase tracking-wider text-background transition-all duration-300 hover:bg-button-hover hover:shadow-lg hover:shadow-badges/25 hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="size-4 animate-spin" /> Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* LINK TO LOGIN */}
      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-badges hover:text-white transition-colors">
          Log in
        </a>
      </p>
    </AuthLayout>
  );
}