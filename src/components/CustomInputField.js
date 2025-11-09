import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInputField = ({label, placeholder, isDate = false}) => {
  return (
    <View style={styles.container}>
      {/* Label di atas input field */}
      <Text style={styles.label}>{label}</Text>

      {/* Kotak Input */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        // Jika ini adalah input tanggal, mungkin perlu properti tambahan (misalnya, membuka DatePicker)
        keyboardType={isDate ? 'default' : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, // Sudut membulat
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default CustomInputField;
