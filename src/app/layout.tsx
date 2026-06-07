// Root layout — minimal shell. The [locale]/layout.tsx renders <html> and <body>
// and provides NextIntlClientProvider with locale-specific messages.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
