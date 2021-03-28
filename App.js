import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text, View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL, USER_AUTH } from './store.js';
import styles from './styles.js';

// import the screens
import LoginScreen from './screens/Login.js';

axios.defaults.withCredentials = true;

// get the stack nagivator object used for configuring navigation between screens
const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
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
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
