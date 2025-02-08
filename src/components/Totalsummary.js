import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native'

const TotalPrice = ({cards}) => {
    // Calculate the total price for unpurchased items
    const totalCost = cards
      .filter((item) => !item.Buy) // Filter out purchased items
      .reduce((total, item) => total + parseFloat(item.price), 0) // Sum prices
      .toFixed(2); // Format the total price to 2 decimal places
    return (
        <View>
            <Text style ={styles.totalText}>Total Price (Unpurchased) : {totalCost} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      marginLeft:10
    },
})


export default TotalPrice

