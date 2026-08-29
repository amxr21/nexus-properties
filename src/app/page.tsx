// Static export cannot run a server-side redirect, so '/' is a tiny
// prerendered page that bounces to the default locale. The meta refresh
// covers no-JS clients; the inline script makes it instant otherwise.
// This route lives outside [locale], so the pass-through root layout gives it
// no html/body — it renders its own shell.
export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en" />
        <script
          dangerouslySetInnerHTML={{
            __html: "location.replace('/en' + location.search + location.hash);",
          }}
        />
      </head>
      <body>
        <a href="/en">Continue to Nexus Properties</a>
      </body>
    </html>
  );
}
