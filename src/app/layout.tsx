import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nexus Properties',
};

// <html> and <body> are rendered by [locale]/layout.tsx which also
// provides NextIntlClientProvider with the correct locale messages.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
