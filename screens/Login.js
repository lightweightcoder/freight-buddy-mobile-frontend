import React, { useState } from 'react';
import {
  View, TextInput, Text, Button,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BACKEND_URL, USER_AUTH } from '../store.js';
import styles from '../styles.js';

export default function LoginScreen({ navigation }) {
  // declaring state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');

  // run this function when login button is clicked
  const handleLogin = () => {
    // post request to axios backend
    axios.post(`${BACKEND_URL}/login`, { email, password }, { withCredentials: true }).then((result) => {
      console.log(result.data, 'result.data');

      // if validation failed for login, display validation message
      if (result.data.invalidMessage) {
        console.log('invalid login found');
        setInvalidMessage(result.data.invalidMessage);
      }

      // if user logged in successfully,
      if (result.data.userId) {
        // set the user id and hashed logged in user id in the async storage
        const authData = {
          userId: result.data.userId,
          loggedInHash: result.data.loggedInHash,
        };

        // update async storage
        AsyncStorage.setItem(USER_AUTH, JSON.stringify(authData));

        // direct user to home screen
        navigation.navigate('Home');
      }
    }); };

  const onEmailChange = (changedEmail) => {
    setEmail(changedEmail);
  };

  const onPasswordChange = (changedPassword) => {
    setPassword(changedPassword);
  };

  return (
    <View style={styles.container}>
      <Text h3>Freight Buddy Login</Text>
      <Text style={styles.invalidMessage}>{invalidMessage}</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -15,
      }}
      >
        <Icon name="envelope" size={22} color="#c2c0bc" />
        <TextInput
          style={styles.input}
          onChangeText={onEmailChange}
          value={email}
          placeholder="email"
          textContentType="emailAddress"
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -15,
      }}
      >
        <Icon name="key" size={22} color="#c2c0bc" />
        <TextInput
          style={styles.input}
          onChangeText={onPasswordChange}
          value={password}
          placeholder="password"
          textContentType="password"
          secureTextEntry
        />
      </View>

      <View style={styles.loginButton}>
        <Button
          onPress={handleLogin}
          title="Login"
          color="#7cfc00"
        />
      </View>
    </View>
  );
}
