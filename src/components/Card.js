import * as React from 'react';
import { Text, SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { PaperProvider, Card, Button } from 'react-native-paper';


const ItemCard = ({ image, title, price, onEdit, onDelete, onBuy, Buy, onCancel }) => {
  return (
    <View>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <Card style={Buy ? styles.BoughtCard : styles.Normalcard}>
              <Card.Title
                title={title}
                subtitle={Buy ? "Purchased" : 'Cost:' + price + '฿'}
                titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                subtitleStyle={{ fontSize: 14 }}

              />
              <View style={styles.imageContainer}>
                {image ? (
                  <Card.Cover
                    style={styles.coverImage}
                    source={{ uri: image }}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.Textimage}>No Image Available</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={onDelete}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>

              <Card.Actions>
                <Button onPress={Buy ? onCancel : onBuy}>
                  {Buy ? "Cancel" : "Buy"}
                </Button>
                <Button onPress={Buy ? onBuy : onEdit} >Edit</Button>
              </Card.Actions>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  Textimage: {
    paddingLeft: 17,
    color: 'grey',
  },
  deleteButton: {
    position: 'absolute', // ทำให้ปุ่มอยู่ในตำแหน่งคงที่
    top: 10, // เว้นจากขอบบน
    right: 10, // เว้นจากขอบขวา
    borderRadius: 20, // มุมโค้งของปุ่ม
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteText: {
    color: '#dc3545', // สีตัวอักษรของปุ่ม
    fontWeight: 'normal',
  },
  imageContainer: {  // Style for the image container
    alignItems: 'center', // Center the image horizontally
    marginBottom: 10, // Add some space below the image
    marginTop: 10, // Add some space above the image
  },
  coverImage: {
    width: '100%', // Make the image take full width of the card
    height: 200, // Set a fixed height for the image or adjust as needed
    borderRadius: 10,
    backgroundColor: "white"
  },
  Normalcard: {
    margin: 20
  },
  BoughtCard: {
    margin: 20,
    backgroundColor: '#e0ffe0'
  },
  clearButton: {
    position: 'absolute', // ทำให้ปุ่มอยู่ที่ตำแหน่งคงที่
    bottom: 20, // เว้นจากขอบล่าง
    left: 20, // เว้นจากขอบซ้าย
    backgroundColor: '#007bff', // สีพื้นหลังของปุ่ม
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  clearButtonText: {
    color: 'white', // สีตัวอักษรของปุ่ม
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default ItemCard;
