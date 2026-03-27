import React, { useCallback, useState } from 'react';
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
import { Colors } from '../constants/theme';
import { Divider } from '../components/Divider';
import { FLASHCARDS } from '../data/flashcards';
import {
  CardState,
  getDueCards,
  sortByUrgency,
  estimateSessionMinutes,
  getNextReviewLabel,
} from '../lib/spaced-repetition';
import { RootStackParamList } from '../navigation/types';

const QUICK_REVIEW_COUNT = 8;
const FULL_REVIEW_COUNT = 18;

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>;
  cardStates: Record<string, CardState>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, cardStates }) => {
  const allCardIds = FLASHCARDS.map((c) => c.id);
  const dueIds = getDueCards(allCardIds, cardStates);
  const sortedDueIds = sortByUrgency(dueIds, cardStates);

  const quickCards = sortedDueIds.slice(0, QUICK_REVIEW_COUNT);
  const fullCards = sortedDueIds.slice(0, FULL_REVIEW_COUNT);

  const quickCount = quickCards.length;
  const fullCount = fullCards.length;
  const quickMins = estimateSessionMinutes(quickCount);
  const fullMins = estimateSessionMinutes(fullCount);
  const nextLabel = getNextReviewLabel(cardStates);

  const hasDueCards = dueIds.length > 0;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const handleStartSession = (sessionType: 'quick' | 'full') => {
    const cards = sessionType === 'quick' ? quickCards : fullCards;
    navigation.navigate('FlashcardReview', { cardIds: cards, sessionType });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Greeting */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{greeting}</Text>
          {hasDueCards ? (
            <Text style={styles.subheading}>
              {dueIds.length} card{dueIds.length !== 1 ? 's' : ''} due today
            </Text>
          ) : (
            <Text style={styles.subheading}>Next review: {nextLabel}</Text>
          )}
        </View>

        <Divider />

        {hasDueCards ? (
          <>
            {/* Quick Review */}
            <View style={styles.sessionCard}>
              <View style={styles.sessionCardHeader}>
                <MaterialCommunityIcons name="cards-outline" size={20} color={Colors.text} />
                <Text style={styles.sessionCardTitle}>Quick Review</Text>
              </View>
              <View style={styles.sessionCardMeta}>
                <MaterialCommunityIcons name="timer-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.sessionCardMetaText}>~{quickMins} min · {quickCount} cards</Text>
              </View>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleStartSession('quick')}
                activeOpacity={0.8}
              >
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>
            </View>

            <Divider />

            {/* Full Review */}
            {fullCount > quickCount && (
              <>
                <View style={[styles.sessionCard, styles.sessionCardSecondary]}>
                  <View style={styles.sessionCardHeader}>
                    <MaterialCommunityIcons name="cards-outline" size={20} color={Colors.text} />
                    <Text style={styles.sessionCardTitle}>Full Review</Text>
                  </View>
                  <View style={styles.sessionCardMeta}>
                    <MaterialCommunityIcons name="timer-outline" size={14} color={Colors.textSecondary} />
                    <Text style={styles.sessionCardMetaText}>~{fullMins} min · {fullCount} cards</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.startButton, styles.startButtonSecondary]}
                    onPress={() => handleStartSession('full')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.startButtonText, styles.startButtonTextSecondary]}>Start</Text>
                  </TouchableOpacity>
                </View>
                <Divider />
              </>
            )}
          </>
        ) : (
          <>
            {/* Empty state */}
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="check-circle-outline" size={32} color={Colors.textSecondary} />
              <Text style={styles.emptyTitle}>You're all caught up.</Text>
              <Text style={styles.emptySubtitle}>{nextLabel !== 'No upcoming reviews' ? `Next review: ${nextLabel}` : 'No upcoming reviews scheduled.'}</Text>
            </View>
            <Divider />
          </>
        )}

        {/* Quick access */}
        <View style={styles.quickAccess}>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('Main', { screen: 'SOP' } as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.quickAccessLabel}>SOP</Text>
          </TouchableOpacity>
          <View style={styles.quickAccessDivider} />
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('Main', { screen: 'Catalogue' } as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.quickAccessLabel}>Catalogue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: { flex: 1 },
  content: { paddingBottom: 32 },

  header: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 20,
  },
  greeting: {
    fontFamily: 'EBGaramond_400Regular',
    fontSize: 26,
    color: Colors.text,
    marginBottom: 4,
  },
  subheading: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },

  sessionCard: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sessionCardSecondary: {
    opacity: 0.85,
  },
  sessionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  sessionCardTitle: {
    fontFamily: 'EBGaramond_400Regular',
    fontSize: 18,
    color: Colors.text,
  },
  sessionCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  sessionCardMetaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  startButton: {
    borderWidth: 1,
    borderColor: Colors.text,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startButtonSecondary: {
    borderColor: Colors.disabledBorder,
  },
  startButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: Colors.text,
  },
  startButtonTextSecondary: {
    color: Colors.textSecondary,
  },

  emptyState: {
    paddingHorizontal: 16,
    paddingVertical: 36,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontFamily: 'EBGaramond_400Regular',
    fontSize: 18,
    color: Colors.text,
    marginTop: 4,
  },
  emptySubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },

  quickAccess: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  quickAccessItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickAccessLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: Colors.accent,
  },
  quickAccessDivider: {
    width: 1,
    height: 20,
    backgroundColor: Colors.divider,
  },
});
