import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles.js';
import {
  USER_AUTH, AppContext, retrieveUserRequests,
} from '../../store.js';
import UserRequestCard from './components/UserRequestCard.js';
import UserRequestModal from './components/UserRequestModal.js';

export default function RequestsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  // retrieve the store variable and dispatch function from the App Context provider
  const { store, dispatch } = useContext(AppContext);

  // get the user's requests
  const { userRequests } = store;

  // state to determine if modal should be displayed
  const [modalVisible, setModalVisible] = useState(false);

  // get the user's requests on the 1st time the component renders
  useEffect(() => {
    // try to get user authentication data from the phone's async storage
    AsyncStorage.getItem(USER_AUTH).then((authData) => {
      // parse the data. Null if no such item
      const parsedAuthData = JSON.parse(authData);

      // if there is a user authentication data set
      if (parsedAuthData) {
        // From database, retrieve exsisting requests made by the user
        // and set it in the app provider's state
        const retrieveUserRequestsResult = retrieveUserRequests(dispatch, parsedAuthData.userId);

        retrieveUserRequestsResult.then((retrievedResult) => {
          if (!(retrievedResult.error)) {
            // set loading to false if there is no error in getting the user's requests
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

  // if app is still retrieving a user's requests
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Retrieving your requests...</Text>
      </View>
    );
  }

  // return the display of the user's requests
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={localStyles.heading}>My Requests</Text>
      {userRequests.map((request) => (
        <UserRequestCard key={request.id} request={request} setModalVisible={setModalVisible} />
      ))}
      <UserRequestModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  heading: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
  },
});
