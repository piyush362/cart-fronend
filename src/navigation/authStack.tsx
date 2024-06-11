import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createStackNavigator();


export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="CartScreen" component={CartScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
