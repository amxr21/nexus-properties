import { cn } from '@/lib/utils';

interface SectionHeadingBlockProps {
  eyebrow?: string;
  heading: string;
  sub?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}

export function SectionHeadingBlock({
  eyebrow, heading, sub, light, center, className,
}: SectionHeadingBlockProps) {
  return (
    <div className={cn('flex flex-col gap-4', center && 'items-center text-center', className)}>
      {eyebrow && (
        <span className={cn(
          'text-sm font-bold tracking-[0.3em] uppercase',
          light ? 'text-gold-400' : 'text-gold-500',
        )}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn(
        'font-display text-[1.75rem] font-light leading-snug md:text-[2.2rem]',
        light ? 'text-white' : 'text-navy',
      )}>
        {heading}
      </h2>
      {sub && (
        <p className={cn(
          'text-[13px] leading-[1.85]',
          light ? 'text-white/50' : 'text-charcoal/55',
          center && 'max-w-lg',
        )}>
          {sub}
        </p>
      )}
    </div>
  );
}
