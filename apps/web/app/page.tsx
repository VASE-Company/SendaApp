import Image from 'next/image';
import { mockDashboard, mockTracking, mockAccountability } from '@senda/shared';
import { hasSupabaseEnv, getSupabaseServiceClient } from '../lib/supabase';

type HabitRow = { id: string; label: string; done: boolean };
type CheckinRow = { mood: number; risk_level: 'low' | 'medium' | 'high' };
type ContactRow = { id: string; name: string; role: string };

const card: React.CSSProperties = {
  background: '#1A2438',
  border: '1px solid #2B3853',
  borderRadius: 14,
  padding: 16
};

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
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 24, display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Image src="/sendaapplogo.png" alt="Senda logo" width={56} height={56} style={{ borderRadius: 12 }} />
        <div>
          <h1 style={{ margin: 0 }}>Senda · Dashboard de seguimiento</h1>
          <p style={{ margin: '4px 0 0', opacity: 0.8 }}>Fuente de datos: {data.source === 'supabase' ? 'Supabase' : 'Mock local'}</p>
        </div>
      </div>

      <section style={card}>
        <h2>Estado actual</h2>
        <p>
          Racha: <strong>{mockDashboard.streakDays} días</strong> · Riesgo: {data.checkin.risk_level}
        </p>
        <p>Check-in emocional: {data.checkin.mood}/5</p>
      </section>

      <section style={card}>
        <h2>Hábitos de hoy</h2>
        <ul>
          {data.habits.length
            ? data.habits.map((h) => <li key={h.id}>{h.label} {h.done ? '✅' : '⬜'}</li>)
            : <li>Sin hábitos cargados todavía.</li>}
        </ul>
      </section>

      <section style={card}>
        <h2>Tracking</h2>
        <p>Días limpios: {mockTracking.cleanDays} · Recaídas: {mockTracking.relapses}</p>
        <p>Horas críticas: {mockTracking.criticalHours.join(', ')}</p>
      </section>

      <section style={card}>
        <h2>Accountability</h2>
        <ul>
          {data.contacts.length
            ? data.contacts.map((c) => <li key={c.id}>{c.name} — {c.role}</li>)
            : <li>Sin contactos de accountability aún.</li>}
        </ul>
        <p>Resumen semanal: {mockAccountability.weeklySummary.progress}</p>
      </section>
    </main>
  );
}
