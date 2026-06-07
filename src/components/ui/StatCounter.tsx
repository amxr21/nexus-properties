'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  value: string;
  label: string;
}

function parseNumber(val: string): { prefix: string; num: number; suffix: string } | null {
  const match = val.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export function StatCounter({ value, label }: StatCounterProps) {
  const parsed = parseNumber(value);
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!parsed || animated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animated.current = true;
        observer.disconnect();
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = parsed.num * eased;
          const formatted = Number.isInteger(parsed.num)
            ? Math.round(cur).toString()
            : cur.toFixed(1);
          setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 px-6 py-4 text-center">
      <span className="font-display text-[2.8rem] font-light leading-none text-navy">{display}</span>
      <span className="text-[9px] font-bold tracking-[0.22em] text-charcoal/45 uppercase">{label}</span>
    </div>
  );
}
