import { cn } from '@/lib/utils';

/*
 * A concept or illustrative image inside a report — a hero visual, market
 * map, or diagram generated through the images skill. Data always renders as
 * chart/table components, never as an image. `src` must be a hosted URL
 * returned by a platform image recipe.
 */
export function ReportFigure({
  src,
  alt,
  caption,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={cn('min-w-0', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          'w-full rounded-2xl border border-border object-cover',
          imgClassName,
        )}
      />
      {caption ? (
        <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
