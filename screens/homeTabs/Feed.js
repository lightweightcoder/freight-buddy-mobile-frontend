import React, { useContext, useState, useEffect } from 'react';
import {
  View, TextInput, Text, Button, ScrollView,
} from 'react-native';
import styles from '../../styles.js';
import {
  AppContext,
} from '../../store.js';
import RequestCard from './components/RequestCard.js';

export default function FeedScreen({ navigation }) {
  // retrieve the store variable and dispatch function from the App Context provider
  const { store, dispatch } = useContext(AppContext);

  // get the requests from the store
  const { requests } = store;
  console.log(requests, 'requests');

  // if there are no requests made to the user's country yet
  if (requests.length === 0) {
    return (
      <View style={styles.container}>
        <Text>There are currently no available requests made to your country.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </ScrollView>
  );
}
