import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

// import screens
import FeedScreen from './homeTabs/Feed.js';
import RequestsScreen from './homeTabs/Requests.js';
import CreateRequestScreen from './homeTabs/CreateRequest.js';
import FavoursScreen from './homeTabs/Favours.js';
import ProfileScreen from './homeTabs/Profile.js';

// get the bottom tab navigator
const Tab = createMaterialBottomTabNavigator();

// screens that display the bottom tab bar are placed here
export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#864000"
      barStyle={{ backgroundColor: '#e48900' }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarLabel: 'My Requests',
          tabBarIcon: ({ color }) => (
            <Icon name="question-circle" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateRequestScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <Icon name="plus-circle" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favours"
        component={FavoursScreen}
        options={{
          tabBarLabel: 'My Favours',
          tabBarIcon: ({ color }) => (
            <Icon name="hands-helping" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
