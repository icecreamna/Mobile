import * as React from 'react';
import { Text, SafeAreaView, ScrollView, View ,StyleSheet} from 'react-native'; // เพิ่ม View เข้ามา
import { PaperProvider, Card, Button } from 'react-native-paper';

const ItemCard = ({ image, title, price , onBuy,onEdit}) => { // รับ props image, title และ price

  return (
    <View> {/* Wrap ทั้งหมดด้วย View */}
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <Card style={{ margin: 20 }}>
              <Card.Title
                title={title} // ใช้ prop title
                subtitle={`Cost: ${price}฿`} // ใช้ prop price
                titleStyle={{ fontSize: 18, fontWeight: 'bold'}}
                subtitleStyle={{ fontSize: 14 }}
              />
              {image ? (
                <Card.Cover
                  style={{ margin: 10, borderRadius: 10 }}
                  source={{ uri: image }} 
                />
              ) : (
                <Text style = {styles.Textimage}>No Image Available</Text>
              )}

              <Card.Actions>
                <Button
                onPress={onBuy}
                >Buy
                </Button>
                <Button
                onPress={onEdit}
                >Edit
                </Button>
              </Card.Actions>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
      Textimage:{
        paddingLeft:17,
        color :'grey',
        
      },
}) 


export default ItemCard;