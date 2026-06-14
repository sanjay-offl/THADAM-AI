import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: 'var(--space-xl) var(--space-lg)',
    }}>
      <div className="glass" style={{
        padding: 'var(--space-3xl) var(--space-2xl)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <h1 className="font-heading" style={{
          fontSize: 'var(--text-8xl)',
          lineHeight: 1,
          color: 'var(--primary)',
          margin: 0,
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          404
        </h1>
        <h2 className="font-heading" style={{
          fontSize: 'var(--text-2xl)',
          color: 'var(--text)',
          marginTop: 'var(--space-md)',
          marginBottom: 'var(--space-sm)',
        }}>
          PAGE NOT FOUND
        </h2>
        <p style={{
          color: 'var(--muted)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.6,
          marginBottom: 'var(--space-2xl)',
        }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track.
        </p>
        <Link href="/" className="btn btn-primary" style={{
          display: 'inline-flex',
          padding: '12px 32px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
