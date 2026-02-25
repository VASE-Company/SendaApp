import { NextResponse } from 'next/server';
import { mockDashboard, mockTracking, mockAccountability } from '../../../lib/mockData';
import { hasSupabaseEnv, getSupabaseServiceClient } from '../../../lib/supabase';

type HabitRow = { id: string; label: string; done: boolean };
type CheckinRow = { mood: number; risk_level: 'low' | 'medium' | 'high' };
type ContactRow = { id: string; name: string; role: string };

export async function GET() {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({
      source: 'mock',
      habits: mockDashboard.todayHabits,
      checkin: { mood: mockDashboard.mood, risk_level: mockDashboard.riskLevel },
      tracking: mockTracking,
      contacts: mockAccountability.contacts,
      summary: mockAccountability.weeklySummary.progress,
      streakDays: mockDashboard.streakDays
    });
  }

  try {
    const supabase = getSupabaseServiceClient();

    const [{ data: habits }, { data: checkins }, { data: contacts }] = await Promise.all([
      supabase.from('habits').select('id,label,done').order('created_at', { ascending: false }).limit(8),
      supabase.from('checkins').select('mood,risk_level').order('created_at', { ascending: false }).limit(1),
      supabase.from('accountability_contacts').select('id,name,role').order('created_at', { ascending: false }).limit(5)
    ]);

    return NextResponse.json({
      source: 'supabase',
      habits: (habits ?? []) as HabitRow[],
      checkin: ((checkins?.[0] as CheckinRow | undefined) ?? {
        mood: mockDashboard.mood,
        risk_level: mockDashboard.riskLevel
      }),
      tracking: mockTracking,
      contacts: (contacts ?? []) as ContactRow[],
      summary: mockAccountability.weeklySummary.progress,
      streakDays: mockDashboard.streakDays
    });
  } catch {
    return NextResponse.json({
      source: 'mock',
      habits: mockDashboard.todayHabits,
      checkin: { mood: mockDashboard.mood, risk_level: mockDashboard.riskLevel },
      tracking: mockTracking,
      contacts: mockAccountability.contacts,
      summary: mockAccountability.weeklySummary.progress,
      streakDays: mockDashboard.streakDays
    });
  }
}
