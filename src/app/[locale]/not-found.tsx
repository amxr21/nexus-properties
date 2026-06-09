export default function NotFound() {
  return (
    <main
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        background: '#FCFCFC',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          fontWeight: 300,
          color: '#1A2742',
          opacity: 0.08,
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        404
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
          fontWeight: 300,
          color: '#1A2742',
          marginTop: '-1rem',
          marginBottom: '1rem',
        }}
      >
        Page Not Found
      </h1>

      <p style={{ maxWidth: '28rem', color: '#3A3A3A99', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '2rem' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/en"
          style={{
            background: '#1A2742',
            color: '#FCFCFC',
            padding: '0.75rem 2rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </a>
        <a
          href="/en/properties"
          style={{
            border: '1px solid #1A274240',
            color: '#1A2742',
            padding: '0.75rem 2rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          View Properties
        </a>
      </div>

      <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ height: '1px', width: '3rem', background: '#D4AF37' }} />
        <div style={{ height: '6px', width: '6px', background: '#D4AF37', transform: 'rotate(45deg)' }} />
        <div style={{ height: '1px', width: '3rem', background: '#D4AF37' }} />
      </div>
    </main>
  );
}
