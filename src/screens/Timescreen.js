import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import CustomButtom from "../components/custombutton";
import TextInputs from "../components/customTextinput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemCard from "../components/Card";

const STORAGE_KEY = '@card_data'

const Timescreen = () => {
  const [card, setcard] = useState([])
  const [title, setTitle] = useState('')
  const [price, setprice] = useState('')
  const [img, setimg] = useState('')

  const addCard = async () => {
    if (!title.trim() || (price < 0)) {
      alert('กรุณากรอกค่า Title และ price ห้ามน้อยกว่า 0')
      return;
    }

    const newCard = { id: Date.now().toString(), title, price, img }
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

  useEffect(() => {
    loadCard()
  }, [])

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
      <CustomButtom
        backgroundColor='#28a745'
        title='Add item'
        fontWeight='bold'
        onPress={addCard}
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
              onBuy={() => console.log("click buy")}
              onEdit={() => console.log("click edit")}
            />
          )
        }}
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
})


export default Timescreen