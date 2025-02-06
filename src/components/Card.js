import * as React from 'react';
import { Text, SafeAreaView, ScrollView, View, StyleSheet , TouchableOpacity} from 'react-native';
import { PaperProvider, Card, Button } from 'react-native-paper';

const ItemCard = ({ image, title, price, onBuy, onEdit , onDelete}) => {
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
              {image ? (
                <Card.Cover
                  style={{ margin: 10, borderRadius: 10 }}
                  source={{ uri: image }}
                />
              ) : (
                <Text style={styles.Textimage}>No Image Available</Text>
              )}

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
});

export default ItemCard;
