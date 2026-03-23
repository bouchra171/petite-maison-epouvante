const categoryStyles = {
  'Décoration': 'bg-orange-50 text-accent',
  Costumes: 'bg-slate-100 text-slate-700',
  Accessoires: 'bg-amber-50 text-amber-700',
  'Lumières': 'bg-yellow-50 text-yellow-700',
  Sons: 'bg-red-50 text-red-700',
};

export default function ProductVisual({ product, className = '' }) {
  const category = product?.category || 'Produit';
  const visualStyle = categoryStyles[category] || 'bg-orange-50 text-accent';

  return (
    <div
      className={`flex items-center justify-center rounded-[1.75rem] border border-orange-100 ${visualStyle} ${className}`.trim()}
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-sm font-semibold shadow-sm">
          LP
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em]">
          {category}
        </p>
      </div>
    </div>
  );
}
