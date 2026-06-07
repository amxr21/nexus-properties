'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { NexusLogo } from '@/components/ui/NexusLogo';
import { LocaleSwitcher } from './LocaleSwitcher';
import { navLinks } from '@/lib/content';
import { cn } from '@/lib/utils';

function NavLink({ href, label, onClick, scrolled }: {
  href: string;
  label: string;
  onClick?: () => void;
  scrolled: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors whitespace-nowrap',
        scrolled
          ? 'text-navy/65 hover:text-navy'
          : 'text-white/80 hover:text-white'
      )}
    >
      {label}
    </a>
  );
}

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // All locales are prefixed (/en/... and /ar/...) with localePrefix: 'always'
  const localizeHref = (href: string): string => {
    if (href === '/') return `/${locale}`;
    if (href.startsWith('/#')) return `/${locale}${href.slice(1)}`; // /#about → /en#about
    return `/${locale}${href}`;                                       // /contact → /en/contact
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const leftLinks  = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
      <div className={cn(
        'pointer-events-auto w-[90%] max-w-6xl rounded-2xl transition-all duration-500',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-black/8'
          : 'bg-white/5'
      )}>

        {/* Desktop */}
        <div className="hidden md:flex h-14 px-7 items-center gap-5">

          {/* Left links */}
          <nav className="flex items-center gap-7" aria-label="Primary navigation left">
            {leftLinks.map(({ key, href }) => (
              <NavLink key={key} href={localizeHref(href)} label={t(key)} scrolled={scrolled} />
            ))}
          </nav>

          {/* Logo — center */}
          <div className="flex flex-1 justify-center">
            <a href={localizeHref('/')} aria-label="Nexus Properties — home">
              <NexusLogo dark={scrolled} />
            </a>
          </div>

          {/* Right links */}
          <nav className="flex items-center gap-7" aria-label="Primary navigation right">
            {rightLinks.map(({ key, href }) => (
              <NavLink key={key} href={localizeHref(href)} label={t(key)} scrolled={scrolled} />
            ))}
          </nav>

          {/* Locale switcher */}
          <div className={cn('border-s ps-5', scrolled ? 'border-navy/15' : 'border-white/20')}>
            <LocaleSwitcher scrolled={scrolled} />
          </div>
        </div>

        {/* Mobile bar */}
        <div className="flex md:hidden items-center justify-between h-14 px-5">
          <a href={localizeHref('/')}>
            <NexusLogo dark={scrolled} subSize="text-[6px]" />
          </a>
          <div className="flex items-center gap-3">
            <LocaleSwitcher scrolled={scrolled} />
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
              className={cn('p-1 transition-colors', scrolled ? 'text-navy' : 'text-white')}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — full screen */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'pointer-events-auto fixed inset-0 z-40 flex flex-col bg-navy transition-transform duration-300 md:hidden',
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-14 items-center justify-between px-6 border-b border-white/10">
          <NexusLogo subSize="text-[6px]" />
          <button onClick={() => setMenuOpen(false)} className="text-white p-1"><X size={20} /></button>
        </div>
        <nav className="flex flex-col px-6 pt-4">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={localizeHref(href)}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-4 text-[11px] font-bold tracking-[0.2em] text-white/75 uppercase hover:text-white transition-colors"
            >
              {t(key)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
