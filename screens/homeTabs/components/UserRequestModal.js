/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import {
  View, Text, Button, Modal, Pressable, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import {
  AppContext, updateUserRequestStatus, USER_AUTH,
} from '../../../store.js';
import { getUpdateRequestStatusButtonTextAndNewStatus } from './utilities/userRequestModal.js';

export default function UserRequestModal({ modalVisible, setModalVisible }) {
  // state to inform user if a request is updating
  const [isRequestUpdating, setIsRequestUpdating] = useState(false);

  // retrieve the store variable and dispatch function from the App Context provider
  const { store, dispatch } = useContext(AppContext);

  // get the selected request from the store
  const { selectedRequest } = store;

  // handle to open a link to an external website where the product is sold
  const handleReferenceLinkPress = () => {
    Linking.openURL(selectedRequest.referenceLink);
  };

  // get the button text which prompts the user when to update the status of a request
  // and get the new status that the request will be updated to.
  const updateRequestStatusDetails = getUpdateRequestStatusButtonTextAndNewStatus(selectedRequest.status);
  const updateRequestStatusButtonText = updateRequestStatusDetails.text;
  const updateRequestNewStatus = updateRequestStatusDetails.newStatus;

  // handle to update the status of a request in the database when user presses the corressponding button
  const handleUpdateRequestStatusButtonPress = () => {
    // inform user that request is updating
    setIsRequestUpdating(true);

    // try to get user authentication data from the phone's async storage
    AsyncStorage.getItem(USER_AUTH).then((authData) => {
      // parse the data. Null if no such item
      const parsedAuthData = JSON.parse(authData);

      // if there is a user authentication data set
      if (parsedAuthData) {
        const { userId, userCountry } = parsedAuthData;

        // update the status in the database and update all the requests in store variable in the App provider
        updateUserRequestStatus(dispatch, selectedRequest.id, updateRequestNewStatus, userId, userCountry)
          .then(() => {
            // remove the message saying that the request is updating as it has finished updating
            setIsRequestUpdating(false);
          });
      }
    });
  };

  // handle to update the status of a request in the database to cancelled
  const handleCancelRequestButtonPress = () => {
    // inform user that request is updating
    setIsRequestUpdating(true);

    // try to get user authentication data from the phone's async storage
    AsyncStorage.getItem(USER_AUTH).then((authData) => {
      // parse the data. Null if no such item
      const parsedAuthData = JSON.parse(authData);

      // if there is a user authentication data set
      if (parsedAuthData) {
        const { userId, userCountry } = parsedAuthData;

        // update the status in the database and update all the requests in store variable in the App provider
        updateUserRequestStatus(dispatch, selectedRequest.id, 'cancelled', userId, userCountry)
          .then(() => {
            // remove the message saying that the request is updating as it has finished updating
            setIsRequestUpdating(false);
          });
      } else {
        // remove the message saying that the request is updating as it has finished updating
        setIsRequestUpdating(false);
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={localStyles.centeredView}>
        <View style={localStyles.modalView}>
          <Pressable
            style={[localStyles.button, localStyles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={localStyles.textStyle}>x</Text>
          </Pressable>
          <View style={localStyles.modalContentView}>
            <Text style={localStyles.modalText}>{`Product: ${selectedRequest.productName}`}</Text>
            <Text style={localStyles.modalText}>{`Origin: ${selectedRequest.country}`}</Text>
            <Text style={localStyles.modalText}>{`Description: ${selectedRequest.description}`}</Text>
            <Text style={localStyles.modalText}>{`Offer Price: ${selectedRequest.price}`}</Text>
            <Text style={localStyles.modalText}>{`Delivery Addr: ${selectedRequest.shippingAddress}`}</Text>
            <Text style={localStyles.linkText} onPress={handleReferenceLinkPress}>View product</Text>
            <Text style={localStyles.modalText}>{`Status: ${selectedRequest.status}`}</Text>
            { (updateRequestStatusButtonText !== '') ? (
              <View>
                <Text style={localStyles.modalText}>Click below to update status.</Text>
                <Button
                  onPress={handleUpdateRequestStatusButtonPress}
                  title={updateRequestStatusButtonText}
                  color="#ff7a00"
                />
              </View>
            ) : <View />}
            { (selectedRequest.status !== 'completed' && selectedRequest.status !== 'cancelled') ? (
              <View style={localStyles.cancelRequestButtonView}>
                <Button
                  onPress={handleCancelRequestButtonPress}
                  title="Cancel request"
                  color="grey"
                />
              </View>
            ) : <View />}
            <Text style={localStyles.modalText}>{isRequestUpdating ? 'Updating request...' : ''}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const localStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContentView: {
    backgroundColor: 'white',
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 8,
  },
  buttonClose: {
    alignSelf: 'flex-end',
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'grey',
    color: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
  },
  cancelRequestButtonView: {
    marginVertical: 10,
  },
});
