import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { SOPListScreen } from '../screens/SOPListScreen';
import { CatalogueScreen } from '../screens/CatalogueScreen';
import { Colors } from '../constants/theme';
import { CardState } from '../lib/spaced-repetition';

const Tab = createBottomTabNavigator<TabParamList>();

interface Props extends NativeStackScreenProps<RootStackParamList, 'Main'> {
  cardStates: Record<string, CardState>;
}

export const TabNavigator: React.FC<Props> = ({ navigation, cardStates }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIconStyle: { marginBottom: 0 },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      >
        {(props) => <HomeScreen {...props} navigation={navigation as any} cardStates={cardStates} />}
      </Tab.Screen>

      <Tab.Screen
        name="SOP"
        options={{
          tabBarLabel: 'SOP',
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'book-open' : 'book-open-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      >
        {(props) => <SOPListScreen {...props} navigation={navigation as any} />}
      </Tab.Screen>

      <Tab.Screen
        name="Catalogue"
        options={{
          tabBarLabel: 'Catalogue',
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'view-grid' : 'view-grid-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      >
        {(props) => <CatalogueScreen {...props} navigation={navigation as any} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
  },
});
