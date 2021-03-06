import React, { useState, useContext } from 'react';
import {
  View, TextInput, Text, Button, StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  BACKEND_URL, USER_AUTH, AppContext, retrieveRequests,
} from '../store.js';
import styles from '../styles.js';

export default function LoginScreen({ navigation }) {
  // retrieve the dispatch function from the App Context provider
  const { dispatch } = useContext(AppContext);

  // declaring state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // run this function when login button is clicked
  const handleLogin = () => {
    // set logging in boolean to true to display a logging in message to user
    setIsLoggingIn(true);

    // post request to axios backend
    axios.post(`${BACKEND_URL}/login`, { email, password }, { withCredentials: true })
      .then((result) => {
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
            userCountry: result.data.userCountry,
          };

          // update async storage
          AsyncStorage.setItem(USER_AUTH, JSON.stringify(authData));

          // From database, retrieve exsisting requests made to the user's country
          // and set it in the app provider's state
          const retrieveRequestsResult = retrieveRequests(dispatch, result.data.userCountry);

          retrieveRequestsResult.then((retrievedResult) => {
            // set logging in boolean to false to remove logging in message
            setIsLoggingIn(false);

            if (retrievedResult.error) {
              // if there is an error, display a message to inform user
              setInvalidMessage('sorry a database error occurred. We are currently resolving the issue.');
            } else {
              // if there is no error, direct user to home screen
              navigation.navigate('Home');
            }
          });
        }

        // set logging in boolean to false to remove logging in message
        setIsLoggingIn(false);
      }).catch((error) => {
        console.log('login error', error);
        // if login was not successful, let user know
        setInvalidMessage('Sorry something went wrong. Please try logging in later.');
        // set logging in boolean to false to remove logging in message
        setIsLoggingIn(false);
      });
  };

  const handleDemoLogin = () => {
    // set logging in boolean to true to display a logging in message to user
    setIsLoggingIn(true);

    // get request to axios backend to login as demo user
    axios.get(`${BACKEND_URL}/demo-login`)
      .then((result) => {
        // if demo user logged in successfully,
        if (result.data.userId) {
          // set the user id and hashed logged in user id in the async storage
          const authData = {
            userId: result.data.userId,
            loggedInHash: result.data.loggedInHash,
            userCountry: result.data.userCountry,
          };

          // update async storage
          AsyncStorage.setItem(USER_AUTH, JSON.stringify(authData));

          // From database, retrieve exsisting requests made to the user's country
          // and set it in the app provider's state
          const retrieveRequestsResult = retrieveRequests(dispatch, result.data.userCountry);

          retrieveRequestsResult.then((retrievedResult) => {
            // set logging in boolean to false to remove logging in message
            setIsLoggingIn(false);

            if (retrievedResult.error) {
              // if there is an error, display a message to inform user
              setInvalidMessage('sorry a database error occurred. We are currently resolving the issue.');
            } else {
              // if there is no error, direct user to home screen
              navigation.navigate('Home');
            }
          });
        } else {
          // if login was not successful, let user know
          setInvalidMessage('Sorry something went wrong. Please try logging in.');
          // set logging in boolean to false to remove logging in message
          setIsLoggingIn(false);
        }

        // set logging in boolean to false to remove logging in message
        setIsLoggingIn(false);
      }).catch((error) => {
        console.log('demo login error', error);
        // if login was not successful, let user know
        setInvalidMessage('Sorry something went wrong. Please trying logging in.');
        // set logging in boolean to false to remove logging in message
        setIsLoggingIn(false);
      });
  };

  const onEmailChange = (changedEmail) => {
    setEmail(changedEmail);
  };

  const onPasswordChange = (changedPassword) => {
    setPassword(changedPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={localStyles.loginHeadingText}>Freight Buddy Login</Text>
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
      <View style={styles.demoLoginButton}>
        <Button
          onPress={handleDemoLogin}
          title="Demo Login"
          color="grey"
        />
      </View>

      <Text>{ isLoggingIn ? 'Logging in...' : '' }</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  loginHeadingText: {
    fontSize: 22,
  },
});
