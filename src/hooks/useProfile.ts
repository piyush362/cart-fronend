import {
  useAddToCartMutation,
  useChangeItemQuantityMutation,
  useDeleteCartItemMutation,
  useGetAllProductQuery,
  useGetMyCartMutation,
} from '../redux/api/user.api';
import {useAuth} from './useAuth';

interface changeItemProps {
  cartItemId: string;
  quantity: number;
}

export function useProfile() {
  const {userId, userName} = useAuth();
  const {data, isLoading: gettingAllProduct} = useGetAllProductQuery();

  const [getMyCartMutation, {isLoading: gettingMyCart, error: loginError}] =
    useGetMyCartMutation();

  const [addToCartMutation, {isLoading: addingToCart}] = useAddToCartMutation();

  const [changeItemQuantityMutation, {isLoading: changingItemQuantity}] =
    useChangeItemQuantityMutation();

  const [deleteCartItemMutation, {isLoading: deletingCartItem}] =
    useDeleteCartItemMutation();

  const getMyCartQuery = async (userIs: string) => {
    if (userId) {
      const res = await getMyCartMutation({userId}).unwrap();
      return res;
    } else {
      return [];
    }
  };

  const addToCart = async (productId: string | number) => {
    if (userName) {
      const res = await addToCartMutation({
        userName: userName,
        productId: productId,
      });
      return res;
    } else {
      throw Error;
    }
  };

  const changeItemQuantity = async (data: changeItemProps) => {
    const {cartItemId, quantity} = data;
    if (cartItemId && quantity) {
      const res = await changeItemQuantityMutation({
        cartItemId: cartItemId,
        quantity: quantity,
      });
      return res;
    } else {
      throw Error;
    }
  };

  const deleteCartItem = async (cartItemId: string) => {
    if (cartItemId) {
      console.log('----', cartItemId);
      const res = await deleteCartItemMutation({
        cartItemId: cartItemId,
      });
      return res;
    } else {
      throw Error;
    }
  };

  return {
    allProduct: data?.data?.products ?? [],
    getMyCartQuery,
    addToCart,
    changeItemQuantity,
    deleteCartItem,
    isLoading: {
      gettingAllProduct,
      gettingMyCart,
      addingToCart,
      changingItemQuantity,
      deletingCartItem,
    },
  };
}
