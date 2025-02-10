import { React, useState } from 'react';
import { Text, SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { PaperProvider, Card, Button } from 'react-native-paper';

const ItemCard = ({ image, title, price, onEdit, onDelete, onBuy, Buy, onCancel }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // ฟังก์ชันจัดการการแสดงผลของ Modal
  // const handleDeletePress = () => {
  //   setIsModalVisible(true); // เปิด Modal
  // };

  // const handleCancelModal = () => {
  //   setIsModalVisible(false); // ปิด Modal
  // };

  // const handleConfirmDelete = () => {
  //   onDelete(); // เรียกฟังก์ชัน onDelete
  //   setIsModalVisible(false); // ปิด Modal หลังจากการยืนยันการลบ
  // };

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
                onPress={()=>setIsModalVisible(true)} // ใช้ฟังก์ชันที่แก้ไขแล้ว
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>

              <Card.Actions>
                <Button onPress={Buy ? onCancel : onBuy}>
                  {Buy ? "Cancel" : "Buy"}
                </Button>
                <Button onPress={Buy ? onBuy : onEdit}>Edit</Button>
              </Card.Actions>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
      {/* Modal สำหรับยืนยันการลบ */}
      <Modal transparent={true} animationType="fade" visible={isModalVisible} onRequestClose={()=>setIsModalVisible(false)}> 
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Confirm Delete</Text>
            <Text style={styles.msg}>Are you sure you want to delete {title}?</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: 'grey', marginRight: 10 }}
                onPress={()=>setIsModalVisible(false)} // ปิด Modal
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#f44336' }}
                onPress={()=>{
                  onDelete()
                  setIsModalVisible(false)

                }} // เรียกฟังก์ชันลบ
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Textimage: {
    paddingLeft: 17,
    color: 'grey',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteText: {
    color: '#dc3545',
    fontWeight: 'normal',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  coverImage: {
    width: '100%',
    height: 200,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  msg: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ItemCard;
