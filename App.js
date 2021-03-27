/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

// for heroku
const BACKEND_URL = 'https://freight-buddy-mobile-backend.herokuapp.com';

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
