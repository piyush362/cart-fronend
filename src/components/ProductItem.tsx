import React from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useProfile } from '../hooks';

interface Product {
  _id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductItemProps {
  product: Product;
}

const ProductItem = (props: ProductItemProps) => {
  const { product } = props;
  const { addToCart, isLoading } = useProfile();

  const handleAddToCart = async () => {
    Alert.alert('Confirm', 'Are you sure to add item ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          const res = await addToCart(product._id)
          if (res?.data) {
            Alert.alert("Item added")
          }
        }
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToCart()}
        disabled={isLoading.addingToCart}
      >
        {
          isLoading.addingToCart ? <ActivityIndicator color={'white'} /> :
            <Text style={styles.buttonText}>Add to Cart</Text>
        }
      </TouchableOpacity>

    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width * 0.45,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
