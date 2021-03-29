import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text, View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL, USER_AUTH } from './store.js';
import styles from './styles.js';

// import the screens
import LoginScreen from './screens/Login.js';
import FeedScreen from './screens/Feed.js';
import RequestsScreen from './screens/Requests.js';
import CreateRequestScreen from './screens/CreateRequest.js';
import FavoursScreen from './screens/Favours.js';
import ProfileScreen from './screens/Profile.js';

axios.defaults.withCredentials = true;

// get the stack nagivator object used for configuring navigation between screens
const Stack = createStackNavigator();

// get the bottom tab navigator
const Tab = createMaterialBottomTabNavigator();

// screens that display the bottom tab bar are placed here
function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#9ede73"
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
          tabBarLabel: 'Requests',
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
          tabBarLabel: 'Favours',
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

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [isLoading, setIsLoading] = useState(true);

  // do this after component first renders
  useEffect(() => {
    // try to get user authentication data from the phone's async storage
    AsyncStorage.getItem(USER_AUTH).then((authData) => {
      // parse the data. Null if no such item
      const parsedAuthData = JSON.parse(authData);
      console.log(parsedAuthData, 'parsedAuthData');

      // if there is a user authentication data set
      if (parsedAuthData) {
        // set initial route to home
        setInitialRoute('Home');

        // set loading to false
        setIsLoading(false);
      } else {
        console.log('user is not authenticated');
        // set loading to false
        setIsLoading(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  // if app is still checking which inital route to set
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>App is starting up...</Text>
      </View>
    );
  }

  // return this once app is done checking which inital route to set
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
