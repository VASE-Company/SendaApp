import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, PrimaryButton, Title } from '../components/UI';
import { tokens } from '../theme/tokens';

export function CrisisScreen() {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <Title>Crisis Mode</Title>
      <Card><Text style={s.urgent}>Temporizador: 03:00 · Respiración 4-4-6</Text></Card>
      <Card><PrimaryButton label="Bloquear impulso ahora" /></Card>
      <Card><PrimaryButton label="Llamar / escribir accountability" /></Card>
      <Card><PrimaryButton label="Abrir guía bíblica" /></Card>
      <Card><PrimaryButton label="Estoy a salvo por ahora" /></Card>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.bgPrimary },
  content: { padding: 16, gap: 12 },
  urgent: { color: tokens.danger, fontSize: 18, fontWeight: '700' }
});
