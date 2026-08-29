import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nexus Properties',
};

// Only ONE layout in the tree may render html/body. lang and dir depend on
// the locale, so [locale]/layout.tsx owns those elements and this root layout
// is a pass-through. (Nesting html/body is invalid — React emits hydration
// errors and the prerender can hang rather than fail cleanly.)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
