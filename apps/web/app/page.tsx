"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#0b0d10', color: '#f3f4f6', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div style={{ maxWidth: 820, width: '100%', border: '1px solid #272a30', borderRadius: 16, padding: 24, background: '#12151b' }}>
        <h1 style={{ marginTop: 0 }}>Senda · Portfolio Editorial</h1>
        <p style={{ opacity: 0.85 }}>Ya importé las 6 pantallas desde Stitch y quedaron conectadas como páginas.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/portfolio/home" style={btnPrimary}>Abrir portfolio</Link>
          <Link href="/auth/login" style={btn}>Login</Link>
          <Link href="/auth/signup" style={btn}>Registro</Link>
        </div>
      </div>
    </main>
  );
}

const btn: React.CSSProperties = {
  textDecoration: 'none',
  color: '#e5e7eb',
  border: '1px solid #3b404b',
  borderRadius: 10,
  padding: '10px 12px'
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  background: '#e5e7eb',
  color: '#0b0d10',
  borderColor: '#e5e7eb',
  fontWeight: 700
};
