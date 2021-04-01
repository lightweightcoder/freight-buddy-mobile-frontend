/* eslint-disable max-len */
import React, { useContext } from 'react';
import {
  View, Text, Modal, Pressable, StyleSheet,
} from 'react-native';
import * as Linking from 'expo-linking';
import {
  AppContext,
} from '../../../store.js';

export default function RequestModal({ modalVisible, setModalVisible }) {
  // retrieve the store variable and dispatch function from the App Context provider
  const { store } = useContext(AppContext);

  // get the selected request from the store
  const { selectedRequest } = store;

  const handleReferenceLinkPress = () => {
    Linking.openURL(selectedRequest.referenceLink);
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
});
