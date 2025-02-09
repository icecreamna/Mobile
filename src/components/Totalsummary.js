import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native'

const TotalPrice = ({totalCost,darkmode}) => {
    // Calculate the total price for unpurchased items
    return (
        <View>
            <Text style ={darkmode ? styles.darkTotalText : styles.totalText}>Total Price (Unpurchased) : {totalCost} </Text>
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
    darkTotalText:{
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      marginLeft:10,
      color:'white'
    },
})


export default TotalPrice