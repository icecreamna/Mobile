import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GPT = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    saveItems();
  }, [items]);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('shoppingItems');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load items');
    }
  };

  const saveItems = async () => {
    try {
      await AsyncStorage.setItem('shoppingItems', JSON.stringify(items));
    } catch (error) {
      Alert.alert('Error', 'Failed to save items');
    }
  };

  const addItem = () => {
    if (!itemName.trim() || !itemPrice.trim()) {
      Alert.alert('Validation Error', 'Please enter both item name and price.');
      return;
    }

    const priceNumber = parseFloat(itemPrice);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid positive price.');
      return;
    }

    setItems([...items, { id: Date.now().toString(), name: itemName, price: priceNumber, purchased: false }]);
    setItemName('');
    setItemPrice('');
  };

  const togglePurchased = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.filter(item => !item.purchased).reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.itemCard, item.purchased && styles.purchased]} onPress={() => togglePurchased(item.id)}>
      <View>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>Price: {item.price} ฿</Text>
      </View>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เพื่อนรักนักช้อป</Text>
      <TextInput
        placeholder="ชื่อสินค้า"
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        placeholder="ราคา"
        style={styles.input}
        keyboardType="numeric"
        value={itemPrice}
        onChangeText={setItemPrice}
      />
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
      <Text style={styles.totalText}>Total Price (Unpurchased): {getTotalPrice()} ฿</Text>
      <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
        <Text style={styles.buttonText}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    marginVertical: 10,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  purchased: {
    backgroundColor: '#d3f9d8',
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: '#dc3545',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default GPT;
