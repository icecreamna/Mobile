import React from "react";
import { View, TextInput, StyleSheet } from "react-native";


const TextInputs = ({ width, placeholder, placeholderTextColor, backgroundColor, borderColor , onChangeText,keyboardType}) => {
  return (
    <View>
      <TextInput
        style={[styles.input, { width, backgroundColor, borderColor }]}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        onChangeText={onChangeText} 
        keyboardType={keyboardType}/>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#294cdc',
    borderRadius: 27,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    color:'white'
  }
});

export default TextInputs;