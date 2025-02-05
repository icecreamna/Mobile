import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import { CustomButtonBox, CustomButtonLong } from "../components/CustomButton";
import TotalSummary from "../components/TotalSummary";
import ItemCard from "../components/ItemCard";
import TextInputs from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@card_data";

const HomeScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [img, setImg] = useState("");
    const [goods, setGoods] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mode, setMode] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // โหลดข้อมูลจาก AsyncStorage
    useEffect(() => {
        const loadGoods = async () => {
            try {
                const savedGoods = await AsyncStorage.getItem(STORAGE_KEY);
                if (savedGoods) {
                    setGoods(JSON.parse(savedGoods));
                }
            } catch (error) {
                console.log("Error loading data: ", error);
            }
        };
        loadGoods();
    }, []);

    const saveGoodsToStorage = async (data) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.log("Error saving data: ", error);
        }
    };

    const addGoods = async () => {
        if (!title.trim() || !cost.trim()) {
            alert("กรุณากรอกค่า Title และ Cost");
            return;
        }
        const newGoods = { id: Date.now().toString(), title, cost, img };
        const updatedGoods = [newGoods, ...goods];
        setGoods(updatedGoods);
        setTitle("");
        setCost("");
        setImg("");

        await saveGoodsToStorage(updatedGoods);
        setIsVisible(false);
    };

    const editGoods = async () => {
        if (!selectedItem) return;
        const updatedGoods = goods.map((item) =>
            item.id === selectedItem.id ? { ...selectedItem } : item
        );
        setGoods(updatedGoods);
        await saveGoodsToStorage(updatedGoods);
        setIsVisible(false);
    };

    const openModal = (f, item = null) => {
        setMode(f);
        setSelectedItem(item || { title: "", cost: "", img: "" });
        setIsVisible(true);
    };

    return (
        <View style={styles.ViewStyle}>
            <TextInputs text="Search a name of goods ..." width={420} />
            <View style={styles.AllGoods}>
                <FlatList
                    data={goods}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => openModal("edit", item)}>
                            <ItemCard name={item.title} cost={item.cost} status={item.img} />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.container}>
                <CustomButtonBox title="⚙️" backgroundColor="#eddfb0" />
                <TotalSummary />
                <CustomButtonBox title="+" backgroundColor="#e79517" onPress={() => openModal("add")} />
            </View>
            <Modal transparent animationType="fade" visible={isVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{mode === "add" ? "Add GOOOOOODS" : "Edit GOOOOOODS"}</Text>
                        <TextInputs text="Title ..." width={300} value={selectedItem.title} onChangeText={(text) => setSelectedItem({ ...selectedItem, title: text })} />
                        <TextInputs text="Cost ..." width={300} value={selectedItem.cost} onChangeText={(text) => setSelectedItem({ ...selectedItem, cost: text })} />
                        <TextInputs text="Image ..." width={300} value={selectedItem.img} onChangeText={(text) => setSelectedItem({ ...selectedItem, img: text })} />
                        <CustomButtonLong title={mode === "add" ? "Add GOOOOOODS" : "Save GOOOOOODS"} backgroundColor="green" onPress={mode === "add" ? addGoods : editGoods} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#acd2f4",
    },
    AllGoods: {
        borderWidth: 1,
        borderColor: "#294cdc",
        width: 420,
        height: 690,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "white",
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 420,
    },
    modalOverlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: 350,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 28,
        alignItems: "center",
        elevation: 5,
    },
});

export default HomeScreen;
