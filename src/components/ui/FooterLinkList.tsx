interface FooterLinkListProps {
  heading: string;
  items: Array<{ label: string; href?: string; external?: boolean }>;
}

export function FooterLinkList({ heading, items }: FooterLinkListProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-bold tracking-[0.28em] text-gold-500 uppercase">{heading}</h3>
      <ul className="flex flex-col gap-1.5">
        {items.map(({ label, href = '#', external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-[11px] text-black/55 transition-colors hover:text-black"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
