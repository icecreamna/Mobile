import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Custombutton = ({ title, onPress, backgroundColor, fontWeight }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            onPress={onPress}>
            <Text style={[styles.text, { fontWeight }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 200,
        alignItems: 'center',

    },
    text: {
        color: 'white',
        fontSize: 18,
    },
});

export default Custombutton;