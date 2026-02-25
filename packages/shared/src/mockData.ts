import type { DashboardState, TrackingState, AccountabilityState } from './types';

export const mockDashboard: DashboardState = {
  streakDays: 12,
  riskLevel: 'medium',
  mood: 3,
  todayHabits: [
    { id: 'pray', label: 'Oración 10 min', done: true },
    { id: 'read', label: 'Lectura bíblica', done: true },
    { id: 'exercise', label: 'Ejercicio 20 min', done: false },
    { id: 'sleep', label: 'Dormir antes de 23:30', done: false }
  ]
};

export const mockTracking: TrackingState = { cleanDays: 23, relapses: 2, criticalHours: ['22:00', '23:00'] };
export const mockAccountability: AccountabilityState = {
  contacts: [{ id: 'c1', name: 'Andrés', role: 'mentor' }, { id: 'c2', name: 'Lucas', role: 'friend' }],
  weeklySummary: { progress: '4/7 días con hábitos completos. Riesgo nocturno en descenso.', riskAlert: true }
};
