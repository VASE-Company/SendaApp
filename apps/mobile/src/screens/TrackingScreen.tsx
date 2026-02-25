import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, PrimaryButton, Title } from '../components/UI';
import { tokens } from '../theme/tokens';
import { mockTracking } from '@senda/shared';

export function TrackingScreen() {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <Title>Tracking</Title>
      <Card>
        <Text style={s.text}>Días limpios: {mockTracking.cleanDays}</Text>
        <Text style={s.text}>Recaídas: {mockTracking.relapses}</Text>
        <Text style={s.text}>Horas críticas: {mockTracking.criticalHours.join(', ')}</Text>
      </Card>
      <Card><Text style={s.text}>Heatmap mensual (mock): ▢▣▣▢▣▢▣</Text></Card>
      <PrimaryButton label="Ajustar mi plan de prevención" />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.bgPrimary },
  content: { padding: 16, gap: 12 },
  text: { color: tokens.textPrimary }
});
