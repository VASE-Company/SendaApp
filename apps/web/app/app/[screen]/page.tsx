"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AuthGuard from '../../../components/AuthGuard';
import { supabaseBrowser } from '../../../lib/supabase-browser';

const order = ['dashboard', 'crisis', 'chat', 'tracking', 'accountability'] as const;

const mapToFile: Record<(typeof order)[number], string> = {
  dashboard: 'senda2.html',
  crisis: 'senda3.html',
  chat: 'senda4.html',
  tracking: 'senda5.html',
  accountability: 'senda6.html'
};

export default function AppScreenPage() {
  const router = useRouter();
  const params = useParams<{ screen: string }>();
  const screen = (params.screen || 'dashboard') as (typeof order)[number];

  if (!order.includes(screen)) {
    router.replace('/app/dashboard');
    return null;
  }

  const idx = order.indexOf(screen);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx < order.length - 1 ? order[idx + 1] : null;

  async function logout() {
    if (supabaseBrowser) await supabaseBrowser.auth.signOut();
    router.push('/auth/login');
  }

  return (
    <AuthGuard>
      <main style={{ minHeight: '100vh', background: '#0b1118', color: '#e8f0ff', padding: 16 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <header style={{ border: '1px solid #2b3850', borderRadius: 14, background: '#121b2b', padding: '10px 12px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <strong>Senda / {screen}</strong>
            <div style={{ display: 'flex', gap: 8 }}>
              {prev ? <Link href={`/app/${prev}`} style={btn}>← Atrás</Link> : null}
              {next ? <Link href={`/app/${next}`} style={btnPrimary}>Continuar →</Link> : <Link href="/app/dashboard" style={btnPrimary}>Volver al inicio</Link>}
              <button onClick={logout} style={btn}>Salir</button>
            </div>
          </header>

          <iframe src={`/stitch/${mapToFile[screen]}`} title={screen} style={{ width: '100%', height: '88vh', border: 0, borderRadius: 12, background: '#fff' }} />
        </div>
      </main>
    </AuthGuard>
  );
}

const btn: React.CSSProperties = {
  border: '1px solid #33445f',
  background: '#0f1726',
  color: '#dbe7ff',
  borderRadius: 10,
  padding: '8px 10px',
  textDecoration: 'none',
  cursor: 'pointer'
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  border: 'none',
  color: '#06131a',
  background: 'linear-gradient(90deg,#13c8ec,#8b5cf6)',
  fontWeight: 700
};
