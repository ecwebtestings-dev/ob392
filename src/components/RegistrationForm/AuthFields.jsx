export function Field({
  label,
  type,
  name,     
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="group rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 transition-colors focus-within:border-badges/50 focus-within:bg-white/[0.06]">
      <label className="block text-xs font-medium tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type={type}
        name={name}   
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 w-full bg-transparent text-sm font-medium text-white placeholder:text-gray-600 focus:outline-none"
      />

      {error && (<p className="mt-1 text-xs text-red-400">{error}</p>)}
    </div>
  );
}