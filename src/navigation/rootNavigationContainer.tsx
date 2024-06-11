import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks';
import LoadingScreen from '../screens/LoadingScreen';
import { AuthStack } from './authStack';
import { UnAuthStack } from './unAuthStack';

export function RootNavigationContainer() {
  const { init, isInitialized, isLoggedIn } = useAuth();

  useEffect(() => {
    init();
  }, []);

  // if auth is not initialized, do not render anything
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <>
          <AuthStack />
        </>
      ) : (
        <UnAuthStack />
      )}
    </NavigationContainer>
  );
}

