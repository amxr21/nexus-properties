import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        background: '#FCFCFC',
        fontFamily: "'Raleway', system-ui, sans-serif",
      }}
    >
      {/* Subtle top brand bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(to right, #1A2742, #D4AF37, #1A2742)',
        }}
      />

      {/* Large ghost number */}
      <div
        style={{
          fontSize: 'clamp(8rem, 25vw, 14rem)',
          fontWeight: 200,
          color: '#1A2742',
          opacity: 0.06,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
          marginBottom: '-2rem',
        }}
      >
        404
      </div>

      {/* Gold accent line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ height: '1px', width: '2.5rem', background: '#D4AF37' }} />
        <div style={{ height: '5px', width: '5px', background: '#D4AF37', transform: 'rotate(45deg)' }} />
        <div style={{ height: '1px', width: '2.5rem', background: '#D4AF37' }} />
      </div>

      {/* Eyebrow */}
      <p
        style={{
          fontSize: '0.55rem',
          fontWeight: 700,
          letterSpacing: '0.28em',
          color: '#D4AF37',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}
      >
        Error 404
      </p>

      {/* Heading */}
      <h1
        style={{
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 300,
          color: '#1A2742',
          lineHeight: 1.25,
          marginBottom: '1rem',
          maxWidth: '28rem',
        }}
      >
        Page Not Found
      </h1>

      {/* Body */}
      <p
        style={{
          fontSize: '0.875rem',
          color: '#3A3A3A',
          opacity: 0.55,
          lineHeight: 1.8,
          maxWidth: '26rem',
          marginBottom: '2.5rem',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let us help you find what you need.
      </p>

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/en"
          style={{
            background: '#1A2742',
            color: '#FCFCFC',
            padding: '0.85rem 2.25rem',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'opacity 0.2s',
          }}
        >
          Back to Home
        </Link>
        <Link
          href="/en/properties"
          style={{
            border: '1px solid rgba(26,39,66,0.25)',
            color: '#1A2742',
            padding: '0.85rem 2.25rem',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          View Properties
        </Link>
      </div>

      {/* Footer brand signature */}
      <p
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: '#1A2742',
          opacity: 0.25,
          textTransform: 'uppercase',
        }}
      >
        Nexus Properties · Austin, Texas
      </p>
    </main>
  );
}
