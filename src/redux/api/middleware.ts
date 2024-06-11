import {Middleware, MiddlewareAPI, isRejectedWithValue} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => next => async action => {
    if (isRejectedWithValue(action)) {
      const errorMessage = getErrorMessage(action.payload);
      Alert.alert(errorMessage);
    }
    return next(action);
  };

function getErrorMessage(payload: any) {
  return (
    payload?.error ??
    payload?.error_description ??
    payload?.data?.message ??
    payload?.message ??
    'Something went wrong, please try again.'
  );
}
