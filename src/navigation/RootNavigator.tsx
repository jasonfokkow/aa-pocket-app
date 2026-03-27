import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import { FlashcardReviewScreen } from '../screens/FlashcardReviewScreen';
import { SessionSummaryScreen } from '../screens/SessionSummaryScreen';
import { SOPDetailScreen } from '../screens/SOPDetailScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CardState } from '../lib/spaced-repetition';
import { loadCardStates, saveCardStates } from '../lib/storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});

  useEffect(() => {
    loadCardStates().then(setCardStates);
  }, []);

  const handleUpdateStates = (states: Record<string, CardState>) => {
    setCardStates(states);
    saveCardStates(states);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Main">
          {(props) => <TabNavigator {...props} cardStates={cardStates} />}
        </Stack.Screen>
        <Stack.Screen name="FlashcardReview">
          {(props) => (
            <FlashcardReviewScreen
              {...props}
              cardStates={cardStates}
              onUpdateStates={handleUpdateStates}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SessionSummary">
          {(props) => <SessionSummaryScreen {...props} cardStates={cardStates} />}
        </Stack.Screen>
        <Stack.Screen name="SOPDetail" component={SOPDetailScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
