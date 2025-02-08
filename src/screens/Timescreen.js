import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Alert } from 'react-native'
import Custombutton from "../components/custombutton";
import TextInputs from "../components/customTextinput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemCard from "../components/Card";
import TotalPrice from "../components/Totalsummary";

const STORAGE_KEY = '@card_data'

const Timescreen = () => {
  const [card, setcard] = useState([])
  const [title, setTitle] = useState('')
  const [price, setprice] = useState('')
  const [img, setimg] = useState('')
  const [edit, setEdit] = useState(null)


  const addCard = async () => {
    if (!title.trim() || (price < 0) || (!parseFloat(price)) ) {
      alert('กรุณากรอกค่า Title และ price ห้ามน้อยกว่า 0')
      return;
    }

    const newCard = { id: Date.now().toString(), title, price, img, Buy: false }
    const updateCard = [newCard, ...card]
    setcard(updateCard)
    setTitle("")
    setprice("")
    setimg("")
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updateCard))
    } catch (error) {
      console.log("Error:", error)
    }
  }


  const loadCard = async () => {
    try {
      const storagedCard = await AsyncStorage.getItem(STORAGE_KEY)
      if (storagedCard) {
        const parsedCard = JSON.parse(storagedCard);
        setcard(parsedCard);
      }
    } catch (error) {
      console.log("Failed to load: ", error)
    }
  }

  const deleteCard = async (id) => {
            const newCards = card.filter((item) => item.id !== id)
            setcard(newCards)
            try {
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCards))
            } catch (error) {
              console.log("Error:", error)
            }
          }

  const EditCard = async (item) => {
    setEdit(item.id)
    setTitle(item.title);
    setprice(item.price);
    setimg(item.img)
  }
  const updateCard = async () => {
    if (!title.trim() || (price < 0)) {
      alert('กรุณากรอกค่า Title และ price ห้ามน้อยกว่า 0')
      return;
    }
    const updatedCard = card.map((item) => item.id === edit ? { ...item, title, price, img } : item);
    setcard(updatedCard);
    setTitle('');
    setprice('');
    setimg('');
    setEdit(null);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCard));
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const BuyCard = async (item) => {
    const updatedCard = card.map((cardItem) =>
      cardItem.id === item.id ? { ...cardItem, Buy: true } : cardItem
    );
    setcard(updatedCard); // update the state with the updated cards

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCard)); // save to async storage
    } catch (error) {
      console.log('Error:', error);
    }
    setcard(newCards)
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCards))
    } catch (error) {
      console.log("Error:", error)
    }
  }

  const Cancelcard = async (item) => {
    const updatedCard = card.map((cardItem) =>
      cardItem.id === item.id ? { ...cardItem, Buy: false } : cardItem
    );
    setcard(updatedCard); // update the state with the updated cards

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCard)); // save to async storage
    } catch (error) {
      console.log('Error:', error);
    }
    setcard(newCards)
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCards))
    } catch (error) {
      console.log("Error:", error)
    }
  }

  const ClearAlldelete = async () => {
    setcard([])
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.log('Error:', error);
    }
  }



  useEffect(() => {
    loadCard()
  }, [card])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What name should it be?</Text>
      <TextInputs
        value={title}
        onChangeText={setTitle}
        placeholder="📦 Name of product"
        placeholderTextColor='white'
        borderColor='#BDC3C7'
        backgroundColor='#2C3E50'
      />
      <TextInputs
        value={price}
        onChangeText={setprice}
        placeholder="💵 Price"
        placeholderTextColor='white'
        borderColor='#2C3E50'
        backgroundColor='#27AE60'
        keyboardType='Numeric'
      />
      <TextInputs
        value={img}
        onChangeText={setimg}
        placeholder="🔗 Link img(if you have)"
        multiline={true}
        placeholderTextColor='white'
        borderColor='#BDC3C7'
        backgroundColor='#2C3E50'
      />
      <Custombutton
        backgroundColor='#28a745'
        title={edit ? 'Save' : 'Add item'}
        fontWeight='bold'
        onPress={edit ? updateCard : addCard}
      />

      <FlatList
        data={card}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ItemCard
              image={item.img}
              title={item.title}
              price={item.price}
              Buy={item.Buy}
              edit={item.edit}
              onEdit={() => EditCard(item)}
              onDelete={() => deleteCard(item.id)}
              onBuy={() => BuyCard(item)}
              onCancel={() => Cancelcard(item)}
            />
          )
        }}
      />
      <TotalPrice
        cards = {card}
      />
      <Custombutton
        backgroundColor='#dc3545'
        title="Clear All"
        fontWeight="bold"
        style={styles.clearAllButton}
        onPress={ClearAlldelete}
      />
    </View>
  )
}

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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  clearAllButton: {
    position: 'absolute', // ทำให้ปุ่มอยู่ที่ตำแหน่งคงที่
    bottom: 20, // เว้นจากขอบล่าง
    left: 20, // เว้นจากขอบซ้าย
    backgroundColor: '#007bff', // สีพื้นหลังของปุ่ม
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

})

export default Timescreen