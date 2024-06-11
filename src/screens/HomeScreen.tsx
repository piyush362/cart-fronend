import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth, useProfile } from '../hooks';
import ProductItem from '../components/ProductItem';
import { useNavigation } from '@react-navigation/native';

const cartLogo = require('../assets/cart.png');

const HomeScreen = () => {
  const { allProduct, isLoading } = useProfile()
  const navigation = useNavigation();
  const { userName } = useAuth();

  const handleCartNavigation = () => {
    navigation.navigate({
      name: 'CartScreen',
    } as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {userName ?? ""}</Text>
        <TouchableOpacity onPress={() => handleCartNavigation()}>
          <Image source={cartLogo} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {allProduct.map((product: any) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </ScrollView>
      <View></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    color: '#333',
  },
  cartIcon: {
    width: 40,
    height: 40
  }
});
