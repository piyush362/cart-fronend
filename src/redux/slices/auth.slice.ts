import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {authApi} from '../api';

export interface AuthState {
  initialized: boolean;
  isAuthenticated: boolean;
  userName: string;
  userId: string | null;
}

const initialState: AuthState = {
  initialized: false,
  isAuthenticated: false,
  userName: '',
  userId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialized: (state: AuthState, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },

    setAuthorizationStatus: (
      state: AuthState,
      action: PayloadAction<boolean>,
    ) => {
      state.isAuthenticated = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        if (!action.payload.data?.userName) {
          return;
        }
        state.isAuthenticated = true;
        state.userName = action.payload.data?.userName;
        state.userId = action.payload.data?._id;
      },
    );
  },
});

export const {setAuthorizationStatus, setInitialized} = authSlice.actions;
