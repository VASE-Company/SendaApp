export type RiskLevel = 'low' | 'medium' | 'high';

export interface Habit { id: string; label: string; done: boolean; }
export interface DashboardState { streakDays: number; riskLevel: RiskLevel; mood: 1|2|3|4|5; todayHabits: Habit[]; }
export interface TrackingState { cleanDays: number; relapses: number; criticalHours: string[]; }
export interface AccountabilityContact { id: string; name: string; role: 'mentor' | 'friend'; }
export interface AccountabilityState { contacts: AccountabilityContact[]; weeklySummary: { progress: string; riskAlert: boolean; }; }
