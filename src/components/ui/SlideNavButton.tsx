'use client';

import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideNavButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md';
}

export function SlideNavButton({
  icon: Icon, label, onClick, variant = 'light', size = 'md',
}: SlideNavButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex items-center justify-center border transition-colors',
        size === 'sm' ? 'h-7 w-7' : 'h-9 w-9',
        variant === 'light'
          ? 'border-white/30 text-white hover:border-white/70 hover:bg-white/10'
          : 'border-charcoal/20 text-charcoal/40 hover:border-gold-500 hover:text-gold-500',
      )}
    >
      <Icon size={size === 'sm' ? 13 : 14} />
    </button>
  );
}
