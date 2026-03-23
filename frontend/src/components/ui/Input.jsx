export default function Input({
  label,
  error,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <label className={`block ${wrapperClassName}`.trim()}>
      {label && <span className="mb-2 block text-sm font-semibold text-slate-900">{label}</span>}
      <input
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-orange-100 ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <span className="mt-2 block text-sm text-red-600">{error}</span>}
    </label>
  );
}
