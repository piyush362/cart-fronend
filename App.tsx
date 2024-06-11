import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { RootNavigationContainer } from './src/navigation/rootNavigationContainer';
import React from 'react';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigationContainer />
    </Provider>
  )
};

export default App;

const styles = StyleSheet.create({});
