import React, { useState } from 'react';
import {
  View, Text, Button, StyleSheet,
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
    <View style={localStyles.container}>
      <Text style={localStyles.heading}>Profile</Text>
      <View style={localStyles.buttonContainer}>
        <Button
          onPress={handleLogout}
          title="Logout"
          color="red"
        />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  heading: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
  },
  container: {
    backgroundColor: '#ffefcf',
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});
