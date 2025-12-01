import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Home, Search, Heart, User } from 'lucide-react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import WelcomeScreen from '../screens/welcome-screen'
import HomeScreen from '../screens/home-screen'
import SearchScreen from '../screens/search-screen'
import FavoritesScreen from '../screens/favorites-screen'
import ProfileScreen from '../screens/profile-screen'
import MealDetailScreen from '../screens/meal-detail-screen'
import { useTheme } from '../context/theme-context'
import { useFavorites } from '../context/favorites-context'

// Define the types for your navigation routes
export type RootStackParamList = {
  Welcome: undefined;
  MainTabs: undefined;
  MealDetail: { mealId: string };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs = () => {
  const { colors, theme } = useTheme();
  const { favorites } = useFavorites();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: hp(8),
          paddingBottom: hp(1),
          paddingTop: hp(0.5),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: hp(1.4),
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Home
              size={hp(3)}
              color={color}
              fill={focused ? color : 'transparent'}
              strokeWidth={2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Search size={hp(3)} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Heart
              size={hp(3)}
              color={color}
              fill={focused ? color : 'transparent'}
              strokeWidth={2}
            />
          ),
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
            fontSize: hp(1.2),
            fontWeight: '700',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <User
              size={hp(3)}
              color={color}
              fill={focused ? color : 'transparent'}
              strokeWidth={2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='MainTabs' component={MainTabs} />
        <Stack.Screen name='MealDetail' component={MealDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation