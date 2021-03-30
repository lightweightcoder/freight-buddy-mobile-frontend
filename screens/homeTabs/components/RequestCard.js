import React, { useContext } from 'react';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';
import styles from '../../../styles.js';
import { AppContext, setSelectedRequestAction } from '../../../store.js';

export default function RequestCard({ request, setModalVisible }) {
  // retrieve the dispatch function from the App Context provider
  const { dispatch } = useContext(AppContext);

  // handler for clicking on a request
  const handleRequestCardClick = () => {
    console.log('clicked');
    // set the selected request in the store state variable of App provider
    dispatch(setSelectedRequestAction(request));

    // show the modal that displays a request's details
    setModalVisible(true);
  };

  return (
    <View style={localStyles.requestCardContainer}>
      <Pressable
        onPress={handleRequestCardClick}
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

  requestCardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#ff7a00',
  },
});
