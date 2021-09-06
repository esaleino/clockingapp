import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashboardScreen from './screens/dashboard';

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Dashboard':
      return 'Dashboard';
    case 'Graph':
      return 'My Graph';
    case 'History':
      return 'History';
  }
}

function ProfileScreen() {
  return <View />;
}

function AccountScreen() {
  return <View />;
}

function SettingsScreen() {
  return <View />;
}

const Tab = createBottomTabNavigator();

function HomeTabs({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
    });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'pink',
        inactiveTintColor: 'gray',
        style: { backgroundColor: 'black' },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused
                ? 'tv-outline'
                : 'tv-outline';
              break;
            case 'Graph':
              iconName = focused
                ? 'analytics-outline'
                : 'analytics-outline';
              break;
            case 'History':
              iconName = focused ? 'list' : 'list';
              break;
          }

          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name='Dashboard'
        component={DashboardScreen}
      />
      <Tab.Screen name='Graph' component={ProfileScreen} />
      <Tab.Screen
        name='History'
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'pink',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
          },
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeTabs}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen
          name='Settings'
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
