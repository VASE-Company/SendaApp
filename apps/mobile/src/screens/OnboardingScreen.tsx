import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { Card, PrimaryButton, Title } from '../components/UI';
import { tokens } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const logoSource = require('../../assets/sendaapplogo.png');

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <View style={s.logoWrap}>
        <Image source={logoSource} style={s.logo} resizeMode="contain" />
      </View>
      <Title>Un camino diario de autocontrol</Title>
      <Card><Text style={s.text}>1) Elegí tu meta: 7 / 30 / 90 días.</Text></Card>
      <Card><Text style={s.text}>2) Definí hábitos ancla (oración, lectura, ejercicio, descanso).</Text></Card>
      <Card><Text style={s.text}>3) Armá tu plan anti-recaída y contactos de apoyo.</Text></Card>
      <Card><Text style={s.text}>4) Activá recordatorios y alertas opcionales.</Text></Card>
      <View style={s.cta}><PrimaryButton label="Comenzar mi plan" onPress={() => navigation.replace('Main')} /></View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.bgPrimary },
  content: { padding: 16, gap: 12 },
  logoWrap: { alignItems: 'center', marginBottom: 4 },
  logo: { width: 180, height: 180 },
  text: { color: tokens.textPrimary, fontSize: 16, lineHeight: 22 },
  cta: { marginTop: 8 }
});
