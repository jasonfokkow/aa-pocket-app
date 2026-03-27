import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface DividerProps {
  inset?: boolean; // starts at 16px from left instead of full-width
}

export const Divider: React.FC<DividerProps> = ({ inset = false }) => (
  <View style={[styles.divider, inset && styles.inset]} />
);

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  inset: {
    marginLeft: 16,
  },
});
