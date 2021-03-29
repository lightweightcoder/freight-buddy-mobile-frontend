import 'react-native-gesture-handler';
import React from 'react';
import {
  AppProvider,
} from './store.js';

// import custom navigation component
import Navigation from './Navigation.js';

export default function App() {
  // provision the provider to it children components
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
