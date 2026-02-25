import React, { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { tokens } from '../theme/tokens';

export const Card = ({ children }: PropsWithChildren) => <View style={styles.card}>{children}</View>;
export const Title = ({ children }: PropsWithChildren) => <Text style={styles.title}>{children}</Text>;

export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: tokens.surface, borderColor: tokens.border, borderWidth: 1, borderRadius: 14, padding: 16, gap: 8 },
  title: { color: tokens.textPrimary, fontSize: 22, fontWeight: '700' },
  button: { minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: tokens.accentPrimary },
  buttonText: { color: '#04120B', fontSize: 16, fontWeight: '700' }
});
