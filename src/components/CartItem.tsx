import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useProfile } from '../hooks';

interface CartItemProps {
  id: string;
  product: any;
  quantity: number;
  refetchCartList?: () => void
}

const CartItem = (props: CartItemProps) => {
  const [actionLoading, setActionLoading] = useState(false);
  const { product, id, quantity, refetchCartList } = props;
  const { changeItemQuantity, deleteCartItem, isLoading } = useProfile();

  const handleChangeQuantity = async (quantityData: number) => {
    if (quantityData < 1) {
      return
    }
    setActionLoading(true)
    const res = await changeItemQuantity({
      cartItemId: id,
      quantity: quantityData
    })
    refetchCartList && refetchCartList();
    console.log(JSON.stringify(res, null, 2))

    setActionLoading(false)
  }

  const deleteItem = async () => {
    setActionLoading(true)
    Alert.alert("Confirm", "Are you sure to delete this item ?", [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          const res = await deleteCartItem(id);
          refetchCartList && refetchCartList();
          setActionLoading(false)
        }
      },
    ])
    setActionLoading(false)
  }

  return (
    <View style={styles.container}>
      {/* Image and Details */}
      <View style={styles.itemContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        </View>
      </View>

      {/* Quantity */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          disabled={actionLoading}
          style={styles.quantityButton}
          onPress={() => handleChangeQuantity(quantity - 1)}
        >
          {
            isLoading.changingItemQuantity ? <ActivityIndicator color={'white'} />
              :
              <Text style={styles.quantityButtonText}>-</Text>
          }
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity
          disabled={actionLoading}
          style={styles.quantityButton}
          onPress={() => handleChangeQuantity(quantity + 1)}
        >
          {
            isLoading.changingItemQuantity ? <ActivityIndicator color={'white'} />
              :
              <Text style={styles.quantityButtonText}>+</Text>
          }
        </TouchableOpacity>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        disabled={actionLoading}
        style={styles.deleteButton}
        onPress={() => deleteItem()}
      >
        {
          isLoading.deletingCartItem ? <ActivityIndicator color={'white'} />
            :
            <Text style={styles.deleteText}>Delete</Text>
        }

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    borderRadius: 10
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  quantityButton: {
    backgroundColor: '#9ac0fc',
    borderColor: '#007BFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '35%',
    height: 40,
    justifyContent: 'center'
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
    borderColor: '#007BFF',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5
  },
  deleteButton: {
    marginTop: 5,
    backgroundColor: '#f56267',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center'
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default CartItem;
