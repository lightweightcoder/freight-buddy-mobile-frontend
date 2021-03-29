import React, { useState } from 'react';
import {
  View, Text, Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles.js';
import { USER_AUTH } from '../../store.js';

export default function ProfileScreen({ navigation }) {
  // handle to log a user out and redirect user to login
  const handleLogout = () => {
  // try to remove the user authentication data from the phone's async storage
    AsyncStorage.removeItem(USER_AUTH).then(() => {
      console.log('logged out!');

      // direct user to login screen
      navigation.navigate('Login');
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <View style={styles.logoutButton}>
        <Button
          onPress={handleLogout}
          title="Logout"
          color="red"
        />
      </View>
    </View>
  );
}
