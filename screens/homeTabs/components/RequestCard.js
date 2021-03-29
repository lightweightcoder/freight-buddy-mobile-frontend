import React from 'react';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';
import styles from '../../../styles.js';

export default function RequestCard({ request }) {
  // handler for clicking on a request card
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   // set a selected request id, then set the state of the page to
  //   // to display the request details in helper view
  //   selectAndViewARequestPageHelper(id);
  // };

  return (
    <View style={styles.requestCardContainer}>
      <Pressable
        onPress={() => {
          // display a request details
        }}
        style={styles.requestCardPressableContainer}
      >
        <Text style={localStyles.text}>
          {`Product: ${request.productName}`}
        </Text>
        <Text style={localStyles.text}>
          {`Price: ${request.price}`}
        </Text>
        <Text style={localStyles.text}>
          {request.country}
        </Text>
      </Pressable>
    </View>
  );
}

const localStyles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});
