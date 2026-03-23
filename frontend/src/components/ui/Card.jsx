export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-[2rem] border border-orange-100 bg-white shadow-[0_18px_50px_-30px_rgba(15,23,42,0.16)] ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
