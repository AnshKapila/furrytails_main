'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Something Went Wrong — Furrytail</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8F5F1',
          color: '#3B3A38',
          fontFamily: "'Inter', sans-serif",
          padding: '24px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            maxWidth: 480,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.625rem',
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#8D9A83',
              margin: 0,
            }}
          >
            System Error
          </p>

          <h1
            style={{
              color: '#3B3A38',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2.75rem',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 8px 0',
            }}
          >
            Something went wrong.
          </h1>

          <p
            style={{
              color: 'rgba(59, 58, 56, 0.7)',
              fontSize: '0.875rem',
              fontWeight: 300,
              lineHeight: 1.6,
              margin: '0 0 16px 0',
            }}
          >
            An unexpected error occurred. Please reload the page to continue.
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => reset()}
              style={{
                minHeight: 48,
                padding: '0 28px',
                borderRadius: 0,
                background: '#3B3A38',
                color: '#F8F5F1',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              Reload Page
            </button>
            <a
              href="/"
              style={{
                minHeight: 48,
                padding: '0 28px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                background: 'transparent',
                color: '#3B3A38',
                border: '1px solid #D8CFC4',
                cursor: 'pointer',
                fontSize: '0.9375rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
