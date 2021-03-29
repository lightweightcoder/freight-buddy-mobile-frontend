import React, { useContext, useState, useEffect } from 'react';
import {
  View, TextInput, Text, Button,
} from 'react-native';
import styles from '../../styles.js';
import {
  AppContext,
} from '../../store.js';

export default function FeedScreen({ navigation }) {
  // retrieve the store variable and dispatch function from the App Context provider
  const { store, dispatch } = useContext(AppContext);

  // get the requests from the store
  const { requests } = store;
  console.log(requests, 'requests');

  return (
    <View style={styles.container}>
      <Text>Feed Screen</Text>
    </View>
  );
}
