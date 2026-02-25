import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Title } from '../components/UI';
import { tokens } from '../theme/tokens';
import { getMockChatResponse } from '@senda/shared';

export function ChatScreen() {
  const answer = getMockChatResponse('Estoy siendo tentado');
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <Title>Guía bíblica</Title>
      <Text style={s.badge}>Este chat solo usa fuentes jw.org / wol.jw.org</Text>
      <Card>
        <Text style={s.user}>Usuario: Estoy siendo tentado</Text>
        <Text style={s.bot}>Senda: {answer.message}</Text>
      </Card>
      <Card>
        <Text style={s.ref}>Referencia: {answer.citation.title}</Text>
        <Text style={s.ref}>Dominio: {answer.citation.domain}</Text>
        <Text style={s.link}>{answer.citation.url}</Text>
      </Card>
      <View style={s.chips}><Text style={s.chip}>Estoy siendo tentado</Text><Text style={s.chip}>Me siento culpable</Text><Text style={s.chip}>Necesito fuerza hoy</Text></View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.bgPrimary },
  content: { padding: 16, gap: 12 },
  badge: { color: tokens.warning, fontSize: 12 },
  user: { color: tokens.textSecondary },
  bot: { color: tokens.textPrimary, marginTop: 8 },
  ref: { color: tokens.textSecondary, fontSize: 13 },
  link: { color: tokens.accentSecondary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: tokens.surfaceElevated, color: tokens.textPrimary, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }
});
