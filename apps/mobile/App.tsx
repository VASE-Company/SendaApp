import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { tokens } from './src/theme/tokens';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { CrisisScreen } from './src/screens/CrisisScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { TrackingScreen } from './src/screens/TrackingScreen';
import { AccountabilityScreen } from './src/screens/AccountabilityScreen';

export type RootStackParamList = { Onboarding: undefined; Main: undefined };
export type MainTabParamList = { Dashboard: undefined; Crisis: undefined; Chat: undefined; Tracking: undefined; Accountability: undefined };

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: tokens.bgSecondary }, headerTintColor: tokens.textPrimary, tabBarStyle: { backgroundColor: tokens.bgSecondary, borderTopColor: tokens.border }, tabBarActiveTintColor: tokens.accentPrimary, tabBarInactiveTintColor: tokens.textSecondary }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Crisis" component={CrisisScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Tracking" component={TrackingScreen} />
      <Tab.Screen name="Accountability" component={AccountabilityScreen} />
    </Tab.Navigator>
  );
}

const navTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: tokens.bgPrimary, card: tokens.surface, text: tokens.textPrimary, border: tokens.border, primary: tokens.accentPrimary } };

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: tokens.bgSecondary }, headerTintColor: tokens.textPrimary }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Bienvenido a Senda' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
