import React, { useContext, useState } from 'react';
import {
  View, TextInput, Text, Button, StyleSheet, ScrollView, Picker,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countriesNames, categoriesNames } from './utilities/createRequest.js';
import { createRequest, AppContext, USER_AUTH } from '../../store.js';

export default function CreateRequestScreen({ navigation }) {
  // retrieve the dispatch function from the App Context provider
  const { dispatch } = useContext(AppContext);

  // state to inform user if a request is updating
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);

  // initialise a form and get its methods
  const { handleSubmit, control, errors } = useForm();

  // when user clicks on the form submit button
  const onSubmit = (requestDetails) => {
    // try to get user authentication data from the phone's async storage
    AsyncStorage.getItem(USER_AUTH).then((authData) => {
      // parse the data. Null if no such item
      const parsedAuthData = JSON.parse(authData);

      // if there is a user authentication data set
      if (parsedAuthData) {
        // inform user that request is being created
        setIsCreatingRequest(true);

        const { userId } = parsedAuthData;

        // create the request in the database
        // and update all user's requests in store variable of App provider
        createRequest(dispatch, userId, requestDetails)
          .then(() => {
            // remove the creating request message
            setIsCreatingRequest(false);

            // navigate user to requests screen
            navigation.navigate('Requests');
          });
      } else {
        // user is not logged in so navigate to login page
        navigation.navigate('Login');
      }
    });
  };

  // if request if being created, inform the user
  if (isCreatingRequest) {
    return (
      <ScrollView style={localStyles.scrollViewContainer}>
        <View style={localStyles.viewContainer}>
          <Text style={localStyles.heading}>Creating Request...</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={localStyles.scrollViewContainer}>
      <View style={localStyles.viewContainer}>
        <Text style={localStyles.heading}>Create Request</Text>

        <Text style={localStyles.label}>Product name</Text>
        <Controller
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={localStyles.input}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
            />
          )}
          name="productName"
          rules={{ required: true }}
        />
        {errors.productName && <Text style={localStyles.errorText}>This is required.</Text>}

        <Text style={localStyles.label}>Description</Text>
        <Controller
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={localStyles.input}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
            />
          )}
          name="description"
          rules={{ required: true }}
        />
        {errors.description && <Text style={localStyles.errorText}>This is required.</Text>}

        <Text style={localStyles.label}>Country</Text>
        <View style={localStyles.pickerView}>
          <Controller
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Picker
                style={localStyles.itemPicker}
                selectedValue={value}
                onValueChange={(inputValue) => onChange(inputValue)}
              >
                {countriesNames.map((countryName) => (
                  <Picker.Item key={countryName} label={countryName} value={countryName} />
                ))}
              </Picker>
            )}
            name="country"
            rules={{ required: true }}
          />
        </View>
        {errors.country && <Text style={localStyles.errorText}>This is required.</Text>}

        <Text style={localStyles.label}>Category</Text>
        <View style={localStyles.pickerView}>
          <Controller
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <Picker
                style={localStyles.itemPicker}
                selectedValue={value}
                onValueChange={(inputValue) => onChange(inputValue)}
              >
                {categoriesNames.map((categoryName) => (
                  <Picker.Item key={categoryName} label={categoryName} value={categoryName} />
                ))}
              </Picker>
            )}
            name="category"
            rules={{ required: true }}
          />
        </View>
        {errors.category && <Text style={localStyles.errorText}>This is required.</Text>}

        <Text style={localStyles.label}>Price (in product origin country currency)</Text>
        <Controller
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={localStyles.input}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
            />
          )}
          name="price"
          rules={{ required: true }}
        />
        {errors.price && <Text style={localStyles.errorText}>This is required.</Text>}

        <Text style={localStyles.label}>Reference link</Text>
        <Controller
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={localStyles.input}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
            />
          )}
          name="referenceLink"
          rules={{ required: false }}
        />

        <Text style={localStyles.label}>Shipping address</Text>
        <Controller
          control={control}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={localStyles.input}
              onBlur={onBlur}
              onChangeText={(inputValue) => onChange(inputValue)}
              value={value}
            />
          )}
          name="shippingAddress"
          rules={{ required: true }}
        />
        {errors.shippingAddress && <Text style={localStyles.errorText}>This is required.</Text>}

        <View style={localStyles.button}>
          <Button
            style={localStyles.innerButton}
            color="#ff7a00"
            title="Create Request"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#ffefcf',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 0,
  },
  button: {
    marginTop: 20,
    marginBottom: 50,
  },
  innerButton: {
    backgroundColor: '#ff7a00',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    width: '60%',
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  pickerView: {
    borderColor: 'black', borderWidth: 1,
  },
  itemPicker: {
    height: 50, width: 150,
  },
});
