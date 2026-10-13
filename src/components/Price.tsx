// Sale-aware price. When WooCommerce has the product on sale, woo.ts sets
// standardPrice to the regular price and this renders it struck through
// before the sale price. Without a sale it is just the price.
//
// The wrapper carries the caller's typography; the struck price inherits it
// at a smaller size in the muted sage.

interface PriceProps {
  price: string;
  standardPrice?: string | null;
  className?: string;
  style?: React.CSSProperties;
}

export default function Price({ price, standardPrice, className = '', style }: PriceProps) {
  const onSale = Boolean(standardPrice) && standardPrice !== price;
  if (!onSale) {
    return (
      <span className={className} style={style}>
        {price}
      </span>
    );
  }
  return (
    <span className={`inline-flex items-baseline gap-1.5 whitespace-nowrap ${className}`} style={style}>
      <del className="text-[0.8em] text-[#8D9A83] line-through decoration-[#8D9A83]/70">
        <span className="sr-only">Was </span>
        {standardPrice}
      </del>
      <span>
        <span className="sr-only">now </span>
        {price}
      </span>
    </span>
  );
}
