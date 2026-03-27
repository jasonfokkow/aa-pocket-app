import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

type BadgeVariant = 'in-stock' | 'preorder' | 'vintage' | 'evergreen' | 'flashcard';

interface BadgeProps {
  variant: BadgeVariant;
}

const BADGE_CONFIG: Record<BadgeVariant, { label: string; color: string }> = {
  'in-stock':  { label: 'IN STOCK',  color: Colors.successText },
  'preorder':  { label: 'PREORDER',  color: Colors.warningText },
  'vintage':   { label: 'VINTAGE',   color: Colors.textSecondary },
  'evergreen': { label: 'EVERGREEN', color: Colors.text },
  'flashcard': { label: 'FC',        color: Colors.accent },
};

export const Badge: React.FC<BadgeProps> = ({ variant }) => {
  const { label, color } = BADGE_CONFIG[variant];
  return <Text style={[styles.badge, { color }]}>{label}</Text>;
};

const styles = StyleSheet.create({
  badge: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
