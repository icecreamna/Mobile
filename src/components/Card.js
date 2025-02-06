import * as React from 'react';
import {View, Image, SafeAreaView, ScrollView } from 'react-native';
import { PaperProvider, Card, Button } from 'react-native-paper';

const ItemCard = (img,price ,title) => {
   //const leftComponent = ({ size }: { size: number }) => (
   
  //);

  return (
    <View>
    <Image
    resizeMode="cover"
    style={{ width: 250, height: 250, borderRadius: 250 / 2 }}
    source={{uri:img,}}
  />
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Card style={{ margin: 20 }}>
            <Card.Title
              title={title}
              subtitle={price} 
              titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
              subtitleStyle={{ fontSize: 14 }}
            />
            <Card.Cover
              style={{ margin: 10, borderRadius: 10 }}
              source={{
                uri: img,
              }}
            />
            <Card.Actions>
              <Button>Buy</Button>
              <Button>Edit</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
    </View>
  );
};

export default ItemCard;
