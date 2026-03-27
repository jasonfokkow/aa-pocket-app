import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors } from '../constants/theme';
import { Divider } from './Divider';

interface FilterTabsProps<T extends string> {
  tabs: T[];
  selected: T;
  onSelect: (tab: T) => void;
}

export function FilterTabs<T extends string>({
  tabs,
  selected,
  onSelect,
}: FilterTabsProps<T>) {
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onSelect(tab)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, selected === tab && styles.tabLabelActive]}>
              {tab}
            </Text>
            {selected === tab && <View style={styles.indicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 24,
    flexDirection: 'row',
  },
  tab: {
    paddingBottom: 10,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.textSecondary,
  },
  tabLabelActive: {
    color: Colors.text,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.text,
  },
});
