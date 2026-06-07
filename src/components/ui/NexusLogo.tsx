import { cn } from '@/lib/utils';

interface NexusLogoProps {
  className?: string;
  subSize?: string;
  dark?: boolean;
}

export function NexusLogo({ className, subSize = 'text-[7px]', dark = false }: NexusLogoProps) {
  return (
    <span className={cn('flex flex-col items-center gap-0.5 leading-none', className)}>
      <span className={cn('font-display text-[13px] font-bold tracking-[0.35em] uppercase', dark ? 'text-navy' : 'text-white')}>NEXUS</span>
      <span className={cn(subSize, 'tracking-[0.45em] uppercase', dark ? 'text-charcoal/50' : 'text-white/60')}>PROPERTIES</span>
    </span>
  );
}
