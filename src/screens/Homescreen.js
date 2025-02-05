import React from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import CustomButtom from "../components/custombutton";
import Card from "../components/Card";

// function HomeScreen() {} 
const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.ViewStyle}>
            <Text style={styles.TextStyle}>List of Screen!</Text>
            <View style={styles.button}>
                <CustomButtom style = {styles.button}
                    title="Go to gpt Screen"//eieieieiei
                    onPress={() => { navigation.navigate("gpt") }}
                    backgroundColor='grey'
                />
                <CustomButtom style = {styles.button}
                    title="Go to Time Screen"
                    onPress={() => { navigation.navigate('Time') }}
                    backgroundColor='purple'
                />
            </View>
        </View>
    );//eieieieieeieieieieieei
}//eieieieieieiposdjfdklfhgnkfjgdfkghjdftg


const styles = StyleSheet.create({
    ViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        fontSize: 30,
    },
    button: {
        width: 250,
        gap: 5,
    }
});

export default HomeScreen;