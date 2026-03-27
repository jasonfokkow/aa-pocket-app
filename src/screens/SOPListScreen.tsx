import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/theme';
import { Divider } from '../components/Divider';
import { SearchBar } from '../components/SearchBar';
import { FilterTabs } from '../components/FilterTabs';
import { SOP_TOPICS, SOP_CATEGORIES, SOPCategory, SOPTopic } from '../data/sop';
import { RootStackParamList } from '../navigation/types';

const ALL_TAB = 'All' as const;
type TabValue = typeof ALL_TAB | SOPCategory;
const TABS: TabValue[] = [ALL_TAB, ...SOP_CATEGORIES];

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SOPDetail'>;
}

export const SOPListScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<TabValue>(ALL_TAB);

  const filtered = useMemo(() => {
    let topics = SOP_TOPICS;
    if (selectedTab !== ALL_TAB) {
      topics = topics.filter((t) => t.category === selectedTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      topics = topics.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return topics;
  }, [search, selectedTab]);

  const renderItem = ({ item, index }: { item: SOPTopic; index: number }) => (
    <View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('SOPDetail', { topicId: item.id })}
        activeOpacity={0.7}
      >
        <View style={styles.rowContent}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowDesc} numberOfLines={1}>{item.description}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={16} color={Colors.textSecondary} />
      </TouchableOpacity>
      <Divider />
    </View>
  );

  const renderSectionHeader = (category: SOPCategory) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{category.toUpperCase()}</Text>
    </View>
  );

  // Group by category when 'All' tab is selected
  const sections = useMemo(() => {
    if (selectedTab !== ALL_TAB || search.trim()) {
      return [{ category: null as SOPCategory | null, items: filtered }];
    }
    return SOP_CATEGORIES.map((cat) => ({
      category: cat as SOPCategory | null,
      items: filtered.filter((t) => t.category === cat),
    })).filter((s) => s.items.length > 0);
  }, [filtered, selectedTab, search]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SOP</Text>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialCommunityIcons name="magnify" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
      <Divider />

      {/* Search */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search SOPs..."
        />
      </View>
      <Divider />

      {/* Category tabs */}
      <FilterTabs tabs={TABS} selected={selectedTab} onSelect={setSelectedTab} />

      {/* List */}
      <FlatList
        data={sections}
        keyExtractor={(s, i) => s.category ?? `section-${i}`}
        renderItem={({ item: section }) => (
          <>
            {section.category && renderSectionHeader(section.category)}
            {section.items.map((topic, idx) => (
              <View key={topic.id}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => navigation.navigate('SOPDetail', { topicId: topic.id })}
                  activeOpacity={0.7}
                >
                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle}>{topic.title}</Text>
                    <Text style={styles.rowDesc} numberOfLines={1}>{topic.description}</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={16} color={Colors.textSecondary} />
                </TouchableOpacity>
                <Divider />
              </View>
            ))}
          </>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No SOPs found.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    color: Colors.text,
  },
  searchWrapper: {
    paddingVertical: 12,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 64,
  },
  rowContent: {
    flex: 1,
    marginRight: 8,
  },
  rowTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: Colors.text,
    marginBottom: 2,
  },
  rowDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  empty: {
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
