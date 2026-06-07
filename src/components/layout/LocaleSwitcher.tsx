'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ scrolled = false }: { scrolled?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(/^\/(en|ar)/, `/${next}`);
    window.location.href = newPath;
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        'group flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200',
        scrolled
          ? 'border-navy/25 text-navy hover:bg-navy/5'
          : 'border-white/30 text-white hover:bg-white/10'
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-500 transition-transform duration-200 group-hover:scale-110" />
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase leading-none">
        {locale === 'en' ? 'العربية' : 'EN'}
      </span>
    </button>
  );
}
