import React from 'react';
import {
  View, TextInput, Text, Button, StyleSheet, ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { countriesNames, categoriesNames } from './utilities/createRequest.js';

export default function CreateRequestScreen({ navigation }) {
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => console.log(data, 'formdata');

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
              onChangeText={(value) => onChange(value)}
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
              onChangeText={(value) => onChange(value)}
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
            render={({ onChange, onBlur, value }) => (
              <Picker
                style={localStyles.itemPicker}
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
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
            render={({ onChange, onBlur, value }) => (
              <Picker
                style={localStyles.itemPicker}
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
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
              onChangeText={(value) => onChange(value)}
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
              onChangeText={(value) => onChange(value)}
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
              onChangeText={(value) => onChange(value)}
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
