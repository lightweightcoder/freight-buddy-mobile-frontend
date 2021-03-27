/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

// backend repo URL
// const BACKEND_URL = 'http://localhost:3004';
// IPv4 address of Wireless LAN adapter Wi-Fi in windows (private). Found by typing ipconfig in terminal
// const BACKEND_URL = 'http://192.168.10.117:3004';
// Got this from running curl ifconfig.me in wsl2 terminal to get the public IP address
// const BACKEND_URL = 'http://116.87.211.191:3004';
// Ethernet adapter vEthernet (WSL) IPv4 address (private) of windows. Found by typing ipconfig in terminal
// const BACKEND_URL = 'http://192.168.16.1:3004';
// eth0 inet IP address (private) after typing ifconfig or ip addr | grep eth0
// const BACKEND_URL = 'http://172.26.220.164:3004';
// for heroku
const BACKEND_URL = 'https://freight-buddy-mobile-backend.herokuapp.com';

axios.defaults.withCredentials = true;

export default function App() {
  const [testDetails, setTestDetails] = useState('');

  useEffect(() => {
    console.log('making axios request to /home');
    axios.get(`${BACKEND_URL}/home`, { withCredentials: true }).then((result) => {
      console.log('axios request completed');
      setTestDetails(result.data.test);
    }).catch((error) => {
      // redirect user to login page as user tried to access a forbidden page
      console.log(error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Open up App.js to start working on your app!
        {testDetails}
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
