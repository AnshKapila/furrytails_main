import { portalConfig } from '@/lib/portal';
import { cn } from '@/lib/utils';

export function BrandLogo({ className }: { className?: string }) {
  const { companyName, logoUrl } = portalConfig.brand;

  if (logoUrl) {
    return (
      // Company logos may come from any validated HTTPS host.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={companyName}
        className={cn('max-h-8 max-w-44 object-contain', className)}
      />
    );
  }

  return (
    <span className={cn('text-lg font-semibold tracking-[-0.02em]', className)}>
      {companyName}
    </span>
  );
}
