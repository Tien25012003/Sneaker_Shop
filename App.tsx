import {View, Text} from 'react-native';
import React from 'react';
import Home from './src/Codes/Home';
import Store from './src/Redux/Store';
import {Provider} from 'react-redux/es/exports';
import {persistor} from './src/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
};

export default App;
