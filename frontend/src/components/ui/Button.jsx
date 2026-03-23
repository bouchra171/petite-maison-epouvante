export default function Button({
  as: Component = 'button',
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary:
      'bg-primary text-white shadow-sm hover:bg-accent focus:ring-orange-200',
    secondary:
      'bg-orange-50 text-accent border border-orange-200 hover:bg-orange-100 focus:ring-orange-100',
    ghost:
      'bg-transparent text-slate-700 hover:bg-orange-50 hover:text-accent focus:ring-orange-100',
    danger:
      'bg-red-500 text-white hover:bg-red-600 focus:ring-red-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    />
  );
}
