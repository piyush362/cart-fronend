import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth, useProfile } from '../hooks';
import CartItem from '../components/CartItem';
import LoadingScreen from './LoadingScreen';

const EmptyCardImage = require('../assets/emptyCart.png')

const CartScreen = () => {
  const [cartItem, setCartItem] = useState<any | null>(null);

  const navigation = useNavigation();
  const { userName, userId } = useAuth();
  const { getMyCartQuery } = useProfile()

  const handleBackPress = () => {
    navigation.goBack();
  };

  const getData = async () => {
    if (userId) {
      const res = await getMyCartQuery(userId)
      if (res?.data?.cartData) {
        setCartItem(res?.data?.cartData);
        console.log('----CART LIST UPDATE')
      }
    }
  }

  useEffect(() => {
    if (userId) {
      getData()
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>
      {
        cartItem && cartItem?.length === 0 &&
        <View>
          <Image source={EmptyCardImage} style={styles.emptyCartImage} />
          <Text style={styles.emptyText}>Opps! Empty Cart</Text>
        </View>
      }
      {<ScrollView>
        {
          cartItem ? cartItem.map((item: any) => {
            return (
              <CartItem
                key={item.id}
                id={item.id}
                product={item?.product}
                quantity={item.quantity}
                refetchCartList={getData}
              />
            )
          }) : <LoadingScreen />
        }
      </ScrollView>}

    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 60
  },
  backButton: {
    fontSize: 16,
    color: '#007BFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartImage: {
    width: '80%',
    height: 300,
    objectFit: 'contain',
    alignSelf: 'center'
  },
  emptyText: {
    textAlign: 'center',
    paddingTop: 10
  }
});
