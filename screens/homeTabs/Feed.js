/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import styles from '../../styles.js';
import {
  AppContext,
} from '../../store.js';
import RequestCard from './components/RequestCard.js';
import RequestModal from './components/RequestModal.js';

export default function FeedScreen() {
  // retrieve the store variable and dispatch function from the App Context provider
  const { store } = useContext(AppContext);

  // get the requests from the store
  const { requests } = store;

  // state to determine if modal should be displayed
  const [modalVisible, setModalVisible] = useState(false);

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
      <Text style={localStyles.heading}>Available Requests</Text>
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} setModalVisible={setModalVisible} />
      ))}
      <RequestModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
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
