import Image from 'next/image';
import { mockDashboard, mockTracking, mockAccountability } from '../lib/mockData';
import { hasSupabaseEnv, getSupabaseServiceClient } from '../lib/supabase';

type HabitRow = { id: string; label: string; done: boolean };
type CheckinRow = { mood: number; risk_level: 'low' | 'medium' | 'high' };
type ContactRow = { id: string; name: string; role: string };

async function getDashboardData() {
  if (!hasSupabaseEnv()) {
    return {
      source: 'mock' as const,
      habits: mockDashboard.todayHabits,
      checkin: { mood: mockDashboard.mood, risk_level: mockDashboard.riskLevel },
      contacts: mockAccountability.contacts
    };
  }

  try {
    const supabase = getSupabaseServiceClient();

    const [{ data: habits }, { data: checkins }, { data: contacts }] = await Promise.all([
      supabase.from('habits').select('id,label,done').order('created_at', { ascending: false }).limit(8),
      supabase.from('checkins').select('mood,risk_level').order('created_at', { ascending: false }).limit(1),
      supabase.from('accountability_contacts').select('id,name,role').order('created_at', { ascending: false }).limit(5)
    ]);

    return {
      source: 'supabase' as const,
      habits: (habits ?? []) as HabitRow[],
      checkin: (checkins?.[0] as CheckinRow | undefined) ?? {
        mood: mockDashboard.mood,
        risk_level: mockDashboard.riskLevel
      },
      contacts: (contacts ?? []) as ContactRow[]
    };
  } catch {
    return {
      source: 'mock' as const,
      habits: mockDashboard.todayHabits,
      checkin: { mood: mockDashboard.mood, risk_level: mockDashboard.riskLevel },
      contacts: mockAccountability.contacts
    };
  }
}

export default async function Page() {
  const data = await getDashboardData();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 20% 0%, #1b2340 0%, #0b1120 48%, #090d18 100%)',
        color: '#EAF1FF',
        padding: 24
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <section
          style={{
            border: '1px solid #2A3557',
            background: 'linear-gradient(135deg, rgba(20,29,53,.95), rgba(13,18,33,.95))',
            borderRadius: 22,
            padding: 24,
            boxShadow: '0 16px 50px rgba(0,0,0,.35)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Image src="/sendaapplogo.png" alt="Senda logo" width={60} height={60} style={{ borderRadius: 14 }} />
              <div>
                <p style={{ margin: 0, opacity: 0.7, letterSpacing: 1.4, fontSize: 12 }}>SENDA · HABITS & PURPOSE</p>
                <h1 style={{ margin: '4px 0 0', fontSize: 34, lineHeight: 1.05 }}>Dashboard de hoy</h1>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, opacity: 0.7 }}>Fuente</p>
              <p style={{ margin: '6px 0 0', fontWeight: 700 }}>
                {data.source === 'supabase' ? 'Supabase (live)' : 'Mock local'}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
            {[
              { label: 'Racha limpia', value: `${mockDashboard.streakDays} días` },
              { label: 'Riesgo', value: data.checkin.risk_level.toUpperCase() },
              { label: 'Estado emocional', value: `${data.checkin.mood}/5` },
              { label: 'Horas críticas', value: mockTracking.criticalHours.join(' · ') }
            ].map((item) => (
              <div key={item.label} style={{ border: '1px solid #2F3C62', borderRadius: 14, padding: 14, background: '#111933' }}>
                <p style={{ margin: 0, opacity: 0.72, fontSize: 12 }}>{item.label}</p>
                <p style={{ margin: '8px 0 0', fontSize: 20, fontWeight: 700 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 14, marginTop: 14 }}>
          <div style={{ border: '1px solid #2A3557', borderRadius: 20, padding: 18, background: '#0F1730' }}>
            <h2 style={{ marginTop: 0 }}>Hábitos de hoy</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {data.habits.length ? (
                data.habits.map((h) => (
                  <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 12, background: '#121D3B', border: '1px solid #2D3A60' }}>
                    <span>{h.label}</span>
                    <strong style={{ color: h.done ? '#58E3A0' : '#B8C6E8' }}>{h.done ? 'Completado' : 'Pendiente'}</strong>
                  </div>
                ))
              ) : (
                <div style={{ opacity: 0.75 }}>Sin hábitos cargados todavía.</div>
              )}
            </div>
          </div>

          <div style={{ border: '1px solid #2A3557', borderRadius: 20, padding: 18, background: '#0F1730' }}>
            <h2 style={{ marginTop: 0 }}>Modo crisis</h2>
            <p style={{ opacity: 0.82 }}>Plan rápido de 5 minutos para cortar impulsos y recuperar foco.</p>
            <ol style={{ paddingLeft: 18, opacity: 0.9, lineHeight: 1.6 }}>
              <li>Respirar 90 segundos</li>
              <li>Leer texto guía</li>
              <li>Acción alternativa inmediata</li>
            </ol>
            <button style={{ marginTop: 10, width: '100%', border: 'none', borderRadius: 12, padding: '12px 14px', background: 'linear-gradient(90deg,#26D8FF,#7A64FF)', color: '#05101F', fontWeight: 700, cursor: 'pointer' }}>
              Activar modo crisis
            </button>
          </div>
        </section>

        <section style={{ border: '1px solid #2A3557', borderRadius: 20, padding: 18, background: '#0F1730', marginTop: 14 }}>
          <h2 style={{ marginTop: 0 }}>Accountability</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 10 }}>
            {data.contacts.length ? (
              data.contacts.map((c) => (
                <div key={c.id} style={{ border: '1px solid #2D3A60', borderRadius: 12, padding: 12, background: '#121D3B' }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>{c.name}</p>
                  <p style={{ margin: '4px 0 0', opacity: 0.75 }}>{c.role}</p>
                </div>
              ))
            ) : (
              <p style={{ opacity: 0.75 }}>Sin contactos de accountability aún.</p>
            )}
          </div>
          <p style={{ marginTop: 12, opacity: 0.8 }}>Resumen semanal: {mockAccountability.weeklySummary.progress}</p>
        </section>
      </div>
    </main>
  );
}
