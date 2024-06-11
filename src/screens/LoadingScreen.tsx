import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export const LoadingScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
