import * as React from 'react';
import { Text, SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { PaperProvider, Card, Button } from 'react-native-paper';

const ItemCard = ({ image, title, price, onBuy, onEdit, onDelete }) => {
  return (
    <View>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <Card style={{ margin: 20 }}>
              <Card.Title
                title={title}
                subtitle={'Cost:' + price + '฿'}
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
                <Button onPress={onBuy}>Buy</Button>
                <Button onPress={onEdit}>Edit</Button>
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
    backgroundColor:"white"

  },
});

export default ItemCard;
