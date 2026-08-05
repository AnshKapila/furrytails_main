import { cn } from '@/lib/utils';

export type PaletteColor = {
  name: string;
  value: string;
  note?: string;
};

/*
 * Brand colors as a single guideline strip with a compact legend — the
 * reader sees the palette as color, not as a grid of hex blocks.
 */
export function ColorPalette({
  colors,
  className,
}: {
  colors: PaletteColor[];
  className?: string;
}) {
  return (
    <div className={cn('min-w-0', className)}>
      <div
        className="flex h-12 overflow-hidden rounded-xl border border-border"
        aria-hidden="true"
      >
        {colors.map((color) => (
          <span
            key={color.name}
            className="min-w-0 flex-1"
            style={{ background: color.value }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {colors.map((color) => (
          <li key={color.name} className="flex min-w-0 items-center gap-2">
            <span
              className="size-3.5 shrink-0 rounded-full border border-border"
              style={{ background: color.value }}
              aria-hidden="true"
            />
            <span className="text-sm font-medium leading-5">{color.name}</span>
            <span className="font-mono text-xs uppercase leading-5 text-muted-foreground">
              {color.value}
            </span>
            {color.note ? (
              <span className="text-xs leading-5 text-muted-foreground">
                · {color.note}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
