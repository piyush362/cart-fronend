import {configureStore} from '@reduxjs/toolkit';
import {rootServerApi} from './api/rootServerApi';
import {rtkQueryErrorLogger} from './api/middleware';
import {authSlice} from './slices';

export const store = configureStore({
  reducer: {
    [rootServerApi.reducerPath]: rootServerApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([rootServerApi.middleware, rtkQueryErrorLogger]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
