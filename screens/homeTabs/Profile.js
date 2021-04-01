import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles.js';
import { USER_AUTH, retrieveUserProfile, AppContext } from '../../store.js';

export default function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  // retrieve the store variable and dispatch function from the App Context provider
  const { store, dispatch } = useContext(AppContext);

  // get the user's profile data
  const { userProfile } = store;

  // get the user's data on the 1st time the component renders
  useEffect(() => {
    // try to get user authentication data from the phone's async storage
    AsyncStorage.getItem(USER_AUTH).then((authData) => {
      // parse the data. Null if no such item
      const parsedAuthData = JSON.parse(authData);

      // if there is a user authentication data set
      if (parsedAuthData) {
        // From database, retrieve the user's profile data
        // and set it in the app provider's state
        const retrieveUserProfileResult = retrieveUserProfile(dispatch, parsedAuthData.userId);

        retrieveUserProfileResult.then((retrievedResult) => {
          if (!(retrievedResult.error)) {
            // set loading to false if there is no error in getting the user's profile
            setIsLoading(false);
          } else {
            // else theres an error, return to login screen
            navigation.navigate('Login');
          }
        });
      } else {
        console.log('user is not authenticated');
        // else theres no user authentication data, return to login screen
        navigation.navigate('Login');
      }
    }).catch((error) => {
      console.log(error);
      // if theres an error, return to login screen
      navigation.navigate('Login');
    });
  }, []);

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

  // if a user's profile is loading display a loading profile message
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.heading}>Profile</Text>
      <View>
        <Text style={localStyles.profileDetails}>{`Name: ${userProfile.name}`}</Text>
        <Text style={localStyles.profileDetails}>{`Country: ${userProfile.country}`}</Text>
        <Text style={localStyles.profileDetails}>{`Email: ${userProfile.email}`}</Text>
        <Text style={localStyles.profileDetails}>{`Address: ${userProfile.address}`}</Text>
      </View>
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
  profileDetails: {
    marginVertical: 4,
  },
});
