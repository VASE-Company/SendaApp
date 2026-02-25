import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#0b1118', color: '#e8f0ff', padding: 16 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 12 }}>
        <h1 style={{ margin: 0 }}>Senda · Onboarding</h1>
        <p style={{ opacity: 0.8, margin: 0 }}>Base visual Stitch + flujo funcional.</p>

        <iframe
          src="/stitch/senda1.html"
          title="Senda Onboarding"
          style={{ width: '100%', height: '78vh', border: 0, borderRadius: 14, background: '#fff' }}
        />

        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/auth/signup" style={btnPrimary}>Continuar</Link>
          <Link href="/auth/login" style={btn}>Ya tengo cuenta</Link>
        </div>
      </div>
    </main>
  );
}

const btn: React.CSSProperties = {
  textDecoration: 'none',
  color: '#dbe7ff',
  border: '1px solid #33445f',
  borderRadius: 10,
  padding: '10px 14px'
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  background: 'linear-gradient(90deg,#13c8ec,#8b5cf6)',
  color: '#071117',
  border: 'none',
  fontWeight: 700
};
