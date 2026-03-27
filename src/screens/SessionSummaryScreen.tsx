import React from 'react';
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
import { FLASHCARDS } from '../data/flashcards';
import { CardState, getNextReviewLabel } from '../lib/spaced-repetition';
import { RootStackParamList } from '../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SessionSummary'>;
  route: RouteProp<RootStackParamList, 'SessionSummary'>;
  cardStates: Record<string, CardState>;
}

export const SessionSummaryScreen: React.FC<Props> = ({ navigation, route, cardStates }) => {
  const { sessionType, weakCardIds, totalReviewed } = route.params;
  const sessionLabel = sessionType === 'quick' ? 'Quick Review' : 'Full Review';

  const weakCards = weakCardIds
    .map((id) => FLASHCARDS.find((c) => c.id === id))
    .filter(Boolean);

  const nextReviewLabel = getNextReviewLabel(cardStates);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.topSection}>
          <MaterialCommunityIcons name="check-circle-outline" size={24} color={Colors.text} />
          <Text style={styles.title}>{sessionLabel} Complete</Text>
          <Text style={styles.date}>{dateStr}</Text>
          <Text style={styles.reviewed}>{totalReviewed} card{totalReviewed !== 1 ? 's' : ''} reviewed</Text>
        </View>

        <Divider />

        {/* Weak areas */}
        {weakCards.length > 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Areas to revisit</Text>
              {weakCards.map((card, i) => (
                <View key={card!.id}>
                  <View style={styles.weakRow}>
                    <View style={styles.weakBorder} />
                    <View style={styles.weakContent}>
                      <Text style={styles.weakTopic}>{card!.topic}</Text>
                      <Text style={styles.weakQuestion} numberOfLines={2}>{card!.question}</Text>
                    </View>
                    <MaterialCommunityIcons
                      name="refresh"
                      size={16}
                      color={Colors.warningText}
                    />
                  </View>
                  {i < weakCards.length - 1 && <Divider />}
                </View>
              ))}
            </View>
            <Divider />
          </>
        )}

        {weakCards.length === 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.allGoodText}>Strong session — no weak areas flagged.</Text>
            </View>
            <Divider />
          </>
        )}

        {/* Next review */}
        <View style={styles.nextReviewRow}>
          <MaterialCommunityIcons name="calendar-blank-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.nextReviewText}>Next cards due: {nextReviewLabel}</Text>
        </View>

        <Divider />

        {/* Actions */}
        <View style={styles.actions}>
          {sessionType === 'quick' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('FlashcardReview', {
                cardIds: Object.keys(cardStates).slice(0, 18),
                sessionType: 'full',
              })}
              activeOpacity={0.7}
            >
              <Text style={styles.continueLink}>Continue to Full Review →</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => navigation.popToTop()}
            activeOpacity={0.8}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surfaceHighlight,
  },
  content: {
    paddingBottom: 40,
  },
  topSection: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'flex-start',
    gap: 6,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.text,
    marginTop: 4,
  },
  date: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  reviewed: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },

  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.warningText,
    marginBottom: 12,
  },

  weakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  weakBorder: {
    width: 2,
    alignSelf: 'stretch',
    backgroundColor: Colors.warningText,
  },
  weakContent: {
    flex: 1,
  },
  weakTopic: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  weakQuestion: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 14 * 1.5,
  },

  allGoodText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.successText,
  },

  nextReviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  nextReviewText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },

  actions: {
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 12,
  },
  continueLink: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: Colors.accent,
    marginBottom: 4,
  },
  doneButton: {
    borderWidth: 1,
    borderColor: Colors.text,
    paddingVertical: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: Colors.text,
  },
});
