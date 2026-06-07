import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 12-column centered grid container.
 * col-width 92px (5.75rem) × 12 + gutter 24px (1.5rem) × 11 = 1368px max-width.
 * Horizontal padding equals one gutter (24px) so content aligns to the grid edge.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6',
        className
      )}
      style={{ maxWidth: '1368px' }}
    >
      {children}
    </div>
  );
}
