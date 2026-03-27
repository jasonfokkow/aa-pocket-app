import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/theme';
import { Divider } from '../components/Divider';
import { SOP_TOPICS, SOPContentBlock } from '../data/sop';
import { RootStackParamList } from '../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SOPDetail'>;
  route: RouteProp<RootStackParamList, 'SOPDetail'>;
}

const ContentBlock: React.FC<{ block: SOPContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return <Text style={styles.paragraph}>{block.text}</Text>;

    case 'steps':
      return (
        <View style={styles.stepsContainer}>
          {block.items.map((item, i) => (
            <View key={i}>
              <View style={styles.stepRow}>
                <Text style={styles.stepNumber}>{i + 1}.</Text>
                <Text style={styles.stepText}>{item}</Text>
              </View>
              {i < block.items.length - 1 && <Divider />}
            </View>
          ))}
        </View>
      );

    case 'table':
      return (
        <View style={styles.table}>
          {/* Header row */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            {block.headers.map((h, i) => (
              <Text key={i} style={[styles.tableCell, styles.tableHeaderCell, { flex: i === 0 ? 1 : 1.5 }]}>
                {h.toUpperCase()}
              </Text>
            ))}
          </View>
          <Divider />
          {block.rows.map((row, ri) => (
            <View key={ri}>
              <View style={styles.tableRow}>
                {row.map((cell, ci) => (
                  <Text key={ci} style={[styles.tableCell, { flex: ci === 0 ? 1 : 1.5 }]}>
                    {cell}
                  </Text>
                ))}
              </View>
              {ri < block.rows.length - 1 && <Divider />}
            </View>
          ))}
        </View>
      );

    case 'warning':
      return (
        <View style={styles.calloutWarning}>
          <MaterialCommunityIcons name="alert" size={16} color={Colors.accent} style={styles.calloutIcon} />
          <Text style={styles.calloutText}>{block.text}</Text>
        </View>
      );

    case 'info':
      return (
        <View style={styles.calloutInfo}>
          <MaterialCommunityIcons name="information-outline" size={16} color={Colors.textSecondary} style={styles.calloutIcon} />
          <Text style={styles.calloutText}>{block.text}</Text>
        </View>
      );

    default:
      return null;
  }
};

export const SOPDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { topicId } = route.params;
  const topic = SOP_TOPICS.find((t) => t.id === topicId);
  const [expanded, setExpanded] = useState(false);

  if (!topic) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{topic.title}</Text>
        <View style={{ width: 24 }} />
      </View>
      <Divider />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Condensed summary card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>SUMMARY</Text>
          <Divider inset />
          <Text style={styles.summaryText}>{topic.summary}</Text>
          <TouchableOpacity onPress={() => setExpanded(true)} activeOpacity={0.7}>
            <Text style={styles.viewFullLink}>View full SOP ↓</Text>
          </TouchableOpacity>
        </View>

        <Divider />

        {/* Full SOP — collapsible */}
        <View>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => setExpanded((e) => !e)}
            activeOpacity={0.7}
          >
            <Text style={styles.accordionTitle}>Full SOP</Text>
            <MaterialCommunityIcons
              name={expanded ? 'minus' : 'plus'}
              size={16}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
          <Divider />

          {expanded && (
            <>
              <View style={styles.fullSOPContent}>
                {topic.content.map((block, i) => (
                  <View key={i} style={styles.blockWrapper}>
                    <ContentBlock block={block} />
                    {i < topic.content.length - 1 && block.type !== 'steps' && block.type !== 'table' && (
                      <View style={styles.blockSpacer} />
                    )}
                  </View>
                ))}
              </View>
              <Divider />
            </>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    paddingHorizontal: 16,
    gap: 12,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    color: Colors.text,
  },

  summaryCard: {
    margin: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
    padding: 16,
    backgroundColor: Colors.surface,
  },
  summaryLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  summaryText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 15 * 1.7,
    marginTop: 12,
    marginBottom: 16,
  },
  viewFullLink: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: Colors.accent,
  },

  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 52,
  },
  accordionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.text,
  },

  fullSOPContent: {
    paddingVertical: 8,
  },
  blockWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  blockSpacer: {
    height: 8,
  },

  paragraph: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 15 * 1.7,
  },

  stepsContainer: {
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  stepRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    width: 20,
  },
  stepText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 15 * 1.6,
  },

  table: {
    borderWidth: 1,
    borderColor: Colors.divider,
    backgroundColor: Colors.surface,
  },
  tableHeaderRow: {
    backgroundColor: Colors.surfaceSubtle,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tableCell: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text,
  },
  tableHeaderCell: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.textSecondary,
  },

  calloutWarning: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderLeftWidth: 2,
    borderLeftColor: Colors.accent,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 12,
    gap: 8,
    alignItems: 'flex-start',
  },
  calloutInfo: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSubtle,
    borderLeftWidth: 2,
    borderLeftColor: Colors.textSecondary,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 12,
    gap: 8,
    alignItems: 'flex-start',
  },
  calloutIcon: {
    marginTop: 1,
  },
  calloutText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 14 * 1.6,
  },
});
