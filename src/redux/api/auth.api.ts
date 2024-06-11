import {rootServerApi} from './rootServerApi';

export const authApi = rootServerApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<any, {userName: string}>({
      query: loginPayload => ({
        url: '/auth/register',
        method: 'POST',
        body: loginPayload,
      }),
    }),
  }),
});

export const {useLoginMutation} = authApi;
