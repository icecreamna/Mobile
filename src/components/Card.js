import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ItemCard = ({ title, price, image }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{price}</Text>
      {image ? (
        <Image source={{ uri: image }} style={styles.imageStyle} />
      ) : (
        <Text>No Image Available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  image: {
    width: "10%",
    height: 270, 
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: 'center'
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
});

export default ItemCard;