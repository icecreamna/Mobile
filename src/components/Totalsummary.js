import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native'

const TotalPrice = ({totalCost}) => {
    // Calculate the total price for unpurchased items
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