import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/theme';
import { Divider } from '../components/Divider';
import { FLASHCARDS, Flashcard } from '../data/flashcards';
import {
  CardState,
  ConfidenceRating,
  updateCardState,
  estimateSessionMinutes,
} from '../lib/spaced-repetition';
import { RootStackParamList } from '../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'FlashcardReview'>;
  route: RouteProp<RootStackParamList, 'FlashcardReview'>;
  cardStates: Record<string, CardState>;
  onUpdateStates: (states: Record<string, CardState>) => void;
}

export const FlashcardReviewScreen: React.FC<Props> = ({
  navigation,
  route,
  cardStates,
  onUpdateStates,
}) => {
  const { cardIds, sessionType } = route.params;
  const sessionLabel = sessionType === 'quick' ? 'Quick Review' : 'Full Review';

  const cards: Flashcard[] = cardIds
    .map((id) => FLASHCARDS.find((c) => c.id === id))
    .filter(Boolean) as Flashcard[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedRating, setSelectedRating] = useState<ConfidenceRating | null>(null);
  const [weakCards, setWeakCards] = useState<string[]>([]);

  const totalCards = cards.length;
  const currentCard = cards[currentIndex];
  const minsLeft = Math.max(1, estimateSessionMinutes(totalCards - currentIndex));

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleRate = useCallback(
    (rating: ConfidenceRating) => {
      setSelectedRating(rating);

      const updatedStates = {
        ...cardStates,
        [currentCard.id]: updateCardState(
          cardStates[currentCard.id] ?? { cardId: currentCard.id, interval: 1, repetitions: 0, nextReview: '', lastReviewed: null },
          rating
        ),
      };
      onUpdateStates(updatedStates);

      if (rating !== 'got-it') {
        setWeakCards((prev) => [...prev, currentCard.id]);
      }

      setTimeout(() => {
        if (currentIndex + 1 >= totalCards) {
          navigation.replace('SessionSummary', {
            sessionType,
            weakCardIds: rating !== 'got-it'
              ? [...weakCards, currentCard.id]
              : weakCards,
            totalReviewed: totalCards,
          });
        } else {
          setCurrentIndex((i) => i + 1);
          setIsRevealed(false);
          setSelectedRating(null);
        }
      }, 300);
    },
    [cardStates, currentCard, currentIndex, totalCards, weakCards, sessionType, navigation, onUpdateStates]
  );

  const handlePause = () => {
    Alert.alert(
      'Pause Session',
      'Your progress will be saved if you exit.',
      [
        { text: 'Keep going', style: 'cancel' },
        {
          text: 'Exit session',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!currentCard) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{sessionLabel}</Text>
        <TouchableOpacity onPress={handlePause} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialCommunityIcons name="pause" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
      <Divider />

      {/* Progress */}
      <View style={styles.progress}>
        <MaterialCommunityIcons name="timer-outline" size={14} color={Colors.textSecondary} />
        <Text style={styles.progressText}>
          Card {currentIndex + 1} of {totalCards} · {minsLeft} min left
        </Text>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.flashcard}
          onPress={!isRevealed ? handleReveal : undefined}
          activeOpacity={isRevealed ? 1 : 0.95}
        >
          {/* Topic label */}
          <Text style={styles.topicLabel}>{currentCard.topic.toUpperCase()}</Text>

          <Divider inset />

          {/* Question */}
          <Text style={styles.question}>{currentCard.question}</Text>

          {!isRevealed && (
            <Text style={styles.tapHint}>Tap to reveal answer</Text>
          )}

          {isRevealed && (
            <>
              <Divider inset />
              <Text style={styles.answer}>{currentCard.answer}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Confidence buttons */}
      {isRevealed && (
        <View style={styles.confidenceRow}>
          {([
            { rating: 'got-it' as ConfidenceRating, label: 'Got it', activeBg: Colors.successText },
            { rating: 'wasnt-sure' as ConfidenceRating, label: "Wasn't sure", activeBg: Colors.textSecondary },
            { rating: 'didnt-know' as ConfidenceRating, label: "Didn't know", activeBg: Colors.errorText },
          ] as const).map(({ rating, label, activeBg }) => {
            const isSelected = selectedRating === rating;
            return (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.confidenceButton,
                  isSelected && { backgroundColor: activeBg, borderColor: activeBg },
                ]}
                onPress={() => handleRate(rating)}
                activeOpacity={0.8}
                disabled={selectedRating !== null}
              >
                <Text
                  style={[
                    styles.confidenceLabel,
                    isSelected && { color: '#fff' },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
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
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
  },
  progressText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  flashcard: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.divider,
    backgroundColor: Colors.surface,
    padding: 24,
    justifyContent: 'flex-start',
  },
  topicLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  question: {
    fontFamily: 'EBGaramond_400Regular',
    fontSize: 22,
    color: Colors.text,
    lineHeight: 22 * 1.4,
    marginTop: 12,
    marginBottom: 16,
  },
  tapHint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.disabledText,
    marginTop: 'auto',
    textAlign: 'center',
  },
  answer: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 15 * 1.7,
    marginTop: 12,
  },
  confidenceRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  confidenceButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.text,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confidenceLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.text,
    textAlign: 'center',
  },
});
