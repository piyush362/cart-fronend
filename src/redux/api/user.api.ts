import {rootServerApi} from './rootServerApi';

export const userApi = rootServerApi.injectEndpoints({
  endpoints: builder => ({
    getAllProduct: builder.query<any, void>({
      query: () => ({
        url: '/user/getAllProduct',
        method: 'GET',
      }),
      providesTags: [],
    }),

    getMyCart: builder.mutation<any, {userId: string | number}>({
      query: payload => ({
        url: '/user/getMyCart',
        method: 'POST',
        body: {
          userId: payload.userId,
        },
      }),
    }),

    addToCart: builder.mutation<
      any,
      {userName: string; productId: string | number}
    >({
      query: payload => ({
        url: '/user/addToCart',
        method: 'POST',
        body: payload,
      }),
    }),

    changeItemQuantity: builder.mutation<
      any,
      {cartItemId: string; quantity: number}
    >({
      query: payload => ({
        url: '/user/changeItemQuantity',
        method: 'POST',
        body: payload,
      }),
    }),

    DeleteCartItem: builder.mutation<any, {cartItemId: string}>({
      query: payload => ({
        url: '/user/deleteCartItem',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetMyCartMutation,
  useAddToCartMutation,
  useChangeItemQuantityMutation,
  useDeleteCartItemMutation,
  useGetAllProductQuery,
} = userApi;
