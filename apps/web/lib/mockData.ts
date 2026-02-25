export const mockDashboard = {
  streakDays: 12,
  mood: 3,
  riskLevel: 'medium' as const,
  todayHabits: [
    { id: 'h1', label: 'Oración', done: true },
    { id: 'h2', label: 'Lectura bíblica', done: false },
    { id: 'h3', label: 'Ejercicio', done: true }
  ]
};

export const mockTracking = {
  cleanDays: 12,
  relapses: 1,
  criticalHours: ['23:00', '00:00']
};

export const mockAccountability = {
  contacts: [
    { id: 'c1', name: 'Mentor', role: 'Líder' },
    { id: 'c2', name: 'Amigo', role: 'Compañero' }
  ],
  weeklySummary: {
    progress: 'Buen avance semanal con una recaída controlada.'
  }
};
