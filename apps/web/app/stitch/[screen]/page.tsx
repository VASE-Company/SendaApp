import Link from 'next/link';
import { notFound } from 'next/navigation';

const screens = ['1', '2', '3', '4', '5', '6'] as const;

type Screen = (typeof screens)[number];

function getTitle(screen: Screen) {
  return {
    '1': 'Onboarding',
    '2': 'Dashboard',
    '3': 'Modo Crisis',
    '4': 'Chat Bíblico',
    '5': 'Tracking',
    '6': 'Accountability'
  }[screen];
}

export default async function StitchScreenPage({ params }: { params: Promise<{ screen: string }> }) {
  const { screen } = await params;

  if (!screens.includes(screen as Screen)) return notFound();

  const current = screen as Screen;
  const idx = screens.indexOf(current);
  const prev = idx > 0 ? screens[idx - 1] : null;
  const next = idx < screens.length - 1 ? screens[idx + 1] : null;

  return (
    <main style={{ minHeight: '100vh', background: '#0b1118', color: '#e8f0ff', padding: 16 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header
          style={{
            border: '1px solid #273245',
            background: '#121b2b',
            borderRadius: 14,
            padding: '12px 14px',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: '1.05rem' }}>Senda · Stitch pantalla {current} ({getTitle(current)})</h1>
            <p style={{ margin: '4px 0 0', opacity: 0.8 }}>Base visual 1:1 desde Stitch</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/" style={btn}>Inicio</Link>
            {prev ? <Link href={`/stitch/${prev}`} style={btn}>← Anterior</Link> : null}
            {next ? <Link href={`/stitch/${next}`} style={btn}>Siguiente →</Link> : null}
          </div>
        </header>

        <iframe
          src={`/stitch/senda${current}.html`}
          title={`stitch-${current}`}
          style={{ width: '100%', height: '88vh', border: 0, borderRadius: 12, background: '#fff' }}
        />
      </div>
    </main>
  );
}

const btn: React.CSSProperties = {
  textDecoration: 'none',
  color: '#dbe7ff',
  border: '1px solid #34445f',
  borderRadius: 10,
  padding: '8px 10px',
  fontSize: 13
};
