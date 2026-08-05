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
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 343,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: '#171717', fontSize: 16, fontWeight: 500 }}>
            Something went wrong
          </h1>
          <p
            style={{
              color: '#737373',
              fontSize: 14,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            An unexpected error occurred. Please reload the page to continue.
          </p>
          <button
            onClick={() => reset()}
            style={{
              minHeight: 36,
              padding: '8px 16px',
              borderRadius: 8,
              background: '#E15615',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
