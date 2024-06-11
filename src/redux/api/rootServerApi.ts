import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {appEnvironment} from '../../app.env';

const API_URL: string = appEnvironment.baseUrl;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/v1`,
  validateStatus: response => {
    return response.status < 500;
  },
});

export const rootServerApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ['MyProfile', 'CartItem'],
});
