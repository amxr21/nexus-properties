// Static export cannot run a server-side redirect, so '/' is a tiny
// prerendered page that bounces to the default locale. The meta refresh
// covers no-JS clients; the inline script makes it instant otherwise.
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en" />
      <script
        dangerouslySetInnerHTML={{
          __html: "location.replace('/en' + location.search + location.hash);",
        }}
      />
      <a href="/en">Continue to Nexus Properties</a>
    </>
  );
}
