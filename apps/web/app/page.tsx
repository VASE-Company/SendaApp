import { mockDashboard, mockTracking, mockAccountability } from '@senda/shared';

const card: React.CSSProperties = { background: '#1A2438', border: '1px solid #2B3853', borderRadius: 14, padding: 16 };

export default function Page() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 24, display: 'grid', gap: 12 }}>
      <h1 style={{ margin: 0 }}>Senda · Dashboard de seguimiento</h1>
      <section style={card}>
        <h2>Estado actual</h2>
        <p>Racha: <strong>{mockDashboard.streakDays} días</strong> · Riesgo: {mockDashboard.riskLevel}</p>
        <p>Check-in emocional: {mockDashboard.mood}/5</p>
      </section>
      <section style={card}>
        <h2>Hábitos de hoy</h2>
        <ul>{mockDashboard.todayHabits.map(h => <li key={h.id}>{h.label} {h.done ? '✅' : '⬜'}</li>)}</ul>
      </section>
      <section style={card}>
        <h2>Tracking</h2>
        <p>Días limpios: {mockTracking.cleanDays} · Recaídas: {mockTracking.relapses}</p>
        <p>Horas críticas: {mockTracking.criticalHours.join(', ')}</p>
      </section>
      <section style={card}>
        <h2>Accountability</h2>
        <ul>{mockAccountability.contacts.map(c => <li key={c.id}>{c.name} — {c.role}</li>)}</ul>
        <p>Resumen semanal: {mockAccountability.weeklySummary.progress}</p>
      </section>
    </main>
  );
}
