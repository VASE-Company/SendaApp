import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, PrimaryButton, Title } from '../components/UI';
import { tokens } from '../theme/tokens';
import { mockAccountability } from '@senda/shared';

export function AccountabilityScreen() {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <Title>Accountability</Title>
      <Card>
        <Text style={s.title}>Contactos de apoyo</Text>
        {mockAccountability.contacts.map(c => <Text key={c.id} style={s.text}>• {c.name} ({c.role})</Text>)}
      </Card>
      <Card>
        <Text style={s.title}>Resumen semanal</Text>
        <Text style={s.text}>Progreso: {mockAccountability.weeklySummary.progress}</Text>
        <Text style={s.text}>Alerta de riesgo: {mockAccountability.weeklySummary.riskAlert ? 'Sí' : 'No'}</Text>
      </Card>
      <PrimaryButton label="Enviar reporte semanal" />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.bgPrimary },
  content: { padding: 16, gap: 12 },
  title: { color: tokens.textPrimary, fontWeight: '700' },
  text: { color: tokens.textSecondary }
});
