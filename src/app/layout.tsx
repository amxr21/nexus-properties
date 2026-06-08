import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nexus Properties',
};

// Root layout must render html+body. The [locale]/layout.tsx re-renders
// html with lang/dir and provides NextIntlClientProvider — Next.js allows
// nested html/body elements in the App Router tree.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
