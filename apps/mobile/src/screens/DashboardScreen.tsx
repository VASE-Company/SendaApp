import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, PrimaryButton, Title } from '../components/UI';
import { tokens } from '../theme/tokens';
import { mockDashboard } from '@senda/shared';

export function DashboardScreen() {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <Title>Dashboard diario</Title>
      <Card>
        <Text style={s.metric}>Racha actual: {mockDashboard.streakDays} días</Text>
        <Text style={s.text}>Riesgo: {mockDashboard.riskLevel}</Text>
        <Text style={s.text}>Estado emocional: {mockDashboard.mood}/5</Text>
      </Card>
      <Card>
        <Text style={s.subtitle}>Hábitos de hoy</Text>
        {mockDashboard.todayHabits.map(h => <Text key={h.id} style={s.text}>• {h.label} {h.done ? '✅' : '⬜'}</Text>)}
      </Card>
      <View><PrimaryButton label="Completar check-in de hoy" /></View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.bgPrimary },
  content: { padding: 16, gap: 12 },
  metric: { color: tokens.accentPrimary, fontSize: 20, fontWeight: '700' },
  subtitle: { color: tokens.textPrimary, fontSize: 17, fontWeight: '700' },
  text: { color: tokens.textSecondary, fontSize: 15 }
});
